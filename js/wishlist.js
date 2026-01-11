import { products } from './products.js';
import { addToWishlist, removeFromWishlist, getUserWishlist } from './api/wishlist.js';
import { auth } from './main.js';

export class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('primestore_wishlist')) || [];
        setTimeout(() => this.notify(), 0);
    }

    async toggleItem(productId) {
        const index = this.items.findIndex(id => id === productId);
        const product = window.productsData ? window.productsData.find(p => p.id === productId) : null;
        const productName = product ? product.name : 'Item';

        if (index > -1) {
            // Remove
            this.items.splice(index, 1);
            window.showToast(`Removed ${productName} from wishlist`);

            if (auth && auth.isLoggedIn()) {
                removeFromWishlist(productId).catch(err => console.error('Wishlist sync error:', err));
            }
        } else {
            // Add
            this.items.push(productId);
            window.showToast(`Added ${productName} to wishlist`);

            if (auth && auth.isLoggedIn()) {
                addToWishlist(productId).catch(err => console.error('Wishlist sync error:', err));
            }
        }

        this.save();
        this.notify();
    }

    async removeItem(productId) {
        this.items = this.items.filter(id => id !== productId);
        this.save();
        this.notify();

        if (auth && auth.isLoggedIn()) {
            removeFromWishlist(productId).catch(err => console.error('Wishlist sync error:', err));
        }
    }

    save() {
        localStorage.setItem('primestore_wishlist', JSON.stringify(this.items));
    }

    isInWishlist(productId) {
        return this.items.includes(productId);
    }

    getCount() {
        return this.items.length;
    }

    notify() {
        // Update global counters
        const wishlistCounts = document.querySelectorAll('.wishlist-count');
        wishlistCounts.forEach(el => {
            el.textContent = this.getCount();
        });

        // Update all wishlist icons on the page immediately (optional, but good for reactivity)
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const id = btn.dataset.id;
            if (this.isInWishlist(id)) {
                btn.classList.add('active');
                const icon = btn.querySelector('i');
                if (icon) icon.className = 'fas fa-heart';
            } else {
                btn.classList.remove('active');
                const icon = btn.querySelector('i');
                if (icon) icon.className = 'far fa-heart';
            }
        });

        // Dispatch event
        window.dispatchEvent(new CustomEvent('wishlist-updated', {
            detail: {
                items: this.items,
                count: this.getCount()
            }
        }));
    }

    // Move render logic to WishlistView.js (View layer) 
    // But for now, we can keep using WishlistView to listen to events.
    renderWishlistPage() {
        // Deprecated here, should be in View.
        // But main.js calls it. We will refactor main.js to call WishlistView.onMounted
        // So we will leave this empty or remove it.
    }
}
