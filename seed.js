const db = require("./models");

const categoriesData = [
    { name: "Women", description: "Women's Fashion" },
    { name: "Men", description: "Men's Fashion" },
    { name: "Bag", description: "Trendy Bags" },
    { name: "Shoes", description: "Comfortable Shoes" },
    { name: "Watches", description: "Premium Watches" },
    { name: "Electronics", description: "Gadgets and more" }, // New category
    { name: "Home & Kitchen", description: "Essentials for home" }, // New category
];

const productsData = [
    {
        title: "Esprit Ruffle Shirt",
        price: 16.64,
        image: "images/product-01.jpg",
        categoryName: "Women",
        sku: "WOM-001",
        stock: 50,
    },
    {
        title: "Herschel supply",
        price: 35.31,
        image: "images/product-02.jpg",
        categoryName: "Women",
        sku: "WOM-002",
        stock: 30,
    },
    {
        title: "Only Check Trouser",
        price: 25.50,
        image: "images/product-03.jpg",
        categoryName: "Men",
        sku: "MEN-001",
        stock: 20,
    },
    {
        title: "Classic Trench Coat",
        price: 75.00,
        image: "images/product-04.jpg",
        categoryName: "Women",
        sku: "WOM-003",
        stock: 15,
    },
    {
        title: "Front Pocket Jumper",
        price: 34.75,
        image: "images/product-05.jpg",
        categoryName: "Men",
        sku: "MEN-002",
        stock: 40,
    },
    {
        title: "Vintage Inspired Classic",
        price: 93.20,
        image: "images/product-06.jpg",
        categoryName: "Watches",
        sku: "WAT-001",
        stock: 10,
    },
    {
        title: "Shirt in Stretch Cotton",
        price: 52.66,
        image: "images/product-07.jpg",
        categoryName: "Men",
        sku: "MEN-003",
        stock: 25,
    },
    {
        title: "Pieces Metallic Printed",
        price: 18.96,
        image: "images/product-08.jpg",
        categoryName: "Bag",
        sku: "BAG-001",
        stock: 60,
    },
    {
        title: "Converse All Star",
        price: 45.00,
        image: "images/product-09.jpg",
        categoryName: "Shoes",
        sku: "SHO-001",
        stock: 35,
    },
    {
        title: "Femme T-Shirt In Stripe",
        price: 22.00,
        image: "images/product-10.jpg",
        categoryName: "Women",
        sku: "WOM-004",
        stock: 80,
    },
    {
        title: "Herschel supply",
        price: 63.15,
        image: "images/product-11.jpg",
        categoryName: "Men",
        sku: "MEN-004",
        stock: 12,
    },
    {
        title: "Herschel supply",
        price: 63.16,
        image: "images/product-12.jpg",
        categoryName: "Men",
        sku: "MEN-005",
        stock: 10
    }
];

// Function to seed
const seed = async () => {
    try {
        await db.sequelize.sync({ force: true }); // Drop tables and recreate
        console.log("Database synced!");

        // Create Categories
        const categoryMap = {};
        for (const cat of categoriesData) {
            const createdCat = await db.categories.create(cat);
            categoryMap[cat.name] = createdCat.id;
        }
        console.log("Categories seeded!");

        // Create Products
        for (const prod of productsData) {
            const catId = categoryMap[prod.categoryName];
            if (catId) {
                await db.products.create({
                    title: prod.title,
                    price: prod.price,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    image: prod.image,
                    stock: prod.stock,
                    sku: prod.sku,
                    categoryId: catId,
                });
            }
        }
        console.log("Products seeded!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seed();
