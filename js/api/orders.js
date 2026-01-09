// Orders API - Supabase Integration
import { getSupabase, getCurrentUser } from '../supabase.js';

/**
 * Create a new order
 */
export async function createOrder(cartItems, shippingInfo) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('User must be logged in to place an order');
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: user.id,
            total: total,
            status: 'confirmed',
            shipping_address: {
                name: shippingInfo.name,
                email: shippingInfo.email,
                phone: shippingInfo.phone,
                address: shippingInfo.address
            }
        })
        .select()
        .single();

    if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) {
        console.error('Error creating order items:', itemsError);
        throw itemsError;
    }

    return order;
}

/**
 * Get current user's orders
 */
export async function getUserOrders() {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (*)
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

    return data;
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('User must be logged in');
    }

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (*)
            )
        `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching order:', error);
        throw error;
    }

    return data;
}
