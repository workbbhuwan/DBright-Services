# Quick Start Guide - Dbright Services Website

## ⚡ Super Quick Start (3 Steps)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   - Visit: http://localhost:3000
   - Website runs in Japanese by default
   - Click language switcher (top-right) for English

## 📧 Enable Contact Form (Optional)

1. **Copy environment file**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local` with your email settings**
   
   For Gmail:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=info@dbright-services.jp
   ```
   
   **Note:** For Gmail, create an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Generate password for "Mail"
   - Use that password (not your regular password)

3. **Restart dev server**
   ```bash
   npm run dev
   ```

## 🎨 Customize Content

### Change Text Content
Edit translation files:
- **Japanese**: `lib/translations/ja.json`
- **English**: `lib/translations/en.json`

### Example: Change Company Name
```json
{
  "footer": {
    "company": "Your Company Name Here"
  }
}
```

### Change Colors
Edit `tailwind.config.ts` or use Tailwind classes directly in components.

## 🚀 Deploy to Production

### Quick Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Add environment variables (SMTP settings)
5. Deploy!

### Deploy to cPanel
See detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure Summary

```
dbright/
├── app/                    # All pages and routes
│   ├── page.tsx           # Home page
│   ├── services/          # Services page
│   ├── company-profile/   # About company
│   ├── contact/           # Contact form
│   └── api/contact/       # Email API
├── components/            # Reusable components
│   ├── Navbar.tsx         # Navigation
│   ├── Footer.tsx         # Footer
│   └── ui/               # UI components
└── lib/translations/      # Language files
    ├── ja.json           # Japanese
    └── en.json           # English
```

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

## ✅ Features Checklist

- [x] Bilingual (Japanese/English)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Contact form with email
- [x] Smooth animations
- [x] SEO optimized
- [x] Modern UI with Tailwind CSS

## 🆘 Troubleshooting

**Problem: Contact form doesn't work**
- Check `.env.local` exists and has correct SMTP settings
- For Gmail, use App Password (not regular password)
- Restart dev server after changing `.env.local`

**Problem: Styles look wrong**
- Run `npm run build` to regenerate
- Clear browser cache (Ctrl+Shift+R)

**Problem: Japanese text not showing**
- Fonts load from Google Fonts
- Check internet connection
- Wait a moment for fonts to load

## 📚 Documentation

- Full documentation: [README.md](./README.md)
- Deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Project structure: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🎯 What's Next?

1. ✅ Website is ready to use locally
2. 📧 Configure email for contact form
3. 🎨 Customize content and colors
4. 🚀 Deploy to production (Vercel or cPanel)
5. 📱 Test on mobile devices
6. 🔍 Add Google Analytics (optional)

---

**Need Help?** Check [README.md](./README.md) for detailed documentation!
