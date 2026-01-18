module.exports = (sequelize, DataTypes) => {
    const UserReward = sequelize.define('UserReward', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        rewardId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        source: {
            type: DataTypes.ENUM(
                'MATCH_WIN',
                'CONTEST_WIN',
                'DAILY_QUIZ',
                'ACHIEVEMENT',
                'REFERRAL',
                'DAILY_LOGIN',
                'ADMIN'
            ),
            allowNull: false
        },

        sourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Match ID, Contest ID, etc.'
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
            defaultValue: 0
        },

        status: {
            type: DataTypes.ENUM('PENDING', 'CLAIMED', 'EXPIRED', 'CANCELLED'),
            defaultValue: 'PENDING'
        },

        claimedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        metadata: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        tableName: 'user_rewards',
        timestamps: true,
        indexes: [
            { fields: ['userId'] },
            { fields: ['rewardId'] },
            { fields: ['source'] },
            { fields: ['status'] },
            { fields: ['userId', 'status'] }
        ]
    });

    return UserReward;
};