export default function BlogView() {
    return `
    <main class="container">
        <section class="blog-page" style="padding: 60px 0;">
             <div class="section-header text-center">
                <h2>Latest Updates</h2>
                <p>Fashion tips, trends, and news from the PrimeStore team.</p>
            </div>

            <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
                <!-- Article 1 -->
                <article class="blog-card" style="border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600" alt="Blog 1" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="blog-content" style="padding: 24px;">
                        <span class="date" style="font-size: 14px; color: var(--gray-500);">Jan 01, 2025</span>
                        <h3 style="margin: 10px 0;">Summer Collection Launch</h3>
                        <p style="color: var(--gray-500); margin-bottom: 20px;">Explore our new range of breathable fabrics perfect for the upcoming season.</p>
                        <a href="#" style="color: var(--primary); font-weight: 600;">Read More <i class="fas fa-arrow-right" style="font-size: 12px;"></i></a>
                    </div>
                </article>

                <!-- Article 2 -->
                <article class="blog-card" style="border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600" alt="Blog 2" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="blog-content" style="padding: 24px;">
                        <span class="date" style="font-size: 14px; color: var(--gray-500);">Dec 28, 2024</span>
                        <h3 style="margin: 10px 0;">Styling Guide: Coats</h3>
                        <p style="color: var(--gray-500); margin-bottom: 20px;">How to layer your winter wear while staying chic and comfortable.</p>
                        <a href="#" style="color: var(--primary); font-weight: 600;">Read More <i class="fas fa-arrow-right" style="font-size: 12px;"></i></a>
                    </div>
                </article>

                 <!-- Article 3 -->
                <article class="blog-card" style="border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600" alt="Blog 3" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="blog-content" style="padding: 24px;">
                        <span class="date" style="font-size: 14px; color: var(--gray-500);">Dec 15, 2024</span>
                        <h3 style="margin: 10px 0;">Sustainable Fashion</h3>
                        <p style="color: var(--gray-500); margin-bottom: 20px;">Why we are committed to eco-friendly materials and ethical production.</p>
                        <a href="#" style="color: var(--primary); font-weight: 600;">Read More <i class="fas fa-arrow-right" style="font-size: 12px;"></i></a>
                    </div>
                </article>
            </div>
        </section>
    </main>
    `;
}
