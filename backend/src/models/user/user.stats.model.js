module.exports = (sequelize, DataTypes) => {
    const UserStats = sequelize.define('UserStats', {
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

        // Overall Stats
        totalQuizPlayed: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalQuestionsAnswered: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalCorrectAnswers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalWrongAnswers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        overallAccuracy: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00,
            comment: 'Percentage'
        },

        // 1v1 Stats
        totalMatches: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        matchesWon: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        matchesLost: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        matchesDraw: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        currentWinStreak: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        longestWinStreak: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        // Contest Stats
        totalContestsJoined: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        contestsWon: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        contestTop3Finishes: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        // Daily Quiz Stats
        totalDailyQuizPlayed: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        dailyQuizStreak: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Consecutive days played'
        },

        longestDailyStreak: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        lastDailyQuizDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        // Points & Ranking
        totalPointsEarned: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        currentRank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        highestRank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        // Speed Stats
        averageResponseTime: {
            type: DataTypes.DECIMAL(8, 2),
            defaultValue: 0.00,
            comment: 'In milliseconds'
        },

        fastestResponseTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'In milliseconds'
        }
    }, {
        tableName: 'user_stats',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['userId'] },
            { fields: ['totalPointsEarned'] },
            { fields: ['currentRank'] },
            { fields: ['matchesWon'] },
            { fields: ['overallAccuracy'] }
        ]
    });

    return UserStats;
};