# Next Actions — What to Do Right Now

**Date**: June 4, 2026 (Start of Week 2)  
**Status**: Foundation complete, ready to accelerate

---

## 🎯 **Immediate (Today)**

### 1. **Team Kickoff Meeting** (1 hour)
**Attendees**: All engineers, PM, design lead  
**Agenda**:
```
1. Review TEAM_SUMMARY.md (5 min)
   → Everyone understands the business model

2. Review IMPLEMENTATION_PRIORITY.md (10 min)
   → Everyone sees the 6-week sprint plan

3. Decision: 6 weeks or 12 weeks? (5 min)
   → Aggressive (6 weeks) = earlier launch, more risk
   → Conservative (12 weeks) = safer, slower

4. Team Assignment (10 min)
   → Who owns frontend, backend, design, QA, DevOps
   → Pair programming partners for risky features (payments)

5. First Sprint Breakdown (15 min)
   → Week 2 targets: Car comparison, badges, export CSV, alerts
   → Who does what, daily standup times

6. Q&A (15 min)
```

**Output**: Committed timeline, assigned owners, Monday kickoff

---

### 2. **Assign Week 2 Tasks** (30 min)
Use **IMPLEMENTATION_PRIORITY.md** as reference.

```
WEEK 2 TASKS (9 developer days total)

FRONTEND (2 devs)
├─ Day 1–2: Car comparison modal (2 days)
│   File: components/public/CarComparison.tsx
│   Task: Allow selecting 2–3 cars, show side-by-side specs
│   Owner: [Assign name]
│
├─ Day 3: Hero image + NCR copy (1 day)
│   File: components/public/HeroSection.tsx
│   Task: Add background image, update copy to "Delhi NCR & Agra"
│   Owner: [Assign name]
│
├─ Day 3: Car image zoom gallery (1 day)
│   File: components/public/CarGallery.tsx
│   Task: Click image → lightbox zoom, swipe on mobile
│   Owner: [Assign name]
│
├─ Day 4: Featured listing CTA (0.5 day)
│   File: components/public/CarCard.tsx
│   Task: Add "Featured ⭐" button, link to upgrade page
│   Owner: [Assign name]
│
├─ Day 5: WhatsApp share button (0.5 day)
│   File: app/(public)/cars/[id]/page.tsx
│   Task: "Share on WhatsApp" button pre-fills message
│   Owner: [Assign name]

BACKEND (2 devs)
├─ Day 2: Seller verification badges (0.5 day)
│   File: app/api/cars/[id]/route.ts (update response)
│   Task: Add verified: { phone, email, rc } to Car API response
│   Owner: [Assign name]
│
├─ Day 2: Email system setup (1 day)
│   File: lib/email.ts (new)
│   Task: Integrate Resend, test email templates
│   Owner: [Assign name]
│
├─ Day 4: Lead export CSV (1 day)
│   File: app/api/dealer/leads/export/route.ts (new)
│   Task: GET endpoint returns CSV of dealer's leads
│   Owner: [Assign name]
│
├─ Day 4: Subscription expiry reminder (1 day)
│   File: lib/cron/subscription-reminders.ts (new)
│   Task: Daily job checks expiring subscriptions, sends email
│   Owner: [Assign name]
│
├─ Day 5: Price drop alert system (1.5 days)
│   File: app/api/wishlist/price-alerts/route.ts (new)
│   Task: Track wish price, alert when car price drops
│   Owner: [Assign name]

DESIGN (1 person)
├─ Day 1–2: Hero section image + design
├─ Day 2–3: Verification badge design (phone, email, RC icons)
├─ Day 3–4: Car comparison UI mockup
├─ Day 4–5: Gallery zoom interaction design
Owner: [Assign name]

QA (1 person)
├─ Day 5: Test all Week 2 features
├─ Day 5: Mobile testing (iOS Safari, Android Chrome)
├─ Day 5: CSV export validation (open in Excel)
└─ Day 5: Email delivery test (check Resend logs)
Owner: [Assign name]
```

**Assign each task with:**
- Owner name
- Start date (Mon/Tue/etc.)
- Daily standup time (9am?)
- Slack channel (#engineering-week2)
- PR review requirement

---

### 3. **Set Up Development Environment** (30 min)

**Each developer should:**
```bash
# Pull latest code
git pull origin main

# Create feature branch for Week 2 work
git checkout -b feature/week2-quick-wins

# Verify build passes
pnpm build

# Start dev server
pnpm dev

# Open http://localhost:3000, test existing pages
```

**DevOps person:**
```bash
# Verify Vercel is connected
vercel link  # (if not already linked)

# Check staging environment
vercel env pull

# Confirm Prisma migrations applied
pnpm prisma db push --skip-generate

# Test database connection
pnpm prisma studio
```

---

### 4. **Create GitHub Project Board** (15 min)

```
GitHub Project: "Week 2 Sprint"

Columns:
├─ Backlog (all 8 Week 2 tasks)
├─ In Progress (assigned today)
├─ Review (PR open, waiting for review)
├─ Testing (feature deployed to staging)
├─ Done (merged to main, deployed)

Each task:
- Title: "feat: Car comparison modal"
- Description: "Allow users to compare 2–3 cars side-by-side"
- Assignee: @username
- Due: Friday (end of task)
- Labels: frontend, high-priority, revenue
- Checklist:
  - [ ] Code written
  - [ ] Tests pass
  - [ ] Mobile tested
  - [ ] PR reviewed
  - [ ] Merged to main
```

**Tool**: GitHub Projects (built-in, free)

---

## 📅 **This Week (June 4–8)**

### **Monday (Today)**
- ✅ Team kickoff meeting
- ✅ Assign tasks
- ✅ GitHub project board
- ✅ Setup dev environments
- **Developers**: Start feature branches, create PR stubs

### **Tuesday–Thursday**
- Developers: Build features (daily 9am standup)
- Design: Iterate on mockups
- QA: Set up test environment

### **Friday (June 8)**
- **3pm**: Feature freeze (no new code)
- **4pm**: QA testing begins
- **4:30pm**: Collect feedback, identify bugs
- **5pm**: Deploy to staging (vercel-staging.com)
- **5:30pm**: Final smoke test
- **6pm**: Decision: deploy to production or rollback?

---

## 🔧 **Setup Checklist (Do Today)**

- [ ] **GitHub Repo Access**
  - All devs have write access
  - Main branch is protected (require PR review)

- [ ] **Vercel Setup**
  - Repo connected to Vercel
  - Environment variables set (DATABASE_URL, NEXTAUTH_SECRET, etc.)
  - Staging environment created (auto-deploy from `staging` branch)

- [ ] **Slack Channels**
  - #engineering-week2 (daily standup)
  - #engineering-blockers (post immediately if stuck)
  - #deploy-log (auto-notifications from Vercel)

- [ ] **Database Access**
  - All devs can access Turso dashboard
  - Backup verified (Turso auto-backs up)
  - Staging DB created (separate from production)

- [ ] **Monitoring**
  - Sentry.io account (for error tracking) — TBD, add later
  - Vercel Analytics dashboard accessible to all
  - Log into Vercel and verify builds are working

- [ ] **Communication**
  - Daily standup: 9am (15 min, async Slack or sync call)
  - Code review: any PR waits max 24 hours for review
  - Blockers: post in #engineering-blockers immediately

---

## 📊 **Week 2 Success Criteria**

By end of Friday (June 8):

### Feature Completion
- ✅ Car comparison modal works (compare 2–3 cars)
- ✅ Seller verification badges visible on listings
- ✅ Featured listing upsell button clickable
- ✅ Lead export CSV downloadable
- ✅ Price drop alerts togglable
- ✅ Hero image displays correctly
- ✅ Image gallery zoom works on mobile
- ✅ WhatsApp share button opens chat

### Technical
- ✅ Zero TypeScript errors (`pnpm build` passes)
- ✅ No console errors/warnings
- ✅ Mobile responsive (test on iPhone 12, Pixel 5)
- ✅ Page load time <2s (Lighthouse score >80)
- ✅ All PRs merged to main
- ✅ Zero critical bugs in Sentry

### Metrics
- ✅ Feature flag analytics tracking comparisons clicked
- ✅ Email test delivered successfully
- ✅ CSV export opens in Excel without errors
- ✅ Performance: API response <500ms

---

## 🚀 **Week 3 Preview (Start Monday, June 11)**

Once Week 2 ships, immediately start Week 3:

```
Week 3 Focus: Seller Flow + Saved Searches

Tasks:
├─ Private seller OTP system (3 days)
│   Backend: /api/seller/request-otp, /api/seller/verify-otp
│   Frontend: /sell, /sell/list form
│
├─ Saved searches + notifications (2 days)
│   Backend: Save filter combos, notify on new cars
│   Frontend: "Save search" button, notification bell
│
├─ Bulk car upload (2 days)
│   Backend: CSV parser, validation
│   Frontend: Drag-drop upload UI
│
└─ Admin moderation (2 days)
    Frontend: Approve/reject seller listings
    Backend: Status workflow, email notifications

Timeline: Complete by Friday, June 15
Deploy: Saturday 10am
```

---

## 🎯 **The Next 6 Weeks at a Glance**

```
Week 1 ✅   Foundation (DB, auth, pages)
Week 2 📍   Quick wins (comparison, badges, alerts) ← START HERE
Week 3 🚧   Seller flow + saved searches
Week 4 🚧   Analytics + lead routing
Week 5 🚧   Dealer portal complete
Week 6 🚧   Payments + affiliate program

LAUNCH: End of Week 6
```

---

## ⚠️ **Risk Mitigation**

**If someone gets sick/leaves:**
- Pair programming on Days 1–2 (knowledge transfer)
- No single person owning critical path
- Code reviews mandatory (catch mistakes early)

**If feature takes longer than planned:**
- Cut lowest-priority item (WhatsApp share → Week 3)
- Extend Friday testing window
- Ship with known issue if not breaking

**If bug found Friday afternoon:**
- Fix it immediately (emergency commit + review)
- If can't fix by 4pm, rollback to last deploy
- Postmortem Monday (why did it slip through?)

**If team blocked:**
- Post in #engineering-blockers immediately
- Tech lead (@you) unblocks in <2 hours
- Escalate if needed

---

## 📱 **How to Run Daily Standup**

**Time**: 9am sharp (15 min)  
**Format**: Async Slack or 5-min sync call

**Each person says:**
1. **What shipped yesterday?**
   - Example: "Finished car comparison modal, open for review"

2. **What shipping today?**
   - Example: "Testing comparison on mobile, will submit PR by 4pm"

3. **Any blockers?**
   - Example: "Need design feedback on badge colors by 11am"

**Standup Template** (post in #engineering-week2):
```
🟢 [NAME]
Yesterday: [SHIPPED]
Today: [SHIPPING]
Blockers: [NONE / SPECIFIC ITEM]
```

---

## 💰 **Revenue Tracking**

Set up a simple spreadsheet (Google Sheets) to track:

```
WEEK 2 REVENUE IMPACT

Feature               Revenue/Year  Status
────────────────────────────────────────
Car Comparison        N/A (engaged)  🚧
Seller Badges         +40% trust     🚧
Featured Listings     ₹2.5L          🚧
Lead Export CSV       +dealer ROI    🚧
Price Alerts          +30% repeat    🚧
Hero Redesign         +UX appeal     🚧
Image Zoom            +conversion    🚧
WhatsApp Share        +frictionless  🚧

TOTAL REVENUE IMPACT:  ₹2.5L + trust/repeat (measurable by Week 4)
```

Update daily. Share Friday.

---

## 📞 **Point of Contact (Your Responsibilities)**

As product lead, you should:

- ✅ **Monday 9am**: Lead kickoff meeting
- ✅ **Daily 9am**: Read standup, unblock any issues
- ✅ **Wed 2pm**: Mid-week check-in (on track?)
- ✅ **Fri 3pm**: Feature freeze announcement
- ✅ **Fri 5pm**: Final sign-off to deploy
- ✅ **Sat 10am**: Monitor first 30 min of production deploy
- ✅ **Mon morning**: Celebrate wins + retrospective

**If anything breaks over weekend**: You get the alert (Sentry/Vercel). Emergency rollback plan is one-click on Vercel dashboard.

---

## 🎉 **End Goal (6 Weeks from Now)**

```
TODAY (Week 1):        12 features, ₹0 revenue, 0 dealers
WEEK 2 (June 8):       +8 features, ₹2.5L/year (featured listings)
WEEK 4 (June 22):      +20 features, ₹10L/year (upsells + affiliate)
WEEK 6 (July 6):       30+ features, ₹47.5L/year, LAUNCH READY

Metrics at launch:
├─ 50 dealers onboarded
├─ 500 private sellers
├─ 2,000 cars listed
├─ 10,000 monthly buyers
├─ <2s page load
├─ 99.5% uptime
└─ Ready to handle 100K users
```

---

## ✅ **Action Items (Assign to Someone)**

| Task | Owner | Due | Notes |
|------|-------|-----|-------|
| Schedule team kickoff | @you | Today | Send calendar invite |
| Create GitHub project board | @devops | Today | Set up columns, add tasks |
| Assign Week 2 tasks to devs | @you | Today | Use template above |
| Set up #engineering-week2 channel | @devops | Today | Pin IMPLEMENTATION_PRIORITY.md |
| Verify Vercel + database access | @devops | Today | Check everyone can login |
| Setup monitoring (Sentry) | @devops | This week | Error tracking for Week 2 |
| Create revenue tracking sheet | @pm | This week | Weekly updates |
| Schedule daily standups | @you | Today | 9am every weekday |
| Create rollback plan doc | @devops | This week | What to do if deploy breaks |

---

## 🚨 **Do NOT Do**

- ❌ Start building without team kickoff (context matters)
- ❌ Skip mobile testing (70% of traffic is mobile)
- ❌ Deploy Friday evening (no one around to fix bugs)
- ❌ Merge to main without review (catches bugs early)
- ❌ Ignore blockers (escalate immediately)
- ❌ Work weekends (6-week sprint is hard, need rest)

---

## 📞 **Emergency Contacts**

If production breaks:
- Tech Lead: @[name] → Vercel rollback, incident response
- Backend: @[name] → API/database issues
- Frontend: @[name] → UI/rendering issues
- DevOps: @[name] → Infrastructure, Vercel, Turso

Response time: <30 min (SLA for production incidents)

---

**TLDR: Today, run kickoff, assign Week 2 tasks, start building. Ship by Friday. Repeat for 6 weeks. Launch.**

---

**Document Version**: 1.0  
**Date**: June 4, 2026  
**Next Review**: June 8, 2026 (end of Week 2)
