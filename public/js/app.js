/**
 * Main Application Logic
 * Handles dynamic rendering of products and page initialization.
 */

$(document).ready(function () {
    renderProductGrid();

    // Bind global click events if necessary
});

function renderProductGrid() {
    const grid = $('.isotope-grid');
    if (grid.length === 0) return;

    // Clear static content
    grid.html('');

    // Clear existing static content for a clean slate
    // grid.empty(); // Isotope might need special handling if already initialized, but we run before window.load
    // Since we are running on document.ready, and Isotope in main.js runs on window.load, we are safe to manipulate DOM here.
    grid.html('');

    window.products.forEach(product => {
        // Construct the class string for filters
        // The template filters use classes like '.women', '.men', etc.
        const categoryClass = product.category ? product.category : '';

        const cardHtml = `
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${categoryClass}">
            <!-- Block2 -->
            <div class="block2">
                <div class="block2-pic hov-img0">
                    <img src="${product.image}" alt="${product.name}">

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </a>
                </div>

                <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l">
                        <a href="product-detail.html?id=${product.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${product.name}
                        </a>

                        <span class="stext-105 cl3">
                            $${product.price.toFixed(2)}
                        </span>
                    </div>

                    <div class="block2-txt-child2 flex-r p-t-3">
                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img class="icon-heart1 dis-block trans-04" src="public/images/icons/icon-heart-01.png" alt="ICON">
                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="public/images/icons/icon-heart-02.png" alt="ICON">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;

        grid.append(cardHtml);
    });

    // Delegate Click Event for Add to Cart
    grid.on('click', '.js-add-to-cart', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        const product = window.products.find(p => p.id === id);
        if (product) {
            window.cart.add(product);
        }
    });
}
