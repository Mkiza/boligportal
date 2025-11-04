# Supabase Database Setup

This directory contains the database schema and migration files for the CopenHome apartment rental platform.

## Files

- `migrations/20251104000000_initial_schema.sql` - Initial database schema with all tables, indexes, RLS policies, and functions
- `../DATABASE_SCHEMA.md` - Comprehensive documentation of the database design

## Applying the Migration

### Option 1: Using Supabase Dashboard (Recommended for Initial Setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `migrations/20251104000000_initial_schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the migration

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your Supabase project
supabase link --project-ref your-project-ref

# Apply the migration
supabase db push
```

### Option 3: Manual SQL Execution

You can also connect to your Supabase database using any PostgreSQL client and execute the SQL file directly.

## What the Migration Creates

### Tables
1. **profiles** - User profiles extending auth.users
2. **properties** - Property listings
3. **favorites** - Saved properties
4. **conversations** - Message threads
5. **messages** - Individual messages
6. **bookings** - Property viewing appointments
7. **saved_searches** - Search alerts
8. **property_views** - Analytics tracking

### Security
- Row Level Security (RLS) enabled on all tables
- Policies ensure users can only access their own data
- Landlords can only modify their own properties
- Proper foreign key constraints with cascading deletes

### Functions & Triggers
- Auto-update `updated_at` timestamps
- Auto-create profile on user signup
- Update conversation metadata on new messages
- Update property favorite counts

### Storage Buckets
- `property-images` - For property photos
- `avatars` - For user profile pictures

## Verifying the Migration

After applying the migration, verify it was successful:

1. Check that all tables exist in the **Table Editor**
2. Verify RLS policies are enabled in the **Authentication > Policies** section
3. Check that storage buckets were created in the **Storage** section

## Next Steps

After applying the migration:

1. Generate TypeScript types from the schema
2. Test the database connection from the Next.js app
3. Create seed data for testing (optional)
4. Set up authentication in the app

## Troubleshooting

### PostGIS Extension Error
If you get an error about the PostGIS extension, you may need to enable it manually:
1. Go to **Database > Extensions** in Supabase dashboard
2. Enable the **postgis** extension

### Storage Bucket Errors
If storage bucket creation fails, you can create them manually:
1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Create `property-images` and `avatars` buckets with public access

### RLS Policy Errors
If RLS policies fail, check that:
- The `auth.users` table exists (it should be created automatically by Supabase)
- You're running the migration as a superuser or with sufficient privileges

## Schema Documentation

For detailed documentation of the database schema, see `../DATABASE_SCHEMA.md`.
