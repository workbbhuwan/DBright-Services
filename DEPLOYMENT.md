# Dbright Services - Deployment Guide

This guide provides step-by-step instructions for deploying the Dbright Services website on cPanel hosting.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Static Export Deployment (Recommended for cPanel)](#static-export-deployment)
4. [Node.js Deployment (Advanced)](#nodejs-deployment)
5. [Email Configuration](#email-configuration)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:
- cPanel hosting account with file manager access
- Domain name configured and pointing to your hosting
- Email account set up on your domain (for contact form)
- FTP/SFTP client (FileZilla, Cyberduck, or use cPanel File Manager)

---

## Environment Setup

### 1. Create `.env.local` file

Copy `.env.local.example` to `.env.local` and configure with your actual values:

```bash
cp .env.local.example .env.local
```

### 2. Configure Email Settings

For **cPanel Email**:
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=info@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com
SEND_USER_CONFIRMATION=true
```

For **Gmail** (development):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@dbright-services.jp
CONTACT_EMAIL=info@dbright-services.jp
SEND_USER_CONFIRMATION=true
```

**Note:** For Gmail, you need to generate an App Password:
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Generate password for "Mail"

---

## Static Export Deployment (Recommended for cPanel)

This method exports your Next.js site as static HTML files, which works on any hosting including basic cPanel.

### Step 1: Prepare for Static Export

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

**Important:** Static export does NOT support:
- API routes (like `/api/contact`)
- Server-side rendering
- Dynamic routes with `getServerSideProps`

### Step 2: Alternative Contact Form Solution

Since static exports don't support API routes, you have these options:

**Option A: Use FormSpree or EmailJS (Recommended)**

Replace the contact form API call with a third-party service:

1. Sign up for [FormSpree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/)
2. Update `app/contact/page.tsx` to use their service
3. No backend needed!

**Option B: Use Netlify/Vercel Edge Functions**

Deploy on Netlify or Vercel which support serverless functions even with static sites.

**Option C: Skip Static Export** (see Node.js deployment below)

### Step 3: Build the Static Site

```bash
npm run build
```

This creates an `out/` folder with static files.

### Step 4: Upload to cPanel

1. **Via cPanel File Manager:**
   - Log into cPanel
   - Navigate to File Manager
   - Go to `public_html` (or your domain's root)
   - Upload all files from the `out/` folder
   - Ensure `.htaccess` is configured (see below)

2. **Via FTP:**
   - Connect to your server via FTP
   - Upload contents of `out/` folder to `public_html`

### Step 5: Configure `.htaccess`

Create `.htaccess` in `public_html` for clean URLs:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect to HTTPS (optional but recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Handle Next.js static routes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /$1.html [L]
  
  # Fallback to index
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Node.js Deployment (Advanced)

This method preserves all Next.js features including API routes, but requires Node.js support on your cPanel.

### Prerequisites
- cPanel with Node.js support (usually in "Setup Node.js App")
- SSH access (recommended)

### Step 1: Check Node.js Availability

In cPanel, look for "Setup Node.js App" or "Application Manager".

### Step 2: Update `next.config.ts`

Remove the `output: 'export'` line:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not include output: 'export'
};

export default nextConfig;
```

### Step 3: Build the Application

```bash
npm run build
```

### Step 4: Upload Files to cPanel

Upload these files/folders to your domain directory:
- `.next/` (built files)
- `public/`
- `node_modules/` (or run `npm install` on server)
- `package.json`
- `package-lock.json`
- `.env.local` (your environment variables)

### Step 5: Configure Node.js App in cPanel

1. Go to cPanel → "Setup Node.js App"
2. Click "Create Application"
3. Configure:
   - **Node.js version:** 18.x or higher
   - **Application mode:** Production
   - **Application root:** Your domain folder
   - **Application URL:** Your domain
   - **Application startup file:** `server.js` (we'll create this)
4. Click "Create"

### Step 6: Create `server.js`

Create `server.js` in your application root:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Step 7: Install Dependencies

Via SSH:
```bash
cd /home/username/your-domain-folder
npm install --production
```

Or use cPanel's Node.js App "Run NPM Install" button.

### Step 8: Start the Application

In cPanel Node.js App panel, click "Start App" or "Restart App".

### Step 9: Configure Reverse Proxy

You may need to configure Apache to proxy to your Node.js app. Add to `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

---

## Email Configuration

### Testing Email Locally

1. Configure `.env.local` with your email settings
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000/contact`
4. Submit a test form

### cPanel Email Setup

1. **Create Email Account:**
   - cPanel → Email Accounts
   - Create `info@yourdomain.com`

2. **Find SMTP Settings:**
   - Usually: `mail.yourdomain.com`
   - Port: 587 (TLS) or 465 (SSL)
   - Use the email and password you created

3. **Update `.env.local`:**
   ```env
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=info@yourdomain.com
   SMTP_PASS=your-password
   ```

### Common Email Issues

- **Connection refused:** Check firewall, ensure port 587/465 is open
- **Authentication failed:** Verify username/password
- **Emails not arriving:** Check spam folder, verify email account exists
- **SSL/TLS errors:** Try different ports (587 vs 465) and SMTP_SECURE settings

---

## Post-Deployment Checklist

- [ ] Website loads correctly at your domain
- [ ] All pages are accessible (Home, Services, Company Profile, Contact)
- [ ] Language switcher works (Japanese ⟷ English)
- [ ] Mobile responsive design works properly
- [ ] Contact form submits successfully
- [ ] Test email delivery (send test message)
- [ ] Check browser console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify SSL certificate is working (HTTPS)
- [ ] Check page load speed
- [ ] Ensure all images load correctly

---

## Troubleshooting

### Issue: Pages Show 404 Errors

**Solution:** Configure `.htaccess` for clean URLs (see above).

### Issue: Images Not Loading

**Static Export:** Ensure `images.unoptimized: true` in `next.config.ts`
**Node.js:** Check that `public/` folder was uploaded correctly.

### Issue: Contact Form Not Working

**Static Export:** API routes don't work. Use FormSpree/EmailJS instead.
**Node.js:** Check `.env.local` is uploaded and SMTP settings are correct.

### Issue: "Module not found" Errors

**Solution:** Run `npm install` on the server or upload `node_modules/` folder.

### Issue: App Won't Start in cPanel

- Check Node.js version (needs 18.x+)
- Verify `server.js` exists and is configured as startup file
- Check application logs in cPanel
- Ensure port 3000 (or configured port) is not in use

### Issue: Styles Not Loading

- Clear browser cache
- Verify CSS files in `_next/static/css/` were uploaded
- Check browser console for 404 errors

### Issue: 500 Internal Server Error

- Check server error logs in cPanel
- Verify `.env.local` file exists with correct values
- Check file permissions (should be 644 for files, 755 for directories)

---

## Performance Optimization

### 1. Enable Compression

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Enable Browser Caching

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. Optimize Images

Before uploading, compress images using:
- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)
- Or Next.js Image Optimization (Node.js deployment only)

---

## Alternative Deployment Options

### Vercel (Recommended - Full Next.js Support)

1. Push code to GitHub
2. Connect to [Vercel](https://vercel.com/)
3. Import repository
4. Add environment variables
5. Deploy (automatic)

**Pros:** Full Next.js support, automatic deployments, free tier, excellent performance
**Cons:** Not self-hosted

### Netlify

1. Push code to GitHub
2. Connect to [Netlify](https://www.netlify.com/)
3. Configure build settings
4. Add environment variables
5. Deploy

**Pros:** Good free tier, Netlify Functions for API routes
**Cons:** Some Next.js features limited

---

## Support and Maintenance

### Updating the Website

1. Make changes locally
2. Test thoroughly (`npm run dev`)
3. Build for production (`npm run build`)
4. Upload new files to cPanel
5. Clear browser cache and test

### Regular Maintenance

- **Weekly:** Check contact form is working
- **Monthly:** Update dependencies (`npm update`)
- **Quarterly:** Security updates
- **Yearly:** Review and refresh content

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [cPanel Documentation](https://docs.cpanel.net/)
- [Nodemailer Documentation](https://nodemailer.com/)

---

For any issues or questions, please contact your development team or hosting provider.
