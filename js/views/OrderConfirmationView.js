import { CONFIG } from '../config.js';
import { getOrderById } from '../api/orders.js';

export const view = () => `
    <main class="container order-confirm-main">
        <div class="order-confirm-card">
            <div class="order-success-icon" style="display: flex; justify-content: center; margin-bottom: 24px;">
                <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <style>
                        .box-group {
                            transform-origin: 100px 140px;
                            animation: dropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                                       shrinkOut 0.5s cubic-bezier(0.5, 0, 0.2, 1) 2.2s forwards;
                        }
                        .flap-l {
                            transform-origin: 40px 105px;
                            animation: foldLeft 0.5s ease-in-out 1s forwards;
                        }
                        .flap-r {
                            transform-origin: 160px 105px;
                            animation: foldRight 0.5s ease-in-out 1.2s forwards;
                        }
                        .tape {
                            opacity: 0;
                            transform-origin: 100px 105px;
                            animation: sealTape 0.3s ease-in 1.6s forwards;
                        }
                        .check {
                            opacity: 0;
                            stroke-dasharray: 120;
                            stroke-dashoffset: 120;
                            animation: popCheck 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2.4s forwards;
                        }
                        @keyframes dropIn {
                            0% { transform: translateY(-100px) scale(0.5); opacity: 0; }
                            100% { transform: translateY(0) scale(1); opacity: 1; }
                        }
                        @keyframes foldLeft {
                            0% { transform: rotateY(180deg) skewY(20deg); }
                            100% { transform: rotateY(0deg) skewY(0deg); }
                        }
                        @keyframes foldRight {
                            0% { transform: rotateY(-180deg) skewY(-20deg); }
                            100% { transform: rotateY(0deg) skewY(0deg); }
                        }
                        @keyframes sealTape {
                            0% { opacity: 0; transform: scaleX(0); }
                            100% { opacity: 1; transform: scaleX(1); }
                        }
                        @keyframes shrinkOut {
                            0% { transform: scale(1); opacity: 1; }
                            100% { transform: scale(0); opacity: 0; }
                        }
                        @keyframes popCheck {
                            0% { opacity: 1; stroke-dashoffset: 120; }
                            100% { opacity: 1; stroke-dashoffset: 0; }
                        }
                    </style>
                    <g class="box-group">
                        <!-- Back inside walls -->
                        <polygon points="100,70 160,105 100,140 40,105" fill="#C5AA92"/>
                        <polygon points="100,70 100,140 40,105" fill="#B39880"/>
                        
                        <!-- Front Left Face -->
                        <polygon points="40,105 100,140 100,180 40,145" fill="#E2C7AF"/>
                        <!-- Front Right Face -->
                        <polygon points="100,140 160,105 160,145 100,180" fill="#D1B69E"/>

                        <!-- Left Flap correctly overlapping center -->
                        <polygon class="flap-l" points="40,105 100,70 115,80 55,115" fill="#F0D8C3"/>
                        <!-- Right Flap correctly overlapping center -->
                        <polygon class="flap-r" points="160,105 100,70 85,80 145,115" fill="#E8CDB4"/>

                        <!-- Tape -->
                        <polygon class="tape" points="75,100 125,71 135,76 85,105" fill="#E5E7EB" opacity="0.9"/>
                    </g>
                    <!-- Checkmark -->
                    <path class="check" d="M 65,105 L 90,130 L 145,70" stroke="#FF8C00" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h1 style="text-align: center;">Order Confirmed!</h1>
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

    // DATA LAYER: Push page data for order confirmation
    if (window.DataLayerManager) {
        window.DataLayerManager.pushPageData('thank_you', 'PrimeStore | Order Confirmation', 'checkout');
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

        // DATA LAYER: Push order data and purchase event
        if (window.DataLayerManager) {
            // Push order/transaction data
            window.DataLayerManager.pushOrderData({
                id: order.id,
                total: order.total,
                totalRevenue: order.total,
                tax: 0,
                shipping: 0,
                items: order.order_items
            });

            // Push purchase event
            window.DataLayerManager.pushPurchase({
                id: order.id,
                transactionId: order.id,
                total: order.total,
                totalRevenue: order.total,
                items: order.order_items
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
