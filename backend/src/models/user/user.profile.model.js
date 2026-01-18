module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('UserProfile', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },

        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

        displayName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

        avatarUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        bio: {
            type: DataTypes.STRING(500),
            allowNull: true
        },

        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        gender: {
            type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'),
            allowNull: true
        },

        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        state: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        preferredCategories: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Array of category IDs user prefers'
        }
    }, {
        tableName: 'user_profiles',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['userId'] }
        ]
    });

    return UserProfile;
};