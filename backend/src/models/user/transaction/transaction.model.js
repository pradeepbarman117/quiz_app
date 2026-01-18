module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
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

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        walletId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(
                'CREDIT',
                'DEBIT'
            ),
            allowNull: false
        },

        category: {
            type: DataTypes.ENUM(
                'MATCH_WIN',
                'CONTEST_WIN',
                'DAILY_QUIZ_REWARD',
                'REFERRAL_BONUS',
                'SIGNUP_BONUS',
                'ENTRY_FEE',
                'WITHDRAWAL',
                'PURCHASE',
                'REFUND',
                'ADMIN_ADJUSTMENT'
            ),
            allowNull: false
        },

        currencyType: {
            type: DataTypes.ENUM('COINS', 'POINTS', 'GEMS'),
            defaultValue: 'COINS'
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        balanceBefore: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        balanceAfter: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        referenceType: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: 'Match, Contest, DailyQuiz, etc.'
        },

        referenceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        metadata: {
            type: DataTypes.JSON,
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED'),
            defaultValue: 'COMPLETED'
        }
    }, {
        tableName: 'transactions',
        timestamps: true,
        indexes: [
            { fields: ['uuid'] },
            { fields: ['userId'] },
            { fields: ['walletId'] },
            { fields: ['type'] },
            { fields: ['category'] },
            { fields: ['status'] },
            { fields: ['createdAt'] },
            { fields: ['userId', 'category'] },
            { fields: ['referenceType', 'referenceId'] }
        ]
    });

    return Transaction;
};