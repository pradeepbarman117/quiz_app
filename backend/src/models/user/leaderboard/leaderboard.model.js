module.exports = (sequelize, DataTypes) => {
    const Leaderboard = sequelize.define('Leaderboard', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        leaderboardType: {
            type: DataTypes.ENUM(
                'GLOBAL',
                'WEEKLY',
                'MONTHLY',
                'CATEGORY',
                'CONTEST',
                'MATCH'
            ),
            allowNull: false
        },

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'For category-specific leaderboard'
        },

        contestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        periodStart: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'For weekly/monthly leaderboards'
        },

        periodEnd: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        rank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        previousRank: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        rankChange: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'Positive = up, Negative = down'
        },

        score: {
            type: DataTypes.BIGINT.UNSIGNED,
            defaultValue: 0
        },

        totalQuizPlayed: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalCorrectAnswers: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        accuracy: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        },

        averageResponseTime: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },

        matchesWon: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        }
    }, {
        tableName: 'leaderboards',
        timestamps: true,
        indexes: [
            { fields: ['userId'] },
            { fields: ['leaderboardType'] },
            { fields: ['categoryId'] },
            { fields: ['contestId'] },
            { fields: ['rank'] },
            { fields: ['score'] },
            { fields: ['leaderboardType', 'rank'] },
            { fields: ['leaderboardType', 'periodStart'] },
            {
                unique: true,
                name: 'idx_leaderboard_unique_user_period',
                fields: ['userId', 'leaderboardType', 'periodStart', 'categoryId', 'contestId']
            }
        ]
    });

    return Leaderboard;
};