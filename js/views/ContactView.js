export const view = () => `
    <main class="container contact-main">
        <div class="contact-header">
            <h1>Get in Touch</h1>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div class="contact-grid">
            <div class="contact-form-section">
                <form id="contact-form" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contact-name">Full Name</label>
                            <input type="text" id="contact-name" placeholder="John Doe" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Email Address</label>
                            <input type="email" id="contact-email" placeholder="john@example.com" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contact-subject">Subject</label>
                        <input type="text" id="contact-subject" placeholder="How can we help?" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" rows="6" placeholder="Write your message here..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
            </div>

            <div class="contact-info-section">
                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Visit Us</h3>
                    <p>123 Fashion Street<br>New York, NY 10001<br>United States</p>
                </div>

                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3>Email Us</h3>
                    <p>support@primestore.com<br>sales@primestore.com</p>
                </div>

                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567<br>Mon-Fri: 9AM - 6PM EST</p>
                </div>

                <div class="social-section">
                    <h3>Follow Us</h3>
                    <div class="social-icons">
                        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h3><i class="fas fa-shipping-fast"></i> How long does shipping take?</h3>
                    <p>Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.</p>
                </div>
                <div class="faq-item">
                    <h3><i class="fas fa-undo"></i> What's your return policy?</h3>
                    <p>We offer 30-day free returns on all unworn items with original tags attached.</p>
                </div>
                <div class="faq-item">
                    <h3><i class="fas fa-credit-card"></i> What payment methods do you accept?</h3>
                    <p>We accept all major credit cards, PayPal, Apple Pay, and Google Pay.</p>
                </div>
                <div class="faq-item">
                    <h3><i class="fas fa-globe"></i> Do you ship internationally?</h3>
                    <p>Yes! We ship to over 50 countries worldwide. Shipping rates vary by location.</p>
                </div>
            </div>
        </div>
    </main>
`;

export const onMounted = () => {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            await new Promise(r => setTimeout(r, 1500));

            // Reset form
            form.reset();
            btn.innerHTML = originalContent;
            btn.disabled = false;

            window.showToast('Message sent successfully! We\'ll get back to you soon.');
        });
    }
};
