// Order Management Module
// Stores and retrieves orders from localStorage

export class OrderManager {
    constructor() {
        this.storageKey = 'primestore_orders';
    }

    createOrder(cartItems, customerInfo) {
        const order = {
            id: 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase(),
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            shipping: 0, // Free shipping
            tax: 0,
            total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            customer: {
                name: customerInfo.name || 'Guest',
                email: customerInfo.email || '',
                phone: customerInfo.phone || '',
                address: customerInfo.address || ''
            },
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            paymentMethod: 'Mock Payment'
        };

        // Save to orders list
        const orders = this.getOrders();
        orders.unshift(order); // Add to beginning
        localStorage.setItem(this.storageKey, JSON.stringify(orders));

        // Also save as "last order" for easy access on confirmation page
        localStorage.setItem('primestore_last_order', JSON.stringify(order));

        return order;
    }

    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch {
            return [];
        }
    }

    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(o => o.id === orderId) || null;
    }

    getLastOrder() {
        try {
            return JSON.parse(localStorage.getItem('primestore_last_order')) || null;
        } catch {
            return null;
        }
    }

    clearLastOrder() {
        localStorage.removeItem('primestore_last_order');
    }
}

// Singleton instance
export const orderManager = new OrderManager();
