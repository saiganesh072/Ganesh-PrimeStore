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
            <div class="empty-wishlist" style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
                <i class="far fa-heart" style="font-size: 48px; color: var(--gray-300); margin-bottom: 20px;"></i>
                <h2>Your wishlist is empty</h2>
                <p style="color: var(--gray-500); margin-bottom: 24px;">Browse our products and add your favorites to the list!</p>
                <a href="/shop" class="btn btn-primary" data-link>Go to Shop</a>
            </div>
        `;
        // We need to support 'data-link' which is handled by router. But since we inject HTML, the router's document click listener will catch it.
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
            <div class="product-card">
                <div class="product-image">
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <img src="${imgPath}" alt="${product.name}">
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
                    <a href="${basePath}/${product.name.replace(/\s+/g, '-').toLowerCase()}/p-${product.id}" data-link>
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
        `;
    }).join('');
}
