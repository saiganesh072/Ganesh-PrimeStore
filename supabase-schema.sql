-- PrimeStore Supabase Database Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ===========================================
-- TABLES
-- ===========================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    colors TEXT[],
    sizes TEXT[],
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'confirmed',
    shipping_address JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- ===========================================
-- ROW LEVEL SECURITY
-- ===========================================

-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are public" ON products
    FOR SELECT USING (true);

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own order items
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can create own order items" ON order_items
    FOR INSERT WITH CHECK (
        order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    );

-- Users can manage their own wishlist
CREATE POLICY "Users can view own wishlist" ON wishlists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" ON wishlists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" ON wishlists
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- SEED PRODUCTS DATA
-- ===========================================

INSERT INTO products (id, name, price, image, category, description, colors, sizes, tags) VALUES
('sai0001', 'Esprit Ruffle Shirt', 16.64, 'images/product-01.jpg', 'women', 'A beautiful ruffle shirt perfect for casual outings. Made with premium cotton blend for ultimate comfort.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['casual', 'cotton', 'ruffle']),
('sai0002', 'Herschel supply', 35.31, 'images/product-02.jpg', 'women', 'Classic Herschel backpack with modern design. Perfect for work or travel with multiple compartments.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['bag', 'backpack', 'travel']),
('sai0003', 'Only Check Trouser', 25.50, 'images/product-03.jpg', 'women', 'Stylish checked trousers with a modern fit. Ideal for both office and casual wear.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['28', '30', '32', '34'], ARRAY['trouser', 'formal', 'checked']),
('sai0004', 'Classic Trench Coat', 75.00, 'images/product-04.jpg', 'women', 'Timeless trench coat in premium fabric. Water-resistant with a flattering silhouette.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['coat', 'winter', 'classic']),
('sai0005', 'Front Pocket Jumper', 34.75, 'images/product-05.jpg', 'women', 'Cozy jumper with front pocket detail. Perfect for layering in cooler weather.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['jumper', 'sweater', 'casual']),
('sai0006', 'Shirt in Stretch Cotton', 52.66, 'images/product-06.jpg', 'women', 'Professional shirt made with stretch cotton for comfort and movement throughout the day.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['shirt', 'cotton', 'formal']),
('sai0007', 'Pieces Metallic Printed', 18.96, 'images/product-07.jpg', 'women', 'Eye-catching metallic print top. Perfect for evening events and special occasions.', ARRAY['#6F6F6F', '#1E1E1E', '#B67D2E'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['casual', 'metallic', 'trendy']),
('sai0008', 'Converse All Star Hi', 39.99, 'images/product-08.jpg', 'shoes', 'Iconic Converse high-top sneakers. A timeless classic that goes with everything.', ARRAY['#000000', '#FFFFFF', '#C41E3A'], ARRAY['6', '7', '8', '9', '10', '11'], ARRAY['sneakers', 'shoes', 'casual', 'converse']),
('sai0009', 'Premium Leather Watch', 89.99, 'images/product-09.jpg', 'watches', 'Elegant leather strap watch with minimalist dial. Water-resistant up to 50m.', ARRAY['#8B4513', '#000000', '#C0C0C0'], ARRAY['One Size'], ARRAY['watch', 'leather', 'elegant', 'premium']),
('sai0010', 'Denim Jacket Classic', 59.99, 'images/product-10.jpg', 'men', 'Classic denim jacket with modern fit. Versatile piece for layering year-round.', ARRAY['#0000FF', '#000000', '#87CEEB'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['jacket', 'denim', 'classic', 'casual']),
('sai0011', 'Canvas Tote Bag', 28.50, 'images/product-11.jpg', 'bag', 'Spacious canvas tote perfect for shopping or beach days. Durable and eco-friendly.', ARRAY['#F5F5DC', '#000000', '#8B4513'], ARRAY['One Size'], ARRAY['bag', 'tote', 'canvas', 'eco-friendly']),
('sai0012', 'Slim Fit Chinos', 45.00, 'images/product-12.jpg', 'men', 'Tailored slim fit chinos in stretch cotton. Comfortable for all-day wear.', ARRAY['#D2B48C', '#808080', '#000080'], ARRAY['28', '30', '32', '34', '36'], ARRAY['chinos', 'pants', 'slim fit', 'formal']),
('sai0013', 'Floral Summer Dress', 55.00, 'images/product-13.jpg', 'women', 'Light and breezy floral dress perfect for summer. Features a flattering A-line cut.', ARRAY['#FFB6C1', '#FFFFFF', '#90EE90'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['dress', 'summer', 'floral', 'casual']),
('sai0014', 'Sports Running Shoes', 79.99, 'images/product-14.jpg', 'shoes', 'High-performance running shoes with cushioned sole. Breathable mesh upper for comfort.', ARRAY['#FF4500', '#000000', '#FFFFFF'], ARRAY['6', '7', '8', '9', '10', '11', '12'], ARRAY['shoes', 'running', 'sports', 'athletic']),
('sai0015', 'Vintage Polaroid Camera', 120.00, 'images/product-15.jpg', 'accessories', 'Retro instant camera that prints photos on the spot. Perfect for capturing memories.', ARRAY['#FFFFFF', '#000000', '#FF69B4'], ARRAY['One Size'], ARRAY['camera', 'polaroid', 'vintage', 'photography']),
('sai0016', 'Wireless Earbuds Pro', 149.99, 'images/product-16.jpg', 'accessories', 'Premium wireless earbuds with active noise cancellation. 24-hour battery life with case.', ARRAY['#FFFFFF', '#000000'], ARRAY['One Size'], ARRAY['earbuds', 'wireless', 'audio', 'tech'])
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    tags = EXCLUDED.tags;

-- Success message
SELECT 'Schema created and products seeded successfully!' AS status;
