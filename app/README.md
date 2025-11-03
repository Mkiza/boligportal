# CopenHome - Apartment Rental Platform

This is the main Next.js application for the CopenHome apartment rental platform. The application is built with Next.js 14+, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **Internationalization**: next-intl (Danish/English)
- **Icons**: Lucide React

## Design System

The application uses a custom Copenhagen-inspired color palette:

- **Copenhagen Blue** (#1B4F72) - Primary brand color
- **Copenhagen Gold** (#F4A300) - Accent and CTAs
- **Copenhagen Green** (#2C9F5D) - Success and trust indicators

All design mockups are available in the `/Design` folder at the repository root.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles with custom CSS variables
│   ├── components/       # React components (to be added)
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions
│       └── utils.ts     # cn() utility for Tailwind classes
├── public/              # Static assets
└── package.json         # Dependencies
```

## Features (Planned)

### For Tenants
- Search and filter apartments by location, price, rooms, and features
- View detailed property information with image galleries
- Save favorite properties
- Message landlords directly
- Book property viewings
- Set up search alerts for new listings

### For Landlords
- Create and manage property listings
- Upload property photos
- View listing statistics (views, messages)
- Manage booking requests
- Communicate with potential tenants

### General
- User authentication (email/password)
- Role-based access (tenant/landlord)
- Verified landlord badges
- Multi-language support (Danish/English)
- Mobile-responsive design

## Development Roadmap

See `/TECH_STACK_ANALYSIS.md` in the repository root for the complete development roadmap and technical specifications.

## Database Schema

The database schema will be set up in Supabase with the following main tables:

- `users` - User accounts
- `profiles` - User profiles (tenant/landlord info)
- `properties` - Property listings
- `favorites` - Saved properties
- `conversations` - Message threads
- `messages` - Individual messages
- `bookings` - Viewing appointments
- `saved_searches` - Search alerts

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all required environment variables.

## Next Steps

1. Set up Supabase project and configure environment variables
2. Create database schema and Row Level Security policies
3. Port design components from `/Design` folder
4. Implement authentication flow
5. Build core features (property listings, search, messaging, etc.)

## Contributing

This is a private project. Please follow the established code style and conventions.
