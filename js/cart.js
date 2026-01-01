class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('primestore_cart')) || [];
        this.updateCartCount();
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
        this.updateCartCount();
        showToast(`Added ${product.name} to cart!`);

        // Instead of sidebar, we can redirect or just update count
        // Redirecting to cart page is a good option if user wants to see it
        // window.location.href = 'cart.html'; 
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateCartCount();
        if (document.getElementById('cart-list-container')) {
            this.updateCartPageUI();
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
                this.updateCartCount();
                if (window.location.pathname.includes('cart.html')) {
                    this.updateCartPageUI();
                }
            }
        }
    }

    clear() {
        this.items = [];
        this.save();
        this.updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            this.updateCartPageUI();
        }
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

    updateCartCount() {
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(el => {
            el.textContent = this.getCount();
        });
    }

    updateCartPageUI() {
        const cartListContainer = document.getElementById('cart-list-container');
        const itemsCountEl = document.getElementById('cart-items-count');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');

        if (!cartListContainer) return;

        itemsCountEl.textContent = this.getCount();

        if (this.items.length === 0) {
            cartListContainer.innerHTML = `
                <div class="empty-cart-msg">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html#products" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
        } else {
            cartListContainer.innerHTML = this.items.map(item => `
                <div class="cart-page-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="item-controls">
                            <div class="qty-input" style="height: 40px; width: 120px;">
                                <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', -1)">-</button>
                                <input type="number" value="${item.quantity}" readonly>
                                <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="cart.removeItem('${item.id}')" style="margin-left: 20px;">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                    </div>
                    <div class="item-subtotal" style="font-weight: 700; font-size: 20px;">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            `).join('');
        }

        const total = this.getTotal();
        subtotalEl.textContent = `$${total.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

const cart = new Cart();
