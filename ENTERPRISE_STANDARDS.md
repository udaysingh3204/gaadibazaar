# Enterprise Standards & Best Practices

**How we ensure GaadiBazaar is production-grade, scalable, and maintainable.**

---

## 1. Code Quality Standards

### TypeScript & Type Safety
- ✅ **Strict Mode Enabled** (`tsconfig.json`)
  - All variables must be explicitly typed
  - No implicit `any` (except legacy data handling)
  - Null/undefined checks enforced

- ✅ **Prisma Types**
  - Import types from `@prisma/client`
  - Use generated types everywhere (API responses, component props)
  - Example: `type Car = Prisma.CarGetPayload<...>`

- 📋 **Checklist for PRs**:
  ```bash
  # Before committing
  pnpm build  # Must pass TypeScript checks
  pnpm lint   # Must pass ESLint (coming)
  ```

### Component Architecture
- **Single Responsibility**: Each component does one thing well
- **Props Type Safety**: Use `interface ComponentProps { ... }`
- **Avoid Prop Drilling**: Use Zustand for shared state
- **Example**:
  ```typescript
  // Good ✅
  interface CarCardProps {
    car: Car;
    onWishlistToggle: (id: string) => void;
  }
  
  // Bad ❌
  function CarCard(props: any) { ... }
  ```

### API Route Standards
- **Request Validation**: Always validate request body/params
  ```typescript
  // Use Zod for runtime validation
  const createCarInput = z.object({
    brand: z.string().min(1),
    askingPrice: z.number().int().positive(),
  });
  
  const body = createCarInput.parse(req.body); // Throws if invalid
  ```

- **Response Format**: Consistent JSON structure
  ```typescript
  // Success
  { success: true, data: { ... }, message?: "..." }
  
  // Error
  { success: false, error: "...", status: 400 }
  ```

- **Error Handling**: Never leak sensitive data
  ```typescript
  // Bad ❌
  catch (error) { return Response.json({ error: error.message }) }
  
  // Good ✅
  catch (error) {
    console.error(error); // Log for debugging
    return Response.json({ error: "Internal error" }, { status: 500 })
  }
  ```

---

## 2. Database Standards

### Schema Design
- ✅ **Semantic Naming**
  - Models: PascalCase (User, Dealer, Car)
  - Fields: camelCase (firstName, createdAt)
  - Enums: SCREAMING_SNAKE_CASE (ACTIVE, PENDING)

- ✅ **Foreign Keys & Relations**
  - Always explicit `@relation(fields: [...], references: [...], onDelete: ...)`
  - Set cascade/setnull based on business logic
  - Document why in comments for complex relations

- ✅ **Timestamps**
  - Every model should have `createdAt` and `updatedAt`
  - Use `@default(now())` and `@updatedAt`

### Migrations
- **Always Test Locally First**
  ```bash
  # Create migration
  pnpm prisma migrate dev --name add_feature
  
  # Test with seed data
  pnpm prisma db seed
  
  # Verify data looks correct
  pnpm prisma studio
  ```

- **Backward Compatibility**
  - New columns should be nullable or have defaults
  - Don't rename columns (create new, deprecate old)
  - Never delete columns without deprecation period

- **Production Deployments**
  ```bash
  # Pull latest env from Vercel
  vercel env pull
  
  # Run migration against production
  pnpm prisma migrate deploy
  
  # Rollback plan: `vercel rollback` if something breaks
  ```

### Query Optimization
- **Avoid N+1 Queries**
  ```typescript
  // Bad ❌ — Makes 1 + N queries
  const cars = await prisma.car.findMany();
  for (const car of cars) {
    car.dealer = await prisma.dealer.findUnique({ where: { id: car.dealerId } });
  }
  
  // Good ✅ — Single query with include
  const cars = await prisma.car.findMany({
    include: { dealer: true },
  });
  ```

- **Index Important Fields**
  - `dealerId`, `sellerId`, `status`, `city` (used in filters)
  - Example: `@@index([dealerId])` in schema

---

## 3. Security Standards

### Authentication
- ✅ **NextAuth Configuration**
  - JWT secret from environment: `NEXTAUTH_SECRET` (32+ char, random)
  - Session callback: Add user role/dealerId to token
  - Callback validation: Check user.id exists before granting access

- ✅ **Password Security** (Dealers)
  ```typescript
  // Use bcrypt for password hashing (installed in package.json)
  import bcrypt from 'bcrypt';
  
  // Hash before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Verify on login
  const isValid = await bcrypt.compare(password, user.password);
  ```

### Authorization
- **Role-Based Access Control (RBAC)**
  ```typescript
  // Middleware: Check user role before handling request
  if (session?.user?.userType !== 'dealer') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Also check resource ownership
  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (car.dealerId !== session.user.dealerId) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  ```

### Data Protection
- **No Hardcoded Secrets**: Use `.env.local` (never commit)
- **SQL Injection**: Prisma prevents this (use parameterized queries)
- **XSS Prevention**: Next.js auto-escapes, but sanitize user input if needed
  ```typescript
  import DOMPurify from 'isomorphic-dompurify';
  const clean = DOMPurify.sanitize(userInput);
  ```

- **HTTPS Only**: Vercel enforces; never allow HTTP in production
- **CORS**: Restrict API to your domain (Vercel dashboard settings)

---

## 4. Performance Standards

### Frontend
- **Core Web Vitals Target**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

- **Image Optimization**
  ```typescript
  // Always use Next.js Image component
  import Image from 'next/image';
  
  <Image
    src={url}
    alt="description"
    width={400}
    height={300}
    sizes="(max-width: 640px) 100vw, 50vw"
    priority={isAboveFold}
  />
  ```

- **Code Splitting**: Next.js does this automatically via dynamic imports
  ```typescript
  const AdminPanel = dynamic(() => import('@/components/admin/Panel'), {
    loading: () => <div>Loading...</div>,
  });
  ```

- **Lazy Loading**: Use Suspense for slow-loading sections
  ```typescript
  <Suspense fallback={<Skeleton />}>
    <ExpensiveComponent />
  </Suspense>
  ```

### Backend
- **API Response Time Target**: <500ms (p95)
  ```typescript
  // Add performance monitoring
  console.time('fetch-cars');
  const cars = await prisma.car.findMany({ take: 12 });
  console.timeEnd('fetch-cars');
  ```

- **Database Connection Pooling**: Prisma handles this
- **API Rate Limiting** (add later):
  ```typescript
  // Use upstash or similar for distributed rate limiting
  const rateLimit = await redis.incr(`api:${ip}`);
  if (rateLimit > 100) return Response.json({ error: 'Rate limited' }, { status: 429 });
  ```

---

## 5. Testing Standards

### Unit Tests (TBD, Phase 3)
- **Utility Functions**: Test `formatIndianPrice()`, `calculateEMI()`, etc.
- **Tool**: Jest + React Testing Library
- **Target**: 80% coverage for critical paths

### Integration Tests (TBD, Phase 3)
- **API Routes**: Test `/api/cars` GET, POST, filtering
- **Database**: Test migrations, seed data
- **Tool**: Jest + MSW (Mock Service Worker) for HTTP mocking

### E2E Tests (TBD, Phase 3)
- **Critical User Flows**:
  - Buyer: Browse → View detail → Add to wishlist
  - Seller: List car → Upload images → Submit → Admin approves
  - Dealer: Login → Create listing → View leads
- **Tool**: Playwright or Cypress

### Pre-Commit Hooks (TBD)
```bash
# Install husky
npm install husky --save-dev
npx husky install

# Create hook: .husky/pre-commit
# Content: pnpm lint && pnpm build
```

---

## 6. Monitoring & Observability

### Error Tracking (TBD, Phase 3)
- **Tool**: Sentry.io
- **Setup**: Catch unhandled errors, sourcemaps, alerts
- **Alert Threshold**: Page error rate > 1% → Slack notification

### Performance Monitoring
- **Web Vitals**: Vercel provides dashboard automatically
- **API Metrics**: Track response times, error rates
- **Database Metrics**: Turso dashboard shows query performance

### Logging
- **Development**: Use `console.log()`, `console.error()`
- **Production**: Log to external service (e.g., Datadog, LogRocket)
- **Sensitive Data**: NEVER log passwords, tokens, or PII

---

## 7. Deployment Standards

### Pre-Deployment Checklist
- [ ] All tests pass: `pnpm test` (when available)
- [ ] TypeScript checks pass: `pnpm build`
- [ ] No console warnings/errors in dev build
- [ ] Database migrations reviewed and backward-compatible
- [ ] Environment variables set in Vercel dashboard
- [ ] Tested locally with realistic data
- [ ] PR reviewed and approved by another engineer

### Deployment Process
```bash
# 1. Create PR, get approval
# 2. Merge to main
# 3. Vercel auto-deploys to vercel-staging.com
# 4. Run smoke tests on staging
# 5. Click "Promote to Production" in Vercel dashboard
# 6. Verify production is live
# 7. Monitor error tracking (Sentry) for 1 hour
```

### Rollback Plan
```bash
# If something breaks in production:
# 1. Click "Deployments" in Vercel dashboard
# 2. Find previous good deployment
# 3. Click "Promote to Production"
# 4. Postmortem: Why did it break? Fix in code.
```

---

## 8. Documentation Standards

### Code Comments
- **Write comments for the WHY, not the WHAT**
  ```typescript
  // Bad ❌
  // Set dealerId to user dealerId
  dealerId = user.dealerId;
  
  // Good ✅
  // Ensure car belongs to current dealer (security check)
  if (car.dealerId !== user.dealerId) throw new Error('Unauthorized');
  ```

- **Complex Logic**: Document non-obvious algorithms
- **Tricky Workarounds**: Explain the constraint that forced this approach

### API Documentation (TBD)
- **Tool**: Swagger/OpenAPI
- **Format**:
  ```yaml
  GET /api/cars
  Parameters: page, limit, brand, city, minPrice, maxPrice
  Response: { success: true, data: Car[], total: number }
  Status Codes: 200 OK, 400 Bad Request, 500 Internal Error
  ```

### Runbooks (TBD)
- **Database is slow**: How to identify bottleneck queries
- **Payment gateway down**: How to handle failed charges
- **User data loss**: Recovery procedures
- **Security breach**: Incident response protocol

---

## 9. Git & Code Review Standards

### Branch Naming
```
feature/seller-otp              # New feature
fix/wishlist-scroll-bug         # Bug fix
refactor/api-response-format    # Code cleanup
docs/api-guide                  # Documentation
chore/upgrade-dependencies      # Dependency updates
```

### Commit Messages
```
feat: implement OTP verification for sellers

- Add OtpRequest model to Prisma schema
- Create /api/seller/request-otp endpoint
- Integrate Resend for email delivery

Fixes #42
```

### PR Requirements
- [ ] Clear title and description
- [ ] Links to related issues/tasks
- [ ] Screenshots for UI changes
- [ ] Performance impact assessed
- [ ] Database migration tested
- [ ] 2+ reviewers approve

### Code Review Checklist
- ✅ Code works (test it locally)
- ✅ No console errors/warnings
- ✅ TypeScript passes
- ✅ Follows project conventions
- ✅ No security issues
- ✅ No hardcoded secrets
- ✅ Database backward compatible
- ✅ Comments explain complex logic

---

## 10. Team Practices

### Daily Standup
- **What did you ship yesterday?**
- **What are you shipping today?**
- **Any blockers?**
- **Time**: 15 min, async Slack or 9am sync if needed

### Weekly Architecture Review
- **Friday 4pm**: Discuss technical decisions, debt, refactors
- **Attendees**: All engineers + tech lead
- **Output**: Updated ADR (Architecture Decision Records)

### Code Ownership
| Component | Owner | Backup |
|---|---|---|
| Frontend (UI) | Frontend Lead | Fullstack |
| API / Backend | Backend Lead | Fullstack |
| Database / Prisma | Backend Lead + DevOps | Product |
| Deployment / Vercel | DevOps | Tech Lead |
| Testing | QA Lead | All |

**Pair programming** for high-risk areas (auth, payments, migrations).

---

## 11. When to Refactor vs. Ship

### Refactor When:
- Code blocks new features (technical debt becoming velocity killer)
- Same pattern repeated 3+ times (DRY principle)
- Tests catch bugs that refactoring would prevent
- You estimate refactor saves >20% of future development time

### Don't Refactor When:
- There's a user-facing deadline
- The code "feels" bad but works fine
- You're mid-feature (finish first, then refactor)
- You don't have tests (add tests first, then refactor safely)

---

## 12. Scaling Checklist

As we grow from 1K users → 100K users → 1M users:

**At 10K MAU**:
- [ ] Monitor database query times (Turso dashboard)
- [ ] Set up Sentry error tracking
- [ ] Implement API rate limiting
- [ ] Cache frequently-accessed data (Redis later)

**At 100K MAU**:
- [ ] Migrate to PostgreSQL if SQLite feels limiting
- [ ] Implement data pagination (already done ✓)
- [ ] Archive old data / implement partitioning
- [ ] Hire dedicated DevOps engineer

**At 1M MAU**:
- [ ] Multiple database replicas (read/write separation)
- [ ] Microservices architecture (if bottlenecks exist)
- [ ] Global CDN for static assets (Vercel handles)
- [ ] Dedicated SRE team

---

## Final Checklist for "Enterprise Ready"

- ✅ Type-safe codebase (TypeScript strict mode)
- ✅ Automated testing (TBD, Phase 3)
- ✅ Security audits (TBD, Phase 3)
- ✅ Error tracking (TBD, Phase 3)
- ✅ Performance monitoring (Vercel built-in)
- ✅ Database backups (Turso handles)
- ✅ Code review process (GitHub PRs)
- ✅ Documentation (this file + roadmap)
- ✅ Deployment automation (Vercel auto-deploy)
- ✅ Runbooks for common issues (TBD, Phase 3)
- ✅ Multi-environment setup (dev, staging, prod)
- ✅ Incident response plan (TBD, Phase 3)

---

**Document Version**: 1.0  
**Last Updated**: May 29, 2026  
**Review Cycle**: Quarterly (check if standards still fit at 100K users, 1M users, etc.)
