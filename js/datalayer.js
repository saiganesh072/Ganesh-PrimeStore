/**
 * PrimeStore Data Layer
 * GA4/GTM-compatible data layer implementation
 * Uses window.dataLayer with event-based pushes
 */

// Ensure dataLayer is initialized
window.dataLayer = window.dataLayer || [];

/**
 * DataLayerManager - Comprehensive e-commerce data layer
 */
const DataLayerManager = {
    /**
     * Simple hash function for PII (SHA-256 simulation)
     * In production, use a proper crypto library
     */
    hashPII: function (value) {
        if (!value) return null;
        // Simple hash for demo - in production use SubtleCrypto
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            const char = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hashed_' + Math.abs(hash).toString(16);
    },

    /**
     * Get device information
     */
    getDeviceInfo: function () {
        const ua = navigator.userAgent;
        let deviceType = 'desktop';
        let os = 'Unknown';
        let browser = 'Unknown';

        // Device type detection
        if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
            deviceType = /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile';
        }

        // OS detection
        if (/Windows/i.test(ua)) os = 'Windows';
        else if (/Mac OS/i.test(ua)) os = 'MacOS';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/iOS|iPhone|iPad/i.test(ua)) os = 'iOS';
        else if (/Linux/i.test(ua)) os = 'Linux';

        // Browser detection
        if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) browser = 'Chrome';
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Edge/i.test(ua)) browser = 'Edge';

        return {
            deviceType: deviceType,
            os: os,
            browser: browser
        };
    },

    /**
     * Build clean object (removes null/undefined/empty values)
     */
    cleanObject: function (obj) {
        const cleaned = {};
        for (const key in obj) {
            const value = obj[key];
            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    const cleanedNested = this.cleanObject(value);
                    if (Object.keys(cleanedNested).length > 0) {
                        cleaned[key] = cleanedNested;
                    }
                } else if (Array.isArray(value) && value.length > 0) {
                    cleaned[key] = value;
                } else if (!Array.isArray(value)) {
                    cleaned[key] = value;
                }
            }
        }
        return cleaned;
    },

    /**
     * Push page data
     */
    pushPageData: function (pageType, pageName, pageCategory) {
        const pageData = this.cleanObject({
            page: {
                pageType: pageType,
                pageName: pageName,
                pageCategory: pageCategory || pageType,
                url: window.location.href,
                referrer: document.referrer || null,
                language: navigator.language?.split('-')[0] || 'en',
                country: 'US',
                currency: 'USD'
            }
        });
        window.dataLayer.push(pageData);
        return pageData;
    },

    /**
     * Push user data
     */
    pushUserData: function (user) {
        let userData;

        if (user) {
            userData = this.cleanObject({
                user: {
                    loginStatus: 'logged_in',
                    userId: user.id || user.userId,
                    userType: 'registered',
                    email: this.hashPII(user.email),
                    accountCreatedDate: user.accountCreatedDate || null,
                    loyaltyTier: user.loyaltyTier || null
                }
            });
        } else {
            userData = {
                user: {
                    loginStatus: 'logged_out',
                    userType: 'guest'
                }
            };
        }

        window.dataLayer.push(userData);
        return userData;
    },

    /**
     * Push product data for PDP
     */
    pushProductData: function (product) {
        const productData = this.cleanObject({
            product: {
                productId: product.id || product.productId,
                productName: product.name || product.productName,
                sku: product.sku || product.id || product.productId,
                brand: product.brand || 'PrimeStore',
                categoryLevel1: product.category || product.categoryLevel1,
                categoryLevel2: product.subcategory || product.categoryLevel2 || null,
                categoryLevel3: product.categoryLevel3 || null,
                description: product.description || null,
                variant: product.variant || null,
                price: product.originalPrice || product.price,
                salePrice: product.salePrice || product.price,
                currency: product.currency || 'USD',
                availability: product.stockStatus || product.availability || 'in_stock',
                rating: product.rating || null,
                reviewCount: product.reviewCount || null,
                tags: product.tags || [],
                sizes: product.sizes || [],
                colors: product.colors || [],
                image: product.image || null
            }
        });
        window.dataLayer.push(productData);
        return productData;
    },

    /**
     * Push product list data for PLP
     */
    pushProductList: function (listData) {
        const listPayload = this.cleanObject({
            productList: {
                listId: listData.listId || listData.category || 'all_products',
                listName: listData.listName || listData.categoryName || 'All Products',
                totalResults: listData.totalResults || listData.count || 0,
                currentPage: listData.currentPage || 1,
                itemsPerPage: listData.itemsPerPage || 24,
                sortBy: listData.sortBy || 'default',
                appliedFilters: listData.filters || []
            }
        });
        window.dataLayer.push(listPayload);
        return listPayload;
    },

    /**
     * Push cart data
     */
    pushCartData: function (cart) {
        const items = (cart.items || []).map(item => ({
            productId: item.id || item.productId,
            productName: item.name || item.productName,
            quantity: item.quantity,
            price: item.price
        }));

        const cartData = this.cleanObject({
            cart: {
                cartId: cart.cartId || 'CART_' + Date.now(),
                totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
                subtotal: cart.subtotal || cart.total || 0,
                discount: cart.discount || 0,
                tax: cart.tax || 0,
                shipping: cart.shipping || 0,
                totalAmount: cart.totalAmount || cart.total || 0,
                currency: 'USD',
                items: items
            }
        });
        window.dataLayer.push(cartData);
        return cartData;
    },

    /**
     * Push checkout data
     */
    pushCheckoutData: function (step, stepName, options = {}) {
        const checkoutData = this.cleanObject({
            checkout: {
                step: step,
                stepName: stepName,
                paymentMethod: options.paymentMethod || null,
                shippingMethod: options.shippingMethod || null,
                couponCode: options.couponCode || null
            }
        });
        window.dataLayer.push(checkoutData);
        return checkoutData;
    },

    /**
     * Push order/transaction data
     */
    pushOrderData: function (order) {
        const items = (order.items || order.order_items || []).map(item => ({
            productId: item.product_id || item.productId || item.id,
            productName: item.products?.name || item.productName || item.name || 'Product',
            quantity: item.quantity,
            price: item.price
        }));

        const orderData = this.cleanObject({
            order: {
                transactionId: order.id || order.transactionId,
                totalRevenue: order.total || order.totalRevenue,
                tax: order.tax || 0,
                shipping: order.shipping || 0,
                discount: order.discount || 0,
                currency: 'USD',
                paymentType: order.paymentType || order.paymentMethod || 'credit_card',
                items: items
            }
        });
        window.dataLayer.push(orderData);
        return orderData;
    },

    /**
     * Push search data
     */
    pushSearchData: function (searchTerm, resultsCount) {
        const searchData = this.cleanObject({
            search: {
                searchTerm: searchTerm,
                searchResultsCount: resultsCount,
                searchType: 'internal'
            }
        });
        window.dataLayer.push(searchData);
        return searchData;
    },

    /**
     * Push event with ecommerce data
     */
    pushEvent: function (eventName, ecommerceData = null) {
        const eventPayload = { event: eventName };

        if (ecommerceData) {
            eventPayload.ecommerce = this.cleanObject(ecommerceData);
        }

        window.dataLayer.push(eventPayload);
        return eventPayload;
    },

    /**
     * Push view_item event for PDP
     */
    pushViewItem: function (product) {
        return this.pushEvent('view_item', {
            currency: 'USD',
            value: product.salePrice || product.price,
            items: [{
                item_id: product.id || product.productId,
                item_name: product.name || product.productName,
                item_category: product.category,
                price: product.salePrice || product.price,
                quantity: 1
            }]
        });
    },

    /**
     * Push add_to_cart event
     */
    pushAddToCart: function (product, quantity = 1) {
        return this.pushEvent('add_to_cart', {
            currency: 'USD',
            value: product.price * quantity,
            items: [{
                item_id: product.id || product.productId,
                item_name: product.name || product.productName,
                item_category: product.category,
                price: product.price,
                quantity: quantity
            }]
        });
    },

    /**
     * Push remove_from_cart event
     */
    pushRemoveFromCart: function (product, quantity = 1) {
        return this.pushEvent('remove_from_cart', {
            currency: 'USD',
            value: product.price * quantity,
            items: [{
                item_id: product.id || product.productId,
                item_name: product.name || product.productName,
                item_category: product.category,
                price: product.price,
                quantity: quantity
            }]
        });
    },

    /**
     * Push begin_checkout event
     */
    pushBeginCheckout: function (cart) {
        const items = (cart.items || []).map(item => ({
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
            quantity: item.quantity
        }));

        return this.pushEvent('begin_checkout', {
            currency: 'USD',
            value: cart.total || cart.subtotal,
            items: items
        });
    },

    /**
     * Push purchase event
     */
    pushPurchase: function (order) {
        const items = (order.items || order.order_items || []).map(item => ({
            item_id: item.product_id || item.id,
            item_name: item.products?.name || item.name || 'Product',
            price: item.price,
            quantity: item.quantity
        }));

        return this.pushEvent('purchase', {
            transaction_id: order.id || order.transactionId,
            value: order.total || order.totalRevenue,
            currency: 'USD',
            tax: order.tax || 0,
            shipping: order.shipping || 0,
            items: items
        });
    },

    /**
     * Initialize with page load data
     */
    initPageLoad: function (pageType, pageName) {
        // Push device info
        window.dataLayer.push({ device: this.getDeviceInfo() });

        // Push page data
        this.pushPageData(pageType, pageName, pageType);

        // Push guest user by default (will be updated if logged in)
        this.pushUserData(null);
    }
};

// Expose globally
window.DataLayerManager = DataLayerManager;

// Legacy compatibility - map old DataLayer to new manager
window.DataLayer = {
    setPageData: function (data) {
        DataLayerManager.pushPageData(data.pageType, data.pageName, data.siteSection);
    },
    setUserData: function (data) {
        if (data.loginStatus === 'authenticated' || data.loginStatus === 'logged_in') {
            DataLayerManager.pushUserData(data);
        } else {
            DataLayerManager.pushUserData(null);
        }
    },
    setProductData: function (data) {
        DataLayerManager.pushProductData(data);
    },
    updateCart: function (items, subtotal) {
        DataLayerManager.pushCartData({ items, subtotal, total: subtotal });
    },
    trackProductView: function (product) {
        DataLayerManager.pushProductData(product);
        DataLayerManager.pushViewItem(product);
    },
    trackAddToCart: function (product, quantity) {
        DataLayerManager.pushAddToCart(product, quantity);
    },
    trackRemoveFromCart: function (productId, productName) {
        DataLayerManager.pushRemoveFromCart({ id: productId, name: productName, price: 0 });
    },
    trackCheckoutStart: function (cartData) {
        DataLayerManager.pushCartData(cartData);
        DataLayerManager.pushBeginCheckout(cartData);
    },
    trackPurchaseComplete: function (transactionData) {
        DataLayerManager.pushOrderData(transactionData);
        DataLayerManager.pushPurchase(transactionData);
    },
    pushEvent: function (eventName, eventData) {
        DataLayerManager.pushEvent(eventName, eventData);
    }
};

// Auto-sync with auth state when ready
document.addEventListener('DOMContentLoaded', function () {
    // Listen for auth changes
    if (window.auth) {
        window.auth.subscribe(function (user) {
            DataLayerManager.pushUserData(user);
        });
    }

    // Listen for cart updates
    window.addEventListener('cart-updated', function (e) {
        if (e.detail) {
            DataLayerManager.pushCartData({
                items: e.detail.items,
                total: e.detail.total,
                subtotal: e.detail.total
            });
        }
    });
});

export { DataLayerManager };
