# Ganesh PrimeStore

A modern E-commerce application built with React, Vite, and Vanilla CSS.

## Features
- **Modern UI/UX**: Clean, responsive design with CSS variables.
- **Product Browsing**: Filter by category, view details.
- **Cart Management**: Add to cart, adjust quantities, persistent storage.
- **Checkout**: Simulated checkout process.
- **Authentication**: Mock login and signup.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── shared/     # Header, Footer, ProductCard
│   └── ui/         # Button, Input
├── context/        # Global state (Cart, Product, Auth)
├── data/           # Mock data (products.json)
├── layouts/        # Page layouts
├── pages/          # Route components (Home, Shop, Cart, etc.)
└── styles/         # Global styles and variables
```

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Technologies
- React 18
- Vite
- React Router DOM
- Lucide React (Icons)
- CSS Variables
