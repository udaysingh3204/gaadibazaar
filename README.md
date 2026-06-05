# GaadiBazaar — Indian Used Car Marketplace

A full-stack, production-ready used car marketplace for the Indian market built with Next.js 14, Prisma, PostgreSQL, and NextAuth.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + CSS variables
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js v5 (credentials)
- **Forms**: React Hook Form + Zod
- **State**: Zustand (filters + wishlist)
- **Fonts**: Syne (headings) + DM Sans (body)
- **Toasts**: Sonner

## Quick Start

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET
```

### 3. Start PostgreSQL (Docker)
```bash
docker run --name gaadibazaar-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gaadibazaar \
  -p 5432:5432 -d postgres
```

### 4. Push schema & seed
```bash
pnpm prisma db push
pnpm prisma db seed
```

### 5. Start dev server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

URL: `http://localhost:3000/admin/login`
Email: `admin@gaadibazaar.in`
Password: `Admin@123`

## Project Structure

```
app/
  (public)/          # Public storefront
    page.tsx         # Home page
    cars/
      page.tsx       # Browse with filters
      [id]/page.tsx  # Car detail (SSR + SEO)
  admin/             # Admin panel (protected)
    login/
    dashboard/
    listings/
      new/
      [id]/edit/
  api/
    auth/[...nextauth]/
    cars/
    cars/[id]/
components/
  public/            # Navbar, Footer, CarCard, etc.
  admin/             # Sidebar, ListingsTable, CarForm, etc.
  ui/                # Button, Input, Badge, Card, etc.
lib/
  prisma.ts
  auth.ts
  utils.ts
  validations/car.schema.ts
store/
  filterStore.ts     # Browse page filter state (Zustand)
  wishlistStore.ts   # Persisted wishlist (Zustand)
types/
  car.ts
prisma/
  schema.prisma
  seed.ts
```

## Seed Data

8 realistic Indian car listings pre-loaded:

| Car | City | Price | Featured |
|-----|------|-------|----------|
| 2021 Maruti Swift VXI | Delhi | ₹6.5L | |
| 2020 Hyundai Creta SX | Mumbai | ₹13.5L | |
| 2022 Tata Nexon XZ+ | Bangalore | ₹15.2L | ⭐ |
| 2019 Honda City VX | Pune | ₹10.4L | |
| 2021 Kia Seltos HTX | Hyderabad | ₹16.75L | |
| 2018 Mahindra XUV300 W8 | Chennai | ₹9.8L | |
| 2023 MG Hector Sharp | Gurgaon | ₹19.5L | ⭐ |
| 2020 Toyota Innova Crysta | Jaipur | ₹18.9L | |
