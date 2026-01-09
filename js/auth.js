// Authentication Service - Supabase Integration
import * as SupabaseAuth from './supabase.js';

export class AuthService {
    constructor() {
        this.user = null;
        this.listeners = [];
        this.initialized = false;

        // Initialize auth state
        this.init();
    }

    async init() {
        try {
            // Check for existing session
            const session = await SupabaseAuth.getSession();
            if (session?.user) {
                this.user = this.formatUser(session.user);
                this.notifyListeners();
            }

            // Listen for auth state changes
            SupabaseAuth.onAuthStateChange((event, session) => {
                console.log('Auth state changed:', event);
                if (session?.user) {
                    this.user = this.formatUser(session.user);
                } else {
                    this.user = null;
                }
                this.notifyListeners();
            });

            this.initialized = true;
        } catch (error) {
            console.error('Auth init error:', error);
            this.initialized = true;
        }
    }

    formatUser(supabaseUser) {
        return {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
            avatar: supabaseUser.user_metadata?.avatar_url || null,
            provider: supabaseUser.app_metadata?.provider || 'email'
        };
    }

    async signUp(email, password, name = '') {
        try {
            const data = await SupabaseAuth.signUp(email, password, name);

            // Note: Supabase may require email confirmation
            if (data.user && !data.user.email_confirmed_at) {
                return {
                    success: true,
                    requiresConfirmation: true,
                    message: 'Please check your email to confirm your account'
                };
            }

            this.user = this.formatUser(data.user);
            this.notifyListeners();
            return { success: true, user: this.user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const data = await SupabaseAuth.signIn(email, password);
            this.user = this.formatUser(data.user);
            this.notifyListeners();
            return { success: true, user: this.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    async loginWithGoogle() {
        try {
            await SupabaseAuth.signInWithGoogle();
            // Redirect will happen, no need to handle here
            return { success: true };
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await SupabaseAuth.signOut();
            this.user = null;
            this.notifyListeners();
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getUser() {
        return this.user;
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Immediately call with current state
        if (this.initialized) {
            callback(this.user);
        }
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.user));
    }
}
