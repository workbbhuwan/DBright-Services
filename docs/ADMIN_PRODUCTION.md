# Admin Dashboard - Production Deployment Guide

## Overview
This guide covers everything you need to deploy the admin dashboard to production securely.

## 🔒 Security Checklist

### 1. Environment Variables (CRITICAL)
Before deploying to production, set these environment variables:

```bash
# Required
POSTGRES_URL=your_postgres_connection_string

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Session Security
SESSION_SECRET=your_random_64_character_secret_key

# Optional but Recommended
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

#### Generate a Secure Session Secret:
```bash
# On Linux/Mac
openssl rand -base64 64

# On Windows PowerShell
[Convert]::ToBase64String((1..64|%{Get-Random -Max 256}))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 2. Change Default Credentials
The default credentials are:
- Username: `admin`
- Password: `admin123`

**YOU MUST CHANGE THESE IN PRODUCTION!**

Set custom credentials via environment variables:
```bash
ADMIN_USERNAME=your_chosen_username
ADMIN_PASSWORD=your_strong_password
```

## 🚀 Deployment Steps

### Vercel Deployment
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all variables listed above
4. Deploy

### Setting up PostgreSQL Database

#### Option 1: Vercel Postgres
1. In your Vercel project dashboard
2. Go to Storage → Create Database
3. Select Postgres
4. Copy the connection string to `POSTGRES_URL`

#### Option 2: External PostgreSQL
Use services like:
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)
- [AWS RDS](https://aws.amazon.com/rds/)

Get the connection string and set it as `POSTGRES_URL`.

### Database Initialization
The database tables are created automatically on first use. No manual migration needed.

Tables created:
- `contact_messages` - Stores contact form submissions
- `page_views` - Stores analytics data
- `unique_visitors` - Tracks unique visitors

## 🛡️ Security Features

### Rate Limiting
- **Login attempts**: 5 attempts per 15 minutes
- **Lockout period**: 30 minutes after exceeding limit
- Uses IP + User Agent for identification

### Session Management
- HttpOnly cookies (prevents XSS)
- Secure flag in production (HTTPS only)
- 7-day session expiration
- SameSite protection (prevents CSRF)

### Best Practices Implemented
✅ Input validation on all forms
✅ SQL injection prevention (parameterized queries)
✅ Error messages don't leak sensitive info
✅ No console.logs in production
✅ HTTPS enforced in production
✅ Rate limiting on authentication
✅ Secure password handling

## 📊 Features

### Messages Management
- View all contact form submissions
- Filter by status (unread/read/archived)
- Search functionality
- Mark as read/unread/archived
- Delete messages
- Export to CSV or JSON

### Analytics Dashboard
- Total page views
- Unique visitors
- Daily/weekly statistics
- Top pages
- Visitor locations
- Device types and browsers
- Real-time data (auto-refresh every 30s)

### Data Export
- Export messages as CSV for Excel
- Export as JSON for processing
- Filtered exports (export only unread, etc.)

## 🔧 Maintenance

### Accessing the Dashboard
```
https://yourdomain.com/admin
```

### Changing Admin Password
1. Update `ADMIN_PASSWORD` environment variable
2. Redeploy or restart the application

### Backing Up Data
Use the export feature to download all messages regularly:
1. Login to admin dashboard
2. Click CSV or JSON export button
3. Store backups securely

### Database Backups
Set up automatic backups:
- **Vercel Postgres**: Automatic backups included
- **Supabase**: Point-in-time recovery available
- **Railway**: Automated backups on paid plans

## 📈 Monitoring

### Logs
Check application logs in your hosting platform:
- Vercel: Functions → Logs
- View errors and access patterns

### Database Usage
Monitor your database:
- Table sizes
- Connection limits
- Query performance

## ⚠️ Troubleshooting

### Cannot Login
1. Check environment variables are set
2. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Check for rate limiting (wait 30 minutes)
4. Clear browser cookies
5. Check server logs

### Database Connection Errors
1. Verify `POSTGRES_URL` is correct
2. Check database is running
3. Verify network access (firewall/VPC)
4. Check connection limits

### Missing Analytics Data
1. Ensure analytics tracker is installed on pages
2. Check database tables exist
3. Verify page views are being tracked

## 🔐 Security Recommendations

### Production Checklist
- [ ] Change default admin credentials
- [ ] Set strong SESSION_SECRET
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Monitor login attempts
- [ ] Regular security updates
- [ ] Export data regularly
- [ ] Use strong passwords (20+ characters)
- [ ] Enable 2FA on hosting platform
- [ ] Restrict database access by IP

### Password Requirements
Recommended admin password criteria:
- Minimum 16 characters
- Mix of uppercase/lowercase
- Include numbers and symbols
- No dictionary words
- Use a password manager

## 📞 Support

### Common Issues
1. **"Too many login attempts"**: Wait 30 minutes or change your IP
2. **"Database may need initialization"**: Submit a contact form first
3. **"Unauthorized"**: Check if session expired, login again

### Performance Tips
- Export old messages and archive locally
- Database indexes are automatic
- Monitor database size
- Consider data retention policy

## 🔄 Updates

### Updating the Application
1. Pull latest code from repository
2. Review changelog for breaking changes
3. Test in staging environment
4. Deploy to production
5. Verify all features work

### Database Migrations
Currently automatic on deployment. Future migrations will be documented here.

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `POSTGRES_URL` | Yes | - | PostgreSQL connection string |
| `ADMIN_USERNAME` | No | `admin` | Admin login username |
| `ADMIN_PASSWORD` | No | `admin123` | Admin login password |
| `SESSION_SECRET` | No | auto | Session encryption key |
| `RESEND_API_KEY` | No | - | Email service API key |
| `CONTACT_EMAIL` | No | - | Email for notifications |
| `NODE_ENV` | Auto | - | `production` in prod |

## 🎯 Next Steps After Deployment

1. ✅ Login with your credentials
2. ✅ Test message filtering
3. ✅ Check analytics data
4. ✅ Test export functionality
5. ✅ Set up regular backups
6. ✅ Document your credentials securely
7. ✅ Share access with team (create new credentials per user if needed)

---

**Remember**: Security is an ongoing process. Regularly review access logs, update credentials, and keep backups.
