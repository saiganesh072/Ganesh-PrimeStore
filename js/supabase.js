// Supabase Client Configuration
// This file initializes the Supabase client for use throughout the app

const SUPABASE_URL = 'https://teruephwjxyucekjzpma.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnVlcGh3anh5dWNla2p6cG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MjQzMTIsImV4cCI6MjA4MzUwMDMxMn0.XoJ0diyLKvLU7Lq5BQXjtThssgbVxKJ6eqCMvFgZa3s';

// Initialize Supabase client (uses global supabase from CDN)
let supabaseClient = null;

export function getSupabase() {
    if (!supabaseClient) {
        if (typeof window !== 'undefined' && window.supabase) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            console.error('Supabase library not loaded. Make sure to include the CDN script.');
        }
    }
    return supabaseClient;
}

// Auth helper functions
export async function signUp(email, password, name = '') {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name }
        }
    });

    if (error) throw error;
    return data;
}

export async function signIn(email, password) {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
}

export async function signInWithGoogle() {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + window.location.pathname
        }
    });

    if (error) throw error;
    return data;
}

export async function signOut() {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getCurrentUser() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getSession() {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export function onAuthStateChange(callback) {
    const supabase = getSupabase();
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// Export config for direct access if needed
export const config = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY
};
