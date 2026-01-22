import { CONFIG } from '../config.js';

export const view = () => `
    <main class="container cart-main">
        <div class="cart-title-section">
            <h1>Shopping Cart</h1>
            <p><span id="cart-items-count">0</span> items in your cart</p>
        </div>

        <div class="cart-content-grid">
            <div class="cart-items-list" id="cart-list-container">
                <!-- Cart items injected here -->
                <div class="loader-container" style="position: relative; height: 200px; opacity: 1;">
                    <div class="loader"></div>
                </div>
            </div>

            <div class="order-summary-card">
                <h3>Order Summary</h3>
                <div class="summary-details">
                    <div class="summary-line">
                        <span>Subtotal</span>
                        <span id="cart-subtotal">$0.00</span>
                    </div>
                    <div class="summary-line">
                        <span>Shipping</span>
                        <span class="text-success">Free</span>
                    </div>
                    <div class="summary-line">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total</span>
                        <span id="cart-total">$0.00</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block" id="checkout-btn">Proceed to Checkout</button>
                <a href="/shop" data-link class="btn btn-outline btn-block mt-10">Continue Shopping</a>
            </div>
        </div>
    </main>
`;

export const onMounted = () => {
    const listContainer = document.getElementById('cart-list-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    // DATA LAYER: Push page and cart data for cart page
    if (window.DataLayerManager) {
        window.DataLayerManager.pushPageData('cart', 'PrimeStore | Cart', 'cart');
        window.DataLayerManager.pushCartData({
            items: window.cart.items,
            subtotal: window.cart.getTotal(),
            total: window.cart.getTotal()
        });
    }

    // Initial Render
    renderCart(window.cart.items);

    // Listen for updates
    window.addEventListener('cart-updated', (e) => {
        renderCart(e.detail.items);
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (window.cart.getCount() === 0) {
                window.showToast("Your cart is empty!");
                return;
            }
            // Proceed to mock checkout
            // Since we don't have a specific checkout route yet, we can create one or show a modal.
            // The prompt asked for "Checkout Flow". 
            // I'll create a simple Checkout View later. For now, alert or placeholder.
            window.router.navigateTo('/checkout');
        });
    }
};

function renderCart(items) {
    const listContainer = document.getElementById('cart-list-container');
    const countEl = document.getElementById('cart-items-count');
    const subEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (!listContainer) return;

    // Calculate totals
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    // Update summary text
    if (countEl) countEl.textContent = count;
    if (subEl) subEl.textContent = `$${total.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Render Items
    if (items.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <a href="/shop" data-link class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    const basePath = CONFIG.getBasePath();

    listContainer.innerHTML = items.map(item => {
        let imgPath = item.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        return `
        <div class="cart-page-item">
            <img src="${imgPath}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="item-controls">
                    <div class="qty-input" style="height: 40px; width: 120px;">
                        <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', -1)">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="cart.removeItem('${item.id}')" style="margin-left: 20px;">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
            </div>
            <div class="item-subtotal" style="font-weight: 700; font-size: 20px;">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `}).join('');
}
