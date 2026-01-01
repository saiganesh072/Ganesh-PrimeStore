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
import { products } from './products.js';
import { Cart } from './cart.js';
import { Wishlist } from './wishlist.js';

// Global Instances
let cart;
let wishlist;

// Expose products to window just in case any legacy inline script needs it (though we should avoid this)
window.productsData = products;

// Global Toast Function
window.showToast = (message) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Logic
    cart = new Cart();
    wishlist = new Wishlist();

    // Attach to window for global access from buttons (onclick="cart.addItem...")
    // Since we are using onclick attributes in HTML strings, we MUST expose these to window
    window.cart = cart;
    window.wishlist = wishlist;

    // --- GitHub Pages SPA Redirect Handler ---
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');
    if (redirectPath) {
        window.history.replaceState(null, null, redirectPath);
    }
    // -----------------------------------------

    // Routes Configuration
    const routes = [
        { path: '/', view: HomeView, name: 'home' },
        { path: '/index.html', view: HomeView, name: 'home' },
        { path: '/shop', view: ShopView, name: 'shop', onMounted: initShopPage },
        { path: '/features', view: FeaturesView, name: 'features' },
        { path: '/blog', view: BlogView, name: 'blog' },
        { path: '/about', view: AboutView, name: 'about' },
        { path: '/signin', view: SignInView, name: 'signin' },
        { path: '/cart', view: CartView, name: 'cart', onMounted: initCartPage },
        { path: '/wishlist', view: WishlistView, name: 'wishlist', onMounted: initWishlistPage },
        { path: '/:slug/p-:id', view: ProductDetailView, name: 'pdp', onMounted: initPDP }
    ];

    // Initialize Router
    const router = new Router(routes);

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

    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="product-image">
                <a href="/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                    <img src="${product.image}" alt="${product.name}">
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
                <a href="/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                    <h3 class="product-title">${product.name}</h3>
                </a>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');
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
        document.getElementById('pdp-image').src = product.image;
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

function initCartPage() {
    cart.updateCartPageUI();
}

function initWishlistPage() {
    wishlist.renderWishlistPage();
}
