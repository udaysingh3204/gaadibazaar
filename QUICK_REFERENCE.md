# GaadiBazaar — Quick Reference Card

**Print this, pin to your desk.**

---

## What Are We Building?

```
GaadiBazaar: Used Car Marketplace + B2B SaaS

┌──────────────────────────────────────────────────────┐
│           Buy / Sell / List Verified Cars            │
│                 (Delhi NCR + Agra)                   │
├──────────────────────────────────────────────────────┤
│ DEALERS (B2B SaaS)      PRIVATE SELLERS (Marketplace)│
│ Pay ₹4.9K–₹30K/mo       Pay ₹299–₹599/listing       │
│ Get: Multi-city view,   Get: Simple listing,        │
│ CRM, lead routing       one-time fee                │
│                         BUYERS (Free)               │
│                         Browse all cars, contact   │
└──────────────────────────────────────────────────────┘
```

---

## Status: Week 1 Complete ✓

| Component | Status | Notes |
|-----------|--------|-------|
| Database Schema | ✅ | Multi-tenant (Dealers + Sellers) |
| Frontend (12+ pages) | ✅ | All HTTP 200, type-safe |
| API Routes | ✅ | Cars, auth, basic CRUD |
| Admin Panel | ✅ | Login, dashboard (partial) |
| Auth System | ✅ | Admin + dealer (seller TBD) |
| Wishlist | ✅ | New feature |
| Security | ✅ | Password hints removed, Turso auth added |

**Next**: Week 2 → Private seller OTP + pages

---

## Tech Stack (Boring, Proven)

```
Frontend:  Next.js 16 + React 19 + Tailwind + Zustand
Backend:   Node.js (Vercel) + NextAuth v5
Database:  SQLite (Turso cloud)
Deploy:    Vercel (1-click, auto-scale)
```

**Why?** Fast to build, scales to millions, zero ops overhead for MVP.

---

## Architecture (One Diagram)

```
┌────────────────────────────────────────────────────┐
│                    BUYERS (Free)                   │
│  Homepage → Browse → Detail → Contact Seller       │
│              ↓                                      │
│         Wishlist (Zustand)                         │
└────────────────────────────────────────────────────┘
                      ↓
        ┌─────────────────────────────┐
        │      API Routes (/api/*)    │
        │  ✓ GET /cars               │
        │  ✓ GET /cars/[id]          │
        │  ? POST /api/leads          │
        │  ? POST /seller/request-otp │
        └─────────────────────────────┘
                      ↓
        ┌─────────────────────────────┐
        │    Prisma ORM + SQLite      │
        │  Car, Dealer, PrivateSeller │
        │  Lead, OtpRequest, User     │
        └─────────────────────────────┘
```

---

## File Map (Essential Files)

| Path | Purpose | Status |
|------|---------|--------|
| `app/(public)/page.tsx` | Homepage | ✅ |
| `app/(public)/cars/page.tsx` | Browse + filter | ✅ |
| `app/(public)/cars/[id]/page.tsx` | Car detail | ✅ |
| `app/(public)/wishlist/page.tsx` | Wishlist | ✅ NEW |
| `app/(public)/sell/` | Seller landing (TBD) | 🚧 |
| `app/dealer/` | Dealer portal (TBD) | 🚧 |
| `app/api/cars/route.ts` | Cars API | ✅ |
| `app/api/cars/[id]/route.ts` | Car detail API | ✅ |
| `prisma/schema.prisma` | Database models | ✅ |
| `lib/auth.ts` | NextAuth config | ✅ |
| `store/filterStore.ts` | Filter state | ✅ |
| `store/wishlistStore.ts` | Wishlist state | ✅ |

---

## Key Commands

```bash
# Setup
pnpm install
cp .env.example .env.local
pnpm prisma db push

# Development
pnpm dev                    # Start server (localhost:3000)
pnpm build                  # Production build
pnpm prisma studio         # Visual database editor

# Git
git checkout -b feature/my-feature
git commit -m "feat: add seller OTP"
git push origin feature/my-feature
# → Create PR on GitHub

# Database
pnpm prisma migrate dev --name add_feature   # Create migration
pnpm prisma db seed                          # Run seed

# Deployment (Vercel handles)
git push origin main  # Auto-deploys to production
vercel env pull       # Pull environment vars locally
vercel env add KEY VALUE  # Set env var
```

---

## Weekly Tasks at a Glance

### Weeks 2–4 (Phase 1: Private Seller + Dealer Portal)
- [ ] OTP system (`lib/otp.ts`)
- [ ] Seller pages (`/sell`, `/sell/list`, `/sell/success`)
- [ ] Image upload (UploadThing)
- [ ] Admin moderation
- [ ] Dealer portal basics (inventory, leads)

### Weeks 5–8 (Phase 2: SaaS + Analytics)
- [ ] Dealer portal completed (CRM, dashboard)
- [ ] PWA setup
- [ ] Google Tag Manager
- [ ] Plan limits enforcement

### Weeks 9–12 (Phase 3: Payments + Launch)
- [ ] Razorpay integration
- [ ] VAHAN API (RC verification)
- [ ] Blog + SEO
- [ ] WhatsApp integration
- [ ] Launch day prep

---

## Metrics That Matter

```
After 3 Months:
├─ 50 active dealers
├─ 500 private seller listings
├─ 2,000 total cars
├─ 10,000 monthly buyers
├─ ₹32.5L ARR (revenue)
└─ <2s page load, 99.5% uptime

After 12 Months:
├─ 500 dealers
├─ 5,000 sellers
├─ 10,000+ cars
├─ 50,000 monthly buyers
├─ ₹6–7.5 Cr ARR
└─ Present in 15 cities
```

---

## Decision Log (Why We Chose...)

| Decision | Why | Alternative |
|----------|-----|-------------|
| Next.js | Fast, SSR, Vercel integration | Remix, Nuxt |
| SQLite (Turso) | Free, scales, no DevOps | PostgreSQL (overkill MVP) |
| Zustand | Simple, small bundle | Redux (too verbose) |
| Tailwind | Fast, customizable | Bootstrap (heavy) |
| Prisma | Type-safe, migrations | Raw SQL (unmaintainable) |
| Vercel | 1-click deploys, scalable | AWS (ops overhead) |

---

## Red Flags 🚩

Stop and ask for help if:

- [ ] TypeScript build fails (`pnpm build`)
- [ ] Database query takes >1 second
- [ ] Same code copy-pasted 3+ times
- [ ] API route has no error handling
- [ ] Committing a file with "TODO" in production code
- [ ] Merging PR without review
- [ ] Adding feature without considering mobile
- [ ] Hardcoding environment-specific values
- [ ] Deleting a database column without deprecation

---

## Slack Channels

- **#engineering-blockers** — Post blockers immediately (not DMs)
- **#engineering-general** — Tech discussions, share learnings
- **#product-feedback** — User feedback, feature requests
- **#deploy-log** — Deployment notifications (automatic)
- **#incidents** — If production is broken

---

## Contact

| Role | Name | Slack |
|------|------|-------|
| Tech Lead | TBD | @tech-lead |
| Frontend Lead | TBD | @frontend |
| Backend Lead | TBD | @backend |
| Product | TBD | @product |

---

## Documents to Read

1. **TEAM_SUMMARY.md** (10 min) — Big picture overview
2. **PRODUCT_ROADMAP.md** (30 min) — Detailed 12-week plan
3. **ENTERPRISE_STANDARDS.md** (20 min) — Code quality, security
4. **This file** (5 min) — Quick reference

---

## One Last Thing

> **"You don't have to be perfect, but you have to ship. We iterate based on user feedback, not on code purity."**

- Dealer onboarding → launch with free trial
- Private seller flow → launch and monitor for bugs
- Buyer experience → measure with analytics, improve weekly

Build fast. Listen. Iterate. 🚀

---

**Version**: 1.0 | **Date**: May 29, 2026 | **Next Update**: June 5, 2026
