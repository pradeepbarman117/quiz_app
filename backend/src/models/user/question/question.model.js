module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
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

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        createdBy: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Admin who created'
        },

        questionText: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        questionTextHindi: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Hindi translation for bilingual support'
        },

        mediaType: {
            type: DataTypes.ENUM('NONE', 'IMAGE', 'AUDIO', 'VIDEO'),
            defaultValue: 'NONE'
        },

        mediaUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        difficulty: {
            type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD'),
            defaultValue: 'EASY'
        },

        points: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 10
        },

        negativePoints: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        },

        timeLimit: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 30,
            comment: 'Seconds allowed to answer'
        },

        explanation: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        explanationHindi: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        hint: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        source: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Question source reference'
        },

        // Usage Statistics (Cached)
        timesUsed: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        timesAnsweredCorrectly: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        timesAnsweredWrongly: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        accuracyRate: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        },

        averageResponseTime: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00,
            comment: 'In milliseconds'
        },

        // Flags
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isReported: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        reportCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        // For different game modes
        usableIn1v1: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        usableInContest: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        usableInDailyQuiz: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'questions',
        timestamps: true,
        paranoid: true,
        indexes: [
            { unique: true, fields: ['uuid'] },
            { fields: ['categoryId'] },
            { fields: ['difficulty'] },
            { fields: ['isActive'] },
            { fields: ['isVerified'] },
            { fields: ['createdBy'] },
            { fields: ['timesUsed'] },
            { fields: ['accuracyRate'] },
            // Composite indexes for common queries
            { fields: ['categoryId', 'difficulty', 'isActive'] },
            { fields: ['categoryId', 'isActive', 'usableIn1v1'] },
            { fields: ['categoryId', 'isActive', 'usableInContest'] },
            { fields: ['categoryId', 'isActive', 'usableInDailyQuiz'] }
        ]
    });

    return Question;
};