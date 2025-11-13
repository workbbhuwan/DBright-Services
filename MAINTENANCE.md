# Maintenance & Tips - Dbright Services Website

## 🔄 Regular Maintenance Tasks

### Weekly
- [ ] Check contact form submissions work
- [ ] Test website on mobile devices
- [ ] Verify all links function correctly
- [ ] Monitor email delivery

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Check for security updates
- [ ] Review and update content
- [ ] Backup website files

### Quarterly
- [ ] Major dependency updates
- [ ] Performance audit
- [ ] SEO review
- [ ] User experience review

---

## 🎨 Common Customization Tasks

### Update Company Information

**Location:** `lib/translations/ja.json` and `lib/translations/en.json`

```json
{
  "footer": {
    "company": "Your Company Name",
    "address": "Your Address",
    "phone": "Your Phone",
    "email": "Your Email"
  }
}
```

### Add a New Service

**Location:** `app/services/page.tsx`

```typescript
const services = [
  // Add new service here
  {
    icon: YourIcon,
    title: t.services.list.newService.title,
    description: t.services.list.newService.description,
    color: 'bg-pink-100 text-pink-600'
  },
  // ... existing services
];
```

Then update translations:
```json
{
  "services": {
    "list": {
      "newService": {
        "title": "New Service Name",
        "description": "Service description"
      }
    }
  }
}
```

### Change Color Scheme

**Primary Blue → Your Color**

Find and replace across components:
- `bg-blue-600` → `bg-yourcolor-600`
- `text-blue-600` → `text-yourcolor-600`
- `hover:bg-blue-700` → `hover:bg-yourcolor-700`

Or edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#yourcolor',
    }
  }
}
```

### Add Your Logo

1. Place logo in `public/logo.png`
2. Update `components/Navbar.tsx`:
```tsx
<Link href="/" className="flex items-center gap-2">
  <Image src="/logo.png" alt="Logo" width={40} height={40} />
  <span className="text-xl font-bold">Dbright Services</span>
</Link>
```

---

## Email Configuration Guides

### Gmail Setup (Development)

1. **Enable 2-Step Verification**
   - Google Account → Security → 2-Step Verification

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update .env.local**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=youremail@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

### cPanel Email Setup (Production)

1. **Create Email Account in cPanel**
   - Email Accounts → Create
   - Email: info@yourdomain.com
   - Password: Strong password

2. **Get Mail Server Settings**
   - Usually: mail.yourdomain.com
   - Port: 587 (TLS) or 465 (SSL)

3. **Update .env.local**
   ```env
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=info@yourdomain.com
   SMTP_PASS=your-email-password
   ```

### Testing Email Locally

```bash
# 1. Configure .env.local
# 2. Start dev server
npm run dev

# 3. Visit contact page
# http://localhost:3000/contact

# 4. Submit test form
# Check email inbox
```

---

## Troubleshooting Guide

### Contact Form Issues

**Problem:** Email not sending
```bash
# Check .env.local exists
ls -la .env.local

# Verify SMTP settings are correct
# Restart dev server
npm run dev
```

**Problem:** "Module not found" error
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Form submits but no email
- Check spam folder
- Verify SMTP credentials
- Check server logs: `console.log` in API route
- Test SMTP with online tool

### Build Issues

**Problem:** Build fails
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

**Problem:** TypeScript errors
```bash
# Check types
npx tsc --noEmit

# Fix and rebuild
```

### Styling Issues

**Problem:** Styles not applying
```bash
# Rebuild Tailwind
npm run build

# Clear browser cache
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)
```

**Problem:** Dark colors on dark background
- Check color combinations
- Ensure sufficient contrast
- Use browser dev tools to inspect

---

## Performance Optimization

### Image Optimization

1. **Compress images before uploading**
   - Use TinyPNG.com
   - Recommended: WebP format
   - Max size: 200KB per image

2. **Use Next.js Image component**
   ```tsx
   import Image from 'next/image';
   
   <Image 
     src="/image.jpg" 
     alt="Description"
     width={800}
     height={600}
     priority // For above-fold images
   />
   ```

### Code Optimization

1. **Lazy load components**
   ```tsx
   import dynamic from 'next/dynamic';
   
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>
   });
   ```

2. **Optimize bundle size**
   ```bash
   # Analyze bundle
   npm run build
   
   # Check .next/analyze for insights
   ```

### Font Optimization

Fonts are already optimized with Google Fonts!
- Noto Sans JP (Japanese)
- Inter (English)
- Using `next/font` for automatic optimization

---

## Security Best Practices

### Environment Variables

✅ **DO:**
- Keep `.env.local` private
- Use `.env.local.example` for templates
- Store secrets in environment variables
- Use different credentials for dev/prod

**DON'T:**
- Commit `.env.local` to Git
- Share credentials publicly
- Hardcode passwords in code
- Use same password everywhere

### Form Security

Already implemented:
✅ Server-side validation
✅ CSRF protection (Next.js)
✅ Input sanitization
✅ Email validation
✅ Rate limiting (add if needed)

### Production Checklist

- [ ] Remove console.logs
- [ ] Use HTTPS only
- [ ] Set secure headers
- [ ] Enable CORS properly
- [ ] Update dependencies regularly

---

## Analytics Setup (Optional)

### Google Analytics 4

1. **Create GA4 property**
   - Visit: analytics.google.com
   - Create new property
   - Copy Measurement ID (G-XXXXXXXXXX)

2. **Add to project**
   
   Create `lib/gtag.ts`:
   ```typescript
   export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
   
   export const pageview = (url: string) => {
     window.gtag('config', GA_TRACKING_ID!, {
       page_path: url,
     });
   };
   ```
   
   Update `app/layout.tsx`:
   ```tsx
   import Script from 'next/script';
   
   // In <head>
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
     strategy="afterInteractive"
   />
   ```

3. **Add to .env.local**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

---

## 🎯 SEO Optimization

### Current SEO Features

✅ Proper HTML structure
✅ Meta tags (title, description)
✅ Semantic HTML
✅ Fast page loads
✅ Mobile responsive
✅ Clean URLs

### Improvements to Add

1. **Meta descriptions per page**
   ```tsx
   // In each page.tsx
   export const metadata = {
     title: "Services - Dbright",
     description: "Professional cleaning services...",
   };
   ```

2. **Sitemap.xml**
   ```bash
   # Install
   npm install next-sitemap
   
   # Configure in next.config.ts
   ```

3. **Robots.txt**
   ```txt
   # Create public/robots.txt
   User-agent: *
   Allow: /
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

---

## Deployment Tips

### Before Deploying

✅ Test locally: `npm run build && npm start`
✅ Check all pages load
✅ Test contact form
✅ Verify translations
✅ Test on mobile
✅ Check browser console (no errors)
✅ Review all content
✅ Backup original files

### After Deploying

✅ Test live site
✅ Submit test contact form
✅ Check email delivery
✅ Test all links
✅ Verify HTTPS works
✅ Test on different browsers
✅ Check mobile responsiveness
✅ Monitor for errors

---

## Content Writing Tips

### Homepage Hero

**Good:**
- Short, impactful headline
- Clear value proposition
- Strong call-to-action

**Bad:**
- Long paragraphs
- Vague statements
- Too many CTAs

### Service Descriptions

**Structure:**
1. What is it?
2. Who is it for?
3. What makes it special?
4. Call-to-action

**Keep it:**
- Concise (2-3 sentences)
- Benefit-focused
- Easy to scan
- Action-oriented

---

## Design Consistency

### Color Usage

**Primary Blue:** Main actions, links, accents
**Gray:** Text, borders, backgrounds
**White:** Main background
**Accent Colors:** Service cards only

### Typography

**Headings:** Bold, large, clear hierarchy
**Body:** Regular weight, readable size
**Links:** Blue, underline on hover
**Buttons:** Bold, high contrast

### Spacing

**Consistent padding:** 4, 8, 16, 24, 32px
**Section spacing:** 60-100px vertical
**Card spacing:** 24px gap in grids

---

## 📱 Mobile Testing Checklist

- [ ] Navbar hamburger menu works
- [ ] All text is readable
- [ ] Buttons are tap-friendly (min 44px)
- [ ] Forms work on mobile keyboard
- [ ] Images scale properly
- [ ] No horizontal scrolling
- [ ] Language switcher accessible
- [ ] Contact info visible
- [ ] Fast loading on 3G

---

## 🔄 Version Control Tips

### Git Best Practices

```bash
# Good commit messages
git commit -m "Add new service card for office cleaning"
git commit -m "Fix contact form validation"
git commit -m "Update Japanese translations"

# Bad commit messages
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
```

### Branching Strategy

```bash
# Main branch: production
# Dev branch: development

# Create feature branch
git checkout -b feature/add-blog

# Merge when done
git checkout main
git merge feature/add-blog
```

---

## Getting Help

### Documentation Order

1. **QUICKSTART.md** - Basic setup
2. **README.md** - Full documentation
3. **DEPLOYMENT.md** - Hosting guide
4. **PROJECT_STRUCTURE.md** - Architecture
5. **This file** - Maintenance tips

### External Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- React: https://react.dev

### Community Support

- Stack Overflow: Tag [next.js]
- GitHub Issues: Report bugs
- Next.js Discord: Community help

---

**💡 Remember:** Small, incremental changes are better than large rewrites!

Keep your site updated, test regularly, and maintain good documentation.

Good luck with your Dbright Services website! 🎉
