export default function AboutView() {
    return `
    <main class="container">
        <section class="about-page" style="padding: 80px 0;">
            <div class="about-content" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h1 style="margin-bottom: 24px;">Our Story</h1>
                <p style="font-size: 18px; color: var(--gray-500); line-height: 1.8; margin-bottom: 40px;">
                    Founded in 2024, PrimeStore began with a simple mission: to make high-quality, sustainable fashion accessible to everyone. 
                    We believe that style usually shouldn't come at the cost of comfort or the environment.
                </p>
                <div class="about-stats" style="display: flex; justify-content: center; gap: 60px; margin-bottom: 60px;">
                    <div class="stat">
                        <h3 style="font-size: 36px; color: var(--primary); margin-bottom: 5px;">10k+</h3>
                        <span style="color: var(--gray-500);">Happy Customers</span>
                    </div>
                    <div class="stat">
                        <h3 style="font-size: 36px; color: var(--primary); margin-bottom: 5px;">500+</h3>
                        <span style="color: var(--gray-500);">Products</span>
                    </div>
                    <div class="stat">
                        <h3 style="font-size: 36px; color: var(--primary); margin-bottom: 5px;">24/7</h3>
                        <span style="color: var(--gray-500);">Support</span>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000" alt="Our Team" style="width: 100%; border-radius: 12px; margin-bottom: 40px;">
                
                <h2 style="margin-bottom: 20px;">Our Mission</h2>
                <p style="color: var(--gray-500); line-height: 1.8;">
                    To curate a collection that empowers individuals to express their unique selves while maintaining a commitment to quality and integrity. 
                    Every piece in our store is selected with care, ensuring it meets our high standards for durability and style.
                </p>
            </div>
        </section>
    </main>
    `;
}
