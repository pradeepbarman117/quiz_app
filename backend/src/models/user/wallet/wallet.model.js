module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
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

        coins: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'In-app currency'
        },

        points: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Reward points'
        },

        gems: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Premium currency'
        },

        totalEarned: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalSpent: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isLocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'wallets',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['userId'] },
            { fields: ['coins'] },
            { fields: ['points'] }
        ]
    });

    return Wallet;
};