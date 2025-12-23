import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Cart = () => {
    const { items, removeFromCart, total, updateQuantity } = useCart();

    if (items.length === 0) return (
        <div className="container" style={{ padding: '100px 15px', textAlign: 'center' }}>
            <h2>Your cart is empty</h2>
            <Link to="/shop" style={{ display: 'inline-block', marginTop: '20px' }}>
                <Button variant="primary">Shop Now</Button>
            </Link>
        </div>
    );

    return (
        <div className="container" style={{ padding: '60px 15px' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>Shopping Cart</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left', color: '#555' }}>
                                <th style={{ padding: '15px 10px' }}>Product</th>
                                <th style={{ padding: '15px 10px' }}>Price</th>
                                <th style={{ padding: '15px 10px' }}>Quantity</th>
                                <th style={{ padding: '15px 10px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '20px 10px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ width: '60px', height: '80px', overflow: 'hidden', borderRadius: '4px' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ fontWeight: '500', color: '#555' }}>{item.name}</div>
                                    </td>
                                    <td style={{ padding: '20px 10px', color: '#555' }}>${item.price.toFixed(2)}</td>
                                    <td style={{ padding: '20px 10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', width: 'fit-content', borderRadius: '4px' }}>
                                            <button style={{ padding: '5px 10px', color: '#555' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span style={{ padding: '0 10px', fontSize: '14px' }}>{item.quantity}</span>
                                            <button style={{ padding: '5px 10px', color: '#555' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 10px', fontWeight: '500' }}>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ border: '1px solid #eee', padding: '30px', borderRadius: '4px', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Cart Totals</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', paddingBottom: '20px', borderBottom: '1px dashed #ddd' }}>
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', paddingBottom: '20px', borderBottom: '1px dashed #ddd', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout">
                        <Button variant="primary" style={{ width: '100%' }}>Proceed to Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
