import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Checkout = () => {
    const { items, total, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address: '', email: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (items.length === 0 && !orderPlaced) return <div className="container p-10 text-center">Your cart is empty.</div>;

    if (orderPlaced) return (
        <div className="container" style={{ padding: '100px 15px', textAlign: 'center' }}>
            <h2 style={{ color: 'green', marginBottom: '20px' }}>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock processing
        setTimeout(() => {
            setOrderPlaced(true);
            clearCart();
        }, 1000);
    };

    return (
        <div className="container" style={{ padding: '60px 15px' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>Checkout</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Billing Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <input required placeholder="First Name" style={inputStyle} />
                        <input required placeholder="Last Name" style={inputStyle} />
                    </div>
                    <input required placeholder="Address" style={{ ...inputStyle, marginBottom: '20px' }} />
                    <input required type="email" placeholder="Email" style={{ ...inputStyle, marginBottom: '20px' }} />
                    <input required placeholder="Phone" style={{ ...inputStyle, marginBottom: '20px' }} />
                </form>

                {/* Summary */}
                <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '4px' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Your Order</h3>
                    <div style={{ marginBottom: '20px' }}>
                        {items.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' }}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <Button variant="primary" style={{ width: '100%' }} onClick={handleSubmit}>Place Order</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e6e6e6',
    borderRadius: '3px',
    outline: 'none'
};

export default Checkout;
