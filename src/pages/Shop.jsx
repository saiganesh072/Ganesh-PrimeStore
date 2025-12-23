import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/shared/ProductCard';

const Shop = () => {
    const { products, filter, setFilter, categories } = useProducts();

    return (
        <div className="container" style={{ padding: '80px 15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                textTransform: 'capitalize',
                                color: filter === cat ? '#333' : '#888',
                                borderBottom: filter === cat ? '1px solid #333' : 'none',
                                paddingBottom: '2px'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ border: '1px solid #e6e6e6', padding: '8px 15px', borderRadius: '3px' }}>Filter</button>
                    <button style={{ border: '1px solid #e6e6e6', padding: '8px 15px', borderRadius: '3px' }}>Search</button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '30px'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
