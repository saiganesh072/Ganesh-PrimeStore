import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Button from '../ui/Button';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-bg-dark)', color: '#fff', paddingTop: '75px', paddingBottom: '32px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>

                    {/* Categories */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Categories</h4>
                        <ul style={{ color: '#b2b2b2', fontSize: '13px', lineHeight: '2' }}>
                            <li><a href="#">Women</a></li>
                            <li><a href="#">Men</a></li>
                            <li><a href="#">Shoes</a></li>
                            <li><a href="#">Watches</a></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Help</h4>
                        <ul style={{ color: '#b2b2b2', fontSize: '13px', lineHeight: '2' }}>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Get In Touch</h4>
                        <p style={{ color: '#b2b2b2', fontSize: '13px', lineHeight: '1.8', marginBottom: '20px' }}>
                            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Facebook size={18} color="#b2b2b2" />
                            <Instagram size={18} color="#b2b2b2" />
                            <Twitter size={18} color="#b2b2b2" />
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Newsletter</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid #b2b2b2',
                                    padding: '10px 0',
                                    color: '#fff',
                                    marginBottom: '20px',
                                    outline: 'none'
                                }}
                            />
                            <Button variant="primary">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <p style={{ color: '#b2b2b2', fontSize: '13px' }}>
                        Copyright © {new Date().getFullYear()} All rights reserved | This template is made with by Colorlib & Antigravity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
