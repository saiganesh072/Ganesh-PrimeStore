export default function SignInView() {
    return `
    <main class="container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
        <div class="signin-card" style="width: 100%; max-width: 450px; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 28px; margin-bottom: 10px;">Welcome Back</h2>
                <p style="color: var(--gray-500);">Sign in to your PrimeStore account</p>
            </div>
            
            <form id="page-signin-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
                    <input type="email" placeholder="name@example.com" required style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-family: inherit;">
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
                    <input type="password" placeholder="••••••••" required style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-family: inherit;">
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 14px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox"> Remember me
                    </label>
                    <a href="#" style="color: var(--primary); font-weight: 600;">Forgot Password?</a>
                </div>
                <button type="submit" class="btn btn-primary btn-block" style="width: 100%; height: 50px;">Sign In</button>
            </form>

            <div style="text-align: center; margin-top: 30px; font-size: 14px; color: var(--gray-500);">
                Don't have an account? <a href="#" style="color: var(--primary); font-weight: 600;">Create Account</a>
            </div>
        </div>
    </main>
    `;
}
