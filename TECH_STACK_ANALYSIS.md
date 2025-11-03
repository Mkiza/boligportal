# Tech Stack Analysis for Boligportal (CopenHome)

**Date:** November 3, 2025  
**Project:** Apartment Rental Website for Copenhagen  
**Current Status:** Design mockups only - no development started

---

## Executive Summary

After analyzing the Figma design mockups in the Design folder, I've identified a comprehensive apartment listing platform with features for both tenants and landlords. This document provides tech stack recommendations for building a production-ready application.

---

## Features Identified from Design Mockups

### Frontend Pages
1. **Landing Page** - Hero section with search (location, price, rooms), statistics, featured properties
2. **Listings Page** - Property grid with advanced filters (price slider, rooms, features, availability)
3. **Property Detail Page** - Image carousel, property info, landlord contact, booking viewings
4. **Landlord Dashboard** - Property management (CRUD operations), statistics, booking requests, messages
5. **User Account Page** - Saved properties, messages, bookings, search alerts
6. **Mobile Views** - Fully responsive designs for all pages

### Core Features Required
- **Search & Filtering** - Location, price range, rooms, features, availability
- **User Authentication** - Separate roles for tenants and landlords
- **Property Management** - Landlords can add, edit, delete listings
- **Favorites System** - Users can save properties
- **Messaging** - Direct communication between tenants and landlords
- **Booking System** - Schedule and manage property viewings
- **Verification System** - Verified landlord badges
- **Image Management** - Upload and display property photos
- **Notifications** - Search alerts and email notifications
- **Internationalization** - Danish and English language support

### Design System (Already Implemented)
- React + Vite + TypeScript
- Tailwind CSS
- shadcn/ui component library
- Custom color palette:
  - Copenhagen Blue (#1B4F72) - Primary
  - Copenhagen Gold (#F4A300) - Accent/CTAs
  - Copenhagen Green (#2C9F5D) - Success/Trust
- Mobile-first responsive design

---

## Recommended Tech Stack (Primary)

### Frontend: Next.js Full-Stack Approach

**Technology:** Next.js 14+ (App Router) + TypeScript + Tailwind CSS + shadcn/ui

**Rationale:**
- **SEO Critical** - Property listings need to be discoverable by search engines. Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box
- **Performance** - Built-in image optimization, code splitting, and caching
- **Developer Experience** - File-based routing, server components, API routes
- **Easy Migration** - Your existing React/Vite/TypeScript/Tailwind/shadcn components can be ported easily
- **Deployment** - Seamless deployment on Vercel with zero configuration

**Additional Frontend Libraries:**
- **TanStack Query (React Query)** - Server state management, caching, optimistic updates
- **Zod** - Schema validation for forms and API responses
- **react-hook-form** - Form handling with validation
- **next-intl** - Internationalization for Danish/English support
- **Framer Motion** - Animations (optional, for enhanced UX)

### Backend & Database: Supabase

**Technology:** Supabase (PostgreSQL + Auth + Storage + Realtime)

**Rationale:**
- **All-in-One Solution** - Covers authentication, database, file storage, and realtime in one platform
- **PostgreSQL** - Powerful relational database with excellent support for complex queries and filtering
- **Row Level Security (RLS)** - Built-in security policies to isolate tenant/landlord data
- **Authentication** - Email/password + OAuth providers with role-based access control
- **File Storage** - Managed storage for property images with signed URLs
- **Realtime** - WebSocket-based realtime for messaging without additional infrastructure
- **EU Data Residency** - Supabase offers EU regions (important for GDPR compliance)
- **Developer Experience** - Excellent TypeScript SDK, auto-generated types from schema

**Database Schema (High-Level):**
```
- users (id, email, role, verified, created_at)
- profiles (user_id, name, phone, avatar_url, bio)
- properties (id, landlord_id, title, description, location, price, rooms, size, features, images, verified, created_at)
- favorites (user_id, property_id, created_at)
- conversations (id, property_id, tenant_id, landlord_id, created_at)
- messages (id, conversation_id, sender_id, content, created_at)
- bookings (id, property_id, tenant_id, landlord_id, date, time, status, created_at)
- saved_searches (user_id, criteria, created_at)
```

### Search & Filtering

**Initial Approach:** PostgreSQL with proper indexes
- B-tree indexes on price, rooms, location
- Full-text search on title/description
- Composite indexes for common filter combinations

**Future Enhancement:** If search becomes complex or slow, integrate Meilisearch or Algolia

### File Storage & Images

**Solution:** Supabase Storage
- Upload property images with validation (type, size, dimensions)
- Generate thumbnails automatically
- Serve via CDN with signed URLs
- Use Next.js Image component for optimization

### Authentication & Authorization

**Solution:** Supabase Auth + Row Level Security
- Email/password authentication
- OAuth providers (Google, Facebook) optional
- Role-based access: `tenant` and `landlord`
- RLS policies to ensure users only access their own data
- Verified landlord status stored in profiles table

### Real-time Messaging

**Solution:** Supabase Realtime
- Subscribe to conversation channels
- Instant message delivery
- Typing indicators (optional)
- Read receipts (optional)

### Notifications & Alerts

**Email:** Resend or SendGrid
- Booking confirmations
- New message notifications
- Search alert digests

**Scheduling:** Vercel Cron or Supabase Edge Functions
- Daily/weekly search alert emails
- Reminder emails for upcoming viewings

### Deployment

**Frontend:** Vercel
- Automatic deployments from Git
- Preview deployments for PRs
- Edge network for global performance
- Built-in analytics

**Backend:** Supabase Cloud
- Managed PostgreSQL
- Automatic backups
- EU region available
- Built-in monitoring

---

## Alternative Tech Stack (Python Backend)

If you prefer a separate backend or Python ecosystem:

### Frontend
- **Next.js** (same as primary recommendation for SEO benefits)

### Backend
- **FastAPI** + PostgreSQL + SQLAlchemy + Alembic
- **Redis** for caching and session management
- **WebSockets** (FastAPI native or Socket.IO) for real-time messaging
- **Celery/Arq** for background jobs (email sending, search alerts)
- **AWS S3 or MinIO** for file storage

### Deployment
- **Frontend:** Vercel
- **Backend:** Fly.io or Railway
- **Database:** Managed PostgreSQL (Supabase, Neon, or Railway)

**Trade-offs:**
- More infrastructure to manage
- Slower initial development
- More flexibility and control
- Access to Python ecosystem (ML, data processing)

---

## Why NOT Keep Vite SPA?

While the existing Design folder uses Vite, I recommend migrating to Next.js for the actual application:

**Reasons:**
1. **SEO is Critical** - Property listings must be discoverable by Google. A client-side SPA has poor SEO without SSR
2. **Performance** - Server-side rendering provides faster initial page loads
3. **Image Optimization** - Next.js Image component provides automatic optimization
4. **Easy Migration** - Your existing components are React/TypeScript/Tailwind and will work in Next.js with minimal changes

**Migration Path:**
- Keep the Design folder as a reference/design system
- Create a new `app/` directory for the Next.js application
- Port components from Design folder to Next.js app
- Add server-side data fetching and API routes

---

## Database Schema Considerations

### Key Design Decisions

**IDs:** Use UUIDs for all primary keys (better for distributed systems, no enumeration attacks)

**Slugs:** Generate URL-friendly slugs for properties (e.g., `/property/modern-2-room-vesterbro-abc123`)

**Indexes:** Create indexes on:
- `properties.location` (for location filtering)
- `properties.price` (for price range queries)
- `properties.rooms` (for room filtering)
- `properties.created_at` (for sorting by newest)
- Composite index on `(location, price, rooms)` for common filter combinations

**Soft Deletes:** Consider soft deletes for properties (keep historical data, prevent broken links)

**Image Storage:** Store image URLs in JSONB array in properties table, with order preserved

---

## Security Considerations

### Authentication
- Enforce strong password requirements
- Implement rate limiting on login attempts
- Use secure session management
- Add email verification for new accounts

### Authorization
- Implement Row Level Security (RLS) policies in Supabase
- Landlords can only modify their own properties
- Tenants can only see their own favorites, messages, bookings
- Verified status can only be set by admins

### File Uploads
- Validate file types (only images)
- Limit file sizes (e.g., 5MB per image)
- Strip EXIF data to protect privacy
- Scan for malware (optional, via third-party service)

### Rate Limiting
- Limit message sending to prevent spam
- Rate limit search queries
- Add CAPTCHA for contact forms (if unauthenticated contact is added)

### GDPR Compliance
- Data residency in EU (Supabase EU region)
- User data export functionality
- Account deletion with data cleanup
- Cookie consent banner
- Privacy policy and terms of service

---

## Development Roadmap

### Phase 1: Foundation (Week 1-2)
1. Set up Next.js project with TypeScript, Tailwind, shadcn/ui
2. Set up Supabase project (database, auth, storage)
3. Design and implement database schema
4. Set up authentication (email/password)
5. Port design components from Design folder

### Phase 2: Core Features (Week 3-4)
1. Implement property listing pages (landing, listings, detail) - READ ONLY
2. Add search and filtering functionality
3. Implement landlord dashboard (property CRUD)
4. Add image upload functionality
5. Deploy to Vercel + Supabase

### Phase 3: User Features (Week 5-6)
1. Implement favorites system
2. Add user account pages
3. Implement booking system
4. Add email notifications

### Phase 4: Communication (Week 7-8)
1. Implement real-time messaging
2. Add conversation management
3. Implement search alerts
4. Add notification preferences

### Phase 5: Polish & Launch (Week 9-10)
1. Add internationalization (Danish/English)
2. Implement landlord verification workflow
3. Add admin panel for verification
4. Performance optimization
5. SEO optimization (meta tags, sitemaps, structured data)
6. Security audit
7. User testing and bug fixes

---

## Cost Estimation (Monthly)

### Primary Stack (Next.js + Supabase)

**Supabase:**
- Free tier: $0 (500MB database, 1GB file storage, 2GB bandwidth)
- Pro tier: $25/month (8GB database, 100GB storage, 250GB bandwidth)
- Recommended: Start with Free, upgrade to Pro when needed

**Vercel:**
- Hobby: $0 (100GB bandwidth, unlimited deployments)
- Pro: $20/month (1TB bandwidth, advanced features)
- Recommended: Start with Hobby

**Email (Resend):**
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails/month

**Total Initial Cost:** $0-45/month depending on traffic

### Alternative Stack (FastAPI Backend)

**Fly.io (Backend):**
- ~$10-30/month for small instance

**Supabase (Database only):**
- $25/month for Pro tier

**AWS S3 (Storage):**
- ~$5-10/month for images

**Vercel (Frontend):**
- $0-20/month

**Total Initial Cost:** $40-85/month

---

## Questions for You

Before proceeding with implementation, I'd like to clarify:

1. **Confirmation:** Did you mean "tech stack" (not "test tack")? I'm assuming you want technology recommendations.

2. **Backend Preference:** Do you prefer:
   - Option A: Next.js + Supabase (faster development, managed services)
   - Option B: Next.js + FastAPI (more control, Python ecosystem)

3. **Timeline:** What's your target launch date?

4. **Budget:** Any budget constraints for hosting and services?

5. **Business Model:** Will landlords pay to list properties? (This affects payment integration needs)

6. **Admin Access:** How will landlord verification be handled? Manual admin review?

7. **Maps:** Do you need interactive maps for property locations? (Mapbox, Google Maps)

8. **Additional Features:** Any features not shown in the mockups that you want to include?

---

## Next Steps

Once you confirm your preferences, I can:

1. **Set up the development environment** with the chosen tech stack
2. **Create the database schema** and set up Supabase
3. **Port the design components** from the Design folder to a new Next.js app
4. **Implement core features** following the development roadmap
5. **Deploy a working prototype** for you to test

The Design folder will remain as a reference for the design system and components.

---

## Conclusion

**My Recommendation:** Go with the **Primary Stack (Next.js + Supabase)** for the following reasons:

1. **Faster Time to Market** - Managed services mean less infrastructure to build and maintain
2. **Lower Initial Cost** - Can start on free tiers and scale as needed
3. **Better SEO** - Next.js SSR ensures property listings are discoverable
4. **Excellent Developer Experience** - Modern tooling with great TypeScript support
5. **EU Compliance** - Supabase EU region for GDPR compliance
6. **Scalability** - Can handle significant traffic without major rewrites

This stack will allow you to launch a production-ready apartment listing platform efficiently while maintaining high code quality and user experience.
