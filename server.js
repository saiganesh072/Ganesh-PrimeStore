require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key_ganesh_store', // Change in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
// const indexRoutes = require('./routes/index');
// const productRoutes = require('./routes/products');
// const authRoutes = require('./routes/auth');

// app.use('/', indexRoutes);
// app.use('/products', productRoutes);
// app.use('/auth', authRoutes);

app.get('/', async (req, res) => {
    try {
        const products = await db.products.findAll({
            include: [{
                model: db.categories,
                as: 'category'
            }]
        });
        res.render('index', { title: 'Home', page: 'home', products: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.render('index', { title: 'Home', page: 'home', products: [] });
    }
});

// Shop Route
app.get('/shop', async (req, res) => {
    try {
        const products = await db.products.findAll({
            include: [{
                model: db.categories,
                as: 'category'
            }]
        });
        res.render('shop', { title: 'Shop', page: 'shop', products: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.render('shop', { title: 'Shop', page: 'shop', products: [] });
    }
});

// Product Detail Route
app.get('/products/:id', async (req, res) => {
    try {
        const product = await db.products.findByPk(req.params.id, {
            include: [{
                model: db.categories,
                as: 'category'
            }]
        });
        if (product) {
            res.render('product-detail', { title: product.title, page: 'shop', product: product });
        } else {
            res.status(404).render('index', { title: 'Not Found', page: 'home', products: [] }); // Or a proper 404 page
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Server Error");
    }
});

// Cart Route
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    res.render('cart', { title: 'Cart', page: 'shop', cart: cart, total: total });
});

// Add to Cart Route
app.post('/cart/add', async (req, res) => {
    const { productId, quantity } = req.body;

    // Initialize cart if not exists
    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        const product = await db.products.findByPk(productId);

        if (product) {
            const existingItemIndex = req.session.cart.findIndex(item => item.id == productId);

            if (existingItemIndex > -1) {
                req.session.cart[existingItemIndex].quantity += parseInt(quantity);
            } else {
                req.session.cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: parseInt(quantity)
                });
            }
            req.session.save(() => {
                res.redirect('/cart');
            });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Checkout Route (GET)
app.get('/checkout', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    res.render('checkout', { title: 'Checkout', page: 'shop', cart: cart, total: total });
});

// Checkout Route (POST) - Place Order
app.post('/checkout', async (req, res) => {
    const { name, address, email, phone } = req.body;
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect('/cart');
    }

    try {
        // Calculate Total safely
        const total_amount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);

        // Create Order
        const order = await db.orders.create({
            name,
            address,
            email,
            phone,
            total_amount,
            status: 'Confirmed'
        });

        // Create Order Items
        for (const item of cart) {
            await db.orderItems.create({
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            });
        }

        // Clear Cart
        req.session.cart = [];

        // Redirect to Confirmation
        res.redirect(`/order-confirmation/${order.id}`);

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).send("Error placing order");
    }
});

// Order Confirmation Route
app.get('/order-confirmation/:id', async (req, res) => {
    try {
        const order = await db.orders.findByPk(req.params.id, {
            include: [{
                model: db.orderItems,
                as: 'items',
                include: [{
                    model: db.products,
                    as: 'product'
                }]
            }]
        });

        if (order) {
            res.render('order-confirmation', { title: 'Order Confirmed', page: 'shop', order: order });
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).send("Server Error");
    }
});

// Database Sync (Wait for DB config)
const db = require('./models');
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
