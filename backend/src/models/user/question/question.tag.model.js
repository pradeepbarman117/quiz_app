module.exports = (sequelize, DataTypes) => {
    const QuestionTag = sequelize.define('QuestionTag', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        tagId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: 'question_tags',
        timestamps: false,
        indexes: [
            { unique: true, fields: ['questionId', 'tagId'] },
            { fields: ['questionId'] },
            { fields: ['tagId'] }
        ]
    });

    return QuestionTag;
};