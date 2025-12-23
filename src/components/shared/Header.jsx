import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Heart, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { count } = useCart();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? { color: 'var(--color-primary)' } : {};

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
            {/* Top Bar */}
            <div style={{ backgroundColor: 'var(--color-bg-dark)', color: '#b2b2b2', fontSize: '12px' }}>
                <div className="container" style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>Free shipping for standard order over $100</div>
                    <div className="flex">
                        <span className="p-lr-10">Help & FAQs</span>
                        <span className="p-lr-10">My Account</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container" style={{ height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    COZA<span style={{ color: 'var(--color-text-muted)' }}>STORE</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
                    <Link to="/" style={{ fontWeight: '500', ...isActive('/') }}>Home</Link>
                    <Link to="/shop" style={{ fontWeight: '500', ...isActive('/shop') }}>Shop</Link>
                    <Link to="/cart" style={{ fontWeight: '500', ...isActive('/cart') }}>Features</Link>
                    <Link to="/about" style={{ fontWeight: '500', ...isActive('/about') }}>About</Link>
                    <Link to="/contact" style={{ fontWeight: '500', ...isActive('/contact') }}>Contact</Link>
                </nav>

                {/* Icons */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Search size={24} color="#333" style={{ cursor: 'pointer' }} />

                    <Link to="/cart" style={{ position: 'relative' }}>
                        <ShoppingCart size={24} color="#333" />
                        {count > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                fontSize: '11px',
                                height: '16px',
                                minWidth: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                padding: '0 4px'
                            }}>
                                {count}
                            </span>
                        )}
                    </Link>

                    <div style={{ position: 'relative' }}>
                        <Heart size={24} color="#333" style={{ cursor: 'pointer' }} />
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            fontSize: '11px',
                            height: '16px',
                            minWidth: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            padding: '0 4px'
                        }}>
                            0
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
