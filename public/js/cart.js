/**
 * Cart Logic
 * Handles adding/removing items, persistence, and UI updates.
 */

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
        this.init();
    }

    init() {
        // Dispatch initial update
        this.updateUI();
    }

    add(product) {
        if (!product) return;

        const existingItem = this.items.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }

        this.save();
        this.updateUI();

        // Trigger Event for Data Layer
        const event = new CustomEvent('cartUpdated', { detail: { action: 'add', product: product, cart: this.items } });
        window.dispatchEvent(event);

        // Show simple notification
        if (typeof swal !== 'undefined') {
            swal(product.name, "is added to cart !", "success");
        }
    }

    remove(productId) {
        const product = this.items.find(item => item.id === productId);
        this.items = this.items.filter((item) => item.id !== productId);
        this.save();
        this.updateUI();

        const event = new CustomEvent('cartUpdated', { detail: { action: 'remove', productId: productId, product: product, cart: this.items } });
        window.dispatchEvent(event);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.remove(productId);
            } else {
                this.save();
                this.updateUI();
            }
        }
    }

    save() {
        localStorage.setItem("cartItems", JSON.stringify(this.items));
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateUI() {
        // Update badge count
        const icons = document.querySelectorAll('.js-show-cart');
        icons.forEach(icon => {
            icon.setAttribute('data-notify', this.getCount());
        });

        // Update Sidebar Cart HTML
        this.renderSidebarCart();

        // Update Page Cart HTML
        this.renderPageCart();
    }

    renderSidebarCart() {
        const cartContainer = document.querySelector('.header-cart-wrapitem');
        if (cartContainer) {
            cartContainer.innerHTML = '';

            if (this.items.length === 0) {
                cartContainer.innerHTML = '<li class="header-cart-item flex-w flex-t m-b-12">Your cart is empty.</li>';
            } else {
                this.items.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'header-cart-item flex-w flex-t m-b-12';
                    li.innerHTML = `
                  <div class="header-cart-item-img" onclick="cart.remove('${item.id}')">
                    <img src="${item.image}" alt="IMG">
                  </div>
        
                  <div class="header-cart-item-txt p-t-8">
                    <a href="product-detail.html?id=${item.id}" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                      ${item.name}
                    </a>
        
                    <span class="header-cart-item-info">
                      ${item.quantity} x $${item.price.toFixed(2)}
                    </span>
                  </div>
                `;
                    cartContainer.appendChild(li);
                });
            }

            // Update Total Text
            const totalEl = document.querySelector('.header-cart-total');
            if (totalEl) {
                totalEl.innerText = 'Total: $' + this.getTotal();
            }
        }
    }

    renderPageCart() {
        const cartTable = document.querySelector('.table-shopping-cart');
        if (!cartTable) return;

        const rows = cartTable.querySelectorAll('.table_row');
        rows.forEach(row => row.remove());

        if (this.items.length === 0) {
            const row = document.createElement('tr');
            row.className = 'table_row';
            row.innerHTML = '<td colspan="5" class="text-center p-t-30 p-b-30">Your cart is empty.</td>';
            cartTable.appendChild(row);
        } else {
            this.items.forEach(item => {
                const row = document.createElement('tr');
                row.className = 'table_row';
                row.innerHTML = `
                    <td class="column-1">
                        <div class="how-itemcart1" onclick="cart.remove('${item.id}')">
                            <img src="${item.image}" alt="IMG">
                        </div>
                    </td>
                    <td class="column-2">${item.name}</td>
                    <td class="column-3">$${item.price.toFixed(2)}</td>
                    <td class="column-4">
                        <div class="wrap-num-product flex-w m-l-auto m-r-0">
                            <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="fs-16 zmdi zmdi-minus"></i>
                            </div>

                            <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value="${item.quantity}" readonly>

                            <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="fs-16 zmdi zmdi-plus"></i>
                            </div>
                        </div>
                    </td>
                    <td class="column-5">$${(item.price * item.quantity).toFixed(2)}</td>
                `;
                cartTable.appendChild(row);
            });
        }

        const totalElements = document.querySelectorAll('.mtext-110');
        totalElements.forEach(el => {
            el.innerText = '$' + this.getTotal();
        });
    }

    checkout() {
        if (this.items.length === 0) {
            if (typeof swal !== 'undefined') swal("Cart is empty", "Please add items before checking out.", "warning");
            else alert("Cart is empty");
            return;
        }

        // Track Checkout Start
        if (window.dl && window.dl.trackCheckoutStart) {
            window.dl.trackCheckoutStart(this.items);
        }

        const currentItems = [...this.items];
        const total = this.getTotal();
        const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);

        // Simulate Success
        if (typeof swal !== 'undefined') {
            swal("Order Placed!", "Thank you for your purchase. Order ID: " + orderId, "success")
                .then(() => {
                    this.finalizePurchase(orderId, currentItems, total);
                });
        } else {
            if (confirm("Order Placed! Order ID: " + orderId + "\nClick OK to continue.")) {
                this.finalizePurchase(orderId, currentItems, total);
            }
        }
    }

    finalizePurchase(orderId, items, total) {
        // Track Purchase
        if (window.dl && window.dl.trackPurchase) {
            window.dl.trackPurchase(orderId, items, total);
        }

        // Clear Cart
        this.items = [];
        this.save();
        this.updateUI();
    }
}

window.cart = new Cart();
