# GaadiBazaar — Team Summary (10-Minute Read)

**What is GaadiBazaar?**

A **B2B SaaS + Marketplace platform** that enables:
1. **Dealers** to sell inventory subscriptions (₹4,999–₹29,999/month)
2. **Private sellers** to list cars for a fee (₹299–₹599 per listing)
3. **Buyers** to browse verified cars from both sources (free, no signup required)

Launch market: Delhi NCR + Agra (then expand nationally).

---

## 🎯 Phase Completed (Week 1 — May 29, 2026)

### What We Built ✓
- **Database** → Multi-tenant schema ready (Dealer, PrivateSeller, Lead models)
- **Security** → Removed password hints, fixed SQLite auth for Turso cloud DB
- **Frontend** → Added `/wishlist` page, "Sell Your Car" navbar link, placeholder images
- **UI Polish** → Fixed TypeScript errors, all 12+ pages HTTP 200, build passes
- **Local Market** → NCR city constants ready for filters and dealer forms

**All production-ready blockers cleared.** We can now move forward with confidence.

---

## 🔄 What Comes Next (Weeks 2–12)

| Phase | Weeks | What | Why | Key Output |
|-------|-------|------|-----|------------|
| **1** | 2–4 | Private seller flow (OTP, image upload, admin approval) | Revenue stream #2 | Sellers listing cars, getting paid ₹299–₹599 |
| **1** | 2–4 | Dealer portal (inventory, leads, dashboard) | SaaS core | Dealers managing cars, tracking buyer inquiries |
| **2** | 5–8 | Payments (Razorpay), real integrations (VAHAN RC, WhatsApp) | Revenue + trust | Dealer subscriptions charged, RC verified |
| **3** | 9–12 | Blog, SEO, analytics, launch prep | Growth | 50+ dealers, 500+ cars in NCR, organic traffic |

**Total time to full product: 12 weeks (~3 months)** from today.

---

## 💰 Business Model

| Revenue Source | Price | Volume (Year 1 Est.) | Annual Revenue |
|---|---|---|---|
| **Dealer Subscriptions** | ₹4,999–₹29,999/mo | 50–200 dealers | ₹3–5 Cr |
| **Private Seller Fees** | ₹299–₹599/listing | 500–3,000 cars | ₹2–1.5 Cr |
| **Featured Upsells** | 2x listing fee | 10% adoption | ₹1 Cr |
| **Buyer Services** (later) | Loan, insurance, finance | TBD | TBD |

**Target Year 1 ARR**: ₹6–7.5 Cr with just dealer subscriptions + seller fees.

---

## 🏗️ Tech Stack (Enterprise-Grade)

| Layer | Technology | Why |
|-------|---|---|
| **Frontend** | Next.js 16 + React 19 | SSR, edge deployment, fast builds |
| **UI** | Tailwind CSS v4 + shadcn/ui | Responsive, accessible, type-safe |
| **Backend** | Next.js API Routes | Fast, serverless, no DevOps needed |
| **Database** | SQLite (Turso cloud) | Free tier, scalable, no external DB needed |
| **ORM** | Prisma 7 | Type-safe queries, auto migrations |
| **Auth** | NextAuth v5 | JWT sessions, role-based (admin/dealer/seller) |
| **State** | Zustand + localStorage | Client-side filters, wishlist persistence |
| **Deployment** | Vercel | 1-click deployments, auto-scaling, CDN |

**No external dependencies for core MVP** (except Vercel, Turso). Clean, maintainable architecture.

---

## 📊 Database Design (One Image)

```
┌─────────────┐
│   Dealer    │ ← Subscription Plan, Team Members, Inventory
├─────────────┤
│ id, name    │
│ plan, email │
│ totalLeads  │
└──────┬──────┘
       │ owns many
       ↓
┌─────────────┐      ┌──────────────┐
│     Car     │──→───│     Lead     │ ← Buyer inquiry (tracks conversion)
├─────────────┤      ├──────────────┤
│ id, brand   │      │ buyerName    │
│ dealerId    │      │ status: NEW  │
│ sellerId    │      │ source: SMS  │
│ images JSON │      └──────────────┘
└──────┬──────┘
       │ or owned by
       ↓
┌────────────────┐
│ PrivateSeller  │ ← Individual seller (phone-verified)
├────────────────┤
│ id, phone      │
│ otpVerified    │
│ city           │
└────────────────┘

+ OtpRequest: Stores 6-digit OTP for seller verification (10-min TTL)
```

**Key insight**: Both dealers and private sellers can own cars. Single `Lead` model tracks all buyer inquiries regardless of seller type.

---

## 🚀 Critical Next Steps (Start Week 2)

1. **Private Seller OTP** → Implement phone verification system (`lib/otp.ts`)
2. **Seller Pages** → Build `/sell`, `/sell/list`, `/sell/success` (4-step form)
3. **Image Upload** → Wire up UploadThing for car photos
4. **Admin Panel** → Seller listing moderation (approve/reject)
5. **Dealer Portal** → Login, inventory management, lead tracking

**Blockers**: None. All Week 1 dependencies complete.

---

## 👥 Team Roles (Recommended)

| Role | Responsibility | Phase |
|------|---|---|
| **Backend Lead** | API routes, database, integrations (Razorpay, VAHAN, WhatsApp) | Weeks 3–12 |
| **Frontend Lead** | Pages, components, UX polish, mobile optimization | Weeks 2–12 |
| **DevOps/Platform** | Vercel deployment, Turso DB ops, monitoring, security | Weeks 4, 12 |
| **QA/Testing** | Manual testing (mobile, browsers), test automation | Weeks 4, 8, 12 |
| **Product Lead** | User research, feedback loops, feature prioritization | Weeks 2–12 |

**Pair programming** strongly recommended for payments, auth, and integration work.

---

## 📈 Success Looks Like (End of Year 1)

| Metric | Target |
|--------|--------|
| **Active Dealers** | 500 |
| **Private Sellers** | 5,000 |
| **Total Cars Live** | 10,000 |
| **Monthly Buyers** | 50,000 |
| **Annual Revenue** | ₹6–7.5 Cr |
| **Cities Covered** | 15 |
| **Page Load Time** | <2 seconds |
| **Uptime** | 99.5% |

---

## 🛑 What Could Go Wrong (Risks & Mitigations)

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Dealer adoption slow** | Revenue miss | Outreach to Karol Bagh dealers early, free trial, demo calls |
| **Payment gateway fails** | Can't charge | Razorpay has failover, implement manual invoice fallback |
| **Database scales too big** | Slow queries | Turso handles up to 100GB; migrate to PostgreSQL if needed later |
| **Security breach** | Regulatory fine + churn | Regular audits, no storing sensitive data (Razorpay PCI-DSS) |
| **Mobile traffic kills conversion** | Lost buyers | Responsive design from Day 1, PWA app installation |

**Action**: Weekly risk review, update blockers Slack, escalate immediately if critical.

---

## 📚 Key Documents

- **PRODUCT_ROADMAP.md** — Detailed 12-week plan with file-by-file tasks (this document's full version)
- **Architecture Decision Records** (TBD) — Why we chose SQLite over PostgreSQL, Vercel over AWS, etc.
- **API Documentation** (TBD) — Swagger/OpenAPI for `/api/cars`, `/api/leads`, `/api/payments`
- **Deployment Runbook** (TBD) — Step-by-step Vercel + Turso setup for new environments

---

## 💬 Communication

- **Daily**: Slack #engineering-blockers (post any blockers immediately)
- **Mon/Wed/Fri**: 15-min standup (status, blockers, asks)
- **Weekly**: Design & product review (Friday)
- **Bi-weekly**: Full team sync (discuss roadmap updates, celebrate wins)

**All decisions documented** in this repo as comments or ADRs. No tribal knowledge.

---

## 🎓 For New Team Members

1. **Read this file** (10 min) — Get the big picture
2. **Read PRODUCT_ROADMAP.md** (20 min) — Understand detailed roadmap
3. **Clone repo** and run `pnpm dev` (5 min) — See the app live
4. **Pick one task** from Week 2 and start; ask questions on Slack
5. **Pair with backend/frontend lead** on your first PR

---

## Final Word

We're building something **real and valuable**: a trustworthy marketplace for verified used cars in a $2B+ market. This isn't a side project—it's a potential ₹100+ Cr company if executed well.

The **technical foundation is solid** (Phase 1 Week 1 ✓). The **next 11 weeks** will test our execution discipline, teamwork, and ability to ship. We ship fast, we listen to dealers and sellers, we iterate based on feedback.

**Let's make this happen.** 🚗

---

**Document Version**: 1.0  
**Date**: May 29, 2026  
**Next Update**: June 5, 2026 (end of Week 2)
