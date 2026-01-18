module.exports = (sequelize, DataTypes) => {
    const Contest = sequelize.define('Contest', {
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

        slug: {
            type: DataTypes.STRING(220),
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        bannerUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        contestType: {
            type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'SPECIAL'),
            defaultValue: 'WEEKLY'
        },

        status: {
            type: DataTypes.ENUM(
                'DRAFT',
                'SCHEDULED',
                'REGISTRATION_OPEN',
                'REGISTRATION_CLOSED',
                'LIVE',
                'COMPLETED',
                'CANCELLED'
            ),
            defaultValue: 'DRAFT'
        },

        difficulty: {
            type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD', 'MIXED'),
            defaultValue: 'MIXED'
        },

        totalQuestions: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 20
        },

        duration: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: 'Total time in minutes'
        },

        perQuestionTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'Time per question in seconds'
        },

        // Participation
        minParticipants: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 2
        },

        maxParticipants: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1000
        },

        currentParticipants: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        // Fees & Prizes
        entryFee: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        totalPrizePool: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        firstPrize: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        secondPrize: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        thirdPrize: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        prizeDistribution: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Custom prize distribution [{rank: 1, prize: 1000}, ...]'
        },

        // Timing
        registrationStartsAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        registrationEndsAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        startsAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        endsAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        resultDeclaredAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        // Settings
        questionIds: {
            type: DataTypes.JSON,
            allowNull: true
        },

        shuffleQuestions: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        shuffleOptions: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        showLeaderboardLive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        allowLateEntry: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        lateEntryWindowMinutes: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 5
        },

        isPublic: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        tableName: 'contests',
        timestamps: true,
        paranoid: true,
        indexes: [
            { unique: true, fields: ['uuid'] },
            { unique: true, fields: ['slug'] },
            { fields: ['categoryId'] },
            { fields: ['contestType'] },
            { fields: ['status'] },
            { fields: ['startsAt'] },
            { fields: ['isActive', 'status'] },
            { fields: ['startsAt', 'status'] }
        ]
    });

    return Contest;
};