# Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Create `.env.production` file with all required variables
- [ ] Verify all API keys and secrets are correctly set
- [ ] Ensure database connection strings are correct for production
- [ ] Update `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_APP_URL` with production URL

### Code Review
- [ ] Test the application locally in production mode
- [ ] Verify all features work as expected
- [ ] Check for any hardcoded development URLs or values
- [ ] Ensure all environment variables are properly referenced

### Database
- [ ] Backup production database (if updating existing)
- [ ] Test database migrations locally
- [ ] Prepare database seed data if needed
- [ ] Verify database user permissions

## Deployment

### Option 1: Vercel (Recommended)
1. [ ] Push code to your Git repository
2. [ ] Go to Vercel dashboard
3. [ ] Import project if not already imported
4. [ ] Configure environment variables in Vercel
5. [ ] Set build command: `npm run build`
6. [ ] Set output directory: `.next`
7. [ ] Deploy!

### Option 2: Docker
1. [ ] Build Docker image: `docker-compose -f docker-compose.prod.yml build`
2. [ ] Start containers: `docker-compose -f docker-compose.prod.yml up -d`
3. [ ] Run migrations: `docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy`

### Option 3: Manual Deployment
1. [ ] Run `npm ci` to install dependencies
2. [ ] Run `npx prisma generate`
3. [ ] Run `npx prisma migrate deploy`
4. [ ] Run `npm run build`
5. [ ] Start the application: `npm start`

## Post-Deployment

### Verification
- [ ] Test all major features
- [ ] Check console for errors
- [ ] Verify images and assets are loading
- [ ] Test form submissions and API endpoints
- [ ] Check authentication flows

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure logging
- [ ] Set up monitoring for uptime and performance

### Security
- [ ] Enable HTTPS
- [ ] Set up proper CORS headers
- [ ] Verify security headers are in place
- [ ] Rotate any exposed credentials after deployment

## Rollback Plan
- [ ] Document the current version hash/tag
- [ ] Prepare rollback steps in case of issues
- [ ] Test rollback procedure

## Documentation
- [ ] Update deployment documentation if needed
- [ ] Document any manual steps required
- [ ] Update runbooks with new procedures
