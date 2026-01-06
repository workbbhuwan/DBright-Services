# D.BRIGHT Services - Admin Dashboard Setup Guide

## ✅ What Was Implemented

A complete admin dashboard system with:
- 🔒 **Password-protected admin panel** at `/admin`
- 📊 **Real-time statistics**: Total messages, unread, today, this week
- 📧 **Message management**: View, search, filter, and manage all contact form submissions
- 💾 **Database storage**: All messages saved to Vercel Postgres (FREE tier)
- ️ **Message actions**: Mark as read/unread, archive, delete
- 🔍 **Search & filter**: Find messages by name, email, or content

## 🚀 Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel Postgres (FREE)

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose the **FREE Hobby plan** (256 MB storage)
6. Click **Create**
7. Vercel will automatically add database environment variables to your project

### 3. Configure Environment Variables

In Vercel Dashboard > Settings > Environment Variables, add:

#### Admin Credentials (REQUIRED)
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=YOUR_HASH_HERE
SESSION_SECRET=your-random-secret-key-here
```

**Generate Password Hash:**
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

#### Email Configuration (Already set if contact form works)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@dbrightservices.com
```

### 4. Deploy to Vercel

```bash
# Deploy
vercel --prod

# Or push to your connected GitHub repository
git add .
git commit -m "Add admin dashboard"
git push
```

### 5. Initialize Database

After deployment, visit your site and submit a test contact form. This will automatically:
- Create the database tables
- Save the message to the database
- Send the email notification

## 📱 Using the Admin Dashboard

### Access
Visit: `https://your-domain.com/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123` (change via ADMIN_PASSWORD_HASH env variable)

### Features

**Dashboard Overview:**
- 📊 Total messages count
- 📬 Unread messages
- 📅 Messages received today
- 📈 Messages this week

**Message Management:**
- View all contact form submissions
- Filter by: All, Unread, Read, Archived
- Search by name, email, or message content
- Click any message to view full details
- Mark as read/unread
- Archive messages
- Delete messages permanently

## 🔒 Security Notes

### Change Default Password
**IMPORTANT:** Change the default admin credentials immediately!

1. Generate a new password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('YourNewPassword', 10))"
```

2. Update in Vercel Dashboard > Settings > Environment Variables:
```
ADMIN_PASSWORD_HASH=$2a$10$your_generated_hash_here
```

3. Redeploy or wait for automatic redeployment

### Session Management
- Sessions last 7 days
- Secure cookies in production (HTTPS)
- Protected API routes require authentication


## 🗄️ Database Information

**Vercel Postgres FREE Tier:**
- 256 MB storage (thousands of messages)
- 60 compute hours/month (more than enough)
- Automatic backups
- SSL encrypted connections

**Database Tables:**
- `contact_messages`: Stores all form submissions with timestamps, status, IP, user agent

## 🛠️ Troubleshooting

### Can't Log In
1. Check environment variables are set in Vercel
2. Verify ADMIN_PASSWORD_HASH is correctly generated
3. Clear browser cookies
4. Check browser console for errors

### Messages Not Saving
1. Verify Vercel Postgres is created and connected
2. Check Vercel logs: Dashboard > Deployments > [Latest] > View Function Logs
3. Database tables are created automatically on first contact form submission

## 💰 Cost Summary

**Total Cost: $0/month** for:
- ✅ Admin dashboard
- ✅ Message storage (up to thousands of messages)
- ✅ Website analytics (100k views/month)
- ✅ All features included

**Upgrade Only If:**
- You exceed 100k page views/month (unlikely)
- You need more than 256 MB database storage

## 📞 Support

For issues:
1. Check Vercel logs in Dashboard
2. Review environment variables
3. Test with a fresh contact form submission

---

**Enjoy your new admin dashboard! 🎉**
