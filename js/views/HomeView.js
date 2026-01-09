import { CONFIG } from '../config.js';
import { getProducts } from '../api/products.js';
import { products as localProducts } from '../products.js';

export default function HomeView() {
    return `
    <!-- Hero Section -->
    <section class="hero" id="home-section">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="badge">New Collection 2024</span>
          <h1>Elevate Your Style With <span>Premium</span> Essentials</h1>
          <p>Discover our curated collection of high-quality fashion pieces designed for those who value both comfort
            and sophistication.</p>
          <div class="hero-btns">
            <a href="/shop" class="btn btn-primary" data-link>Shop Now</a>
            <a href="#features" class="btn btn-outline">Learn More</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-card">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
              alt="Hero Model">
            <div class="image-overlay"></div>
          </div>
          <div class="floating-card c1">
            <i class="fas fa-check-circle"></i>
            <div>
              <h4>Top Rated</h4>
              <p>4.9/5 Rating</p>
            </div>
          </div>
          <div class="floating-card c2">
            <i class="fas fa-truck"></i>
            <div>
              <h4>Fast Delivery</h4>
              <p>Free for orders > $50</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section" id="categories">
        <div class="container">
            <div class="section-header text-center">
                <h2>Shop by Category</h2>
                <p>Explore our diverse collection of fashion essentials</p>
            </div>
            <div class="categories-grid">
                <a href="/shop" class="category-card" data-link data-category="women">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop" alt="Women">
                    </div>
                    <div class="category-info">
                        <h3>Women</h3>
                        <span>Explore Collection</span>
                    </div>
                </a>
                <a href="/shop" class="category-card" data-link data-category="men">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop" alt="Men">
                    </div>
                    <div class="category-info">
                        <h3>Men</h3>
                        <span>Explore Collection</span>
                    </div>
                </a>
                <a href="/shop" class="category-card" data-link data-category="bag">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop" alt="Bags">
                    </div>
                    <div class="category-info">
                        <h3>Bags</h3>
                        <span>Explore Collection</span>
                    </div>
                </a>
                <a href="/shop" class="category-card" data-link data-category="watches">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop" alt="Watches">
                    </div>
                    <div class="category-info">
                        <h3>Watches</h3>
                        <span>Explore Collection</span>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-section" id="featured">
        <div class="container">
            <div class="section-header">
                <div class="header-left">
                    <h2>Featured Products</h2>
                    <p>Handpicked styles just for you</p>
                </div>
                <a href="/shop" class="btn btn-outline" data-link>View All Products</a>
            </div>
            <div class="products-grid" id="featured-products-container">
                <!-- Products will be injected here -->
                <div class="loader-container" style="position: relative; height: 200px; opacity: 1; grid-column: 1/-1;">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-home" id="features">
        <div class="container">
            <div class="features-grid-home">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <h3>Free Shipping</h3>
                    <p>Free shipping on all orders over $50</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-undo-alt"></i>
                    </div>
                    <h3>Easy Returns</h3>
                    <p>30-day hassle-free return policy</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Round the clock customer support</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Secure Payment</h3>
                    <p>100% secure payment processing</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
        <div class="container">
            <div class="newsletter-content">
                <div class="newsletter-text">
                    <h2>Stay in the Loop</h2>
                    <p>Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.</p>
                </div>
                <form class="newsletter-form-home" id="newsletter-form">
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </div>
    </section>
    `;
}

export const onMounted = async () => {
    // Render featured products
    const container = document.getElementById('featured-products-container');
    if (container) {
        // Show loading
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';

        let productsToShow = [];

        // Try to fetch from Supabase
        try {
            productsToShow = await getProducts();
            window.productsData = productsToShow; // Update global
        } catch (error) {
            console.log('Falling back to local products for home page');
            productsToShow = localProducts;
        }

        const basePath = CONFIG.getBasePath();
        // Get first 4 products as featured
        const featuredProducts = productsToShow.slice(0, 4);

        container.innerHTML = featuredProducts.map(product => {
            let imgPath = product.image;
            if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
                imgPath = `${basePath}/${imgPath}`;
            }

            const isWishlisted = window.wishlist && window.wishlist.isInWishlist(product.id);

            return `
            <div class="product-card">
                <div class="product-image">
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <img src="${imgPath}" alt="${product.name}">
                    </a>
                    <div class="product-overlay">
                        <button class="btn-icon btn-wishlist ${isWishlisted ? 'active' : ''}" 
                                data-id="${product.id}" 
                                onclick="wishlist.toggleItem('${product.id}')">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button class="btn-icon" onclick="cart.addItem('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-cat">${product.category}</p>
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
            `;
        }).join('');
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            newsletterForm.querySelector('input').value = '';
            window.showToast('Thank you for subscribing!');
        });
    }
};
