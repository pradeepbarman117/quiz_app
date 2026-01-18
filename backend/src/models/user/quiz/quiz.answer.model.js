module.exports = (sequelize, DataTypes) => {
    const DailyQuizAnswer = sequelize.define('DailyQuizAnswer', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        attemptId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        questionOrder: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },

        selectedOptionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        isSkipped: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        pointsEarned: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        responseTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        answeredAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'daily_quiz_answers',
        timestamps: false,
        indexes: [
            { fields: ['attemptId'] },
            { fields: ['userId'] },
            { unique: true, fields: ['attemptId', 'questionId'] }
        ]
    });

    return DailyQuizAnswer;
};