export default function ShopView() {
    return `
    <!-- Sub Navigation (Shop Categories) -->
    <div class="sub-navbar">
        <div class="container">
            <div class="category-links">
                <a href="#" class="cat-link active" data-category="all">All Products</a>
                <a href="#" class="cat-link" data-category="women">Women</a>
                <a href="#" class="cat-link" data-category="men">Men</a>
                <a href="#" class="cat-link" data-category="bag">Bag</a>
                <a href="#" class="cat-link" data-category="shoes">Shoes</a>
                <a href="#" class="cat-link" data-category="watches">Watches</a>
            </div>
        </div>
    </div>

    <main class="shop-main">
        <!-- Product Listing -->
        <section class="products-section" id="products">
            <div class="container">
                <div class="section-header">
                    <div class="header-left">
                        <h2>Our Collection</h2>
                        <p id="category-title">Showing all products</p>
                    </div>
                    <div class="filter-controls">
                        <div class="search-box-shop">
                            <input type="text" id="search-input-shop" placeholder="Search products...">
                            <i class="fas fa-search"></i>
                        </div>
                        <select id="sort-select" class="custom-select">
                            <option value="default">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

                <div class="products-grid" id="products-container">
                    <!-- Products will be injected here by JS -->
                </div>
            </div>
        </section>
    </main>
    `;
}
