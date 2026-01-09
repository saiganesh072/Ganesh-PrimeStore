-- New Products with AI-Generated Images
-- Run this in Supabase SQL Editor to add the new products

-- Clear existing products and add new ones with AI-generated images
DELETE FROM products;

INSERT INTO products (id, name, price, image, category, description, colors, sizes, tags) VALUES
-- Men's Clothing (10 products)
('sai1001', 'Slim Fit Oxford Shirt', 59.99, 'images/products/mens_oxford_shirt.png', 'men', 'Premium white Oxford shirt in slim fit. Crisp cotton fabric with button-down collar. Perfect for business or smart casual occasions.', ARRAY['#FFFFFF', '#87CEEB', '#FFB6C1'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['formal', 'shirt', 'oxford', 'cotton']),
('sai1002', 'Classic Polo Shirt', 45.00, 'images/products/mens_polo.png', 'men', 'Premium navy blue polo with pique cotton texture. Embroidered logo detail. Timeless style for any occasion.', ARRAY['#000080', '#DC143C', '#228B22'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['casual', 'polo', 'cotton', 'classic']),
('sai1003', 'Classic Denim Jacket', 89.99, 'images/products/mens_denim_jacket.png', 'men', 'Authentic denim jacket in medium blue wash. Metal buttons and timeless design. Essential layering piece for any wardrobe.', ARRAY['#4169E1', '#000000', '#87CEEB'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['denim', 'jacket', 'casual', 'classic']),
('sai1004', 'Premium Wool Blazer', 189.00, 'images/products/mens_wool_blazer.png', 'men', 'Sophisticated charcoal gray wool blazer with two-button design. Notch lapel and fine tailoring for a refined look.', ARRAY['#2F4F4F', '#000080', '#2F2F2F'], ARRAY['38', '40', '42', '44', '46'], ARRAY['formal', 'blazer', 'wool', 'tailored']),
('sai1005', 'Slim Fit Chinos', 65.00, 'images/products/mens_chinos.png', 'men', 'Modern slim fit chinos in classic khaki. Premium cotton twill with stretch for comfort. Versatile everyday essential.', ARRAY['#D2B48C', '#2F4F4F', '#000080'], ARRAY['28', '30', '32', '34', '36'], ARRAY['pants', 'chinos', 'slim-fit', 'cotton']),
('sai1006', 'Casual Linen Shirt', 55.00, 'images/products/mens_linen_shirt.png', 'men', 'Light blue linen shirt with relaxed fit. Natural breathable fabric perfect for warm weather. Button-down collar styling.', ARRAY['#87CEEB', '#FFFFFF', '#F5F5DC'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['casual', 'linen', 'summer', 'breathable']),
('sai1007', 'Athletic Hoodie', 69.99, 'images/products/mens_hoodie.png', 'men', 'Premium heather gray athletic hoodie. Soft fleece interior with kangaroo pocket. Perfect for workouts or casual wear.', ARRAY['#808080', '#000000', '#2F4F4F'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['athletic', 'hoodie', 'casual', 'fleece']),
('sai1008', 'V-Neck Cashmere Sweater', 149.00, 'images/products/mens_cashmere_sweater.png', 'men', 'Luxurious burgundy V-neck cashmere sweater. Fine knit texture with elegant finish. The ultimate in comfort and style.', ARRAY['#800020', '#2F4F4F', '#000080'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['luxury', 'cashmere', 'knitwear', 'winter']),
('sai1009', 'Tailored Dress Pants', 95.00, 'images/products/mens_dress_pants.png', 'men', 'Elegant charcoal gray dress pants in wool blend. Tailored fit with pressed crease. Essential for the modern professional.', ARRAY['#2F4F4F', '#000000', '#2F2F2F'], ARRAY['28', '30', '32', '34', '36', '38'], ARRAY['formal', 'pants', 'tailored', 'wool']),
('sai1010', 'Bomber Jacket', 125.00, 'images/products/mens_bomber_jacket.png', 'men', 'Classic olive green bomber jacket. Ribbed cuffs and hem with front zip. Iconic military-inspired streetwear style.', ARRAY['#556B2F', '#000000', '#2F4F4F'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['jacket', 'bomber', 'streetwear', 'military']),

-- Women's Clothing (11 products)
('sai2001', 'Floral Midi Dress', 85.00, 'images/products/womens_floral_dress.png', 'women', 'Elegant pink floral midi dress with flutter sleeves. Soft flowing fabric with romantic rose pattern. Perfect for special occasions.', ARRAY['#FFB6C1', '#FFFFFF', '#98FB98'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['dress', 'floral', 'romantic', 'midi']),
('sai2002', 'Silk Blouse', 120.00, 'images/products/womens_silk_blouse.png', 'women', 'Luxurious ivory silk blouse with delicate pearl buttons. Soft drape and elegant collar. Timeless sophistication.', ARRAY['#FFFFF0', '#000000', '#FFB6C1'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['silk', 'blouse', 'luxury', 'elegant']),
('sai2003', 'High-Waist Skinny Jeans', 79.00, 'images/products/womens_skinny_jeans.png', 'women', 'Dark indigo skinny jeans with high waist fit. Premium stretch denim for comfort. Flattering silhouette for all body types.', ARRAY['#00008B', '#000000', '#87CEEB'], ARRAY['24', '26', '28', '30', '32'], ARRAY['denim', 'jeans', 'skinny', 'stretch']),
('sai2004', 'Cashmere Cardigan', 165.00, 'images/products/womens_cardigan.png', 'women', 'Soft pink cashmere cardigan with button front. Ultra-soft fine knit for luxurious comfort. Perfect layering piece.', ARRAY['#FFB6C1', '#F5F5DC', '#808080'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['cashmere', 'cardigan', 'knitwear', 'luxury']),
('sai2005', 'Pleated Maxi Skirt', 75.00, 'images/products/womens_pleated_skirt.png', 'women', 'Champagne gold pleated maxi skirt. Flowing fabric with elegant movement. Statement piece for sophisticated style.', ARRAY['#D4AF37', '#C0C0C0', '#000000'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['skirt', 'pleated', 'maxi', 'elegant']),
('sai2006', 'Cropped Blazer', 135.00, 'images/products/womens_cropped_blazer.png', 'women', 'Chic black cropped blazer with gold buttons. Fitted design with double-breasted styling. Power dressing essential.', ARRAY['#000000', '#FFFFFF', '#2F4F4F'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['blazer', 'cropped', 'formal', 'power-dressing']),
('sai2007', 'Off-Shoulder Top', 45.00, 'images/products/womens_off_shoulder_top.png', 'women', 'White cotton off-shoulder top with ruffle details. Feminine and fresh summer essential. Lightweight and breathable.', ARRAY['#FFFFFF', '#87CEEB', '#FFB6C1'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['top', 'summer', 'cotton', 'feminine']),
('sai2008', 'Wrap Dress', 95.00, 'images/products/womens_wrap_dress.png', 'women', 'Navy blue wrap dress with subtle floral print. V-neckline with tie waist. Flattering fit for any occasion.', ARRAY['#000080', '#000000', '#800020'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['dress', 'wrap', 'elegant', 'versatile']),

-- Footwear (1 product with AI image)
('sai3001', 'Classic White Sneakers', 129.00, 'images/products/white_sneakers.png', 'footwear', 'Premium white leather sneakers with minimalist design. Clean modern style with comfortable cushioned sole. Wardrobe essential.', ARRAY['#FFFFFF', '#000000', '#F5F5DC'], ARRAY['6', '7', '8', '9', '10', '11', '12'], ARRAY['sneakers', 'leather', 'minimalist', 'classic']),

-- Bags & Accessories (1 product with AI image)
('sai4001', 'Leather Tote Bag', 195.00, 'images/products/leather_tote_bag.png', 'bags', 'Premium brown leather tote bag with gold hardware. Structured design with elegant handles. Sophisticated everyday luxury.', ARRAY['#8B4513', '#000000', '#D2B48C'], ARRAY['One Size'], ARRAY['bag', 'tote', 'leather', 'luxury']),

-- Watches & Jewelry (1 product with AI image)
('sai5001', 'Minimalist Leather Watch', 159.00, 'images/products/minimalist_watch.png', 'watches', 'Elegant minimalist watch with brown leather strap. White dial with rose gold case. Timeless design for everyday wear.', ARRAY['#8B4513', '#000000', '#C0C0C0'], ARRAY['One Size'], ARRAY['watch', 'minimalist', 'leather', 'elegant'])
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    tags = EXCLUDED.tags;

SELECT 'New products with AI-generated images added successfully!' AS status;
