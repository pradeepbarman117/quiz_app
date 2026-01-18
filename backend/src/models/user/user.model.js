module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            comment: 'Public identifier'
        },

        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true
        },

        role: {
            type: DataTypes.ENUM('USER', 'ADMIN', 'MODERATOR'),
            defaultValue: 'USER'
        },

        status: {
            type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'BANNED', 'SUSPENDED'),
            defaultValue: 'ACTIVE'
        },

        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isPhoneVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        lastLoginAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        lastLoginIp: {
            type: DataTypes.STRING(45),
            allowNull: true
        },

        referralCode: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: true
        },

        referredBy: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        indexes: [
            { unique: true, fields: ['uuid'] },
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['username'] },
            { fields: ['status'] },
            { fields: ['role'] },
            { fields: ['referralCode'] },
            { fields: ['referredBy'] }
        ]
    });

    return User;
};