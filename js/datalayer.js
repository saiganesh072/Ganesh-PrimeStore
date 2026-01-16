/**
 * ============================================
 * ADOBE DATA LAYER - PrimeStore
 * ============================================
 * 
 * This module implements a standardized data layer (window.digitalData)
 * for Adobe Experience Cloud integrations (Launch, Target, Analytics, AEP).
 * 
 * ADOBE LAUNCH HOOK POINTS:
 * - Data Layer initialization: Ready on page load
 * - Event pushes: Available in digitalData.events array
 * - Real-time updates: Listen for 'digitalData:event' custom events
 * 
 * Usage:
 *   - DataLayer.setPageData({ pageName, pageType, ... })
 *   - DataLayer.setUserData({ userId, loginStatus, ... })
 *   - DataLayer.setProductData({ productId, productName, ... })
 *   - DataLayer.pushEvent('event_name', { ...payload })
 *   - DataLayer.updateCart(items, total)
 */

// ============================================
// INITIALIZE GLOBAL DATA LAYER
// ============================================
window.digitalData = window.digitalData || {
    // Page-level data - Updated on each page/view change
    page: {
        pageName: document.title || 'PrimeStore',
        pageType: 'home', // home, category, product, cart, checkout, confirmation
        siteSection: 'main',
        language: navigator.language || 'en-US',
        url: window.location.href,
        path: window.location.pathname
    },

    // User-level data - Updated on auth state changes
    user: {
        userId: '',
        loginStatus: 'guest', // guest, authenticated
        userType: 'visitor', // visitor, member, vip
        email: '' // Hashed or empty for privacy
    },

    // Product-level data - Populated on product pages
    product: {
        productId: '',
        productName: '',
        category: '',
        subcategory: '',
        price: 0,
        originalPrice: 0,
        currency: 'USD',
        stockStatus: 'in_stock', // in_stock, out_of_stock, low_stock
        brand: 'PrimeStore'
    },

    // Cart data - Updated in real-time
    cart: {
        items: [],
        itemCount: 0,
        subtotal: 0,
        currency: 'USD'
    },

    // Transaction data - Populated on purchase
    transaction: {
        transactionId: '',
        revenue: 0,
        tax: 0,
        shipping: 0,
        currency: 'USD'
    },

    // Events array - Push events here for Tag Manager scraping
    // ADOBE LAUNCH: Create rules that listen for events pushed to this array
    events: []
};

// ============================================
// DATA LAYER HELPER FUNCTIONS
// ============================================
const DataLayer = {
    /**
     * Set page-level data
     * ADOBE LAUNCH: Hook into this for page load rules
     * @param {Object} pageData - Page information
     */
    setPageData: function (pageData) {
        window.digitalData.page = {
            ...window.digitalData.page,
            ...pageData,
            url: window.location.href,
            path: window.location.pathname,
            timestamp: new Date().toISOString()
        };

        // Dispatch custom event for real-time listeners
        window.dispatchEvent(new CustomEvent('digitalData:pageUpdate', {
            detail: window.digitalData.page
        }));

        console.log('[DataLayer] Page data updated:', window.digitalData.page);
    },

    /**
     * Set user-level data
     * ADOBE LAUNCH: Hook into this for user identification
     * @param {Object} userData - User information
     */
    setUserData: function (userData) {
        window.digitalData.user = {
            ...window.digitalData.user,
            ...userData
        };

        window.dispatchEvent(new CustomEvent('digitalData:userUpdate', {
            detail: window.digitalData.user
        }));

        console.log('[DataLayer] User data updated:', window.digitalData.user);
    },

    /**
     * Set product-level data (for product detail pages)
     * ADOBE LAUNCH: Hook into this for product view tracking
     * @param {Object} productData - Product information
     */
    setProductData: function (productData) {
        window.digitalData.product = {
            ...window.digitalData.product,
            ...productData,
            currency: 'USD'
        };

        window.dispatchEvent(new CustomEvent('digitalData:productUpdate', {
            detail: window.digitalData.product
        }));

        console.log('[DataLayer] Product data updated:', window.digitalData.product);
    },

    /**
     * Update cart data
     * ADOBE LAUNCH: Hook into this for cart state tracking
     * @param {Array} items - Cart items
     * @param {Number} subtotal - Cart subtotal
     */
    updateCart: function (items, subtotal) {
        window.digitalData.cart = {
            items: items.map(item => ({
                productId: item.id,
                productName: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity
            })),
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: subtotal,
            currency: 'USD'
        };

        window.dispatchEvent(new CustomEvent('digitalData:cartUpdate', {
            detail: window.digitalData.cart
        }));

        console.log('[DataLayer] Cart updated:', window.digitalData.cart);
    },

    /**
     * Push an event to the data layer
     * ADOBE LAUNCH: Create rules that trigger on these event names
     * 
     * Supported events:
     * - product_view: User views a product detail page
     * - add_to_cart: User adds item to cart
     * - remove_from_cart: User removes item from cart
     * - checkout_start: User begins checkout process
     * - purchase_complete: User completes a purchase
     * 
     * @param {String} eventName - Name of the event
     * @param {Object} eventData - Event payload
     */
    pushEvent: function (eventName, eventData = {}) {
        const event = {
            event: eventName,
            timestamp: new Date().toISOString(),
            ...eventData
        };

        // Push to events array for Tag Manager scraping
        window.digitalData.events.push(event);

        // Dispatch custom event for real-time listeners
        // ADOBE LAUNCH: Listen for 'digitalData:event' in your rules
        window.dispatchEvent(new CustomEvent('digitalData:event', {
            detail: event
        }));

        console.log(`[DataLayer] Event pushed: ${eventName}`, event);

        return event;
    },

    // ============================================
    // PREDEFINED EVENT HELPERS
    // ============================================

    /**
     * Track product view event
     * ADOBE LAUNCH: Use for product detail page tracking
     * @param {Object} product - Product data
     */
    trackProductView: function (product) {
        this.setProductData(product);
        this.pushEvent('product_view', {
            product: {
                productId: product.productId || product.id,
                productName: product.productName || product.name,
                category: product.category,
                price: product.price,
                stockStatus: product.stockStatus || 'in_stock'
            }
        });
    },

    /**
     * Track add to cart event
     * ADOBE LAUNCH: Use for cart addition tracking
     * @param {Object} product - Product added
     * @param {Number} quantity - Quantity added
     */
    trackAddToCart: function (product, quantity = 1) {
        this.pushEvent('add_to_cart', {
            product: {
                productId: product.id,
                productName: product.name,
                category: product.category,
                price: product.price
            },
            quantity: quantity,
            cartTotal: window.digitalData.cart.subtotal
        });
    },

    /**
     * Track remove from cart event
     * ADOBE LAUNCH: Use for cart removal tracking
     * @param {String} productId - Product ID removed
     * @param {String} productName - Product name
     */
    trackRemoveFromCart: function (productId, productName) {
        this.pushEvent('remove_from_cart', {
            productId: productId,
            productName: productName
        });
    },

    /**
     * Track checkout start event
     * ADOBE LAUNCH: Use for checkout funnel tracking
     * @param {Object} cart - Cart state at checkout start
     */
    trackCheckoutStart: function (cart) {
        this.pushEvent('checkout_start', {
            cart: {
                items: cart.items,
                itemCount: cart.itemCount,
                subtotal: cart.subtotal
            }
        });
    },

    /**
     * Track purchase complete event
     * ADOBE LAUNCH: Use for conversion tracking
     * @param {Object} transaction - Transaction details
     */
    trackPurchaseComplete: function (transaction) {
        window.digitalData.transaction = {
            transactionId: transaction.transactionId || transaction.id,
            revenue: transaction.revenue || transaction.total,
            tax: transaction.tax || 0,
            shipping: transaction.shipping || 0,
            currency: 'USD',
            items: transaction.items || []
        };

        this.pushEvent('purchase_complete', {
            transaction: window.digitalData.transaction
        });
    },

    /**
     * Clear events array (useful for SPA navigation)
     */
    clearEvents: function () {
        window.digitalData.events = [];
        console.log('[DataLayer] Events cleared');
    },

    /**
     * Get current data layer state
     * Useful for debugging in console
     */
    getState: function () {
        return JSON.parse(JSON.stringify(window.digitalData));
    }
};

// Expose DataLayer globally
window.DataLayer = DataLayer;

// ============================================
// AUTO-INITIALIZATION
// ============================================
// Set initial page data on load
document.addEventListener('DOMContentLoaded', function () {
    DataLayer.setPageData({
        pageName: document.title,
        pageType: 'home'
    });

    console.log('[DataLayer] Initialized. Access via window.digitalData or window.DataLayer');
});

// Export for module usage
export { DataLayer };
