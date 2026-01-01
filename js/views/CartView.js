export default function CartView() {
    return `
    <main class="container cart-main">
        <div class="cart-title-section">
            <h1>Shopping Cart</h1>
            <p><span id="cart-items-count">0</span> items in your cart</p>
        </div>

        <div class="cart-content-grid">
            <div class="cart-items-list" id="cart-list-container">
                <!-- Cart items injected here -->
            </div>

            <div class="order-summary-card">
                <h3>Order Summary</h3>
                <div class="summary-details">
                    <div class="summary-line">
                        <span>Subtotal</span>
                        <span id="cart-subtotal">$0.00</span>
                    </div>
                    <div class="summary-line">
                        <span>Shipping</span>
                        <span class="text-success">Free</span>
                    </div>
                    <div class="summary-line">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total</span>
                        <span id="cart-total">$0.00</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block" id="checkout-btn">Proceed to Checkout</button>
                <a href="/shop" data-link class="btn btn-outline btn-block mt-10">Continue Shopping</a>
            </div>
        </div>
    </main>
    
    <!-- Checkout Modal is handled globally or re-injected here -->
    <!-- For simplicity, we can keep the modal logic global or in main.js, 
         but ideally it should be here. I'll include the modal markup here for now. -->
    <div class="modal" id="checkout-modal">
        <div class="modal-content checkout-content">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <div class="checkout-grid">
                <div class="checkout-form">
                    <h3>Shipping Information</h3>
                    <form id="checkout-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" required placeholder="John Doe">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" required placeholder="john@example.com">
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="tel" required placeholder="+1 234 567 890">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Shipping Address</label>
                            <textarea required placeholder="123 Shopping St, Fashion City"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Place Order</button>
                    </form>
                </div>
                <div class="checkout-summary">
                    <h3>Confirm Order</h3>
                    <div id="checkout-items" class="checkout-mini-list"></div>
                    <div class="final-total">
                        <span>Order Total:</span>
                        <span id="final-order-total">$0.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
