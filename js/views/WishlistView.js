import { CONFIG } from '../config.js';
import { products } from '../products.js';

export const view = () => `
    <main class="container pdp-main"> <!-- Reuse PDP or Shop styles -->
        <h1 style="margin-bottom: 30px;">My Wishlist</h1>
        <div id="wishlist-container" class="products-grid">
            <div class="loader-container" style="position: relative; height: 200px; opacity: 1;">
                <div class="loader"></div>
            </div>
        </div>
    </main>
`;

export const onMounted = () => {
    renderWishlist(window.wishlist.items);

    window.addEventListener('wishlist-updated', (e) => {
        renderWishlist(e.detail.items);
    });
};

function renderWishlist(itemIds) {
    const container = document.getElementById('wishlist-container');
    if (!container) return;

    if (itemIds.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist" style="grid-column: 1/-1; text-align: center; padding: 80px 0;">
                <div class="empty-icon" style="width: 100px; height: 100px; background: var(--primary-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                    <i class="far fa-heart" style="font-size: 40px; color: var(--primary);"></i>
                </div>
                <h2 style="margin-bottom: 12px;">Your wishlist is empty</h2>
                <p style="color: var(--text-muted); margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">Browse our products and add your favorites to the list!</p>
                <a href="/shop" class="btn btn-primary" data-link>
                    <i class="fas fa-shopping-bag"></i> Start Shopping
                </a>
            </div>
        `;
        return;
    }

    const wishlistProducts = products.filter(p => itemIds.includes(p.id));
    const basePath = CONFIG.getBasePath();

    container.innerHTML = wishlistProducts.map(product => {
        let imgPath = product.image;
        if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
            imgPath = `${basePath}/${imgPath}`;
        }

        return `
            <div class="product-card wishlist-card">
                <div class="product-image">
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <img src="${imgPath}" alt="${product.name}">
                    </a>
                    <div class="product-overlay">
                        <button class="btn-icon btn-wishlist active" data-id="${product.id}" onclick="wishlist.toggleItem('${product.id}')" title="Remove from Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn-icon" onclick="cart.addItem('${product.id}')" title="Add to Cart">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-cat">${product.category}</p>
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
                <div class="wishlist-actions">
                    <button class="btn btn-primary btn-block" onclick="cart.addItem('${product.id}'); wishlist.removeItem('${product.id}');">
                        <i class="fas fa-shopping-cart"></i> Move to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
