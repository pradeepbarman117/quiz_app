module.exports = (sequelize, DataTypes) => {
    const userModel = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: {
                name: 'unique_mobile',
                msg: 'Mobile number already registered'
            },
            validate: {
                notEmpty: { msg: 'Mobile number is required' },
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: 'Invalid mobile number format'
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: {
                name: 'unique_email',
                msg: 'Email already registered'
            },
            validate: {
                isEmail: { msg: 'Invalid email format' },
                notEmpty: { msg: 'Email is required' }
            }
        },
        country_code: {
            type: DataTypes.STRING(5),
            defaultValue: "+91",
            validate: {
                is: {
                    args: /^\+[0-9]{1,4}$/,
                    msg: 'Invalid country code format'
                }
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Password is required' },
                len: {
                    args: [60, 255], // bcrypt hashes are 60 chars
                    msg: 'Password hash length invalid'
                }
            }
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Full name is required' },
                len: {
                    args: [2, 100],
                    msg: 'Name must be between 2-100 characters'
                }
            }
        },
        username: {
            type: DataTypes.STRING(50),
            unique: {
                name: 'unique_username',
                msg: 'Username already taken'
            },
            allowNull: true,
            validate: {
                is: {
                    args: /^[a-zA-Z0-9_-]{3,50}$/,
                    msg: 'Username must be 3-50 chars (letters, numbers, _, -)'
                }
            }
        },
        avatar_url: {
            type: DataTypes.STRING(500), // Increased for CDN URLs
            allowNull: true,
            validate: {
                isUrl: { msg: 'Invalid avatar URL' }
            }
        },
        role: {
            type: DataTypes.ENUM(
                'user', 'admin', 'superadmin', 'moderator'
            ),
            defaultValue: 'user',
        },
        status: {
            type: DataTypes.ENUM('active', 'blocked', 'deleted', 'suspended'),
            defaultValue: 'active',
        },
        failed_login_attempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        account_locked_until: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        last_login_ip: {
            type: DataTypes.STRING(45), // IPv6 support
            allowNull: true,
            validate: {
                isIP: true
            }
        },
        is_mobile_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        password_changed_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // Quiz-specific fields
        preferences: {
            type: DataTypes.JSON,
            defaultValue: {},
        },
        total_quizzes_taken: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { min: 0 }
        },
        total_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { min: 0 }
        },
        average_score: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00,
            validate: { min: 0, max: 100 }
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        streak_days: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        last_quiz_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
        {
            tableName: "users",
            paranoid: true,      // enables deleted_at
            timestamps: true,
            indexes: [
                // Performance indexes
                {
                    name: 'idx_email',
                    fields: ['email']
                },
                {
                    name: 'idx_mobile_country',
                    fields: ['mobile', 'country_code']
                },
                {
                    name: 'idx_username',
                    fields: ['username']
                },
                {
                    name: 'idx_status_role',
                    fields: ['status', 'role']
                },
                {
                    name: 'idx_last_login',
                    fields: ['last_login_at']
                },
                // Quiz-specific indexes
                {
                    name: 'idx_rank',
                    fields: ['rank']
                },
                {
                    name: 'idx_total_score',
                    fields: ['total_score']
                },
                {
                    name: 'idx_streak',
                    fields: ['streak_days']
                }
            ],
        },
    );
    return userModel;
}