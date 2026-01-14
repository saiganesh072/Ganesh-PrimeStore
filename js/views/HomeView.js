import { CONFIG } from '../config.js';
import { getProducts } from '../api/products.js';
import { products as localProducts } from '../products.js';

export default function HomeView() {
    return `
    <!-- Hero Section - Premium Luxury -->
    <section class="hero premium-hero" id="home-section">
      <div class="hero-bg">
        <img src="images/hero-luxury.png" alt="Luxury Collection">
      </div>
      <div class="container hero-content">
        <div class="hero-text">
          <div class="premium-badge">
            <span>Exclusive Collection 2025</span>
          </div>
          <h1>Discover Timeless <span class="hero-highlight">Elegance</span></h1>
          <p>Curated luxury pieces for the discerning individual. Experience the art of exceptional craftsmanship and premium quality.</p>
          <div class="hero-btns">
            <a href="/shop" class="btn-luxury" data-link>
              <i class="fas fa-gem"></i>
              Explore Collection
            </a>
            <a href="#featured" class="btn-luxury-outline">View Lookbook</a>
          </div>
          <div class="premium-stats">
            <div class="premium-stat">
              <span class="premium-stat-value">15K+</span>
              <span class="premium-stat-label">Happy Clients</span>
            </div>
            <div class="premium-stat">
              <span class="premium-stat-value">500+</span>
              <span class="premium-stat-label">Products</span>
            </div>
            <div class="premium-stat">
              <span class="premium-stat-value">4.9★</span>
              <span class="premium-stat-label">Rating</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- Categories Section - Premium -->
    <section class="categories-section premium-categories" id="categories">
        <div class="container">
            <div class="section-header text-center reveal">
                <h2>Shop by Category</h2>
                <p>Explore our curated collection of luxury essentials</p>
            </div>
            <div class="categories-grid">
                <a href="/shop" class="category-card premium-card reveal reveal-delay-1" data-link data-category="women">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop" alt="Women">
                    </div>
                    <div class="category-info">
                        <h3>Women</h3>
                        <span>Explore Collection <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>
                <a href="/shop" class="category-card premium-card reveal reveal-delay-2" data-link data-category="men">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop" alt="Men">
                    </div>
                    <div class="category-info">
                        <h3>Men</h3>
                        <span>Explore Collection <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>
                <a href="/shop" class="category-card premium-card reveal reveal-delay-3" data-link data-category="bag">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop" alt="Bags">
                    </div>
                    <div class="category-info">
                        <h3>Bags</h3>
                        <span>Explore Collection <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>
                <a href="/shop" class="category-card premium-card reveal reveal-delay-4" data-link data-category="watches">
                    <div class="category-image">
                        <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop" alt="Watches">
                    </div>
                    <div class="category-info">
                        <h3>Watches</h3>
                        <span>Explore Collection <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Trust Badges Section - Premium -->
    <section class="trust-badges premium-trust">
        <div class="container">
            <div class="trust-grid">
                <div class="trust-item reveal">
                    <div class="trust-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="trust-info">
                        <h4>Free Shipping</h4>
                        <p>On orders over $50</p>
                    </div>
                </div>
                <div class="trust-item reveal reveal-delay-1">
                    <div class="trust-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="trust-info">
                        <h4>Secure Payment</h4>
                        <p>SSL encrypted checkout</p>
                    </div>
                </div>
                <div class="trust-item reveal reveal-delay-2">
                    <div class="trust-icon">
                        <i class="fas fa-undo"></i>
                    </div>
                    <div class="trust-info">
                        <h4>Easy Returns</h4>
                        <p>30-day money back</p>
                    </div>
                </div>
                <div class="trust-item reveal reveal-delay-3">
                    <div class="trust-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <div class="trust-info">
                        <h4>24/7 Support</h4>
                        <p>Dedicated help center</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Flash Deals Section - Premium -->
    <section class="flash-deals premium-flash" id="flash-deals">
        <div class="container">
            <div class="flash-header reveal">
                <div class="flash-title">
                    <i class="fas fa-bolt"></i>
                    <h2>Limited Time Offers</h2>
                </div>
                <div class="countdown" id="countdown">
                    <div class="countdown-item">
                        <span id="countdown-hours">23</span>
                        <small>Hours</small>
                    </div>
                    <div class="countdown-item">
                        <span id="countdown-minutes">45</span>
                        <small>Min</small>
                    </div>
                    <div class="countdown-item">
                        <span id="countdown-seconds">30</span>
                        <small>Sec</small>
                    </div>
                </div>
            </div>
            <div class="flash-grid" id="flash-deals-grid">
                <!-- Flash deal products will be injected here -->
            </div>
        </div>
    </section>

    <!-- Featured Products Section - Premium -->
    <section class="featured-section premium-featured" id="featured">
        <div class="container">
            <div class="section-header reveal">
                <div class="header-left">
                    <h2>Featured Collection</h2>
                    <p>Handpicked luxury pieces just for you</p>
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

    <!-- Testimonials Section - Premium -->
    <section class="testimonials-section premium-testimonials">
        <div class="container">
            <div class="section-header text-center reveal">
                <h2>What Our Clients Say</h2>
                <p>Trusted by luxury enthusiasts worldwide</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card premium-testimonial reveal reveal-delay-1">
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">The quality exceeded my expectations. Every detail speaks of luxury and the craftsmanship is impeccable. A truly premium experience.</p>
                    <div class="testimonial-author">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah M." class="testimonial-avatar">
                        <div class="testimonial-info">
                            <h4>Sarah Mitchell</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card premium-testimonial reveal reveal-delay-2">
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">Fast shipping and white-glove service. The watch I ordered is stunning—even more beautiful in person. Highly recommend!</p>
                    <div class="testimonial-author">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James K." class="testimonial-avatar">
                        <div class="testimonial-info">
                            <h4>James Kennedy</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card premium-testimonial reveal reveal-delay-3">
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">The attention to detail is remarkable. From packaging to product, everything feels premium. This is how luxury should be.</p>
                    <div class="testimonial-author">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily R." class="testimonial-avatar">
                        <div class="testimonial-info">
                            <h4>Emily Richardson</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section - Premium -->
    <section class="features-home premium-features" id="features">
        <div class="container">
            <div class="features-grid-home">
                <div class="feature-item reveal">
                    <div class="feature-icon">
                        <i class="fas fa-gem"></i>
                    </div>
                    <h3>Premium Quality</h3>
                    <p>Only the finest materials and craftsmanship</p>
                </div>
                <div class="feature-item reveal reveal-delay-1">
                    <div class="feature-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h3>Authenticity</h3>
                    <p>100% genuine products guaranteed</p>
                </div>
                <div class="feature-item reveal reveal-delay-2">
                    <div class="feature-icon">
                        <i class="fas fa-concierge-bell"></i>
                    </div>
                    <h3>VIP Service</h3>
                    <p>Personal styling assistance available</p>
                </div>
                <div class="feature-item reveal reveal-delay-3">
                    <div class="feature-icon">
                        <i class="fas fa-gift"></i>
                    </div>
                    <h3>Luxury Packaging</h3>
                    <p>Elegant presentation for every order</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Section - Premium -->
    <section class="newsletter-section premium-newsletter">
        <div class="container">
            <div class="newsletter-content reveal">
                <div class="newsletter-text">
                    <h2>Join the Inner Circle</h2>
                    <p>Subscribe for exclusive access to new arrivals, private sales, and curated style inspiration.</p>
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

    // Countdown Timer for Flash Deals
    const updateCountdown = () => {
        const now = new Date();
        // Set end time to midnight
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const diff = endOfDay - now;

        if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const hoursEl = document.getElementById('countdown-hours');
            const minutesEl = document.getElementById('countdown-minutes');
            const secondsEl = document.getElementById('countdown-seconds');

            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }
    };

    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Render Flash Deals
    const flashGrid = document.getElementById('flash-deals-grid');
    if (flashGrid) {
        const basePath = CONFIG.getBasePath();
        let productsData = window.productsData || localProducts;

        // Create flash deals with discounts
        const flashDeals = productsData.slice(0, 4).map(product => ({
            ...product,
            originalPrice: product.price,
            salePrice: (product.price * 0.7).toFixed(2), // 30% off
            discount: 30
        }));

        flashGrid.innerHTML = flashDeals.map(product => {
            let imgPath = product.image;
            if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
                imgPath = `${basePath}/${imgPath}`;
            }

            return `
            <div class="flash-card">
                <span class="flash-badge">-${product.discount}%</span>
                <div class="flash-card-image">
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <img src="${imgPath}" alt="${product.name}">
                    </a>
                </div>
                <div class="flash-card-info">
                    <h4>${product.name}</h4>
                    <div class="flash-prices">
                        <span class="flash-price-old">$${product.originalPrice.toFixed(2)}</span>
                        <span class="flash-price-new">$${product.salePrice}</span>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    // Premium Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
};
