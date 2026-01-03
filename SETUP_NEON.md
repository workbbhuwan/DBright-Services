# Neon Database Setup for Vercel

## 1. Create Neon Database (Free)

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (easiest)
3. Create a new project:
   - **Project Name:** D.BRIGHT Services
   - **Region:** Choose closest to your users (e.g., AWS Tokyo for Japan)
   - **Postgres Version:** 16 (latest)

## 2. Get Connection String

After creating the project:

1. Go to **Dashboard** → **Connection Details**
2. Select **Connection string**
3. Copy the **Pooled connection** string (recommended for serverless)
   ```
   postgres://username:password@project.region.aws.neon.tech/dbname?sslmode=require
   ```

## 3. Update Environment Variables

### Local Development (.env)

Replace your current `POSTGRES_URL` with the Neon connection string:

```bash
# Neon Serverless Postgres
POSTGRES_URL="postgresql://username:password@project.region.aws.neon.tech/dbname?sslmode=require"

# Keep these unchanged
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SESSION_SECRET=your-session-secret

# Email config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@dbrightservices.com
```

### Production (Vercel Dashboard)

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Update or add:
   - **Name:** `POSTGRES_URL`
   - **Value:** Your Neon pooled connection string
   - **Environment:** Production (and Preview if needed)

4. **Redeploy** your site for changes to take effect

## 4. Benefits of Neon

✅ **Serverless** - Automatically suspends after 5 min inactivity (saves resources)  
✅ **Instant cold starts** - ~100ms startup time  
✅ **Generous free tier:**
   - 0.5 GB storage
   - 512 MB RAM
   - Unlimited databases
   - Branching for development

✅ **Built for Vercel** - Optimized for serverless functions  
✅ **Auto-backups** - Point-in-time recovery  
✅ **Global edge** - Low latency worldwide  

## 5. Verify Setup

1. **Local:** Restart your dev server (`npm run dev`)
2. **Production:** Redeploy to Vercel
3. Visit admin dashboard - tables will auto-create on first load
4. Check analytics - data should start populating

## 6. Monitor Usage

Free tier limits:
- **Storage:** 0.5 GB
- **Compute time:** 191.9 hours/month
- **Data transfer:** Unlimited

Check usage at: [Neon Dashboard](https://console.neon.tech) → **Billing**

## 7. Optional: Database Branching

Neon supports Git-like database branches:

```bash
# Create a dev branch (isolate test data)
neonctl branches create --name dev
```

Perfect for testing migrations without affecting production!

## Troubleshooting

### "Connection terminated unexpectedly"
- ✅ Fixed: Code now uses pooled connections with auto-reconnect
- Check Neon dashboard for any database issues

### Slow queries
- Neon cold starts take ~100ms (normal for free tier)
- Upgrade to paid plan for always-on compute

### Connection limit exceeded
- Free tier: 100 connections
- Code uses connection pool (max 10) - should never hit limit

---

**Migration Complete!** Your database is now optimized for Vercel serverless deployment.
