/**
 * Analytics Data Layer Manager
 * Handles initializing and updating window.dataLayer for Google Tag Manager or other analytics tools.
 */
class Analytics {
    constructor() {
        this.initDataLayer();
    }

    /**
     * Initialize the global dataLayer object if it doesn't exist.
     */
    initDataLayer() {
        window.dataLayer = window.dataLayer || [];
        this.pushGenericInfo();
    }

    /**
     * Pushes generic information present on every page view.
     */
    pushGenericInfo() {
        const genericInfo = {
            event: 'common_data',
            timestamp: new Date().toISOString(),
            site_version: '1.0.0',
            page_type: 'unknown' // Will be updated by specific page views
        };
        this.push(genericInfo);
    }

    /**
     * Set User Information.
     * Call this after login or when user session is restored.
     * @param {Object} user - User object containing id, email, type, etc.
     */
    setUserInfo(user) {
        // In a real app, hash the email. For now, we'll assume it's passed or mock it.
        const userInfo = {
            user_id: user.id || null,
            login_status: user.isLoggedIn ? 'logged_in' : 'guest',
            user_email_hashed: user.emailHashed || null, // placeholder
            user_type: user.type || 'guest'
        };
        this.push({ user: userInfo });
    }

    /**
     * Track a Page View.
     * @param {string} pageName - Name of the page (e.g., 'home', 'pdp', 'blog')
     * @param {Object} context - Additional context specific to the page
     */
    trackPageView(pageName, context = {}) {
        const pageData = {
            event: 'page_view',
            page_type: pageName,
            ...context
        };
        this.push(pageData);
    }

    /**
     * Track a specific event (e.g., add_to_cart, purchase).
     * @param {string} eventName 
     * @param {Object} data 
     */
    trackEvent(eventName, data = {}) {
        this.push({
            event: eventName,
            ...data
        });
    }

    /**
     * Helper to push to dataLayer safely.
     * @param {Object} data 
     */
    push(data) {
        window.dataLayer.push(data);
        console.log('Analytics Push:', data); // For debugging
    }
}

// Export a singleton instance
export const analytics = new Analytics();
