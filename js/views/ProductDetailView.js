export default function ProductDetailView(params) {
    return `
    <main class="container pdp-main">
        <div class="breadcrumb">
            <a href="/" data-link>Home</a> <i class="fas fa-chevron-right"></i>
            <a href="/shop" data-link>Shop</a> <i class="fas fa-chevron-right"></i>
            <span id="breadcrumb-product-name">Product</span>
        </div>

        <div class="pdp-grid" id="pdp-content">
            <div class="pdp-image-section">
                <div class="main-image-card">
                    <img id="pdp-image" src="" alt="">
                </div>
                <!-- Gallery Thumbnails -->
                <div class="pdp-thumbnails" id="pdp-thumbnails">
                    <!-- Thumbnails injected here -->
                </div>
            </div>
            <div class="pdp-info-section">
                <span class="badge" id="pdp-category">Category</span>
                <h1 id="pdp-name">Product Name</h1>
                <div class="pdp-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>(120 Reviews)</span>
                </div>
                <p class="pdp-price" id="pdp-price">$0.00</p>
                <p class="pdp-desc" id="pdp-desc">Description goes here...</p>

                <div class="pdp-options">
                    <div class="option-group">
                        <label>Color</label>
                        <div class="color-swatches" id="pdp-colors">
                            <!-- Color swatches injected here -->
                        </div>
                    </div>
                    <div class="option-group">
                        <label>Size</label>
                        <div class="size-chips" id="pdp-sizes">
                            <!-- Size chips injected here -->
                        </div>
                    </div>
                </div>

                <div class="pdp-actions">
                    <div class="qty-input">
                        <button class="qty-btn" id="pdp-qty-minus">-</button>
                        <input type="number" id="pdp-qty" value="1" min="1" readonly>
                        <button class="qty-btn" id="pdp-qty-plus">+</button>
                    </div>
                    <button class="btn btn-primary btn-lg" id="pdp-add-to-cart">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-wishlist-pdp" id="pdp-wishlist-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>

                <div class="pdp-meta">
                    <p><strong>SKU:</strong> <span id="pdp-id">${params.id || 'PROD-001'}</span></p>
                    <p><strong>Availability:</strong> <span class="text-success">In Stock</span></p>
                </div>
            </div>
        </div>

        <div class="related-products">
            <h2>Related Products</h2>
            <div class="products-grid" id="related-products-container">
                <!-- Related products -->
            </div>
        </div>
    </main>
    `;
}
