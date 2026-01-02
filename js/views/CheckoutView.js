import { CONFIG } from '../config.js';

export const view = () => `
    <main class="container checkout-main">
        <h1 style="margin-bottom: 2rem;">Checkout</h1>
        <div class="checkout-grid" style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem;">
            <!-- Form Section -->
            <div class="checkout-form-section">
                <div class="card" style="padding: 2rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                    <h2 style="margin-bottom: 1.5rem;">Shipping Information</h2>
                    <form id="checkout-form">
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
                            <input type="text" id="name" required placeholder="John Doe" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-main);">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                                <input type="email" id="email" required placeholder="john@example.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-main);">
                            </div>
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone</label>
                                <input type="tel" id="phone" required placeholder="+1 234 567 890" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-main);">
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Shipping Address</label>
                            <textarea id="address" required placeholder="123 Shopping St, Fashion City" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-main); min-height: 100px;"></textarea>
                        </div>
                        
                        <h2 style="margin-bottom: 1.5rem; margin-top: 2rem;">Payment Details (Mock)</h2>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Card Number</label>
                            <input type="text" value="**** **** **** 4242" disabled style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-body); color: var(--text-muted); cursor: not-allowed;">
                            <small style="color: var(--text-muted);">Use any card for this demo.</small>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block" style="width: 100%; padding: 1rem; font-size: 1.1rem; margin-top: 1rem;">Place Order</button>
                    </form>
                </div>
            </div>

            <!-- Summary Section -->
            <div class="checkout-summary-section">
                <div class="card" style="padding: 2rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color); position: sticky; top: 100px;">
                    <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                    <div id="checkout-items-list" style="margin-bottom: 1.5rem; max-height: 300px; overflow-y: auto;">
                        <!-- Items injected here -->
                    </div>
                    
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Subtotal</span>
                            <span id="checkout-subtotal">$0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Shipping</span>
                            <span class="text-success">Free</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-weight: 700; font-size: 1.2rem;">
                            <span>Total</span>
                            <span id="checkout-total">$0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
`;

export const onMounted = () => {
    const items = window.cart.items;

    // Redirect if empty
    if (items.length === 0) {
        window.showToast('Your cart is empty');
        window.router.navigateTo('/shop');
        return;
    }

    renderSummary(items);

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.disabled = true;

            // Simulate API call
            await new Promise(r => setTimeout(r, 2000));

            window.cart.clear();
            window.showToast('Order placed successfully! Redirecting...');

            setTimeout(() => {
                window.router.navigateTo('/');
            }, 1000);
        });
    }
};

function renderSummary(items) {
    const list = document.getElementById('checkout-items-list');
    const subEl = document.getElementById('checkout-subtotal');
    const totEl = document.getElementById('checkout-total');

    if (!list) return;

    const total = window.cart.getTotal();
    const basePath = CONFIG.getBasePath();

    list.innerHTML = items.map(item => {
        let imgPath = item.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }
        return `
        <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center;">
            <img src="${imgPath}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <div style="font-weight: 500; font-size: 0.9rem;">${item.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Qty: ${item.quantity}</div>
            </div>
            <div style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        `;
    }).join('');

    subEl.textContent = `$${total.toFixed(2)}`;
    totEl.textContent = `$${total.toFixed(2)}`;
}
