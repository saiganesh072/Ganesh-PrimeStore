class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('primestore_wishlist')) || [];
        this.updateUI();
    }

    toggleItem(productId) {
        const index = this.items.findIndex(id => id === productId);
        const product = products.find(p => p.id === productId);

        if (index > -1) {
            this.items.splice(index, 1);
            showToast(`Removed ${product ? product.name : 'item'} from wishlist`);
        } else {
            this.items.push(productId);
            showToast(`Added ${product ? product.name : 'item'} to wishlist`);
        }

        this.save();
        this.updateUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(id => id !== productId);
        this.save();
        this.updateUI();
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

    updateUI() {
        const wishlistCounts = document.querySelectorAll('.wishlist-count');
        wishlistCounts.forEach(el => {
            el.textContent = this.getCount();
        });

        // Update wishlist page if visible
        const container = document.getElementById('wishlist-container');
        if (container) {
            this.renderWishlistPage();
        }

        // Update all wishlist icons on the page
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const id = btn.dataset.id;
            if (this.isInWishlist(id)) {
                btn.classList.add('active');
                btn.querySelector('i').className = 'fas fa-heart';
            } else {
                btn.classList.remove('active');
                btn.querySelector('i').className = 'far fa-heart';
            }
        });
    }

    renderWishlistPage() {
        const container = document.getElementById('wishlist-container');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="empty-wishlist">
                    <i class="far fa-heart"></i>
                    <h2>Your wishlist is empty</h2>
                    <p>Browser our products and add your favorites to the list!</p>
                    <a href="shop.html" class="btn btn-primary">Go to Shop</a>
                </div>
            `;
            return;
        }

        const wishlistProducts = products.filter(p => this.items.includes(p.id));

        container.innerHTML = `
            <div class="products-grid">
                ${wishlistProducts.map(product => `
                    <div class="product-card">
                        <div class="product-image">
                            <a href="product-detail.html?id=${product.id}">
                                <img src="${product.image}" alt="${product.name}">
                            </a>
                            <div class="product-overlay">
                                <button class="btn-icon btn-wishlist active" data-id="${product.id}" onclick="wishlist.toggleItem('${product.id}')">
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button class="btn-icon" onclick="cart.addItem('${product.id}')">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                        <div class="product-info">
                            <p class="product-cat">${product.category}</p>
                            <a href="product-detail.html?id=${product.id}">
                                <h3 class="product-title">${product.name}</h3>
                            </a>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

const wishlist = new Wishlist();
