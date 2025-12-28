const db = require('@models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../../utils/bcrypt');


const login = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        // Find user by email
        const user = await db.User.findOne({ where: { mobile } });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid mobile or password'
            });
        }

        // Verify password
        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            // Increment failed login attempts
            await user.update({
                failed_login_attempts: user.failed_login_attempts + 1
            });

            // Lock account after 5 failed attempts
            if (user.failed_login_attempts + 1 >= 5) {
                const lockUntil = new Date();
                lockUntil.setMinutes(lockUntil.getMinutes() + 30);

                await user.update({
                    account_locked_until: lockUntil
                });

                return res.status(401).json({
                    success: false,
                    message: 'Account locked due to multiple failed login attempts. Try again in 30 minutes.'
                });
            }

            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
                attemptsRemaining: 5 - (user.failed_login_attempts + 1)
            });
        }

        // Check account status
        if (user.status !== 'active') {
            return res.status(403).send({
                success: false,
                message: `Account is ${user.status}. Please contact support.`
            });
        }

        // Check if account is locked
        if (user.account_locked_until && new Date() < user.account_locked_until) {
            const unlockTime = new Date(user.account_locked_until).toLocaleString();
            return res.status(403).send({
                success: false,
                message: `Account is locked until ${unlockTime}`
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                iat: Math.floor(Date.now() / 1000) // Issued at time
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        // Update login info
        await user.update({
            last_login_at: new Date(),
            last_login_ip: req.ip,
            failed_login_attempts: 0,
            account_locked_until: null
        });

        // Remove sensitive data
        const userResponse = user.toJSON();
        delete userResponse.password;
        delete userResponse.failed_login_attempts;
        delete userResponse.account_locked_until;

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                success: true,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};


const verifyToken = async (req, res) => {
    try {
        // User is already verified by authenticate middleware
        // req.user is available

        return res.status(200).json({
            success: true,
            message: 'Token is valid',
            data: {
                id: req.user.id,
                email: req.user.email,
                mobile: req.user.mobile,
                full_name: req.user.full_name,
                username: req.user.username,
                avatar_url: req.user.avatar_url,
                role: req.user.role,
                status: req.user.status,
                is_email_verified: req.user.is_email_verified,
                is_mobile_verified: req.user.is_mobile_verified,
                total_quizzes_taken: req.user.total_quizzes_taken,
                total_score: req.user.total_score,
                average_score: req.user.average_score,
                streak_days: req.user.streak_days,
                last_login_at: req.user.last_login_at
            }
        });

    } catch (error) {
        console.error('Verify token error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = { login, verifyToken };