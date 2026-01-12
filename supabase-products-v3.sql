-- ==============================================================================
-- INSERT 3 New Footwear Products with Full Image Galleries
-- ==============================================================================

INSERT INTO products (id, name, price, description, category, images, colors, sizes, tags)
VALUES
    -- 1. Running Athletic Shoes (4/5 images - missing detail for now)
    ('sai_f_002', 'High-Performance Running Shoes', 95.00, 'Professional-grade running shoes with advanced cushioning technology. Features breathable mesh upper and responsive midsole for maximum performance.', 'shoes', 
    ARRAY[
        'images/products/footwear_running_shoes_front.png',
        'images/products/footwear_running_shoes_side.png',
        'images/products/footwear_running_shoes_back.png',
        'images/products/footwear_running_shoes_lifestyle.png'
    ], 
    ARRAY['#00BFFF', '#FF8C00', '#000000'], ARRAY['7', '8', '9', '10', '11', '12'], ARRAY['shoes', 'running', 'athletic', 'performance']),

    -- 2. Stiletto Heels
    ('sai_f_003', 'Classic Black Stiletto Heels', 110.00, 'Timeless black patent leather stiletto heels. Features a pointed toe and ultra-high heel for elegant evening wear. Red sole accent.', 'shoes', 
    ARRAY[
        'images/products/footwear_stiletto_heels_front.png',
        'images/products/footwear_stiletto_heels_side.png',
        'images/products/footwear_stiletto_heels_back.png',
        'images/products/footwear_stiletto_heels_detail.png',
        'images/products/footwear_stiletto_heels_lifestyle.png'
    ], 
    ARRAY['#000000', '#8B0000'], ARRAY['6', '7', '8', '9', '10'], ARRAY['heels', 'stiletto', 'formal', 'luxury']),

    -- 3. Canvas Slip-On Shoes
    ('sai_f_004', 'Casual Canvas Slip-Ons', 48.00, 'Comfortable canvas slip-on shoes perfect for everyday wear. Features elastic side panels for easy on/off and a cushioned insole.', 'shoes', 
    ARRAY[
        'images/products/footwear_canvas_slip_ons_front.png',
        'images/products/footwear_canvas_slip_ons_side.png',
        'images/products/footwear_canvas_slip_ons_back.png',
        'images/products/footwear_canvas_slip_ons_detail.png',
        'images/products/footwear_canvas_slip_ons_lifestyle.png'
    ], 
    ARRAY['#D3D3D3', '#000000', '#F5F5DC'], ARRAY['7', '8', '9', '10', '11', '12'], ARRAY['shoes', 'casual', 'canvas', 'slip-on']),

    -- 4. Hiking Boots
    ('sai_f_005', 'Rugged Outdoor Hiking Boots', 135.00, 'Durable hiking boots built for tough terrain. Features waterproof leather construction, ankle support, and aggressive tread pattern for superior grip.', 'shoes', 
    ARRAY[
        'images/products/footwear_hiking_boots_front.png',
        'images/products/footwear_hiking_boots_side.png',
        'images/products/footwear_hiking_boots_back.png',
        'images/products/footwear_hiking_boots_detail.png'
    ], 
    ARRAY['#D2691E', '#8B4513'], ARRAY['7', '8', '9', '10', '11', '12', '13'], ARRAY['boots', 'hiking', 'outdoor', 'waterproof'])

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    images = EXCLUDED.images,
    category = EXCLUDED.category,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    tags = EXCLUDED.tags;

-- Update primary image column for backward compatibility
UPDATE products SET image = images[1] WHERE id IN ('sai_f_002', 'sai_f_003', 'sai_f_004', 'sai_f_005');

SELECT 'Successfully inserted/updated 4 footwear products!' AS status;
