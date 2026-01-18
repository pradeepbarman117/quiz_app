module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(
                'MATCH_INVITE',
                'MATCH_STARTED',
                'MATCH_RESULT',
                'CONTEST_REMINDER',
                'CONTEST_STARTED',
                'CONTEST_RESULT',
                'DAILY_QUIZ_REMINDER',
                'REWARD_EARNED',
                'REWARD_CLAIMED',
                'SYSTEM',
                'PROMOTIONAL'
            ),
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        actionType: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: 'NAVIGATE, OPEN_URL, etc.'
        },

        actionData: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '{ screen: "MatchDetail", params: { matchId: 123 } }'
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        readAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'notifications',
        timestamps: true,
        indexes: [
            { fields: ['userId'] },
            { fields: ['type'] },
            { fields: ['isRead'] },
            { fields: ['userId', 'isRead'] },
            { fields: ['createdAt'] }
        ]
    });

    return Notification;
};