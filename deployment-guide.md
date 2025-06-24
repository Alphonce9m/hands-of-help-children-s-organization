# Hands of Help - Deployment Guide

## Prerequisites
- Node.js 18.18.0 or later
- PostgreSQL database
- Supabase project (for authentication/storage)
- SMTP service (for emails)
- Vercel account (recommended) or other hosting provider

## Environment Variables Setup

Create a `.env.production` file in your project root with the following variables:

```env
# App
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=YOUR_PRODUCTION_URL
NEXT_PUBLIC_APP_URL=YOUR_PRODUCTION_URL

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Authentication
NEXTAUTH_SECRET=your_secure_random_string
NEXTAUTH_URL=YOUR_PRODUCTION_URL

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (using Resend)
RESEND_API_KEY=your_resend_api_key
SMTP_FROM=your-email@example.com

# Mchanga (if using)
MCHANGA_FUNDRAISER_ID=your_fundraiser_id
```

## Deployment Steps

### 1. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Optional: Seed initial data
npx prisma db seed
```

### 2. Build the Application
```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Test the production build
npm run start
```

### 3. Vercel Deployment (Recommended)

1. Push your code to a Git repository
2. Import the repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Set build command: `npm run build`
5. Set output directory: `.next`
6. Deploy!

### 4. Other Hosting Providers

For other providers (Netlify, AWS, etc.), ensure:
- Node.js version is set to 18.18.0
- Build command: `npm run build`
- Output directory: `.next`
- All environment variables are properly set

## Common Issues & Solutions

### 1. Environment Variables
- Ensure all required variables are set in your production environment
- Double-check for typos in variable names
- Remember to prefix client-side variables with `NEXT_PUBLIC_`

### 2. Database Connection
- Verify your PostgreSQL connection string
- Ensure the database is accessible from your hosting provider
- Run migrations before starting the app

### 3. Image Optimization
- All image domains must be whitelisted in `next.config.js`
- For external images, add their domains to the `images.domains` array

### 4. API Routes
- Ensure all API routes are properly exported
- Check for any server-side dependencies that might be missing

## Post-Deployment

1. Test all major features:
   - User authentication
   - Form submissions
   - Image uploads
   - API endpoints

2. Set up monitoring:
   - Error tracking (Sentry, LogRocket)
   - Performance monitoring
   - Uptime monitoring

3. Configure backups:
   - Database backups
   - Media storage backups

## Maintenance

1. Keep dependencies updated:
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update
```

2. Monitor application logs for errors
3. Regularly backup your database
4. Keep an eye on performance metrics
