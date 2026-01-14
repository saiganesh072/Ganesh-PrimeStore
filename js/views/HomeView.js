import { CONFIG } from '../config.js';
import { getProducts } from '../api/products.js';
import { products as localProducts } from '../products.js';

export default function HomeView() {
    return `
    <!-- Hero Carousel Section -->
    <section class="hero" id="home-section">
      <div class="container hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <i class="fas fa-sparkles"></i>
            <span>New Collection 2024</span>
          </div>
          <h1>Elevate Your Style With <span>Premium</span> Essentials</h1>
          <p>Discover our curated collection of high-quality fashion pieces designed for those who value both comfort and sophistication.</p>
          <div class="hero-btns">
            <a href="/shop" class="btn btn-primary btn-lg" data-link>
              <i class="fas fa-shopping-bag"></i>
              Shop Now
            </a>
            <a href="#features" class="btn btn-outline btn-lg">Learn More</a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-value">15K+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">500+</span>
              <span class="stat-label">Products</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">4.9</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div class="hero-carousel" id="hero-carousel">
          <div class="carousel-container">
            <div class="carousel-slide active">
              <div class="image-card">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" alt="Fashion Collection">
              </div>
            </div>
            <div class="carousel-slide">
              <div class="image-card">
                <img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1000&auto=format&fit=crop" alt="New Arrivals">
              </div>
            </div>
            <div class="carousel-slide">
              <div class="image-card">
                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop" alt="Premium Quality">
              </div>
            </div>
          </div>
          <div class="carousel-dots">
            <button class="dot active" data-slide="0"></button>
            <button class="dot" data-slide="1"></button>
            <button class="dot" data-slide="2"></button>
          </div>
          <div class="floating-card c1">
            <i class="fas fa-star"></i>
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

        // Try to fetch from Supabase with timeout
        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Fetch timeout')), 5000)
            );
            productsToShow = await Promise.race([getProducts(), timeoutPromise]);
            window.productsData = productsToShow; // Update global
        } catch (error) {
            console.log('Falling back to local products for home page:', error.message);
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

    // Hero Carousel
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        let currentSlide = 0;
        let autoRotate;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        };

        // Auto-rotate every 5 seconds
        autoRotate = setInterval(nextSlide, 5000);

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoRotate);
                showSlide(index);
                autoRotate = setInterval(nextSlide, 5000);
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextSlide, 5000);
        });
    }
};
