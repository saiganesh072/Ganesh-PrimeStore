module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        sku: {
            type: Sequelize.STRING,
            unique: true
        },
        image: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        tags: {
            type: Sequelize.STRING // Comma separated tags
        }
    });

    return Product;
};
