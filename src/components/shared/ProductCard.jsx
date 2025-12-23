import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Image Container */}
            <div className="img-container" style={{ position: 'relative', overflow: 'hidden', marginBottom: '15px' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto', transition: 'transform 0.3s' }}
                    className="product-img"
                />

                {/* Quick View / Add to Cart Overlay */}
                <div className="overlay" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    opacity: 0,
                    transition: 'all 0.3s',
                }}>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Link to={`/product/${product.id}`} style={{ color: '#999', fontSize: '14px' }}>
                        {product.name}
                    </Link>
                    <div style={{ color: '#666', marginTop: '5px' }}>${product.price.toFixed(2)}</div>
                </div>

                <button style={{ color: '#999' }}>
                    <Heart size={18} />
                </button>
            </div>

            <style>{`
        .product-card:hover .overlay {
          opacity: 1;
          bottom: 30px;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
