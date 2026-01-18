module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true
        },

        usageCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'tags',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['slug'] },
            { fields: ['usageCount'] }
        ]
    });

    return Tag;
};