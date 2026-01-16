import { CONFIG } from '../config.js';
import { getOrderById } from '../api/orders.js';

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

export const onMounted = async () => {
    // Get Order ID from URL
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');
    const detailsContainer = document.getElementById('order-details');

    // ADOBE LAUNCH: Set page-level data for confirmation page
    if (window.DataLayer) {
        window.DataLayer.setPageData({
            pageName: 'PrimeStore | Order Confirmation',
            pageType: 'confirmation',
            siteSection: 'checkout'
        });
    }

    if (!orderId) {
        detailsContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-muted);">No order ID found.</p>
        `;
        return;
    }

    try {
        const order = await getOrderById(orderId);
        renderOrderDetails(order, detailsContainer);

        // ADOBE LAUNCH: Track purchase_complete event
        // Hook into this for conversion tracking and revenue reporting
        if (window.DataLayer) {
            window.DataLayer.trackPurchaseComplete({
                transactionId: order.id,
                revenue: order.total,
                tax: 0,
                shipping: 0,
                items: order.order_items.map(item => ({
                    productId: item.product_id,
                    productName: item.products?.name || 'Product',
                    price: item.price,
                    quantity: item.quantity
                }))
            });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        detailsContainer.innerHTML = `
             <p style="text-align: center; color: var(--danger);">Failed to load order details. Please contact support.</p>
        `;
    }
};

function renderOrderDetails(order, container) {
    const basePath = CONFIG.getBasePath();

    container.innerHTML = `
        <div class="order-info-row">
            <span>Order ID</span>
            <strong style="font-family: monospace;">${order.id.split('-')[0]}...</strong>
        </div>
        <div class="order-info-row">
            <span>Date</span>
            <strong>${new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</strong>
        </div>
        <div class="order-info-row">
            <span>Status</span>
            <strong class="status-badge success">${order.status.toUpperCase()}</strong>
        </div>
        
        <div class="order-items-section">
            <h3>Items Ordered</h3>
            ${order.order_items.map(item => {
        // Handle nested product data if available, or fallback
        const product = item.products || { name: 'Product', image: 'images/placeholder.jpg' };
        let imgPath = product.image;
        if (imgPath && !imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }
        return `
                <div class="order-item-row">
                    <img src="${imgPath || ''}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/50'">
                    <div class="order-item-info">
                        <h4>${product.name}</h4>
                        <p>Qty: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                `;
    }).join('')}
        </div>

        <div class="order-summary-section">
            <div class="order-info-row">
                <span>Total Paid</span>
                <strong>$${order.total.toFixed(2)}</strong>
            </div>
        </div>

        <div class="shipping-info">
            <h3>Shipping To</h3>
            <p><strong>${order.shipping_address.name}</strong></p>
            <p>${order.shipping_address.email}</p>
            <p>${order.shipping_address.address}</p>
        </div>
    `;
}
