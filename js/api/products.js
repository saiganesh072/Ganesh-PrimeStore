// Products API - Supabase Integration
import { getSupabase } from '../supabase.js';

/**
 * Fetch all products from Supabase
 */
export async function getProducts() {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
    return data;
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
    return data;
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
    return data;
}

/**
 * Search products by name
 */
export async function searchProducts(query) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`);

    if (error) {
        console.error('Error searching products:', error);
        throw error;
    }
    return data;
}

/**
 * Get unique categories
 */
export async function getCategories() {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('category')
        .order('category');

    if (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }

    // Get unique categories
    const uniqueCategories = [...new Set(data.map(p => p.category))];
    return uniqueCategories;
}
