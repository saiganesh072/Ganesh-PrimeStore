/**
 * PrimeStore Data Layer
 * Simplified Adobe/Analytics data layer implementation
 */

// Ensure digitalData is initialized (fallback if inline script didn't run)
window.digitalData = window.digitalData || {
    page: {},
    user: {},
    device: {},
    product: {},
    cart: { items: [], itemCount: 0, subtotal: 0, currency: 'USD' },
    transaction: {},
    events: []
};

const DataLayer = {
    /**
     * Update page data - call on every page/route change
     */
    setPageData: function (data) {
        window.digitalData.page = {
            ...window.digitalData.page,
            ...data,
            url: window.location.href,
            path: window.location.pathname,
            hash: window.location.hash,
            queryString: window.location.search,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString()
        };

        this._dispatch('digitalData:pageUpdate', window.digitalData.page);
    },

    /**
     * Update user data - call on login/logout
     */
    setUserData: function (data) {
        window.digitalData.user = {
            ...window.digitalData.user,
            ...data,
            lastUpdated: new Date().toISOString()
        };

        this._dispatch('digitalData:userUpdate', window.digitalData.user);
    },

    /**
     * Update product data - call on product page views
     */
    setProductData: function (data) {
        window.digitalData.product = {
            productId: data.productId || data.id || '',
            productName: data.productName || data.name || '',
            category: data.category || '',
            price: data.price || 0,
            originalPrice: data.originalPrice || data.price || 0,
            currency: 'USD',
            stockStatus: data.stockStatus || 'in_stock',
            imageUrl: data.image || data.imageUrl || '',
            url: window.location.href
        };

        this._dispatch('digitalData:productUpdate', window.digitalData.product);
    },

    /**
     * Update cart data - call when cart changes
     */
    updateCart: function (items, subtotal) {
        window.digitalData.cart = {
            items: items.map(item => ({
                productId: item.id,
                productName: item.name,
                category: item.category || '',
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.image || ''
            })),
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: subtotal || 0,
            currency: 'USD'
        };

        this._dispatch('digitalData:cartUpdate', window.digitalData.cart);
    },

    /**
     * Set transaction data - call on order confirmation
     */
    setTransaction: function (data) {
        window.digitalData.transaction = {
            transactionId: data.transactionId || data.id || '',
            orderId: data.orderId || data.id || '',
            revenue: data.revenue || data.total || 0,
            tax: data.tax || 0,
            shipping: data.shipping || 0,
            currency: 'USD',
            paymentMethod: data.paymentMethod || '',
            items: data.items || []
        };

        this._dispatch('digitalData:transactionUpdate', window.digitalData.transaction);
    },

    /**
     * Push a custom event
     */
    pushEvent: function (eventName, eventData = {}) {
        const event = {
            event: eventName,
            timestamp: new Date().toISOString(),
            page: window.location.href,
            ...eventData
        };

        window.digitalData.events.push(event);
        this._dispatch('digitalData:event', event);

        return event;
    },

    // Convenience methods for common events
    trackProductView: function (product) {
        this.setProductData(product);
        this.pushEvent('product_view', { product: window.digitalData.product });
    },

    trackAddToCart: function (product, quantity = 1) {
        this.pushEvent('add_to_cart', {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: quantity
        });
    },

    trackRemoveFromCart: function (productId, productName) {
        this.pushEvent('remove_from_cart', { productId, productName });
    },

    trackCheckoutStart: function (cartData) {
        this.pushEvent('checkout_start', { cart: cartData });
    },

    trackPurchaseComplete: function (transactionData) {
        this.setTransaction(transactionData);
        this.pushEvent('purchase_complete', { transaction: window.digitalData.transaction });
    },

    // Utility methods
    clearEvents: function () {
        window.digitalData.events = [];
    },

    getState: function () {
        return JSON.parse(JSON.stringify(window.digitalData));
    },

    _dispatch: function (eventName, detail) {
        window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
};

// Expose globally
window.DataLayer = DataLayer;

// Auto-sync with auth state when auth service is ready
document.addEventListener('DOMContentLoaded', function () {
    // Update page data on load
    DataLayer.setPageData({
        pageName: document.title,
        pageType: 'home'
    });

    // Listen for auth changes to sync user data
    if (window.auth) {
        window.auth.subscribe(function (user) {
            if (user) {
                DataLayer.setUserData({
                    userId: user.id || '',
                    email: user.email || '',
                    name: user.name || '',
                    loginStatus: 'authenticated',
                    userType: 'member'
                });
            } else {
                DataLayer.setUserData({
                    userId: '',
                    email: '',
                    name: '',
                    loginStatus: 'guest',
                    userType: 'visitor'
                });
            }
        });
    }

    // Listen for cart updates
    window.addEventListener('cart-updated', function () {
        if (window.cart) {
            DataLayer.updateCart(window.cart.items, window.cart.getTotal());
        }
    });

    // Update page data on route changes (SPA navigation)
    window.addEventListener('popstate', function () {
        DataLayer.setPageData({
            url: window.location.href,
            path: window.location.pathname
        });
    });
});

export { DataLayer };
