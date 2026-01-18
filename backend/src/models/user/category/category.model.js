module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        parentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: 'For subcategories'
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        iconUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        coverImageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        colorCode: {
            type: DataTypes.STRING(7),
            allowNull: true,
            comment: 'Hex color code for UI'
        },

        displayOrder: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        totalQuestions: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: 'Cached count for performance'
        },

        isPopular: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'categories',
        timestamps: true,
        paranoid: true,
        indexes: [
            { unique: true, fields: ['slug'] },
            { fields: ['parentId'] },
            { fields: ['isActive'] },
            { fields: ['isFeatured'] },
            { fields: ['displayOrder'] },
            { fields: ['isActive', 'displayOrder'] }
        ]
    });

    return Category;
};