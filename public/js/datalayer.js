/**
 * Data Layer Implementation
 * Tracks e-commerce events and pushes them to window.adobeDataLayer (and window.digitalData for legacy support).
 */

window.adobeDataLayer = window.adobeDataLayer || [];
window.digitalData = window.digitalData || {};

const DataLayer = {
    init() {
        // Page View
        this.pushEvent('pageView', {
            page: {
                name: document.title,
                url: window.location.href,
                path: window.location.pathname
            }
        });

        // Initialize Cart Listener
        window.addEventListener('cartUpdated', (e) => {
            this.handleCartEvent(e.detail);
        });
    },

    pushEvent(eventName, data) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            ...data
        };

        window.adobeDataLayer.push(eventData);
        // Also update legacy digitalData object if needed
        if (eventName === 'pageView') {
            window.digitalData.page = data.page;
        }

        console.log('DataLayer Event:', eventData);
    },

    handleCartEvent(detail) {
        if (detail.action === 'add') {
            this.trackAddToCart(detail.product);
        } else if (detail.action === 'remove') {
            this.trackRemoveFromCart(detail.product || { id: detail.productId }); // detail.product might be missing on remove
        }
    },

    trackAddToCart(product) {
        this.pushEvent('addToCart', {
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: 1
            }
        });
    },

    trackRemoveFromCart(product) {
        this.pushEvent('removeFromCart', {
            product: {
                id: product.id
            }
        });
    },

    trackCheckoutStart(cartItems) {
        this.pushEvent('checkoutStart', {
            cart: {
                items: cartItems,
                total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            }
        });
    },

    trackPurchase(orderId, cartItems, total) {
        this.pushEvent('purchase', {
            transaction: {
                id: orderId,
                total: total,
                currency: 'USD'
            },
            cart: {
                items: cartItems
            }
        });
    }
};

// Initialize
DataLayer.init();

// Expose globally
window.dl = DataLayer;
