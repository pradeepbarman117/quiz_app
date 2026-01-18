module.exports = (sequelize, DataTypes) => {
    const QuestionOption = sequelize.define('QuestionOption', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        optionText: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        optionTextHindi: {
            type: DataTypes.STRING(500),
            allowNull: true
        },

        mediaUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'For image-based options'
        },

        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        displayOrder: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: '0=A, 1=B, 2=C, 3=D'
        },

        // Statistics
        timesSelected: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        selectionPercentage: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        }
    }, {
        tableName: 'question_options',
        timestamps: false,
        indexes: [
            { fields: ['questionId'] },
            { fields: ['questionId', 'displayOrder'] },
            { fields: ['questionId', 'isCorrect'] }
        ]
    });

    return QuestionOption;
};