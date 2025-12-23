import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/shared/ProductCard';
import Button from '../components/ui/Button';

const Home = () => {
    const { products } = useProducts();
    const featuredProducts = products.slice(0, 8); // Show first 8

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                backgroundImage: 'url(/images/slide-01.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '600px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container">
                    <span style={{ fontSize: '28px', color: '#333', display: 'block', marginBottom: '10px' }}>Women Collection 2018</span>
                    <h2 style={{ fontSize: '60px', fontWeight: 'bold', color: '#333', marginBottom: '40px', lineHeight: '1.1' }}>NEW SEASON</h2>
                    <Button variant="primary" size="large">Shop Now</Button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container p-tb-100" style={{ padding: '80px 15px' }}>
                <h3 className="text-center" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '50px' }}>Product Overview</h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center" style={{ marginTop: '50px' }}>
                    <Button variant="secondary">Load More</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
