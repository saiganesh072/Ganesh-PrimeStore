# Ganesh PrimeStore

A modern, professional e-commerce application built with **Vanilla JavaScript** (SPA Architecture).

## Features
- **Single Page Application (SPA)**: Seamless navigation with no page reloads, using a custom client-side router.
- **Dynamic Routing**: Clean URLs (e.g., `/products/summer-shirt/p-sai001`) supported on GitHub Pages via a smart 404 redirect.
- **Analytics Data Layer**: Integrated `window.dataLayer` for tracking user interactions and page views.
- **Modern UI**: Fully responsive design with premium aesthetics.
- **Cart & Wishlist**: Functional state management with local storage persistence.

## Tech Stack
- **Core**: HTML5, CSS3, Vanilla JavaScript (ES Modules).
- **Routing**: Custom Client-Side Router.
- **State Management**: LocalStorage + Global State.
- **Icons**: Font Awesome.
- **Fonts**: Google Fonts (Outfit, Plus Jakarta Sans).

## Project Structure
```
/
├── index.html          # Main Entry Point (Shell)
├── 404.html            # GitHub Pages Routing Handler
├── css/
│   └── style.css       # Global Styles
├── js/
│   ├── main.js         # App Entry & Router Config
│   ├── router.js       # Routing Logic
│   ├── analytics.js    # Data Layer Logic
│   └── views/          # Page Components (Home, Shop, PDP, etc.)
└── images/             # Assets
```

## Data Layer for Analytics
The application implements a global `window.dataLayer` array.

**Example Page View Event:**
```javascript
{
  event: "page_view",
  page_type: "pdp",
  product_name: "Esprit Ruffle Shirt",
  product_id: "sai0001",
  price: 16.64,
  currency: "USD",
  category: "women",
  stock_status: "In Stock"
}
```

## How to Run Locally
Since this is a Single Page Application using ES Modules, you must serve it via a local web server (opening `index.html` directly will not work due to CORS policies on modules).

1.  **Using Python (pre-installed on most systems):**
    ```bash
    python -m http.server 8000
    # Open http://localhost:8000
    ```

2.  **Using VS Code Live Server:**
    Right-click `index.html` and select "Open with Live Server".

## Deployment
This project is configured for **GitHub Pages**. Clean URLs are handled automatically by the `404.html` fallback.
