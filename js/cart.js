class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('primestore_cart')) || [];
        this.updateUI();
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
        this.updateUI();
        showToast(`Added ${product.name} to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    }

    updateQuantity(productId, delta) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.save();
                this.updateUI();
            }
        }
    }

    clear() {
        this.items = [];
        this.save();
        this.updateUI();
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

    updateUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartContainer = document.getElementById('cart-items-container');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');

        if (cartCount) cartCount.textContent = this.getCount();

        if (cartContainer) {
            if (this.items.length === 0) {
                cartContainer.innerHTML = `
                    <div class="empty-cart-msg">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Your cart is empty</p>
                        <button class="btn btn-primary" id="continue-shopping-btn">Start Shopping</button>
                    </div>
                `;
                document.getElementById('continue-shopping-btn').addEventListener('click', () => {
                    document.getElementById('cart-sidebar').classList.remove('open');
                    document.getElementById('cart-overlay').classList.remove('open');
                });
            } else {
                cartContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p class="item-price">$${item.price.toFixed(2)}</p>
                            <div class="item-controls">
                                <div class="qty-selector">
                                    <button class="qty-btn minus" onclick="cart.updateQuantity('${item.id}', -1)">-</button>
                                    <span class="qty-val">${item.quantity}</span>
                                    <button class="qty-btn plus" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                                </div>
                                <button class="remove-item" onclick="cart.removeItem('${item.id}')">
                                    <i class="fas fa-trash-alt"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        const total = this.getTotal();
        if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

const cart = new Cart();
