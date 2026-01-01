export default function FeaturesView() {
    return `
    <main class="container">
        <section class="features-page" style="padding: 60px 0;">
            <div class="section-header text-center">
                <h2>Why Choose PrimeStore?</h2>
                <p>Experience the future of online shopping with our cutting-edge platform.</p>
            </div>
            
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
                <div class="feature-card" style="padding: 30px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
                    <div class="icon" style="font-size: 40px; color: var(--primary); margin-bottom: 20px;">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Lightning Fast</h3>
                    <p style="color: var(--gray-500); margin-top: 10px;">Optimized performance ensuring instant page loads and smooth interactions.</p>
                </div>

                <div class="feature-card" style="padding: 30px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
                    <div class="icon" style="font-size: 40px; color: var(--primary); margin-bottom: 20px;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Secure Payments</h3>
                    <p style="color: var(--gray-500); margin-top: 10px;">Bank-grade encryption keeping your transaction data safe and secure.</p>
                </div>

                <div class="feature-card" style="padding: 30px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
                    <div class="icon" style="font-size: 40px; color: var(--primary); margin-bottom: 20px;">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Mobile First</h3>
                    <p style="color: var(--gray-500); margin-top: 10px;">Designed to look and work perfectly on any device, from phones to desktops.</p>
                </div>

                <div class="feature-card" style="padding: 30px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
                     <div class="icon" style="font-size: 40px; color: var(--primary); margin-bottom: 20px;">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>24/7 Support</h3>
                    <p style="color: var(--gray-500); margin-top: 10px;">Our dedicated team is always available to assist you with any questions.</p>
                </div>
            </div>
        </section>
    </main>
    `;
}
