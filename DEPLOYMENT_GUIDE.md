# Deployment Guide

## Prerequisites

1. Node.js 18.x (verify with `node -v`)
2. PostgreSQL database (production-ready)
3. Vercel account (recommended) or alternative hosting provider
4. M-Pesa API credentials (for payment processing)
5. Supabase account (for authentication/storage)
6. SMTP email service (for transactional emails)

## Environment Variables Setup

### Required Environment Variables

```env
# Core
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-production-url.com

# Database
DATABASE_URL=postgresql://user:password@host:port/db_name?schema=public

# Authentication
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://your-production-url.com

# M-Pesa (if using)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_shortcode
MPESA_CALLBACK_URL=https://your-api-url.com/api/mpesa/callback

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (SMTP)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM=no-reply@yourdomain.com
```

### Local Development Setup

1. Copy the example file:
   ```bash
   cp .env.production.example .env.local
   ```
2. Update the values in `.env.local` with your local development values
3. Never commit `.env.local` to version control

### Production Setup (Vercel)

1. Go to your Vercel project settings
2. Navigate to 'Environment Variables'
3. Add all required variables from the list above
4. For sensitive values, mark them as 'Sensitive' to encrypt them
5. Ensure `NODE_ENV` is set to `production`

## Database Setup

### Production Database

1. Set up a managed PostgreSQL database (recommended options):
   - Vercel Postgres (native integration)
   - Supabase (includes auth)
   - AWS RDS
   - DigitalOcean Managed Databases
   - Railway.app

2. Get the connection string in the format:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   ```

### Migrations

1. Create a new migration after schema changes:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

2. Apply migrations in production:
   ```bash
   npx prisma migrate deploy
   ```

3. Seed production data (if needed):
   ```bash
   npx prisma db seed
   ```

### Database Backups

Set up automated backups according to your database provider's documentation.

## Deployment to Vercel

### Prerequisites

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

### Deployment Steps

1. **Link your project** (first time only):
   ```bash
   vercel link
   ```

2. **Pull environment variables** (if already set in Vercel):
   ```bash
   vercel env pull .env.production
   ```

3. **Deploy to production**:
   ```bash
   vercel --prod
   ```
   Or push to your connected Git branch:
   ```bash
   git push origin main
   ```

### Vercel Project Settings

1. **Build & Development Settings**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`
   - Development Command: `next dev --port $PORT`

2. **Environment Variables**:
   - Add all required variables from the Environment Variables section
   - Mark sensitive values as 'Sensitive'
   - Add any required environment variables for your region/locale

3. **Build & Deploy Hooks**:
   - Enable "Automatically expose System Environment Variables"
   - Set up deploy hooks if needed for CI/CD

### Post-Deployment

1. **Verify Deployment**:
   - Check the deployment logs in Vercel dashboard
   - Test all major functionality
   - Verify API endpoints
   - Check database connections
   - Test authentication flows
   - Verify email functionality
   - Test payment integration (if applicable)

2. **Set Up Custom Domain** (if needed):
   - Go to your project in Vercel
   - Navigate to 'Domains' in settings
   - Add your custom domain and follow the verification steps

3. **Enable SSL**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - Ensure 'Automated' is selected in the Domain settings

## Monitoring and Maintenance

1. **Error Tracking**:
   - Set up Sentry or similar error tracking
   - Monitor for runtime errors

2. **Performance Monitoring**:
   - Use Vercel Analytics
   - Set up monitoring for API response times

3. **Logs**:
   - Check Vercel function logs
   - Set up log aggregation if needed

4. **Scheduled Tasks**:
   - Use Vercel Cron Jobs or similar for scheduled tasks
   - Example: Pruning old sessions, sending reminders

## Scaling

1. **Database**:
   - Monitor query performance
   - Add indexes as needed
   - Consider read replicas for high-traffic scenarios

2. **Application**:
   - Vercel automatically scales your application
   - Consider Edge Functions for global low-latency

## Security

1. **Regular Updates**:
   - Keep dependencies updated
   - Monitor for security advisories

2. **Secrets Management**:
   - Never commit secrets to version control
   - Use Vercel's environment variables for secrets
   - Rotate credentials periodically

3. **Security Headers**:
   - Vercel provides security headers by default
   - Customize in `next.config.js` if needed

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**:
   - Ensure they're set in Vercel project settings
   - Check for typos in variable names
   - Redeploy after adding new variables

2. **Database Connection Issues**:
   - Verify connection string
   - Check if database allows connections from Vercel's IPs
   - Ensure SSL is properly configured

3. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Try reproducing locally with `vercel build`
   - Ensure all dependencies are in `package.json`

### Getting Help

1. Check Vercel's documentation: https://vercel.com/docs
2. Open an issue in the repository
3. Contact Vercel support for platform-specific issues

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
