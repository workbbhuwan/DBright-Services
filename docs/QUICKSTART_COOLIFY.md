# Quick Start - Coolify Deployment

## 🚀 Fastest Way to Deploy

### Step 1: Prepare Your Environment Variables

Create a `.env` file in Coolify with these variables:

```bash
# Database Connection (from your Coolify PostgreSQL)
POSTGRES_URL=postgresql://your_user:your_password@postgres_host:5432/your_database

# Admin Login (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StrongPassword123!
SESSION_SECRET=randomly-generated-32-character-secret-key

# Email Settings (your existing cPanel email)
SMTP_HOST=dbrightservices.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@dbrightservices.com
SMTP_PASS=your-cpanel-email-password
SMTP_FROM=info@dbrightservices.com
CONTACT_EMAIL=info@dbrightservices.com
```

### Step 2: Deploy in Coolify

1. **Open Coolify Dashboard**
2. **Create New Resource** → **Public Repository**
3. **Settings:**
   - Repository URL: `<your-github-repo-url>`
   - Branch: `main`
   - Build Pack: **Dockerfile**
   - Port: **3000**
4. **Add Environment Variables** (from Step 1)
5. **Click Deploy**

### Step 3: Setup PostgreSQL Database

**Option A: Use Coolify's PostgreSQL**
1. In Coolify, create a new PostgreSQL service
2. Note the connection string
3. Update `POSTGRES_URL` in your environment variables
4. Redeploy

**Option B: Use External PostgreSQL**
1. Use your existing PostgreSQL server
2. Create a database: `CREATE DATABASE dbright;`
3. Update `POSTGRES_URL` accordingly

### Step 4: Verify Deployment

✅ Visit your domain
✅ Check homepage loads
✅ Test contact form
✅ Login to admin: `https://yourdomain.com/admin`
✅ View analytics tab

## 🐳 Docker Compose (Alternative)

If you want to run everything together:

```bash
# 1. Clone repository
git clone <your-repo>
cd dbright-services

# 2. Create .env file
cp .env.example .env
nano .env  # Update with your values

# 3. Start everything
docker-compose up -d

# 4. Check logs
docker-compose logs -f

# 5. Access app
# http://localhost:3000
```

## 🔧 Coolify PostgreSQL Connection String Format

```
postgresql://username:password@postgres-container:5432/database
```

**Example from Coolify:**
- If your PostgreSQL service is named `dbright-postgres`
- Username: `dbright_user`
- Password: `secret123`
- Database: `dbright`

Then: `postgresql://dbright_user:secret123@dbright-postgres:5432/dbright`

## 📝 Important Notes

1. **Security**: Change all default passwords!
2. **Session Secret**: Generate with `openssl rand -base64 32`
3. **Database**: Tables are created automatically on first run
4. **Analytics**: Will start tracking after first deployment

## 🆘 Troubleshooting

**Build fails?**
- Check Dockerfile syntax
- Ensure all dependencies are in package.json
- Review Coolify build logs

**Can't connect to database?**
- Verify POSTGRES_URL is correct
- Check if PostgreSQL is running
- Test connection: `psql $POSTGRES_URL`

**Analytics not working?**
- Visit site from browser (not admin page)
- Check browser console for tracking logs
- Review server logs in Coolify
- Refresh analytics page in admin

**Admin login fails?**
- Double-check ADMIN_USERNAME and ADMIN_PASSWORD
- Verify SESSION_SECRET is set
- Clear browser cookies

## 🎉 Done!

Your D.BRIGHT Services site with analytics is now live on Coolify!

- **Homepage**: https://yourdomain.com
- **Admin**: https://yourdomain.com/admin
- **Analytics**: Admin → Analytics tab
