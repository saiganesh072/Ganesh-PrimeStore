import { CONFIG } from '../config.js';
import { orderManager } from '../orders.js';

export const view = () => `
    <main class="container order-confirm-main">
        <div class="order-confirm-card">
            <div class="order-success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h1>Order Confirmed!</h1>
            <p class="order-thank-you">Thank you for your purchase. Your order has been placed successfully.</p>
            
            <div class="order-details-box" id="order-details">
                <!-- Order details injected here -->
                <div class="loader-container" style="position: relative; height: 100px; opacity: 1;">
                    <div class="loader"></div>
                </div>
            </div>

            <div class="order-actions">
                <a href="/shop" class="btn btn-primary" data-link>Continue Shopping</a>
                <a href="/" class="btn btn-outline" data-link>Back to Home</a>
            </div>
        </div>
    </main>
`;

export const onMounted = () => {
    const order = orderManager.getLastOrder();
    const detailsContainer = document.getElementById('order-details');

    if (!order) {
        detailsContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-muted);">No order details found.</p>
        `;
        return;
    }

    const basePath = CONFIG.getBasePath();

    detailsContainer.innerHTML = `
        <div class="order-info-row">
            <span>Order ID</span>
            <strong>${order.id}</strong>
        </div>
        <div class="order-info-row">
            <span>Date</span>
            <strong>${new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</strong>
        </div>
        <div class="order-info-row">
            <span>Status</span>
            <strong class="status-badge">${order.status.toUpperCase()}</strong>
        </div>
        
        <div class="order-items-section">
            <h3>Items Ordered</h3>
            ${order.items.map(item => {
        let imgPath = item.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }
        return `
                <div class="order-item-row">
                    <img src="${imgPath}" alt="${item.name}">
                    <div class="order-item-info">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                `;
    }).join('')}
        </div>

        <div class="order-summary-section">
            <div class="order-info-row">
                <span>Subtotal</span>
                <span>$${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="order-info-row">
                <span>Shipping</span>
                <span class="text-success">Free</span>
            </div>
            <div class="order-info-row total">
                <span>Total Paid</span>
                <strong>$${order.total.toFixed(2)}</strong>
            </div>
        </div>

        <div class="shipping-info">
            <h3>Shipping To</h3>
            <p><strong>${order.customer.name}</strong></p>
            <p>${order.customer.email}</p>
            <p>${order.customer.address}</p>
        </div>
    `;
};
