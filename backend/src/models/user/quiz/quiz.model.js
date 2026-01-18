module.exports = (sequelize, DataTypes) => {
    const DailyQuiz = sequelize.define('DailyQuiz', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        quizDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true
        },

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Null for mixed category'
        },

        status: {
            type: DataTypes.ENUM('DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED'),
            defaultValue: 'DRAFT'
        },

        difficulty: {
            type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD', 'MIXED'),
            defaultValue: 'MIXED'
        },

        totalQuestions: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 10
        },

        pointsPerQuestion: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 10
        },

        totalPoints: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 100
        },

        minimumPointsForReward: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 70,
            comment: 'Min points to earn reward'
        },

        rewardCoins: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 50,
            comment: 'Coins reward for qualifying'
        },

        bonusRewardCoins: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 100,
            comment: 'For perfect score'
        },

        timeLimit: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 300,
            comment: 'Total time in seconds'
        },

        perQuestionTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 30,
            comment: 'Seconds per question'
        },

        questionIds: {
            type: DataTypes.JSON,
            allowNull: true
        },

        totalAttempts: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        startsAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        endsAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        createdBy: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'daily_quizzes',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['uuid'] },
            { unique: true, fields: ['quizDate'] },
            { fields: ['status'] },
            { fields: ['startsAt'] },
            { fields: ['quizDate', 'status'] }
        ]
    });

    return DailyQuiz;
};