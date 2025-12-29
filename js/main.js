// Utility: Show Toast
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Products
function renderProducts(filterCategory = 'all', sortType = 'default', searchQuery = '') {
    const container = document.getElementById('products-container');
    const categoryTitle = document.getElementById('category-title');

    let filtered = filterCategory === 'all'
        ? [...products]
        : products.filter(p => p.category === filterCategory);

    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (sortType === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    categoryTitle.textContent = searchQuery
        ? `Search results for "${searchQuery}"`
        : `Showing ${filterCategory} products`;

    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="btn-icon" onclick="openProductModal('${product.id}')" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="cart.addItem('${product.id}')" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-cat">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
    }
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <div class="product-detail-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <span class="badge">${product.category}</span>
            <h2>${product.name}</h2>
            <p class="detail-price">$${product.price.toFixed(2)}</p>
            <p class="detail-desc">${product.description}</p>
            <div class="detail-actions">
                <div class="form-group" style="width: 120px; margin-bottom: 20px;">
                    <label>Quantity</label>
                    <input type="number" id="modal-qty" value="1" min="1" class="custom-select">
                </div>
                <button class="btn btn-primary btn-block" onclick="addToCartFromModal('${product.id}')">
                    Add To Cart
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function addToCartFromModal(productId) {
    const qty = parseInt(document.getElementById('modal-qty').value);
    cart.addItem(productId, qty);
    document.getElementById('product-modal').classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
    }, 1000);

    // Initial Render
    renderProducts();

    // Navigation Category Clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderProducts(link.dataset.category);

            // Scroll to products if on hero
            if (link.dataset.category !== 'all' || window.scrollY < 400) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cart Toggle
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    });

    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    });

    // Modal Close
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        renderProducts('all', 'default', e.target.value);
    });

    // Sort
    document.getElementById('sort-select').addEventListener('change', (e) => {
        renderProducts('all', e.target.value);
    });

    // Checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');

    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length === 0) {
            showToast("Your cart is empty!");
            return;
        }

        // Prepare checkout summary
        const summaryItems = document.getElementById('checkout-items');
        summaryItems.innerHTML = cart.items.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}" width="50">
                <div class="si-info">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        document.getElementById('checkout-subtotal').textContent = `$${cart.getTotal().toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${cart.getTotal().toFixed(2)}`;

        checkoutModal.classList.add('active');
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Order placed successfully! Thank you for shopping.");
        cart.clear();
        checkoutModal.classList.remove('active');
    });
});
