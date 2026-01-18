module.exports = (sequelize, DataTypes) => {
    const DailyQuizAttempt = sequelize.define('DailyQuizAttempt', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        dailyQuizId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'IN_PROGRESS',
                'COMPLETED',
                'TIMED_OUT',
                'ABANDONED'
            ),
            defaultValue: 'IN_PROGRESS'
        },

        score: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        correctAnswers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        wrongAnswers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        skippedQuestions: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        accuracy: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        },

        totalTimeTaken: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Milliseconds'
        },

        isPerfectScore: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isRewardEarned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        rewardAmount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isRewardDistributed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        startedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'daily_quiz_attempts',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['dailyQuizId', 'userId'] },
            { fields: ['dailyQuizId'] },
            { fields: ['userId'] },
            { fields: ['status'] },
            { fields: ['score'] }
        ]
    });

    return DailyQuizAttempt;
};