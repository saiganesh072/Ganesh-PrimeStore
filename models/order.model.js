module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        total_amount: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'Pending'
        }
    });

    return Order;
};
