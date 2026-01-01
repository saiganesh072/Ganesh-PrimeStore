import { Router } from './router.js';
import HomeView from './views/HomeView.js';
import ShopView from './views/ShopView.js';
import ProductDetailView from './views/ProductDetailView.js';
import CartView from './views/CartView.js';
import WishlistView from './views/WishlistView.js';
import FeaturesView from './views/FeaturesView.js';
import BlogView from './views/BlogView.js';
import AboutView from './views/AboutView.js';
import SignInView from './views/SignInView.js';
import { analytics } from './analytics.js';

// Global State (can be moved to a State Manager later)
window.appState = {
    cart: [],
    wishlist: []
};

document.addEventListener('DOMContentLoaded', () => {

    // --- GitHub Pages SPA Redirect Handler ---
    // If we were redirected from 404.html with a query param 'p', restore the path
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');
    if (redirectPath) {
        window.history.replaceState(null, null, redirectPath);
    }
    // -----------------------------------------

    // Routes Configuration
    const routes = [
        { path: '/', view: HomeView, name: 'home' },
        { path: '/index.html', view: HomeView, name: 'home' }, // Handle excess
        { path: '/shop', view: ShopView, name: 'shop', onMounted: initShopPage },
        // /product-slug/p-id  -> We will simplify matching logic in Router or use this pattern
        // My simple router uses :param. Let's align with the requested requirement:
        // [domain]/[product-slug]/p-[unique-id]
        // The router regex needs to match this. 
        // Let's simpler route handling first: "/product/:slug/p-:id"
        // If user REALLY wants exactly "domain/shirt/p-123", I'd need a catch-all or smarter regex.
        // For this implementation, I will use a clearer pattern that is easier to manage:
        // /product/:id  (Classic) or /:slug/p-:id (Advanced)
        // I will implement the requested format in the Router config by using a regex path if possible, 
        // or just use a generic matcher for PDP.
        // Let's try to match the requested format: "/:slug/p-:id" 
        // But ":slug" would match "shop", "about" etc. 
        // So I should put specific routes FIRST.

        { path: '/features', view: FeaturesView, name: 'features' },
        { path: '/blog', view: BlogView, name: 'blog' },
        { path: '/about', view: AboutView, name: 'about' },
        { path: '/signin', view: SignInView, name: 'signin' },
        { path: '/cart', view: CartView, name: 'cart', onMounted: initCartPage },
        { path: '/wishlist', view: WishlistView, name: 'wishlist', onMounted: initWishlistPage },

        // PDP Route: Catch-all style for slug, but ending in p-:id
        // Since my router is simple, I might need to make it smarter.
        // I will use a specific prefix to avoid collision for now, OR rely on specific order.
        // However, the prompt asked for: `[domain]/[product-slug]/p-[unique-id]`
        // This is tricky because "features" looks like a slug.
        // I will add the PDP route LAST.
        // Pattern: /(.+)/p-(.+) -> but Router checks exact match.
        // I'll update Router regex in a moment. For now, let's assume Router can handle /:slug/p-:id
        { path: '/:slug/p-:id', view: ProductDetailView, name: 'pdp', onMounted: initPDP }
    ];

    // Initialize Router
    const router = new Router(routes);

    // Initialize Global UI (Loader, sticky nav, etc from original main.js)
    initGlobalUI();
});

// --- Legacy Function Ports (kept for logic reuse) ---

function initGlobalUI() {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update Counts (Mock)
    updateCounts();
}

function updateCounts() {
    // In a real app, read from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    document.querySelectorAll('.cart-count').forEach(el => el.textContent = savedCart.length);
    document.querySelectorAll('.wishlist-count').forEach(el => el.textContent = savedWishlist.length);
}

// Page Specific Initializers (called by Router onMount)

function initShopPage() {
    console.log("Shop Mounted");
    // Re-bind category filters, search, sort
    // Import logic from products.js or inline it here
    // For now, trigger a global event or call a global function if products.js is globally loaded
    if (window.renderProducts) {
        window.renderProducts(window.productsData || []);

        // Category Filter
        document.querySelectorAll('.cat-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                const cat = e.target.dataset.category;
                window.filterProducts(cat);
            });
        });
    }
}

function initPDP(params) {
    console.log("PDP Mounted", params);
    const { id } = params;
    // Fetch product by ID (from window.productsData)
    if (window.productsData) {
        const product = window.productsData.find(p => p.id === id || p.id === `p-${id}` || p.id === params.id); // Check ID format

        if (product) {
            document.getElementById('pdp-image').src = product.image;
            document.getElementById('pdp-name').textContent = product.name;
            document.getElementById('pdp-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('pdp-category').textContent = product.category;
            // document.getElementById('pdp-id').textContent = product.id; // Already set by view

            // Analytic Push
            analytics.trackPageView('pdp', {
                product_name: product.name,
                product_id: product.id,
                price: product.price,
                currency: 'USD',
                category: product.category,
                stock_status: 'In Stock'
            });
        }
    }
}

function initCartPage() {
    if (window.updateCartPageUI) {
        window.updateCartPageUI();
    }
}

function initWishlistPage() {
    if (window.renderWishlist) {
        window.renderWishlist();
    }
}
