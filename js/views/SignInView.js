export const view = () => `
    <main class="signin-container">
        <div class="signin-card">
            <div class="signin-header">
                <a href="/" class="logo" data-link>PRIME<span>STORE</span></a>
                <h1 id="form-title">Welcome Back</h1>
                <p id="form-subtitle">Sign in to access your account and orders</p>
            </div>

            <div class="signin-tabs">
                <button class="tab-btn active" data-tab="login">Sign In</button>
                <button class="tab-btn" data-tab="signup">Create Account</button>
            </div>

            <!-- Login Form -->
            <form id="login-form" class="signin-form active">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" placeholder="you@example.com" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="••••••••" required minlength="6">
                </div>
                <div id="login-error" class="form-error" style="display: none;"></div>
                <button type="submit" class="btn btn-primary btn-block" id="login-btn">
                    <span>Sign In</span>
                </button>
            </form>

            <!-- Signup Form -->
            <form id="signup-form" class="signin-form" style="display: none;">
                <div class="form-group">
                    <label for="signup-name">Full Name</label>
                    <input type="text" id="signup-name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="signup-email">Email</label>
                    <input type="email" id="signup-email" placeholder="you@example.com" required>
                </div>
                <div class="form-group">
                    <label for="signup-password">Password</label>
                    <input type="password" id="signup-password" placeholder="••••••••" required minlength="6">
                </div>
                <div id="signup-error" class="form-error" style="display: none;"></div>
                <div id="signup-success" class="form-success" style="display: none;"></div>
                <button type="submit" class="btn btn-primary btn-block" id="signup-btn">
                    <span>Create Account</span>
                </button>
            </form>

            <div class="signin-divider">
                <span>or continue with</span>
            </div>

            <button class="btn btn-outline btn-block btn-google" id="google-login-btn">
                <i class="fab fa-google"></i>
                <span>Google</span>
            </button>
        </div>
    </main>
`;

export const onMounted = () => {
    // DATA LAYER: Push page data for login page
    if (window.DataLayerManager) {
        window.DataLayerManager.pushPageData('login', 'PrimeStore | Sign In', 'account');
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.tab === 'login') {
                loginForm.style.display = 'flex';
                signupForm.style.display = 'none';
                formTitle.textContent = 'Welcome Back';
                formSubtitle.textContent = 'Sign in to access your account and orders';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'flex';
                formTitle.textContent = 'Create Account';
                formSubtitle.textContent = 'Join us to start shopping';
            }
        });
    });

    // Login form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('login-btn');
        const errorEl = document.getElementById('login-error');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        btn.disabled = true;
        errorEl.style.display = 'none';

        try {
            const result = await window.auth.login(email, password);

            if (result.success) {
                window.showToast('Welcome back, ' + result.user.name + '!');
                window.router.navigateTo('/');
            } else {
                errorEl.textContent = result.error || 'Invalid credentials';
                errorEl.style.display = 'block';
                btn.innerHTML = '<span>Sign In</span>';
                btn.disabled = false;
            }
        } catch (error) {
            errorEl.textContent = 'An error occurred. Please try again.';
            errorEl.style.display = 'block';
            btn.innerHTML = '<span>Sign In</span>';
            btn.disabled = false;
        }
    });

    // Signup form
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('signup-btn');
        const errorEl = document.getElementById('signup-error');
        const successEl = document.getElementById('signup-success');
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        btn.disabled = true;
        errorEl.style.display = 'none';
        successEl.style.display = 'none';

        try {
            const result = await window.auth.signUp(email, password, name);

            if (result.success) {
                if (result.requiresConfirmation) {
                    successEl.textContent = result.message;
                    successEl.style.display = 'block';
                    btn.innerHTML = '<span>Create Account</span>';
                    btn.disabled = false;
                } else {
                    window.showToast('Account created! Welcome, ' + result.user.name + '!');
                    window.router.navigateTo('/');
                }
            } else {
                errorEl.textContent = result.error || 'Could not create account';
                errorEl.style.display = 'block';
                btn.innerHTML = '<span>Create Account</span>';
                btn.disabled = false;
            }
        } catch (error) {
            errorEl.textContent = 'An error occurred. Please try again.';
            errorEl.style.display = 'block';
            btn.innerHTML = '<span>Create Account</span>';
            btn.disabled = false;
        }
    });

    // Google login
    document.getElementById('google-login-btn').addEventListener('click', async () => {
        const btn = document.getElementById('google-login-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        btn.disabled = true;

        try {
            await window.auth.loginWithGoogle();
            // Redirect will happen automatically
        } catch (error) {
            window.showToast('Google login failed. Please try again.');
            btn.innerHTML = '<i class="fab fa-google"></i><span>Google</span>';
            btn.disabled = false;
        }
    });
};
