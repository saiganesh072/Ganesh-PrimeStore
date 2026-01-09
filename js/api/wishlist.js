// Wishlist API - Supabase Integration
import { getSupabase, getCurrentUser } from '../supabase.js';

/**
 * Get user's wishlist from Supabase
 */
export async function getUserWishlist() {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('wishlists')
        .select(`
            product_id,
            products (*)
        `)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }

    return data.map(item => item.product_id);
}

/**
 * Add item to wishlist
 */
export async function addToWishlist(productId) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('User must be logged in to add to wishlist');
    }

    const { error } = await supabase
        .from('wishlists')
        .upsert({
            user_id: user.id,
            product_id: productId
        }, {
            onConflict: 'user_id,product_id'
        });

    if (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }

    return true;
}

/**
 * Remove item from wishlist
 */
export async function removeFromWishlist(productId) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('User must be logged in');
    }

    const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

    if (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }

    return true;
}

/**
 * Sync local wishlist to Supabase (when user logs in)
 */
export async function syncWishlistToCloud(localProductIds) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user || localProductIds.length === 0) {
        return;
    }

    // Get existing cloud wishlist
    const cloudWishlist = await getUserWishlist();

    // Find items to add (in local but not in cloud)
    const toAdd = localProductIds.filter(id => !cloudWishlist.includes(id));

    if (toAdd.length > 0) {
        const items = toAdd.map(productId => ({
            user_id: user.id,
            product_id: productId
        }));

        const { error } = await supabase
            .from('wishlists')
            .upsert(items, { onConflict: 'user_id,product_id' });

        if (error) {
            console.error('Error syncing wishlist:', error);
        }
    }

    // Return merged wishlist
    return [...new Set([...cloudWishlist, ...localProductIds])];
}
