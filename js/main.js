// Utility: Show Toast
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Products (Shop Page)
function renderProducts(filterCategory = 'all', sortType = 'default', searchQuery = '') {
    const container = document.getElementById('products-container');
    const categoryTitle = document.getElementById('category-title');
    if (!container) return;

    let filtered = filterCategory === 'all'
        ? [...products]
        : products.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (sortType === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (categoryTitle) {
        categoryTitle.textContent = searchQuery
            ? `Search results for "${searchQuery}"`
            : `Showing ${filterCategory} products`;
    }

    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-overlay">
                    <button class="btn-icon btn-wishlist ${wishlist.isInWishlist(product.id) ? 'active' : ''}" data-id="${product.id}" onclick="wishlist.toggleItem('${product.id}')" title="Add to Wishlist">
                        <i class="${wishlist.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="btn-icon" onclick="cart.addItem('${product.id}')" title="Add to Cart">
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
    `).join('');

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px;">No products found matching your criteria.</div>';
    }
}

// Render PDP (Product Detail Page)
function renderPDP(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Update Text Elements
    document.getElementById('pdp-name').textContent = product.name;
    document.getElementById('breadcrumb-product-name').textContent = product.name;
    document.getElementById('pdp-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('pdp-desc').textContent = product.description;
    document.getElementById('pdp-category').textContent = product.category;
    document.getElementById('pdp-id').textContent = product.id.toUpperCase();
    document.getElementById('pdp-image').src = product.image;
    document.getElementById('pdp-image').alt = product.name;

    // Render Colors
    const colorContainer = document.querySelector('.color-swatches');
    if (colorContainer && product.colors) {
        colorContainer.innerHTML = product.colors.map((color, index) => `
            <div class="swatch ${index === 0 ? 'active' : ''}" style="background-color: ${color}" data-color="${color}"></div>
        `).join('');

        document.querySelectorAll('.swatch').forEach(sw => {
            sw.onclick = () => {
                document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                sw.classList.add('active');
            };
        });
    }

    // Render Sizes
    const sizeContainer = document.querySelector('.size-chips');
    if (sizeContainer && product.sizes) {
        sizeContainer.innerHTML = product.sizes.map((size, index) => `
            <span class="chip ${index === 0 ? 'active' : ''}">${size}</span>
        `).join('');

        document.querySelectorAll('.chip').forEach(ch => {
            ch.onclick = () => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                ch.classList.add('active');
            };
        });
    }

    // Wishlist Button in PDP
    const wishlistBtn = document.getElementById('pdp-wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.dataset.id = product.id;
        if (wishlist.isInWishlist(product.id)) {
            wishlistBtn.classList.add('active');
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }

        wishlistBtn.onclick = () => {
            wishlist.toggleItem(product.id);
            if (wishlist.isInWishlist(product.id)) {
                wishlistBtn.classList.add('active');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                wishlistBtn.classList.remove('active');
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            }
        };
    }

    // Qty Logic
    const qtyInput = document.getElementById('pdp-qty');
    const plusBtn = document.getElementById('pdp-qty-plus');
    const minusBtn = document.getElementById('pdp-qty-minus');
    const addBtn = document.getElementById('pdp-add-to-cart');

    if (qtyInput && plusBtn && minusBtn && addBtn) {
        plusBtn.onclick = () => qtyInput.value = parseInt(qtyInput.value) + 1;
        minusBtn.onclick = () => {
            if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
        };

        addBtn.onclick = () => {
            const selectedSize = document.querySelector('.chip.active')?.textContent;
            const selectedColor = document.querySelector('.swatch.active')?.dataset.color;
            cart.addItem(product.id, parseInt(qtyInput.value));
            showToast(`Added to cart with size ${selectedSize}`);
        };
    }

    // Related Products
    const relatedContainer = document.getElementById('related-products-container');
    if (relatedContainer) {
        const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
        relatedContainer.innerHTML = related.map(p => `
            <div class="product-card">
                <div class="product-image">
                    <a href="product-detail.html?id=${p.id}">
                        <img src="${p.image}" alt="${p.name}">
                    </a>
                </div>
                <div class="product-info">
                    <p class="product-cat">${p.category}</p>
                    <a href="product-detail.html?id=${p.id}">
                        <h3 class="product-title">${p.name}</h3>
                    </a>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 800);

    // Page Specific Inits
    const path = window.location.pathname;

    if (path.includes('shop.html') || document.getElementById('products-container')) {
        renderProducts();

        // Sub-Navbar Category Clicks
        document.querySelectorAll('.cat-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                renderProducts(link.dataset.category);
            });
        });

        // Search in Shop
        const searchInput = document.getElementById('search-input-shop');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                renderProducts('all', 'default', e.target.value);
            });
        }

        // Sort Select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                renderProducts('all', e.target.value);
            });
        }
    }

    // PDP Init
    if (path.includes('product-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            renderPDP(productId);
        }
    }

    // Cart Page Init
    if (path.includes('cart.html')) {
        cart.updateCartPageUI();
    }

    // Wishlist Page Init
    if (path.includes('wishlist.html')) {
        wishlist.renderWishlistPage();
    }

    // Sign In Modal Logic
    const signInBtns = document.querySelectorAll('.sign-in-btn');
    const signInModal = document.getElementById('signin-modal');
    if (signInModal) {
        signInBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                signInModal.classList.add('active');
            });
        });

        const signInForm = document.getElementById('signin-form');
        if (signInForm) {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast("Welcome back! Signing you in...");
                setTimeout(() => {
                    signInModal.classList.remove('active');
                    showToast("Signed in successfully!");
                }, 1500);
            });
        }
    }

    // Checkout Modal Logic
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModals = document.querySelectorAll('.close-modal');

    if (checkoutBtn && checkoutModal) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                showToast("Your cart is empty!");
                return;
            }
            const summaryItems = document.getElementById('checkout-items');
            if (summaryItems) {
                summaryItems.innerHTML = cart.items.map(item => `
                    <div class="summary-item" style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <img src="${item.image}" alt="${item.name}" width="40" style="border-radius: 4px;">
                        <div>
                            <p style="font-size: 14px; margin: 0;">${item.name} (${item.quantity})</p>
                            <p style="font-weight: 700; margin: 0;">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `).join('');
            }
            const finalTotal = document.getElementById('final-order-total');
            if (finalTotal) finalTotal.textContent = `$${cart.getTotal().toFixed(2)}`;
            checkoutModal.classList.add('active');
        });
    }

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Order placed successfully!");
            cart.clear();
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        });
    }
});
