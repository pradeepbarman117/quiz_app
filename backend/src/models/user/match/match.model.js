module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },

        matchCode: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
            comment: 'Shareable code for private matches'
        },

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Null for mixed category'
        },

        matchType: {
            type: DataTypes.ENUM('RANDOM', 'FRIEND', 'REMATCH'),
            defaultValue: 'RANDOM'
        },

        player1Id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        player2Id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        winnerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM(
                'WAITING',          // Waiting for opponent
                'MATCHED',          // Both players joined
                'IN_PROGRESS',      // Quiz started
                'COMPLETED',        // Quiz finished
                'ABANDONED',        // Player left
                'EXPIRED',          // Timeout
                'CANCELLED'
            ),
            defaultValue: 'WAITING'
        },

        totalQuestions: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 10
        },

        difficulty: {
            type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD', 'MIXED'),
            defaultValue: 'MIXED'
        },

        // Player 1 Stats
        player1Score: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        player1CorrectAnswers: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 0
        },

        player1TotalTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Total time in milliseconds'
        },

        player1Finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        player1FinishedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        // Player 2 Stats
        player2Score: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        player2CorrectAnswers: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 0
        },

        player2TotalTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Total time in milliseconds'
        },

        player2Finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        player2FinishedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        // Match Info
        entryFee: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        prizePool: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        winnerPrize: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isDraw: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        questionIds: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Array of question IDs used in this match'
        },

        startedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Auto-expire waiting matches'
        }
    }, {
        tableName: 'matches',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['uuid'] },
            { unique: true, fields: ['matchCode'] },
            { fields: ['player1Id'] },
            { fields: ['player2Id'] },
            { fields: ['winnerId'] },
            { fields: ['status'] },
            { fields: ['categoryId'] },
            { fields: ['matchType'] },
            { fields: ['createdAt'] },
            { fields: ['status', 'createdAt'] },
            { fields: ['player1Id', 'status'] },
            { fields: ['player2Id', 'status'] }
        ]
    });

    return Match;
};