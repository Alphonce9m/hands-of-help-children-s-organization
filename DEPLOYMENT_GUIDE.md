# Deployment Guide

## Prerequisites

1. Node.js 18.x
2. PostgreSQL database
3. Vercel account (or your preferred hosting provider)
4. M-Pesa API credentials (if using M-Pesa)
5. Supabase account (if using Supabase)

## Setup Instructions

### 1. Environment Setup

1. Copy the `.env.production.example` file to `.env.local` for local development and `.env.production` for production:
   ```bash
   cp .env.production.example .env.local
   cp .env.production.example .env.production
   ```

2. Update the following environment variables in both `.env.local` and `.env.production`:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate a secure secret (e.g., `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-domain.com`)
   - M-Pesa credentials (if applicable)
   - Supabase credentials (if using Supabase)

### 2. Database Setup

1. Create a new PostgreSQL database for your application
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Seed the database (if needed):
   ```bash
   npx prisma db seed
   ```

### 3. Local Testing

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Test all major functionality before deploying

### 4. Deployment to Vercel

1. Push your code to a Git repository
2. Import the repository into Vercel
3. In Vercel project settings:
   - Set the build command: `npm run build`
   - Set the output directory: `.next`
   - Add all environment variables from your `.env.production` file
4. Deploy the application

### 5. Post-Deployment

1. Verify all routes are working
2. Test form submissions and API endpoints
3. Set up monitoring and error tracking
4. Configure a custom domain (if needed)

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure the database is accessible from your hosting provider
- Check database user permissions

### Build Failures
- Check the build logs in Vercel
- Ensure all environment variables are set
- Verify Node.js version compatibility

### Runtime Errors
- Check the browser console for client-side errors
- Review server logs in Vercel
- Verify API endpoints are returning expected responses

## Support

For additional help, please contact [Your Support Email] or create an issue in the repository.
