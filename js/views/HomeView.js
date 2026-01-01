export default function HomeView() {
    return `
    <!-- Hero Section -->
    <section class="hero" id="home-section">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="badge">New Collection 2024</span>
          <h1>Elevate Your Style With <span>Premium</span> Essentials</h1>
          <p>Discover our curated collection of high-quality fashion pieces designed for those who value both comfort
            and sophistication.</p>
          <div class="hero-btns">
            <a href="/shop" class="btn btn-primary" data-link>Shop Now</a>
            <a href="#features" class="btn btn-outline">Learn More</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-card">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
              alt="Hero Model">
            <div class="image-overlay"></div>
          </div>
          <div class="floating-card c1">
            <i class="fas fa-check-circle"></i>
            <div>
              <h4>Top Rated</h4>
              <p>4.9/5 Rating</p>
            </div>
          </div>
          <div class="floating-card c2">
            <i class="fas fa-truck"></i>
            <div>
              <h4>Fast Delivery</h4>
              <p>Free for orders > $50</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Teaser or Newsletter could go here -->
    `;
}
