module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.FLOAT
        }
    });

    return OrderItem;
};
