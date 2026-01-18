module.exports = (sequelize, DataTypes) => {
    const ContestAnswer = sequelize.define('ContestAnswer', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        contestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        participantId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            comment: 'ContestParticipant ID'
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
            type: DataTypes.INTEGER.UNSIGNED,
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
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        responseTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Milliseconds'
        },

        answeredAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'contest_answers',
        timestamps: false,
        indexes: [
            { fields: ['contestId'] },
            { fields: ['participantId'] },
            { fields: ['userId'] },
            { fields: ['contestId', 'userId'] },
            { unique: true, fields: ['participantId', 'questionId'] }
        ]
    });

    return ContestAnswer;
};