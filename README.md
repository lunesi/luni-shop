# Luni  — Online store of gaming peripherals

**Live demo: https://luni-shop.vercel.app/**

## Technologies
- React
- TypeScript
- Vite
- React Router
- TailwindCSS
- lucide-react

## Getting started
```bash
npm install
npm run dev
```
Then open http://localhost:5173 

## Project structure
```
src/
  components/   layout (Layout, Header, Footer), product (ProductCard)
  pages/        HomePage, CatalogPage, ProductPage, NotFoundPage
  context/      CartContext
  data/         products.json
  types/        Product, Category
  lib/          formatPrice
```

## Features
- Home: hero banner, category blocks, product grid
- Catalog: filter by category, sort by price, empty state
- Product page: image, description, specifications, stock status
- Cart in context, item counter in the header

---
Disclaimer: This tool is for educational and informational purposes only. 
