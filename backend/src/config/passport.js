const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const db = require('@models/index.js');
const e = require('express');


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: false
};

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Find user by ID from JWT payload
        const user = await db.User.findByPk(jwt_payload.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        // Check if user account is active
        if (user.status !== 'active') {
            return done(null, false, {
                message: `Account is ${user.status}. Please contact support.`
            });
        }

        // Check if account is locked
        if (user.account_locked_until && new Date() < user.account_locked_until) {
            const unlockTime = new Date(user.account_locked_until).toLocaleString();
            return done(null, false, {
                message: `Account is locked until ${unlockTime}`
            });
        }

        // Check if token was issued before password change
        if (user.password_changed_at && jwt_payload.iat) {
            const passwordChangedTime = parseInt(user.password_changed_at.getTime() / 1000);
            if (jwt_payload.iat < passwordChangedTime) {
                return done(null, false, {
                    message: 'Password was changed. Please login again.'
                });
            }
        }

        // All checks passed - user is valid
        return done(null, user);

    } catch (error) {
        console.error('JWT Strategy Error:', error);
        return done(error, false);
    }
}));


/**
 * Authorize based on roles
 * Usage: authorizeRoles('admin', 'superadmin')
 */
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient permissions',
                required: roles,
                current: req.user.role
            });
        }

        next();
    };
};




module.exports = { passport, authorizeRoles };