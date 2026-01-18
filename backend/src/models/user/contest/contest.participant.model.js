module.exports = (sequelize, DataTypes) => {
    const ContestParticipant = sequelize.define('ContestParticipant', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        contestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'REGISTERED',
                'JOINED',
                'IN_PROGRESS',
                'COMPLETED',
                'DISQUALIFIED',
                'ABSENT'
            ),
            defaultValue: 'REGISTERED'
        },

        // Score Details
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
            comment: 'In milliseconds'
        },

        averageTimePerQuestion: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },

        // Ranking
        rank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        prizeWon: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isPrizeDistributed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        // Timing
        registeredAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        joinedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        startedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'contest_participants',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['contestId', 'userId'] },
            { fields: ['contestId'] },
            { fields: ['userId'] },
            { fields: ['status'] },
            { fields: ['contestId', 'score'] },
            { fields: ['contestId', 'rank'] },
            { fields: ['contestId', 'status'] }
        ]
    });

    return ContestParticipant;
};