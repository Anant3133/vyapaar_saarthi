# Supabase Backend Integration Setup Guide

## Overview
This guide will help you connect your EODB Portal to a live Supabase backend for real-time functionality.

## Prerequisites
- Supabase account (free tier available)
- Basic understanding of environment variables

## Setup Steps

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Fill in project details:
   - **Name**: EODB Portal Backend
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Wait for project creation (2-3 minutes)

### 2. Get Project Credentials
Once your project is ready:
1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxx.supabase.co`)
   - **Project ID** (the subdomain part before `.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIs...`)
   - **service_role key** (starts with `eyJhbGciOiJIUzI1NiIs...`)

### 3. Database Setup
1. Go to **SQL Editor** in your Supabase dashboard
2. Create the required tables by running this SQL:

```sql
-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create KV Store table (already exists in our backend)
CREATE TABLE IF NOT EXISTS kv_store_45c5d27d (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_45c5d27d(key);
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at ON kv_store_45c5d27d(created_at);

-- Enable RLS on KV store
ALTER TABLE kv_store_45c5d27d ENABLE ROW LEVEL SECURITY;

-- Create policies for KV store
CREATE POLICY "Enable read access for authenticated users" ON kv_store_45c5d27d
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON kv_store_45c5d27d
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON kv_store_45c5d27d
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON kv_store_45c5d27d
FOR DELETE USING (auth.role() = 'authenticated');
```

### 4. Deploy Edge Functions
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link to your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

4. Deploy the server function:
   ```bash
   supabase functions deploy server
   ```

### 5. Configure Environment Variables
Update your `/utils/supabase/info.tsx` file with your credentials:

```typescript
export const projectId = 'YOUR_PROJECT_ID'; // e.g., 'abc123def456'
export const publicAnonKey = 'YOUR_ANON_KEY'; // Long JWT token
```

### 6. Storage Setup (for document uploads)
1. Go to **Storage** in Supabase dashboard
2. Create buckets:
   - `make-45c5d27d-documents` (private)
   - `make-45c5d27d-images` (private)
   - `make-45c5d27d-exports` (private)

3. Set up storage policies for each bucket:
```sql
-- Documents bucket policies
CREATE POLICY "Users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'make-45c5d27d-documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view own documents" ON storage.objects
FOR SELECT USING (bucket_id = 'make-45c5d27d-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Repeat similar policies for other buckets
```

### 7. Authentication Setup
1. Go to **Authentication** > **Settings**
2. Configure sign-up settings:
   - Enable email confirmations (optional for development)
   - Set site URL to your domain
3. Configure providers if needed (Google, GitHub, etc.)

### 8. Testing the Integration
1. Restart your development server
2. Try signing up/logging in
3. Test the AI chatbot functionality
4. Check document upload features
5. Verify payment processing simulation

## Security Considerations

### Environment Variables
Never expose these in client-side code:
- `service_role key` - Server-side only
- Database password - Server-side only

### Row Level Security (RLS)
- Enable RLS on all tables
- Create specific policies for data access
- Test policies thoroughly

### API Rate Limiting
- Monitor API usage in Supabase dashboard
- Implement client-side rate limiting if needed

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check your site URL in Auth settings
2. **RLS Policies**: Ensure policies allow your operations
3. **Function Errors**: Check function logs in Supabase dashboard
4. **Database Connection**: Verify your connection string

### Debug Steps
1. Check browser console for errors
2. Review Supabase function logs
3. Test API endpoints directly
4. Verify database permissions

## Support
- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Discord Community: [https://discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: Report bugs on the project repository

## Email Contact
For project-specific integration help, contact: aagrim.gupta.ug24@nsut.ac.in
```

### Next Steps After Setup
1. Test all authentication flows
2. Verify document upload functionality
3. Test payment gateway integration
4. Monitor performance and usage
5. Set up backup and monitoring

Remember to keep your credentials secure and never commit them to version control!