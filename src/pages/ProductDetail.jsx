import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const ProductDetail = () => {
    const { id } = useParams();
    const { allProducts } = useProducts();
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

    const product = allProducts.find(p => p.id === id);

    if (!product) return <div className="container p-10">Product not found</div>;

    const handleAddToCart = () => {
        // Add multiple
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        // Or we could update addToCart to accept qty
    };

    return (
        <div className="container" style={{ padding: '60px 15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                <div>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
                </div>
                <div>
                    <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '15px' }}>{product.name}</h2>
                    <div style={{ fontSize: '20px', marginBottom: '25px', color: '#666' }}>${product.price.toFixed(2)}</div>
                    <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.8' }}>{product.description}</p>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ border: '1px solid #e6e6e6', borderRadius: '3px', display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '10px 15px' }}>-</button>
                            <span style={{ width: '30px', textAlign: 'center' }}>{qty}</span>
                            <button onClick={() => setQty(q => q + 1)} style={{ padding: '10px 15px' }}>+</button>
                        </div>
                        <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                    </div>

                    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', color: '#999', fontSize: '14px' }}>
                        <span>Category: <span style={{ textTransform: 'capitalize', color: '#666' }}>{product.category}</span></span>
                        <span style={{ marginLeft: '20px' }}>Tags: {product.tags.join(', ')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
