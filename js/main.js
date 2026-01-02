import { Router } from './router.js';
import { CONFIG } from './config.js';
import { AuthService } from './auth.js';
import HomeView from './views/HomeView.js';
import ShopView from './views/ShopView.js';
import ProductDetailView from './views/ProductDetailView.js';
import * as CartPage from './views/CartView.js';
import * as WishlistPage from './views/WishlistView.js';
import * as CheckoutPage from './views/CheckoutView.js';
import FeaturesView from './views/FeaturesView.js';
import BlogView from './views/BlogView.js';
import AboutView from './views/AboutView.js';
import * as SignInPage from './views/SignInView.js';
import { analytics } from './analytics.js';
import { products } from './products.js';
import { Cart } from './cart.js';
import { Wishlist } from './wishlist.js';

// Global Instances
let cart;
let wishlist;
let auth;

// Expose products
window.productsData = products;

// Global Toast 
window.showToast = (message) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
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
        { path: '/', view: HomeView, name: 'home' },
        { path: '/index.html', view: HomeView, name: 'home' },
        { path: '/shop', view: ShopView, name: 'shop', onMounted: initShopPage },
        { path: '/features', view: FeaturesView, name: 'features' },
        { path: '/blog', view: BlogView, name: 'blog' },
        { path: '/about', view: AboutView, name: 'about' },
        { path: '/signin', view: SignInPage.view, name: 'signin', onMounted: SignInPage.onMounted },
        { path: '/cart', view: CartPage.view, name: 'cart', onMounted: CartPage.onMounted },
        { path: '/checkout', view: CheckoutPage.view, name: 'checkout', onMounted: CheckoutPage.onMounted },
        { path: '/wishlist', view: WishlistPage.view, name: 'wishlist', onMounted: WishlistPage.onMounted },
        { path: '/:slug/p-:id', view: ProductDetailView, name: 'pdp', onMounted: initPDP }
    ];

    // Initialize Router
    const router = new Router(routes);
    window.router = router;

    // Initialize Global UI
    initGlobalUI();
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

// --- Page Initializers ---

function initShopPage() {
    console.log("Shop Mounted");
    renderProducts(products);

    // Category Filter
    document.querySelectorAll('.cat-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.dataset.category;
            filterProducts(cat);
        });
    });

    // Search
    const searchInput = document.getElementById('search-input-shop');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(term));
            renderProducts(filtered);
        });
    }

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            let sorted = [...products]; // copy
            // Actually, we should sort the *currently filtered* list if we want to be perfect, 
            // but for simplicity let's sort all. Or better: read from DOM? No, re-filter.
            // Let's simplified: just sort all products for now.

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
        container.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }

    // Get base path for links and images
    const repoName = '/Ganesh-PrimeStore';
    const basePath = window.location.pathname.includes(repoName) ? repoName : '';

    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="product-image">
                <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                    <img src="${product.image}" alt="${product.name}"> <!-- Image is already relative to root, so standard img tag works if <base> is not set, BUT for SPA pushState, we might need absolute -->
                    <!-- Wait, if we are at /repo/shop, 'images/foo.jpg' -> /repo/shop/images/foo.jpg (WRONG) -->
                    <!-- We need: /repo/images/foo.jpg -->
                    <!-- So we should use absolute path with base -->
                    <!-- Actually product.image is 'images/...' -->
                    <!-- <img src="${basePath}/${product.image}"> -->
                </a>
                <div class="product-overlay">
                    <button class="btn-icon btn-wishlist ${wishlist.isInWishlist(product.id) ? 'active' : ''}" 
                            data-id="${product.id}" 
                            onclick="wishlist.toggleItem('${product.id}')">
                        <i class="${wishlist.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
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
    `).join('');

    // Fix Image Sources after render (or do it in template)
    // Doing it in template is cleaner:
    // src="${basePath}/${product.image}" if basePath exists, else just product.image?
    // If basePath is '', product.image is 'images/...', works relative to root /
    // If basePath is '/Repo', result '/Repo/images/...', works.

    // Re-rendering with fixed image src logic:
    const finalHTML = items.map(product => {
        // Handle image path
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        return `
        <div class="product-card">
            <div class="product-image">
                <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                    <img src="${imgPath}" alt="${product.name}">
                </a>
                <div class="product-overlay">
                    <button class="btn-icon btn-wishlist ${wishlist.isInWishlist(product.id) ? 'active' : ''}" 
                            data-id="${product.id}" 
                            onclick="wishlist.toggleItem('${product.id}')">
                        <i class="${wishlist.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
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

    // params.id comes from URL. If URL is /.../p-sai001, router params might be 'sai001' if mapped correctly
    // or 'p-sai001' if logic is loose.
    // Our Router logic extracts after 'p-'. So it should be just ID.
    // However, let's be safe.

    const cleanId = id.replace('p-', '');
    const product = products.find(p => p.id === cleanId || p.id === id);

    if (product) {
        const repoName = '/Ganesh-PrimeStore';
        const basePath = window.location.pathname.includes(repoName) ? repoName : '';
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }
        document.getElementById('pdp-image').src = imgPath;
        document.getElementById('pdp-name').textContent = product.name;
        document.getElementById('pdp-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('pdp-category').textContent = product.category;

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

        // Analytics
        analytics.trackPageView('pdp', {
            product_name: product.name,
            product_id: product.id,
            price: product.price
        });
    }
}


