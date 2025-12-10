const Sequelize = require('sequelize');
const path = require('path');

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'database.sqlite'),
        logging: false
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.orderItems = require("./order-item.model.js")(sequelize, Sequelize);

// Relations
db.categories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.categories, {
    foreignKey: "categoryId",
    as: "category",
});

db.orders.hasMany(db.orderItems, { as: "items" });
db.orderItems.belongsTo(db.orders, {
    foreignKey: "orderId",
    as: "order",
});

db.products.hasMany(db.orderItems, { as: "orderItems" });
db.orderItems.belongsTo(db.products, {
    foreignKey: "productId",
    as: "product",
});

module.exports = db;
