import React, { createContext, useContext, useState } from 'react';
import productsData from '../data/products.json';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products] = useState(productsData);
    const [filter, setFilter] = useState('all');

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    const categories = ['all', ...new Set(products.map(p => p.category))];

    return (
        <ProductContext.Provider value={{
            products: filteredProducts,
            allProducts: products,
            categories,
            filter,
            setFilter
        }}>
            {children}
        </ProductContext.Provider>
    );
};
