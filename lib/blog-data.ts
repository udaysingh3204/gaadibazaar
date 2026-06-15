export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  date: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "buying-a-used-suv-in-india-2026",
    title: "The 2026 Buyer's Guide to Used SUVs in India",
    excerpt: "Hyundai Creta vs Kia Seltos vs Tata Harrier — which 3-year-old SUV holds value best in 2026?",
    category: "Buying Guide",
    readMin: 7,
    date: "20 May 2026",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200",
    content: `
## Why a 3-Year-Old SUV Makes Sense in 2026

The Indian used car market has matured dramatically. A 3-year-old SUV today means modern safety features, OBD-II diagnostics, and post-GST paperwork — with 30–40% depreciation already absorbed by the first owner.

## Hyundai Creta (2021–2023): The Safe Bet

The Creta remains India's best-selling SUV for a reason. In the used market:
- **Resale value**: Holds 65–70% after 3 years
- **Maintenance**: Hyundai service centers in every NCR district
- **Sweet spot**: 1.5 Diesel SX variant (₹12–15 lakh used)

**Watch out for**: Petrol turbo variants have had DCT clutch issues in high-traffic use. Ask for service records.

## Kia Seltos (2021–2023): Feature-Rich Choice

The Seltos offers premium features at SUV prices. Key points:
- **Technology**: 10.25" touchscreen, ADAS (HTX Pro and above), 360-degree camera
- **Engine**: 1.4 turbo-petrol is spirited but requires premium fuel
- **Used price**: ₹13–17 lakh for a 2022 model with mid-trim

**Watch out for**: Paint quality issues on early 2019 cars (not 2021+). Sunroof drains can clog — check monsoon damage.

## Tata Harrier (2021–2023): The Value Pick

The Harrier has matured significantly with the 2021 facelift:
- **Best-in-class diesel**: Fiat-sourced 2.0 engine is proven and torquey
- **Build quality**: Best-in-segment rigidity (NCAP 5-star)
- **Used price**: ₹14–18 lakh for 2021–2022 XZ variants

**Watch out for**: Panoramic sunroof leakage in older units. Always test in light rain before buying.

## Our Verdict for Delhi NCR Buyers

| Factor | Creta | Seltos | Harrier |
|--------|-------|--------|---------|
| Fuel Economy | ★★★★☆ | ★★★☆☆ | ★★★★☆ |
| Features | ★★★★☆ | ★★★★★ | ★★★★☆ |
| Resale | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| Parts Availability | ★★★★★ | ★★★★☆ | ★★★★☆ |

**Verdict**: If you want peace of mind and easy servicing, go Creta. For features, Seltos. For road presence and build, Harrier.

## How to Buy Smart on GaadiBazaar

1. Filter by your preferred city (Delhi, Noida, Gurgaon)
2. Look for **Verified** badge — our team has reviewed the car
3. Compare up to 3 cars side-by-side using our Compare tool
4. Calculate EMI using our built-in calculator

Browse verified used SUVs on GaadiBazaar →
    `,
  },
  {
    slug: "rc-transfer-checklist",
    title: "RC Transfer in 7 Days: A Step-by-Step Checklist",
    excerpt: "Form 29, Form 30, NOC, insurance transfer — exactly what paperwork you need (and where to file each).",
    category: "Legal",
    readMin: 5,
    date: "12 May 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
    content: `
## RC Transfer: The Complete Delhi NCR Guide

Buying a used car is exciting. But RC transfer — the process of legally moving ownership — trips up most buyers. Here's exactly what to do.

## Documents You Need

### From the Seller
- Original RC Book (Registration Certificate)
- Form 29 — Notice of Transfer (signed by seller)
- Form 30 — Application for Transfer (signed by both parties)
- Valid insurance certificate
- PUC (Pollution Under Control) certificate
- NOC from financer (if car was on loan)

### From the Buyer
- Address proof (Aadhaar, Passport, Utility Bill)
- Identity proof
- Passport-size photographs (2–4)
- PAN card (if vehicle value > ₹5 lakh)

## Step-by-Step Process

### Day 1–2: Collect Documents
Get all documents from seller. Verify RC matches the car's chassis number and engine number physically.

### Day 3: Visit RTO
For Delhi: Your nearest district RTO (Rohini, Dwarka, Lajpat Nagar, etc.)
For Noida: RTO Noida Sector 51
For Gurgaon: RTO Gurgaon on Old Delhi Road

Submit Form 29 + Form 30 + supporting documents. Pay the transfer fee (₹300–500 depending on vehicle age).

### Day 4–7: Verification
RTO verifies the car (sometimes requires physical inspection for 10+ year old vehicles). Updated RC arrives by post in 7–15 days.

## Online Option (Parivahan Portal)

You can initiate RC transfer online at parivahan.gov.in:
1. Login with Aadhaar
2. Select "Ownership Transfer"
3. Upload scanned documents
4. Pay fee online
5. Visit RTO only for biometric verification

## Common Mistakes to Avoid

- **Don't skip Form 30** — both buyer and seller must sign
- **Don't transfer without NOC** if car was financed — the financer has hypothecation on the RC
- **Don't ignore Aadhaar linking** — Delhi requires Aadhaar-linked RC from 2024
- **Don't delay beyond 30 days** — post-purchase, you have 30 days to initiate transfer

## GaadiBazaar's Help

All cars listed on GaadiBazaar come with seller contact info. Our verified listings ensure the seller details match the RC. For complex situations (interstate transfer, duplicate RC, name discrepancy), WhatsApp our support team.
    `,
  },
  {
    slug: "electric-vs-petrol-tco",
    title: "Electric or Petrol? Real 5-Year Cost of Ownership in India",
    excerpt: "We crunched the numbers across 8 metros. Here's when an EV beats a Swift on total cost.",
    category: "Analysis",
    readMin: 9,
    date: "03 May 2026",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200",
    content: `
## The EV vs Petrol Question in 2026

With Tata Nexon EV prices falling to ₹14 lakh (ex-showroom) and used EVs available from ₹10 lakh, the math is finally getting interesting. But is total cost of ownership (TCO) really better?

## Our Methodology

We compared a 3-year-old Maruti Swift (1.2 petrol, ₹7 lakh used) vs a 2-year-old Tata Nexon EV (₹13 lakh used) over 5 years for a Delhi buyer doing 15,000 km/year.

## Fuel vs Electricity Costs

**Swift (Petrol)**
- Fuel efficiency: 20 kmpl
- 15,000 km/year = 750 litres
- Delhi petrol price (2026): ₹106/litre
- Annual fuel cost: **₹79,500**

**Nexon EV**
- Efficiency: 6.5 km/kWh
- 15,000 km/year = 2,307 kWh
- Home charging (Delhi BSES): ₹6.5/unit
- Annual electricity cost: **₹15,000**

**Annual saving on fuel: ₹64,500**

## Maintenance Costs

| Item | Swift (per year) | Nexon EV (per year) |
|------|-----------------|---------------------|
| Service | ₹8,000 | ₹4,000 |
| Brake pads | ₹3,000 | ₹1,000 (regen braking) |
| Engine oil | ₹2,500 | ₹0 |
| **Total** | **₹13,500** | **₹5,000** |

EV saves **₹8,500/year** on maintenance.

## 5-Year TCO Comparison

| | Swift | Nexon EV |
|-|-------|----------|
| Purchase price | ₹7,00,000 | ₹13,00,000 |
| 5-yr fuel/electricity | ₹3,97,500 | ₹75,000 |
| 5-yr maintenance | ₹67,500 | ₹25,000 |
| Insurance (5 yr) | ₹1,20,000 | ₹1,50,000 |
| **Total** | **₹12,85,000** | **₹14,50,000** |

The EV costs ₹1.65 lakh more over 5 years — but resale value narrows this further.

## When EV Wins

The EV beats petrol when:
1. **Daily distance > 80 km** (more fuel saved)
2. **Home charging available** (₹6.5/unit vs ₹15/unit at public charging)
3. **You keep the car 7+ years** (TCO crosses over around year 6)

## Verdict for NCR Buyers

For a Gurgaon or Noida buyer with a garage and 20+ km daily commute: **EV makes financial sense.** For Delhi apartment dwellers without home charging, the math is tighter.

Find verified used EVs on GaadiBazaar — filter by "Electric" fuel type.
    `,
  },
  {
    slug: "dealer-saas-india-2026",
    title: "How Indian Car Dealers Are Going Digital in 2026",
    excerpt: "Inside the SaaS revolution transforming the ₹4 lakh crore used-car industry.",
    category: "Industry",
    readMin: 6,
    date: "28 Apr 2026",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200",
    content: `
## The ₹4 Lakh Crore Opportunity

India's used car market is growing at 15% YoY and is now bigger than the new car market by volume. Yet 85% of dealers still track inventory on paper registers or basic Excel sheets.

## What's Changing in 2026

Three forces are driving digitization:

**1. Buyer Expectations**
Post-COVID buyers research online for 3–4 weeks before visiting a dealer. If you're not on platforms like GaadiBazaar, you're invisible.

**2. WhatsApp-First Lead Management**
The biggest shift: dealers now close deals on WhatsApp before the buyer ever steps into the showroom. Platforms that integrate WhatsApp leads see 40% higher conversion.

**3. Subscription SaaS Models**
Dealers are moving from one-time "listing fee" models to monthly subscriptions that offer unlimited listings, analytics, and lead management. Average dealer spends ₹5,000–15,000/month.

## What Top Dealers Are Doing Differently

The 20% of dealers driving 80% of sales on platforms have three things in common:

1. **Photo quality**: 10+ photos per listing, good lighting, clean background
2. **Response time**: Respond to WhatsApp inquiries within 15 minutes
3. **Complete info**: Price, KM, service history, actual seller phone — no hiding information

## The GaadiBazaar Dealer Platform

For dealers in Delhi NCR and Agra, our platform offers:
- Unlimited verified listings (Pro plan)
- Lead tracking dashboard
- One-click WhatsApp reply to each lead
- CSV lead export for CRM integration
- Subscription renewal reminders

**Starter plan**: ₹4,999/month (up to 20 listings)
**Pro plan**: ₹12,999/month (unlimited listings + analytics)
**Elite plan**: ₹29,999/month (featured placements + dedicated support)

30-day free trial available. Reach us at dealers@gaadibazaar.in
    `,
  },
  {
    slug: "used-cars-under-3-lakh-delhi",
    title: "Best Used Cars Under ₹3 Lakh in Delhi NCR (2026)",
    excerpt: "Top picks for budget buyers — reliable, low-maintenance used cars available right now in Delhi, Noida, and Gurgaon.",
    category: "Buying Guide",
    readMin: 6,
    date: "05 Jun 2026",
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1200",
    content: `
## The Budget Buyer's Market in 2026

Under ₹3 lakh, you're looking at 2015–2018 vintage cars with 60,000–90,000 km on the clock. The key is choosing models with low service costs and good parts availability.

## Top Picks Under ₹3 Lakh

### 1. Maruti Suzuki Alto (2016–2018) — ₹2–2.8 lakh
The Alto is the most reliable entry-level car in India.
- Service cost: ₹3,000–5,000 per year
- Spare parts: Available everywhere, even Tier 3 cities
- Ideal for: Daily city commute, first-time buyers

### 2. Maruti Wagon R (2016–2018) — ₹2.5–3 lakh
Taller cabin, more practical than Alto.
- Great fuel efficiency: 20–22 kmpl
- Easy to drive in Delhi traffic

### 3. Hyundai Eon (2015–2017) — ₹1.5–2.2 lakh
Well-equipped for the price:
- Air conditioning, power windows, music system standard
- Lightweight — ideal for urban use

### 4. Tata Nano (Twist or Genx, 2015–2017) — ₹1.2–1.8 lakh
The cheapest 4-seater with a proper engine:
- Great for inner Delhi / old city areas with parking challenges
- Power steering available on top variants

## What to Check Before Buying

1. **Rust inspection**: Check wheel arches, undercarriage, door bottoms
2. **Engine oil**: Should be clean amber/golden, not black
3. **AC performance**: Test on max cool for 10 minutes
4. **Paperwork**: RC, insurance, last 2 services receipts
5. **OBD check**: Any authorized mechanic can plug in for ₹200

## Where to Find These in Delhi NCR

Browse verified budget listings on GaadiBazaar — filter by price (under ₹3L) and your city. All our listings include seller contact for direct WhatsApp inquiry.
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
