const bcrypt = require('bcryptjs');
const { Op, where, Sequelize } = require('sequelize');
const db = require('@models/index.js'); // Adjust path as needed
const { hashPassword } = require('@utils/bcrypt');
const ApiError = require('../../utils/apiError');
const asyncHandler = require('../../utils/asyncHandler');
const { DEFAULTS } = require('../../utils/constants');
const ApiResponse = require('../../utils/apiResponse');
const helpers = require('../../utils/helpers');

// ============================================
// USER CONTROLLER - For Regular Users
// ============================================
const userController = {
    /**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
    register: asyncHandler(async (req, res, next) => {
        const { username, email, password, phone, referralCode } = req.body;

        // Check if user already exists
        const existingUser = await db.User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) {
                throw ApiError.conflict('Email already registered');
            }
            if (existingUser.username === username) {
                throw ApiError.conflict('Username already taken');
            }
        }

        // Check referral code if provided
        let referrer = null;
        if (referralCode) {
            referrer = await db.User.findOne({ where: { referralCode } });
            if (!referrer) {
                throw ApiError.badRequest('Invalid referral code');
            }
        }

        // Start transaction
        const transaction = await db.sequelize.transaction();

        try {
            // Hash password
            const hashedPassword = hashPassword(password);

            // Create user
            const user = await db.User.create({
                username,
                email,
                password: hashedPassword,
                phone,
                referralCode: helpers.generateReferralCode(username),
                referredBy: referrer?.id || null
            }, { transaction });

            // Create profile
            await db.UserProfile.create({
                userId: user.id,
                displayName: username
            }, { transaction });

            // Create stats
            await db.UserStats.create({
                userId: user.id
            }, { transaction });

            // Create wallet with signup bonus
            await db.Wallet.create({
                userId: user.id,
                coins: DEFAULTS.SIGNUP_BONUS,
                totalEarned: DEFAULTS.SIGNUP_BONUS
            }, { transaction });

            // Create signup bonus transaction
            await db.Transaction.create({
                userId: user.id,
                walletId: user.id, // Will be same as user id for first wallet
                type: 'CREDIT',
                category: 'SIGNUP_BONUS',
                currencyType: 'COINS',
                amount: DEFAULTS.SIGNUP_BONUS,
                balanceBefore: 0,
                balanceAfter: DEFAULTS.SIGNUP_BONUS,
                description: 'Welcome signup bonus'
            }, { transaction });

            // If referred, give referral bonus to referrer
            if (referrer) {
                const referrerWallet = await db.Wallet.findOne({
                    where: { userId: referrer.id },
                    transaction
                });

                if (referrerWallet) {
                    const newBalance = referrerWallet.coins + DEFAULTS.REFERRAL_BONUS;

                    await referrerWallet.update({
                        coins: newBalance,
                        totalEarned: referrerWallet.totalEarned + DEFAULTS.REFERRAL_BONUS
                    }, { transaction });

                    await db.Transaction.create({
                        userId: referrer.id,
                        walletId: referrerWallet.id,
                        type: 'CREDIT',
                        category: 'REFERRAL_BONUS',
                        currencyType: 'COINS',
                        amount: DEFAULTS.REFERRAL_BONUS,
                        balanceBefore: referrerWallet.coins,
                        balanceAfter: newBalance,
                        referenceId: user.id,
                        description: `Referral bonus: ${username} joined`
                    }, { transaction });
                }
            }

            await transaction.commit();

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            // Remove password from response
            const userResponse = user.toJSON();
            delete userResponse.password;

            return ApiResponse.created(res, {
                user: userResponse,
                token
            }, 'Registration successful');

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }),

    // Get Own Profile (Authenticated User)
    getProfile: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware

            const user = await db.User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: user
            });

        } catch (error) {
            console.error('Get profile error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Update Own Profile (Authenticated User)
    updateProfile: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware
            const { full_name, username, avatar_url, preferences } = req.body;

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Only allow updating specific fields
            const updates = {};
            if (full_name) updates.full_name = full_name;
            if (username) updates.username = username;
            if (avatar_url) updates.avatar_url = avatar_url;
            if (preferences) updates.preferences = preferences;

            await user.update(updates);

            const userResponse = user.toJSON();
            delete userResponse.password;

            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: userResponse
            });

        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(e => ({
                        field: e.path,
                        message: e.message
                    }))
                });
            }

            console.error('Update profile error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Change Own Password (Authenticated User)
    changePassword: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current and new password are required'
                });
            }

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Verify current password
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await user.update({
                password: hashedPassword,
                password_changed_at: new Date()
            });

            return res.status(200).json({
                success: true,
                message: 'Password changed successfully'
            });

        } catch (error) {
            console.error('Change password error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Verify Own Email (Authenticated User)
    verifyEmail: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({
                is_email_verified: true,
                status: user.status === 'pending' ? 'active' : user.status
            });

            return res.status(200).json({
                success: true,
                message: 'Email verified successfully'
            });

        } catch (error) {
            console.error('Verify email error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Verify Own Mobile (Authenticated User)
    verifyMobile: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({ is_mobile_verified: true });

            return res.status(200).json({
                success: true,
                message: 'Mobile verified successfully'
            });

        } catch (error) {
            console.error('Verify mobile error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Get Leaderboard (Public or Authenticated)
    getLeaderboard: async (req, res) => {
        try {
            const { limit = 10 } = req.query;

            const users = await db.User.findAll({
                attributes: [
                    'id',
                    'full_name',
                    'username',
                    'avatar_url',
                    'total_score',
                    'total_quizzes_taken',
                    'average_score',
                    'rank',
                    'streak_days'
                ],
                where: {
                    status: 'active',
                    total_quizzes_taken: { [Op.gt]: 0 }
                },
                order: [['total_score', 'DESC']],
                limit: parseInt(limit)
            });

            return res.status(200).json({
                success: true,
                data: users
            });

        } catch (error) {
            console.error('Get leaderboard error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Update Own Quiz Stats (Authenticated User)
    updateQuizStats: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware
            const { score, quizCompleted } = req.body;

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            let updates = { last_quiz_at: new Date() };

            if (quizCompleted) {
                const newTotalQuizzes = user.total_quizzes_taken + 1;
                const newTotalScore = user.total_score + (score || 0);
                const newAverageScore = newTotalScore / newTotalQuizzes;

                updates = {
                    ...updates,
                    total_quizzes_taken: newTotalQuizzes,
                    total_score: newTotalScore,
                    average_score: newAverageScore.toFixed(2)
                };

                // Update streak
                const lastQuiz = user.last_quiz_at;
                if (lastQuiz) {
                    const daysDiff = Math.floor((new Date() - new Date(lastQuiz)) / (1000 * 60 * 60 * 24));
                    if (daysDiff === 1) {
                        updates.streak_days = user.streak_days + 1;
                    } else if (daysDiff > 1) {
                        updates.streak_days = 1;
                    }
                } else {
                    updates.streak_days = 1;
                }
            }

            await user.update(updates);

            return res.status(200).json({
                success: true,
                message: 'Quiz stats updated successfully',
                data: updates
            });

        } catch (error) {
            console.error('Update quiz stats error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Delete Own Account (Authenticated User)
    deleteAccount: async (req, res) => {
        try {
            const userId = req.user.id; // From JWT middleware
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: 'Password is required to delete account'
                });
            }

            const user = await db.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                });
            }

            // Soft delete
            await user.destroy();

            return res.status(200).json({
                success: true,
                message: 'Account deleted successfully'
            });

        } catch (error) {
            console.error('Delete account error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};


module.exports = { userController };