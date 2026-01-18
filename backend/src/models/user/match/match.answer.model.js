module.exports = (sequelize, DataTypes) => {
    const MatchAnswer = sequelize.define('MatchAnswer', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        matchId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        playerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        questionOrder: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: 'Question number in the match (1-10)'
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
            comment: 'Time in milliseconds'
        },

        answeredAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'match_answers',
        timestamps: false,
        indexes: [
            { fields: ['matchId'] },
            { fields: ['playerId'] },
            { fields: ['matchId', 'playerId'] },
            { fields: ['matchId', 'questionId'] },
            { unique: true, fields: ['matchId', 'playerId', 'questionId'] }
        ]
    });

    return MatchAnswer;
};