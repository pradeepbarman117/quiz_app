module.exports = (sequelize, DataTypes) => {
    const Reward = sequelize.define('Reward', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        rewardType: {
            type: DataTypes.ENUM(
                'COINS',
                'GEMS',
                'GIFT_CARD',
                'MERCHANDISE',
                'BADGE',
                'VOUCHER'
            ),
            allowNull: false
        },

        value: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Value in coins or actual value'
        },

        giftCardCode: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1,
            comment: 'Available quantity'
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'rewards',
        timestamps: true
    });

    return Reward;
};