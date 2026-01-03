# Admin Dashboard - Quick Reference

## 🔑 Access
**URL**: `https://yourdomain.com/admin`

## 📋 Default Credentials (CHANGE IN PRODUCTION!)
- Username: `admin`
- Password: `admin123`

## 🚀 Quick Setup (Production)

### 1. Set Environment Variables
```bash
POSTGRES_URL=your_postgres_connection_string
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_strong_password
SESSION_SECRET=your_64_char_secret
```

### 2. Generate Session Secret
```bash
openssl rand -base64 64
```

### 3. Deploy & Test
1. Deploy to Vercel/hosting
2. Login with your credentials
3. Test message filtering
4. Test export functionality

## 📊 Features at a Glance

### Messages Tab
- **View**: All contact form submissions
- **Filter**: All / Unread / Read / Archived
- **Search**: By name, email, or message content
- **Actions**: Mark as read, archive, delete
- **Export**: CSV or JSON format

### Analytics Tab
- **Stats**: Total views, today, this week, unique visitors
- **Top Pages**: Most visited pages
- **Locations**: Visitor geography
- **Devices**: Device types and browsers
- **Auto-refresh**: Every 30 seconds

## 🔒 Security Features
- ✅ Rate limiting (5 attempts / 15 min)
- ✅ Secure sessions (7-day expiration)
- ✅ HTTPS only in production
- ✅ Input validation
- ✅ SQL injection protection

## 📥 Exporting Data
1. Select filter (All/Unread/Read/Archived)
2. Click CSV or JSON button
3. File downloads automatically
4. Filename includes date

## ⚙️ Common Tasks

### Mark Message as Read
1. Click on message in list
2. Click "Mark as Read" in detail panel
3. Message moves to Read filter

### Archive Old Messages
1. Filter by "Read"
2. Click message
3. Click "Archive"
4. Message moves to Archived filter

### Export Monthly Messages
1. Use filter if needed
2. Click CSV or JSON
3. Save file for records

### Delete Spam
1. Click on spam message
2. Click "Delete Message"
3. Confirm deletion
4. Message permanently removed

## 🚨 Troubleshooting

### Cannot Login
- Check username/password
- Wait 30 min if rate limited
- Clear browser cookies
- Check environment variables

### No Messages Showing
- Check filter selection
- Check search query
- Verify database connection
- Submit test contact form

### Export Not Working
- Check if messages exist
- Verify filter has results
- Check browser console
- Try different format

## 📱 Keyboard Shortcuts
- **Escape**: Close message detail (desktop)
- **Tab**: Navigate between elements
- **Enter**: Submit forms

## 📞 Status Indicators

### Message Badges
- 🟠 **New** = Unread message
- 🟢 **Read** = Message has been viewed
- ⚫ **Archived** = Message archived

### Analytics Status
- 🟢 **Live Data** = Auto-refreshing
- Last update time shown

## 📈 Best Practices

### Daily
- [ ] Check new messages
- [ ] Respond to urgent inquiries
- [ ] Archive processed messages

### Weekly
- [ ] Export messages for backup
- [ ] Review analytics trends
- [ ] Delete spam/unwanted messages

### Monthly
- [ ] Download full export
- [ ] Review security logs
- [ ] Clean up archived messages

## 🔐 Security Reminders
- ✅ Use strong password (16+ chars)
- ✅ Never share credentials
- ✅ Logout after use
- ✅ Change password regularly
- ✅ Export data for backups
- ✅ Monitor login attempts

## 📊 Data Retention
- Messages: Stored indefinitely
- Analytics: 30 days visible in charts
- Exports: Manual backups recommended

## 🆘 Emergency Actions

### Forgot Password
1. Access hosting platform (Vercel)
2. Update `ADMIN_PASSWORD` env var
3. Redeploy application

### Locked Out (Rate Limited)
1. Wait 30 minutes
2. Or change IP address
3. Or reset via hosting platform

### Database Full
1. Export old messages
2. Delete archived messages
3. Optimize database
4. Upgrade database plan

## 📚 Full Documentation
- Production Guide: `docs/ADMIN_PRODUCTION.md`
- Improvements Summary: `docs/ADMIN_IMPROVEMENTS_SUMMARY.md`
- Analytics Setup: `docs/ANALYTICS.md`
- Email Setup: `docs/EMAIL_SETUP.md`

## 💡 Tips
- Use search for quick lookup
- Filter before exporting for targeted data
- Check analytics daily for traffic trends
- Archive messages to keep inbox clean
- Export weekly for regular backups

---

**Version**: 1.0.0
**Status**: Production Ready
**Support**: Check documentation in `docs/` folder
