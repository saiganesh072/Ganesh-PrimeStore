-- ==============================================================================
-- MIGRATION: Support for Multiple Images (Gallery)
-- ==============================================================================

-- 1. Add `images` column to store multiple image URLs (Array of Text)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS images TEXT[];

-- 2. Migrate existing data: Copy single `image` to `images` array (as the first item)
-- This ensures backward compatibility and that we don't lose existing images
UPDATE products 
SET images = ARRAY[image] 
WHERE images IS NULL AND image IS NOT NULL;

-- ==============================================================================
-- DATA INSERTION: 8 New High-Quality Products (5 Images Each)
-- ==============================================================================

-- Upsert the 8 completed products with their full image sets
INSERT INTO products (id, name, price, description, category, images, colors, sizes, tags)
VALUES
    -- 1. Women's Wide-Leg Trousers
    ('sai_w_001', 'Wide-Leg Wool Trousers', 89.00, 'Elegant camel-colored wide-leg trousers featuring a high waist and premium wool blend fabric. Perfect for sophisticated office wear or chic casual styling.', 'women', 
    ARRAY[
        'images/products/womens_wide_leg_trousers_front.png',
        'images/products/womens_wide_leg_trousers_side.png',
        'images/products/womens_wide_leg_trousers_back.png',
        'images/products/womens_wide_leg_trousers_detail.png',
        'images/products/womens_wide_leg_trousers_lifestyle.png'
    ], 
    ARRAY['#C19A6B', '#000000', '#F5F5DC'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['trousers', 'formal', 'office', 'chic']),

    -- 2. Women's Knit Sweater Dress
    ('sai_w_002', 'Ribbed Knit Sweater Dress', 75.00, 'Cozy yet elegant cream knit sweater dress. Features a ribbed texture, midi length, and a figure-hugging silhouette. Ideal for autumn and winter.', 'women', 
    ARRAY[
        'images/products/womens_knit_sweater_dress_front.png',
        'images/products/womens_knit_sweater_dress_side.png',
        'images/products/womens_knit_sweater_dress_back.png',
        'images/products/womens_knit_sweater_dress_detail.png',
        'images/products/womens_knit_sweater_dress_lifestyle.png'
    ], 
    ARRAY['#FFFDD0', '#808080', '#5F4B32'], ARRAY['S', 'M', 'L'], ARRAY['dress', 'knitwear', 'winter', 'cozy']),

    -- 3. Women's Printed A-Line Dress
    ('sai_w_003', 'Floral Print A-Line Dress', 65.00, 'Beautiful navy blue A-line dress with a vibrant floral print. Crafted from breathable cotton fabric, perfect for garden parties and summer days.', 'women', 
    ARRAY[
        'images/products/womens_printed_aline_dress_front.png',
        'images/products/womens_printed_aline_dress_side.png',
        'images/products/womens_printed_aline_dress_back.png',
        'images/products/womens_printed_aline_dress_detail.png',
        'images/products/womens_printed_aline_dress_lifestyle.png'
    ], 
    ARRAY['#000080', '#FFFFFF'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['dress', 'floral', 'summer', 'casual']),

    -- 4. Women's Denim Mini Skirt
    ('sai_w_004', 'Classic Light Wash Denim Skirt', 45.00, 'Timeless light wash denim mini skirt with a raw hem. A versatile staple for your casual wardrobe, easy to pair with tees or blouses.', 'women', 
    ARRAY[
        'images/products/womens_denim_mini_skirt_front.png',
        'images/products/womens_denim_mini_skirt_side.png',
        'images/products/womens_denim_mini_skirt_back.png',
        'images/products/womens_denim_mini_skirt_detail.png',
        'images/products/womens_denim_mini_skirt_lifestyle.png'
    ], 
    ARRAY['#ADD8E6', '#000000'], ARRAY['24', '26', '28', '30', '32'], ARRAY['skirt', 'denim', 'casual', 'streetwear']),

    -- 5. Women's Tailored Vest
    ('sai_w_005', 'Charcoal Tailored Suit Vest', 55.00, 'Sophisticated charcoal grey tailored vest. Designed for a sharp, modern silhouette. Wear it as a standalone top or layered over a shirt.', 'women', 
    ARRAY[
        'images/products/womens_tailored_vest_front.png',
        'images/products/womens_tailored_vest_side.png',
        'images/products/womens_tailored_vest_back.png',
        'images/products/womens_tailored_vest_detail.png',
        'images/products/womens_tailored_vest_lifestyle.png'
    ], 
    ARRAY['#36454F', '#000000'], ARRAY['S', 'M', 'L'], ARRAY['vest', 'formal', 'layering', 'office']),

    -- 6. Women's Satin Camisole
    ('sai_w_006', 'Luxury Silk Satin Camisole', 38.00, 'Premium champagne gold satin camisole with delicate lace trim. A silky smooth essential for layering or evening wear.', 'women', 
    ARRAY[
        'images/products/womens_satin_camisole_front.png',
        'images/products/womens_satin_camisole_side.png',
        'images/products/womens_satin_camisole_back.png',
        'images/products/womens_satin_camisole_detail.png',
        'images/products/womens_satin_camisole_lifestyle.png'
    ], 
    ARRAY['#FAD6A5', '#000000', '#FFFFFF'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['top', 'satin', 'luxury', 'evening']),

    -- 7. Women's Ruffle Hem Skirt
    ('sai_w_007', 'Flowy Ruffle Hem Midi Skirt', 52.00, 'Romantic floral print midi skirt with a cascading ruffle hem. The lightweight fabric moves beautifully with every step.', 'women', 
    ARRAY[
        'images/products/womens_ruffle_hem_skirt_front.png',
        'images/products/womens_ruffle_hem_skirt_side.png',
        'images/products/womens_ruffle_hem_skirt_back.png',
        'images/products/womens_ruffle_hem_skirt_detail.png',
        'images/products/womens_ruffle_hem_skirt_lifestyle.png'
    ], 
    ARRAY['#FFC0CB', '#FFFFFF'], ARRAY['S', 'M', 'L'], ARRAY['skirt', 'ruffle', 'feminine', 'summer']),

    -- 8. Footwear: Leather Chelsea Boots
    ('sai_f_001', 'Classic Leather Chelsea Boots', 120.00, 'Handcrafted dark brown leather Chelsea boots. Features sturdy construction, elastic side panels, and a comfortable sole for all-day wear.', 'shoes', 
    ARRAY[
        'images/products/footwear_leather_chelsea_boots_front.png',
        'images/products/footwear_leather_chelsea_boots_side.png',
        'images/products/footwear_leather_chelsea_boots_back.png',
        'images/products/footwear_leather_chelsea_boots_detail.png',
        'images/products/footwear_leather_chelsea_boots_lifestyle.png'
    ], 
    ARRAY['#4B3621', '#000000'], ARRAY['7', '8', '9', '10', '11', '12'], ARRAY['boots', 'leather', 'men', 'classic'])

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    images = EXCLUDED.images,
    category = EXCLUDED.category,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    tags = EXCLUDED.tags;

-- Set the primary 'image' column for backward compatibility (using the Front view)
UPDATE products SET image = images[1] WHERE images IS NOT NULL;
