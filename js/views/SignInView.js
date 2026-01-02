import { CONFIG } from '../config.js';

export const view = () => `
    <main class="container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
        <div class="signin-card" style="width: 100%; max-width: 450px; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 28px; margin-bottom: 10px;">Welcome Back</h2>
                <p style="color: var(--gray-500);">Sign in to your PrimeStore account</p>
            </div>
            
            <form id="signin-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
                    <input type="email" id="email" placeholder="name@example.com" value="demo@example.com" required style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-family: inherit;">
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
                    <input type="password" id="password" placeholder="••••••••" value="password" required style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-family: inherit;">
                </div>
                <button type="submit" class="btn btn-primary btn-block" style="width: 100%; height: 50px;">
                    <span id="btn-text">Sign In</span>
                    <span id="btn-loader" style="display: none;"><i class="fas fa-spinner fa-spin"></i></span>
                </button>
            </form>

            <div class="divider" style="margin: 24px 0; text-align: center; border-bottom: 1px solid #eee; line-height: 0.1em; color: #999;">
                <span style="background: #fff; padding: 0 10px;">or</span>
            </div>

            <button id="gh-login-btn" class="btn btn-outline btn-block" style="width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <i class="fab fa-github" style="font-size: 20px;"></i> Continue with GitHub
            </button>
        </div>
    </main>
`;

export const onMounted = () => {
    const form = document.getElementById('signin-form');
    const ghBtn = document.getElementById('gh-login-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            setLoading(true);
            await window.auth.login(email, password);
            setLoading(false);

            window.showToast("Successfully signed in!");
            // Redirect to Home or Shop
            // window.router.navigateTo('/') is difficult to access comfortably without Global Router
            // But main.js didn't expose router globally yet.
            // We'll use window.location traversal or history API manually for now, 
            // OR best practice: expose router in main.js

            navigateHome();
        });
    }

    if (ghBtn) {
        ghBtn.addEventListener('click', async () => {
            await window.auth.loginWithGitHub();
            window.showToast("GitHub Auth Successful!");
            navigateHome();
        });
    }
};

function setLoading(isLoading) {
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
}

function navigateHome() {
    const basePath = CONFIG.getBasePath();
    // Use pushState to navigate without reload
    const target = basePath === '' ? '/' : basePath + '/';
    history.pushState(null, null, target);
    // Trigger popstate so router catches it? 
    // Router listens to popstate (back/fwd).
    // It does NOT listen to pushState.
    // We need to call the router's load function.
    // Or dispatch a custom event.
    window.dispatchEvent(new PopStateEvent('popstate'));
}
