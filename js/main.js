import { Router } from './router.js';
import { CONFIG } from './config.js';
import { AuthService } from './auth.js';
import HomeView, { onMounted as HomeOnMounted } from './views/HomeView.js';
import ShopView from './views/ShopView.js';
import ProductDetailView from './views/ProductDetailView.js';
import * as CartPage from './views/CartView.js';
import * as WishlistPage from './views/WishlistView.js';
import * as CheckoutPage from './views/CheckoutView.js';
import * as OrderConfirmPage from './views/OrderConfirmationView.js';
import * as ContactPage from './views/ContactView.js';
import FeaturesView from './views/FeaturesView.js';
import BlogView from './views/BlogView.js';
import AboutView from './views/AboutView.js';
import * as SignInPage from './views/SignInView.js';
import { analytics } from './analytics.js';
import { products as localProducts } from './products.js';
import { Cart } from './cart.js';
import { Wishlist } from './wishlist.js';
import { getProducts, getProductsByCategory, searchProducts } from './api/products.js';

// Global Instances
let cart;
let wishlist;
let auth;
let products = []; // Will be loaded from Supabase

// Expose products globally
window.productsData = products;

// Global Toast 
window.showToast = (message) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    container.appendChild(toast);

    toast.offsetHeight; // force reflow
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    // --- GitHub Pages SPA 404 Redirect Handler ---
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');

    if (redirectPath) {
        let targetUrl = redirectPath;
        if (params.get('q')) {
            targetUrl += '?' + params.get('q').replace(/~and~/g, '&');
        }
        window.history.replaceState(null, null, targetUrl);
    }
    // -----------------------------------------

    // Initialize Business Logic
    cart = new Cart();
    wishlist = new Wishlist();
    auth = new AuthService();

    window.cart = cart;
    window.wishlist = wishlist;
    window.auth = auth;

    // Handle Auth UI Updates
    auth.subscribe(user => {
        const signinBtn = document.querySelector('.sign-in-btn');
        if (signinBtn) {
            if (user) {
                // If user has a name, show it, else show generic
                signinBtn.textContent = user.name || 'Account';
                signinBtn.href = '/profile'; // Placeholder
                // Override default link behavior for logout check
                signinBtn.onclick = (e) => {
                    e.preventDefault();
                    if (confirm('Log out?')) auth.logout();
                };
            } else {
                signinBtn.textContent = 'Sign In';
                signinBtn.href = '/signin';
                signinBtn.onclick = null; // Remove handler to let router handle it
            }
        }
    });

    // Routes Configuration
    const routes = [
        { path: '/', view: HomeView, name: 'home', onMounted: HomeOnMounted },
        { path: '/index.html', view: HomeView, name: 'home', onMounted: HomeOnMounted },
        { path: '/shop', view: ShopView, name: 'shop', onMounted: initShopPage },
        { path: '/features', view: FeaturesView, name: 'features' },
        { path: '/blog', view: BlogView, name: 'blog' },
        { path: '/about', view: AboutView, name: 'about' },
        { path: '/contact', view: ContactPage.view, name: 'contact', onMounted: ContactPage.onMounted },
        { path: '/signin', view: SignInPage.view, name: 'signin', onMounted: SignInPage.onMounted },
        { path: '/cart', view: CartPage.view, name: 'cart', onMounted: CartPage.onMounted },
        { path: '/checkout', view: CheckoutPage.view, name: 'checkout', onMounted: CheckoutPage.onMounted },
        { path: '/order-confirmation', view: OrderConfirmPage.view, name: 'order-confirmation', onMounted: OrderConfirmPage.onMounted },
        { path: '/wishlist', view: WishlistPage.view, name: 'wishlist', onMounted: WishlistPage.onMounted },
        { path: '/:slug/p-:id', view: ProductDetailView, name: 'pdp', onMounted: initPDP }
    ];

    // Initialize Router
    const router = new Router(routes);
    window.router = router;

    // Initialize Global UI
    initGlobalUI();

    // Mobile Menu
    initMobileMenu();
});

// --- UI Logic ---

function initGlobalUI() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// --- Page Initializers ---

async function initShopPage() {
    console.log("Shop Mounted");

    // Show loading state
    const container = document.getElementById('products-container');
    if (container) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px;"><i class="fas fa-spinner fa-spin fa-2x"></i><p style="margin-top: 16px; color: var(--text-muted);">Loading products...</p></div>';
    }

    // Fetch products from Supabase
    try {
        products = await getProducts();
        window.productsData = products; // Update global reference
        console.log(`Loaded ${products.length} products from Supabase`);
        renderProducts(products);
    } catch (error) {
        console.error('Failed to fetch products from Supabase, falling back to local:', error);
        products = localProducts;
        window.productsData = products;
        renderProducts(products);
    }

    // Category Filter
    document.querySelectorAll('.cat-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.dataset.category;

            if (cat === 'all') {
                renderProducts(products);
            } else {
                try {
                    const filtered = await getProductsByCategory(cat);
                    renderProducts(filtered);
                } catch (error) {
                    const filtered = products.filter(p => p.category === cat);
                    renderProducts(filtered);
                }
            }
        });
    });

    // Search
    const searchInput = document.getElementById('search-input-shop');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', async (e) => {
            const term = e.target.value.trim();

            // Debounce search
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                if (term.length === 0) {
                    renderProducts(products);
                } else {
                    try {
                        const results = await searchProducts(term);
                        renderProducts(results);
                    } catch (error) {
                        const filtered = products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
                        renderProducts(filtered);
                    }
                }
            }, 300);
        });
    }

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            let sorted = [...products];

            if (val === 'price-low') sorted.sort((a, b) => a.price - b.price);
            if (val === 'price-high') sorted.sort((a, b) => b.price - a.price);

            renderProducts(sorted);
        });
    }
}

function renderProducts(items) {
    const container = document.getElementById('products-container');
    if (!container) return;

    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) categoryTitle.textContent = `Showing ${items.length} products`;

    if (items.length === 0) {
        container.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-muted);">No products found.</p>';
        return;
    }

    const basePath = CONFIG.getBasePath();

    const finalHTML = items.map(product => {
        // Handle image path
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        const isWishlisted = wishlist.isInWishlist(product.id);

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

    container.innerHTML = finalHTML;
}

function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

function initPDP(params) {
    console.log("PDP Mounted", params);
    const { id } = params;

    const cleanId = id.replace('p-', '');
    const product = products.find(p => p.id === cleanId || p.id === id);

    if (product) {
        const basePath = CONFIG.getBasePath();
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        // Update main product info
        document.getElementById('pdp-image').src = imgPath;
        document.getElementById('pdp-name').textContent = product.name;
        document.getElementById('pdp-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('pdp-category').textContent = product.category;
        document.getElementById('breadcrumb-product-name').textContent = product.name;

        // Description
        const descEl = document.getElementById('pdp-desc');
        if (descEl) descEl.textContent = product.description || 'No description available.';

        // SKU
        const skuEl = document.getElementById('pdp-id');
        if (skuEl) skuEl.textContent = product.id.toUpperCase();

        // Render Color Swatches
        const colorsContainer = document.getElementById('pdp-colors');
        if (colorsContainer && product.colors) {
            colorsContainer.innerHTML = product.colors.map((color, i) => `
                <div class="swatch ${i === 0 ? 'active' : ''}" 
                     style="background-color: ${color};" 
                     data-color="${color}"
                     title="${color}">
                </div>
            `).join('');

            // Add click handlers
            colorsContainer.querySelectorAll('.swatch').forEach(swatch => {
                swatch.addEventListener('click', () => {
                    colorsContainer.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                });
            });
        }

        // Render Size Chips
        const sizesContainer = document.getElementById('pdp-sizes');
        if (sizesContainer && product.sizes) {
            sizesContainer.innerHTML = product.sizes.map((size, i) => `
                <div class="chip ${i === 0 ? 'active' : ''}" data-size="${size}">${size}</div>
            `).join('');

            // Add click handlers
            sizesContainer.querySelectorAll('.chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    sizesContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                });
            });
        }

        // Setup Add to Cart
        const addBtn = document.getElementById('pdp-add-to-cart');
        if (addBtn) {
            addBtn.onclick = () => {
                const qty = parseInt(document.getElementById('pdp-qty').value) || 1;
                cart.addItem(product.id, qty);
            };
        }

        // Qty Buttons
        const mBtn = document.getElementById('pdp-qty-minus');
        const pBtn = document.getElementById('pdp-qty-plus');
        const qInput = document.getElementById('pdp-qty');

        if (mBtn && qInput) mBtn.onclick = () => { if (qInput.value > 1) qInput.value--; };
        if (pBtn && qInput) pBtn.onclick = () => { qInput.value++; };

        // Wishlist Button
        const wishlistBtn = document.getElementById('pdp-wishlist-btn');
        if (wishlistBtn) {
            const updateWishlistBtn = () => {
                const isInWishlist = wishlist.isInWishlist(product.id);
                wishlistBtn.innerHTML = `<i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>`;
                if (isInWishlist) {
                    wishlistBtn.classList.add('active');
                } else {
                    wishlistBtn.classList.remove('active');
                }
            };

            updateWishlistBtn();

            wishlistBtn.onclick = () => {
                wishlist.toggleItem(product.id);
                updateWishlistBtn();
            };

            // Also listen for global wishlist updates
            window.addEventListener('wishlist-updated', updateWishlistBtn);
        }

        // Related Products
        renderRelatedProducts(product);

        // Analytics
        analytics.trackPageView('pdp', {
            product_name: product.name,
            product_id: product.id,
            price: product.price
        });
    }
}

function renderRelatedProducts(currentProduct) {
    const container = document.getElementById('related-products-container');
    if (!container) return;

    const basePath = CONFIG.getBasePath();

    // Get products from same category, exclude current
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        // Get random products if no same-category items
        const random = products.filter(p => p.id !== currentProduct.id).slice(0, 4);
        renderRelatedGrid(random, container, basePath);
    } else {
        renderRelatedGrid(related, container, basePath);
    }
}

function renderRelatedGrid(items, container, basePath) {
    container.innerHTML = items.map(product => {
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        const isWishlisted = wishlist.isInWishlist(product.id);

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
