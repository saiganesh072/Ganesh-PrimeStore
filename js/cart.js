import { products } from './products.js';

export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('primestore_cart')) || [];
        // Delay initial count update to ensure DOM is ready if called early
        setTimeout(() => this.notify(), 0);
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.save();
        this.notify();
        window.showToast(`Added ${product.name} to cart!`);

        // ADOBE LAUNCH: Track add_to_cart event
        // Hook into this event for cart addition rules
        if (window.DataLayer) {
            window.DataLayer.trackAddToCart(product, quantity);
            window.DataLayer.updateCart(this.items, this.getTotal());
        }
    }

    removeItem(productId) {
        // Get product info before removal for tracking
        const removedItem = this.items.find(item => item.id === productId);

        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.notify();

        // ADOBE LAUNCH: Track remove_from_cart event
        // Hook into this event for cart removal rules
        if (window.DataLayer && removedItem) {
            window.DataLayer.trackRemoveFromCart(productId, removedItem.name);
            window.DataLayer.updateCart(this.items, this.getTotal());
        }
    }

    updateQuantity(productId, delta) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.save();
                this.notify();
            }
        }
    }

    clear() {
        this.items = [];
        this.save();
        this.notify();
    }

    save() {
        localStorage.setItem('primestore_cart', JSON.stringify(this.items));
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Emit event for UI updates
    notify() {
        // Update global counters immediately
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(el => {
            el.textContent = this.getCount();
        });

        // Dispatch custom event for views
        window.dispatchEvent(new CustomEvent('cart-updated', {
            detail: {
                items: this.items,
                total: this.getTotal(),
                count: this.getCount()
            }
        }));
    }
}
