# VistaClone Print Platform

A scalable custom product printing platform inspired by Vistaprint. The app is organized as a monorepo with a Next.js frontend, Express backend, PostgreSQL schema, S3-ready asset storage hooks, Stripe checkout hooks, and a Fabric.js product customization editor.

## Architecture

```text
Customer Browser
  |
  | Next.js pages, Tailwind UI, lazy-loaded Fabric editor
  v
Frontend (/frontend)
  |-- Product discovery: /, /products/[id]
  |-- Design editor: /editor/[productId]
  |-- Cart/checkout: /cart
  |-- User dashboard: /dashboard
  |
  | REST + JWT
  v
Backend API (/backend)
  |-- Auth: signup/login/me
  |-- Catalog: categories/products/variants
  |-- Templates: product template JSON
  |-- Designs: Fabric JSON + preview image metadata
  |-- Cart/orders: checkout lifecycle
  |-- Admin: products/templates/orders/users
  |-- Rendering: JSON -> PNG/PDF print artifact job
  |
  | SQL
  v
PostgreSQL
  |-- users, products, variants, templates
  |-- designs, carts, orders, print_jobs
  |
  | object keys / signed URLs
  v
AWS S3 + CDN
  |-- uploads/
  |-- previews/
  |-- print-files/
  |
  | payment intents / webhooks
  v
Stripe
```

## Flow

```text
Select Product -> Choose Variant -> Customize in Fabric Editor -> Save Design
-> Add to Cart with Design JSON + Preview -> Checkout Address + Stripe Payment
-> Order Created -> Server Render Job -> Admin Downloads Print-Ready PDF/PNG
```

## Getting Started

Install dependencies in each app:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Run locally:

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

Backend defaults to `http://localhost:4000`; frontend defaults to `http://localhost:3000`.

## Environment

Copy `.env.example` files in both apps and provide real values before using S3, Stripe, or PostgreSQL in production.

## Print Engine Notes

The editor stores Fabric JSON as source of truth. Client-side preview exports PNG for fast cart UX. Backend rendering service exposes a print job endpoint and is structured for a Puppeteer or Node canvas renderer that opens the design at print dimensions and exports 300 DPI PDF/PNG assets.
