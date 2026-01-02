import { CONFIG } from './config.js';

export class AuthService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('prime_user')) || null;
        this.listeners = [];
    }

    isLoggedIn() {
        return !!this.user;
    }

    getUser() {
        return this.user;
    }

    async login(email, password) {
        // Mock Login Flow
        return new Promise((resolve) => {
            setTimeout(() => {
                this.user = {
                    id: 'usr_' + Math.random().toString(36).substr(2, 9),
                    email: email || 'user@example.com',
                    name: 'Demo User',
                    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=2563eb&color=fff'
                };
                this.save();
                this.notify();
                resolve(this.user);
            }, 800);
        });
    }

    async loginWithGitHub() {
        // Simulated OAuth Flow
        return new Promise((resolve) => {
            // In a real app, this would window.location.href = 'https://github.com/login/...'
            // Here we simulate the popup/redirect delay
            const width = 600, height = 700;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            // For a static demo, opening a popup to a blank page might be confusing.
            // We'll just show a toast and simulate success.
            window.showToast("Redirecting to GitHub...");

            setTimeout(() => {
                this.user = {
                    id: 'gh_' + Math.floor(Math.random() * 10000),
                    email: 'github_user@example.com',
                    name: 'GitHub User',
                    provider: 'github',
                    avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                };
                this.save();
                this.notify();
                resolve(this.user);
            }, 1500);
        });
    }

    logout() {
        this.user = null;
        this.save();
        this.notify();

        // Redirect to home if needed
        const basePath = CONFIG.getBasePath();
        const homePath = basePath === '' ? '/' : basePath + '/';
        window.location.href = homePath;
    }

    save() {
        if (this.user) {
            localStorage.setItem('prime_user', JSON.stringify(this.user));
        } else {
            localStorage.removeItem('prime_user');
        }
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Immediate callback with current state
        callback(this.user);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.user));
    }
}
