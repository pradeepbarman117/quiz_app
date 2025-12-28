const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const db = require('@models/index.js'); // Adjust path as needed


// ============================================
// ADMIN CONTROLLER - For Admin Users Only
// ============================================
const adminController = {
    // Get All Users (Admin Only)
    getAllUsers: async (req, res) => {
        try {
            const {
                page = 1,
                limit = 10,
                status,
                role,
                search,
                sortBy = 'createdAt',
                order = 'DESC'
            } = req.query;

            const offset = (page - 1) * limit;
            const where = {};

            // Apply filters
            if (status) where.status = status;
            if (role) where.role = role;
            if (search) {
                where[Op.or] = [
                    { full_name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { mobile: { [Op.like]: `%${search}%` } },
                    { username: { [Op.like]: `%${search}%` } }
                ];
            }

            const { count, rows } = await db.User.findAndCountAll({
                where,
                attributes: { exclude: ['password'] },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [[sortBy, order]]
            });

            return res.status(200).json({
                success: true,
                data: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });

        } catch (error) {
            console.error('Get all users error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Get User By ID (Admin Only)
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id, {
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
            console.error('Get user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Create User (Admin Only)
    createUser: async (req, res) => {
        try {
            const {
                mobile,
                email,
                country_code,
                password,
                full_name,
                username,
                avatar_url,
                role,
                status
            } = req.body;

            // Validate required fields
            if (!mobile || !email || !password || !full_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await db.User.create({
                mobile,
                email,
                country_code: country_code || '+91',
                password: hashedPassword,
                full_name,
                username,
                avatar_url,
                role: role || 'user',
                status: status || 'pending'
            });

            // Remove password from response
            const userResponse = user.toJSON();
            delete userResponse.password;

            return res.status(201).json({
                success: true,
                message: 'User created successfully',
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

            console.error('Create user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Update User (Admin Only)
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Prevent direct password updates through this endpoint
            delete updates.password;
            delete updates.id;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Update user
            await user.update(updates);

            const userResponse = user.toJSON();
            delete userResponse.password;

            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
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

            console.error('Update user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Update User Status (Admin Only)
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatuses = ['active', 'blocked', 'deleted', 'pending'];

            if (!status || !validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status'
                });
            }

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({ status });

            return res.status(200).json({
                success: true,
                message: 'User status updated successfully',
                data: { status }
            });

        } catch (error) {
            console.error('Update status error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Update User Role (Admin Only)
    updateRole: async (req, res) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const validRoles = ['user', 'admin', 'superadmin', 'moderator'];

            if (!role || !validRoles.includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role'
                });
            }

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({ role });

            return res.status(200).json({
                success: true,
                message: 'User role updated successfully',
                data: { role }
            });

        } catch (error) {
            console.error('Update role error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Delete User (Admin Only - Soft Delete)
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Prevent admin from deleting themselves
            if (req.user.id === parseInt(id)) {
                return res.status(403).json({
                    success: false,
                    message: 'Cannot delete your own account'
                });
            }

            // Soft delete (paranoid: true)
            await user.destroy();

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });

        } catch (error) {
            console.error('Delete user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Restore Deleted User (Admin Only)
    restoreUser: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id, {
                paranoid: false // Include soft-deleted records
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            if (!user.deletedAt) {
                return res.status(400).json({
                    success: false,
                    message: 'User is not deleted'
                });
            }

            // Restore user
            await user.restore();

            return res.status(200).json({
                success: true,
                message: 'User restored successfully'
            });

        } catch (error) {
            console.error('Restore user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Force Delete User (Admin Only - Permanent)
    forceDeleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id, {
                paranoid: false
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Prevent admin from deleting themselves
            if (req.user.id === parseInt(id)) {
                return res.status(403).json({
                    success: false,
                    message: 'Cannot delete your own account'
                });
            }

            // Permanent delete
            await user.destroy({ force: true });

            return res.status(200).json({
                success: true,
                message: 'User permanently deleted'
            });

        } catch (error) {
            console.error('Force delete user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Reset User Password (Admin Only)
    resetUserPassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'New password is required'
                });
            }

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await user.update({
                password: hashedPassword,
                password_changed_at: new Date(),
                failed_login_attempts: 0,
                account_locked_until: null
            });

            return res.status(200).json({
                success: true,
                message: 'User password reset successfully'
            });

        } catch (error) {
            console.error('Reset password error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Unlock User Account (Admin Only)
    unlockAccount: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({
                failed_login_attempts: 0,
                account_locked_until: null
            });

            return res.status(200).json({
                success: true,
                message: 'User account unlocked successfully'
            });

        } catch (error) {
            console.error('Unlock account error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Get User Statistics (Admin Only)
    getUserStats: async (req, res) => {
        try {
            const totalUsers = await db.User.count();
            const activeUsers = await db.User.count({ where: { status: 'active' } });
            const blockedUsers = await db.User.count({ where: { status: 'blocked' } });
            const pendingUsers = await db.User.count({ where: { status: 'pending' } });
            const deletedUsers = await db.User.count({
                paranoid: false,
                where: { deletedAt: { [Op.ne]: null } }
            });

            return res.status(200).json({
                success: true,
                data: {
                    total: totalUsers,
                    active: activeUsers,
                    blocked: blockedUsers,
                    pending: pendingUsers,
                    deleted: deletedUsers
                }
            });

        } catch (error) {
            console.error('Get user stats error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Verify User Email (Admin Only)
    verifyUserEmail: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);

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
                message: 'User email verified successfully'
            });

        } catch (error) {
            console.error('Verify email error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Verify User Mobile (Admin Only)
    verifyUserMobile: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await user.update({ is_mobile_verified: true });

            return res.status(200).json({
                success: true,
                message: 'User mobile verified successfully'
            });

        } catch (error) {
            console.error('Verify mobile error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports = { adminController };