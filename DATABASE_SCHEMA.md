# CopenHome Database Schema Design

**Date:** November 4, 2025  
**Project:** Apartment Rental Platform (CopenHome)  
**Database:** Supabase (PostgreSQL)

---

## Overview

This document defines the complete database schema for the CopenHome apartment rental platform. The schema supports features for both tenants and landlords including property listings, search, favorites, messaging, bookings, and user management.

---

## Core Principles

1. **Row Level Security (RLS)** - All tables use RLS policies to ensure users can only access their own data
2. **Soft Deletes** - Important records use `deleted_at` timestamps instead of hard deletes
3. **Audit Trails** - All tables include `created_at` and `updated_at` timestamps
4. **UUID Primary Keys** - All tables use UUIDs for primary keys for better security and distribution
5. **Foreign Key Constraints** - Proper relationships with cascading deletes where appropriate

---

## Tables

### 1. profiles

Extends Supabase's built-in `auth.users` table with additional user information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT NOT NULL CHECK (role IN ('tenant', 'landlord', 'both')) DEFAULT 'tenant',
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMPTZ,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'da')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_verified ON profiles(verified);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');
```

---

### 2. properties

Stores apartment/property listings created by landlords.

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Basic Information
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Location
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Copenhagen',
  postal_code TEXT NOT NULL,
  neighborhood TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Property Details
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'room', 'studio')),
  price_monthly DECIMAL(10, 2) NOT NULL,
  deposit DECIMAL(10, 2),
  size_sqm DECIMAL(8, 2) NOT NULL,
  rooms INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(3, 1) NOT NULL,
  floor INTEGER,
  
  -- Features (stored as JSONB for flexibility)
  features JSONB DEFAULT '[]'::jsonb,
  -- Example: ["furnished", "balcony", "parking", "pets_allowed", "elevator", "dishwasher", "washing_machine"]
  
  -- Availability
  available_from DATE NOT NULL,
  lease_duration_months INTEGER,
  
  -- Media
  images JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"url": "...", "order": 1, "caption": "..."}, ...]
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'rented', 'archived')) DEFAULT 'draft',
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMPTZ,
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_properties_landlord ON properties(landlord_id);
CREATE INDEX idx_properties_status ON properties(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_price ON properties(price_monthly);
CREATE INDEX idx_properties_rooms ON properties(rooms);
CREATE INDEX idx_properties_available_from ON properties(available_from);
CREATE INDEX idx_properties_location ON properties USING GIST (ll_to_earth(latitude, longitude));
CREATE INDEX idx_properties_features ON properties USING GIN (features);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);

-- Full-text search index
CREATE INDEX idx_properties_search ON properties USING GIN (
  to_tsvector('english', title || ' ' || description || ' ' || neighborhood)
);

-- RLS Policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active properties"
  ON properties FOR SELECT
  USING (status = 'active' AND deleted_at IS NULL);

CREATE POLICY "Landlords can view their own properties"
  ON properties FOR SELECT
  USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can create properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = landlord_id);

CREATE POLICY "Landlords can update their own properties"
  ON properties FOR UPDATE
  USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can soft delete their own properties"
  ON properties FOR UPDATE
  USING (auth.uid() = landlord_id);
```

---

### 3. favorites

Stores properties saved by users.

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, property_id)
);

-- Indexes
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_property ON favorites(property_id);

-- RLS Policies
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 4. conversations

Stores message threads between tenants and landlords about specific properties.

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  landlord_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('active', 'archived')) DEFAULT 'active',
  
  -- Last message info (denormalized for performance)
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  
  -- Unread counts
  tenant_unread_count INTEGER DEFAULT 0,
  landlord_unread_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(property_id, tenant_id, landlord_id)
);

-- Indexes
CREATE INDEX idx_conversations_tenant ON conversations(tenant_id);
CREATE INDEX idx_conversations_landlord ON conversations(landlord_id);
CREATE INDEX idx_conversations_property ON conversations(property_id);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);

-- RLS Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);

CREATE POLICY "Tenants can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Participants can update conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);
```

---

### 5. messages

Stores individual messages within conversations.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  -- Read status
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_unread ON messages(conversation_id, read_at) WHERE read_at IS NULL;

-- RLS Policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.tenant_id = auth.uid() OR conversations.landlord_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.tenant_id = auth.uid() OR conversations.landlord_id = auth.uid())
    )
  );

CREATE POLICY "Users can mark their received messages as read"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (
        (conversations.tenant_id = auth.uid() AND messages.sender_id = conversations.landlord_id)
        OR (conversations.landlord_id = auth.uid() AND messages.sender_id = conversations.tenant_id)
      )
    )
  );
```

---

### 6. bookings

Stores property viewing appointments.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  landlord_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Booking Details
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  
  -- Notes
  tenant_notes TEXT,
  landlord_notes TEXT,
  cancellation_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_tenant ON bookings(tenant_id);
CREATE INDEX idx_bookings_landlord ON bookings(landlord_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date, booking_time);
CREATE INDEX idx_bookings_status ON bookings(status);

-- RLS Policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);

CREATE POLICY "Tenants can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Participants can update bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);
```

---

### 7. saved_searches

Stores user search criteria for email alerts.

```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  
  -- Search Criteria (stored as JSONB)
  criteria JSONB NOT NULL,
  -- Example: {
  --   "city": "Copenhagen",
  --   "min_price": 5000,
  --   "max_price": 15000,
  --   "min_rooms": 2,
  --   "features": ["balcony", "parking"]
  -- }
  
  -- Notification Settings
  email_notifications BOOLEAN DEFAULT TRUE,
  notification_frequency TEXT CHECK (notification_frequency IN ('instant', 'daily', 'weekly')) DEFAULT 'daily',
  last_notification_sent_at TIMESTAMPTZ,
  
  active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_saved_searches_user ON saved_searches(user_id);
CREATE INDEX idx_saved_searches_active ON saved_searches(active) WHERE active = TRUE;

-- RLS Policies
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved searches"
  ON saved_searches FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

### 8. property_views

Tracks property view statistics (for analytics).

```sql
CREATE TABLE property_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Session tracking (for anonymous users)
  session_id TEXT,
  
  -- Metadata
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  referrer TEXT,
  user_agent TEXT
);

-- Indexes
CREATE INDEX idx_property_views_property ON property_views(property_id);
CREATE INDEX idx_property_views_user ON property_views(user_id);
CREATE INDEX idx_property_views_date ON property_views(viewed_at DESC);

-- RLS Policies
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create property views"
  ON property_views FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Landlords can view stats for their properties"
  ON property_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_views.property_id
      AND properties.landlord_id = auth.uid()
    )
  );
```

---

## Database Functions

### 1. Update Updated_at Timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Update Conversation on New Message

```sql
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    last_message_at = NEW.created_at,
    last_message_preview = LEFT(NEW.content, 100),
    tenant_unread_count = CASE 
      WHEN NEW.sender_id != tenant_id THEN tenant_unread_count + 1
      ELSE tenant_unread_count
    END,
    landlord_unread_count = CASE 
      WHEN NEW.sender_id != landlord_id THEN landlord_unread_count + 1
      ELSE landlord_unread_count
    END
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_new_message
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_on_message();
```

### 3. Update Property Favorite Count

```sql
CREATE OR REPLACE FUNCTION update_property_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE properties
    SET favorite_count = favorite_count + 1
    WHERE id = NEW.property_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE properties
    SET favorite_count = favorite_count - 1
    WHERE id = OLD.property_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_property_favorite_count_trigger
  AFTER INSERT OR DELETE ON favorites
  FOR EACH ROW EXECUTE FUNCTION update_property_favorite_count();
```

### 4. Create Profile on User Signup

```sql
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'tenant');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_user();
```

---

## Storage Buckets

### Property Images

```sql
-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

-- RLS Policies for property images
CREATE POLICY "Anyone can view property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own property images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

### Profile Avatars

```sql
-- Create storage bucket for profile avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- RLS Policies for avatars
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

---

## Indexes Summary

Key indexes for performance:

1. **Search & Filtering**
   - `idx_properties_price` - Price range queries
   - `idx_properties_rooms` - Room count filtering
   - `idx_properties_city` - Location filtering
   - `idx_properties_features` - GIN index for JSONB feature filtering
   - `idx_properties_search` - Full-text search on title/description

2. **Geolocation**
   - `idx_properties_location` - GIST index for proximity searches

3. **Performance**
   - `idx_properties_created_at` - Sorting by newest listings
   - `idx_conversations_last_message` - Sorting conversations by activity
   - `idx_messages_conversation` - Fast message retrieval

---

## Next Steps

1. **Create Migration File** - Generate SQL migration file from this schema
2. **Apply to Supabase** - Run migration in Supabase project
3. **Generate TypeScript Types** - Use Supabase CLI to generate types
4. **Test RLS Policies** - Verify security policies work correctly
5. **Seed Test Data** - Add sample properties and users for testing

---

## Notes

- All monetary values use `DECIMAL(10, 2)` for precision
- JSONB is used for flexible data (features, images, search criteria)
- Soft deletes preserve data integrity and allow for recovery
- RLS policies ensure data security at the database level
- Triggers maintain data consistency automatically
- Indexes are optimized for common query patterns
