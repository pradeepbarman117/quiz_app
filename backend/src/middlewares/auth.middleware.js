const passport = require("passport")


/**
 * Authenticate user using JWT with custom error handling
 */
const authenticateRoute = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        // Handle server errors
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).send({
                success: false,
                message: 'Authentication error occurred'
            });
        }

        // Handle authentication failure
        if (!user) {
            return res.status(401).send({
                success: false,
                message: info?.message || 'Unauthorized: Invalid or expired token'
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    })(req, res, next);
};

module.exports = { authenticateRoute };