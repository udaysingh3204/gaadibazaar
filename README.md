# GaadiBazaar — Used Car Marketplace for Delhi NCR & Agra

A full-stack, production-grade used car marketplace and dealer B2B SaaS platform, built with Next.js 16, Prisma 7, and NextAuth. Focused on the Delhi NCR + Agra cluster, with a verified private-seller listing flow, dealer inventory management, and an admin moderation panel.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 — brand colors `#0A1628` (navy) / `#FF6B2B` (orange), Syne (headings) + DM Sans (body)
- **Database**: SQLite (dev) / Turso libSQL (production) via Prisma ORM 7 with driver adapters
- **Auth**: NextAuth.js v5 (admin credentials provider)
- **Seller sessions**: short-lived JWTs signed with `jose` (HS256, 1hr expiry)
- **Validation**: Zod v4
- **Forms**: React Hook Form
- **State**: Zustand (filters + wishlist, persisted)
- **Email**: Resend (mocked to console in dev when `RESEND_API_KEY` is unset)
- **Toasts**: Sonner
- **Package manager**: pnpm

## Quick Start

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env
```
At minimum, set `DATABASE_URL` and `NEXTAUTH_SECRET`. See [Environment Variables](#environment-variables) below for the full list.

### 3. Push schema & seed
```bash
pnpm db:push
pnpm db:seed
```

### 4. Start dev server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | SQLite file path locally (`file:./dev.db`) or `libsql://...` Turso URL in production |
| `DATABASE_AUTH_TOKEN` | Production only | Turso auth token |
| `NEXTAUTH_SECRET` | ✅ | Random 32-char string — also used to sign private-seller JWTs |
| `NEXTAUTH_URL` | ✅ | Base URL of the app (used for auth callbacks and sitemap) |
| `UPLOADTHING_TOKEN` | For image uploads | From [uploadthing.com](https://uploadthing.com) |
| `RESEND_API_KEY` | Optional | Enables real OTP/lead emails via Resend; without it, emails are logged to console |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Number (with country code, no `+`) used by the WhatsApp chat FAB |

## Admin Panel

URL: `http://localhost:3000/admin/login`

Default credentials are set via `prisma/seed.ts` — see that file for the seeded admin account. **Change these before deploying to production.**

## Available Scripts

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push Prisma schema to the database
pnpm db:seed      # Seed sample dealers, cars, and admin user
pnpm db:studio    # Open Prisma Studio
```

## Project Structure

```
app/
  (public)/                 # Public storefront
    page.tsx                # Home page — hero, NCR quick links, featured cars
    cars/
      page.tsx              # Browse with filters
      [id]/page.tsx         # Car detail (SSR + SEO)
    sell/
      page.tsx              # "Sell your car" landing page
      list/page.tsx          # Multi-step listing form (phone OTP → details → photos → review)
      success/page.tsx       # Post-submission confirmation
    blog/
      page.tsx               # Blog index
      [slug]/page.tsx         # Blog post detail
    wishlist/page.tsx        # Saved cars (Zustand-backed)
  admin/                     # Admin panel (protected via NextAuth)
    login/
    dashboard/
    listings/
      page.tsx               # All listings + pending review badge
      pending/                # Private-seller listings awaiting approval
      new/
      [id]/edit/
  api/
    auth/[...nextauth]/
    cars/
    cars/[id]/
    leads/                   # Buyer lead capture
    seller/
      request-otp/           # Sends OTP to private seller phone/email
      verify-otp/            # Verifies OTP, issues seller JWT
      listings/               # Creates a PRIVATE/ON_HOLD car listing
  sitemap.ts                 # Dynamic sitemap (cars, blog, cities)
components/
  public/                    # Navbar, Footer, CarCard, WhatsAppFAB, NCRQuickLinks, BlogContent, etc.
  admin/                     # Sidebar, ListingsTable, CarForm, PendingListingsClient, etc.
  ui/                         # Button, Input, Badge, Card, etc.
lib/
  prisma.ts                  # Prisma client (libSQL adapter)
  auth.ts                    # NextAuth config
  utils.ts                   # Helpers — calculateEMI, LAUNCH_CITIES, etc.
  otp.ts                      # OTP generation, cooldown, verification
  email.ts / email-helper.ts  # Transactional email senders
  blog-data.ts                # Blog post content + metadata
  validations/car.schema.ts
store/
  filterStore.ts             # Browse page filter state (Zustand)
  wishlistStore.ts            # Persisted wishlist (Zustand)
types/
  car.ts
prisma/
  schema.prisma
  seed.ts
```

## Core Features

### Marketplace (Public)
- Home page with hero search, body-type browse, NCR/Agra city quick links, featured listings, EMI estimates
- Car browse page with filters (city, price, brand, fuel type, transmission, body type) backed by Zustand filter state
- Car detail pages with SSR + SEO metadata
- Wishlist (persisted client-side)
- Blog with full post pages and related-article suggestions

### Private Seller Listing Flow
- `/sell` — landing page explaining the process, stats, testimonials, FAQ
- `/sell/list` — 4-step form: phone verification via OTP (6-digit, 10-min expiry, 60s resend cooldown), car details, photos, review & submit
- OTP delivered via email (Resend) when an email is provided, otherwise logged server-side for dev/testing
- On submission, a `Car` record is created with `listingType: PRIVATE` and `status: ON_HOLD`, pending admin approval
- `/sell/success` — confirmation page with status timeline

### Admin Panel
- NextAuth-protected dashboard and listings management
- **Pending Review** queue for private-seller submissions — approve (sets `status: ACTIVE`) or reject (`status: REMOVED`) with one click
- Full car CRUD (create/edit/delete dealer listings)

### Lead Capture
- `/api/leads` records buyer inquiries against a car and increments the associated dealer's lead count

## Database Schema Highlights

- `Car` — supports both dealer and private listings via `listingType` (`DEALER` | `PRIVATE`) and `status` (`ACTIVE` | `ON_HOLD` | `REMOVED`, etc.)
- `PrivateSeller` — phone-verified individual sellers, linked to their `Car` listings
- `OtpRequest` — OTP codes with expiry and single-use enforcement
- `Lead` — buyer inquiries linked to cars and dealers
- `Dealer` / `DealerUser` — dealer accounts and subscription plans

## Deployment

Target: **Vercel** (app) + **Turso** (libSQL database).

1. Create a Turso database and obtain `DATABASE_URL` (`libsql://...`) and `DATABASE_AUTH_TOKEN`
2. Run `pnpm db:push` and `pnpm db:seed` against the Turso database
3. Set all [environment variables](#environment-variables) in the Vercel project settings
4. Connect the Vercel project to this repository and deploy

## Roadmap

See [`PRODUCT_ROADMAP.md`](./PRODUCT_ROADMAP.md) and [`NEXT_ACTIONS.md`](./NEXT_ACTIONS.md) for upcoming work, including the dealer self-serve portal, Razorpay payments, real VAHAN RC verification, and WhatsApp Business API integration.
