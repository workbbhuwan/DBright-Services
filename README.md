# D.BRIGHT Services - Bilingual Multi-Service Company Website

A modern, responsive, bilingual (Japanese/English) website for D.BRIGHT Services, a comprehensive service company based in Japan offering cleaning, staffing, study abroad support, halal business support, and consulting services. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui components.

![Dbright Services](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🌟 Features

- **Bilingual Support**: Seamless switching between Japanese (default) and English
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Modern UI**: Clean, professional design with gradient backgrounds and decorative elements
- **Smooth Animations**: Framer Motion for elegant page transitions and interactions
- **Interactive Carousel**: Service showcase with shadcn/ui carousel component
- **Contact Form**: Email integration with Nodemailer and user confirmation emails
- **Partner Integration**: Featured partner section (Akaru Cleaning) in footer
- **SEO Friendly**: Optimized metadata and structure
- **Easy Deployment**: Ready for cPanel, Vercel, or Netlify

## 📁 Project Structure

```
dbright/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── company-profile/
│   │   └── page.tsx               # Company Profile page
│   ├── contact/
│   │   └── page.tsx               # Contact page with form
│   ├── services/
│   │   └── page.tsx               # Services listing page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with Navbar/Footer
│   └── page.tsx                   # Home page
├── components/
│   ├── ui/
│   │   ├── button.tsx             # Button component
│   │   ├── card.tsx               # Card component
│   │   ├── carousel.tsx           # Carousel component
│   │   ├── input.tsx              # Input component
│   │   ├── textarea.tsx           # Textarea component
│   │   └── label.tsx              # Label component
│   ├── home/
│   │   ├── animations.ts          # Framer Motion animation variants
│   │   ├── CTA.tsx                # Call-to-action section
│   │   ├── Hero.tsx               # Hero section with stats
│   │   ├── Intro.tsx              # Company introduction
│   │   ├── Services.tsx           # Services carousel
│   │   └── WhyChooseUs.tsx        # Benefits section
│   ├── Footer.tsx                 # Footer with partner links
│   ├── LanguageSwitcher.tsx       # Language toggle button
│   └── Navbar.tsx                 # Navigation bar
├── lib/
│   ├── translations/
│   │   ├── en.json                # English translations
│   │   ├── ja.json                # Japanese translations
│   │   ├── LanguageContext.tsx    # i18n context provider
│   │   └── types.ts               # Translation types
│   └── utils.ts                   # Utility functions
├── types/
│   └── css.d.ts                   # CSS module types
├── .env.local.example             # Environment variables template
├── DEPLOYMENT.md                  # Deployment guide
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your email settings:
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

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Pages Overview

### 1. Home Page (`/`)
- **Hero Section**: Full-screen background with company tagline, statistics, and CTAs
- **Intro Section**: Company overview and mission statement
- **Services Carousel**: Interactive carousel showcasing 5 main services:
  - Hotel Cleaning
  - Staffing Services
  - Halal Business Support
  - Study Abroad Support
  - Consulting for Foreigners
- **Why Choose Us**: 4 key benefits with icons and descriptions
- **CTA Section**: Final call-to-action encouraging contact

### 2. Services Page (`/services`)
- Comprehensive service listings across multiple categories
- Detailed service descriptions with images
- Call-to-action buttons for inquiries

### 3. Company Profile (`/company-profile`)
- Detailed company information:
  - Company Name: 株式会社 D.BRIGHT
  - Representative Director: OJHA KESHAV RAJ
  - Capital: ¥5,000,000
  - Banks: 千葉銀行、京葉銀
  - Main Business: Cleaning, staffing, accommodation management, translation
  - Address: Chiba Prefecture, Ichikawa City
  - Contact: Phone, Fax, Email
- Core values: Quality, Trust, Cleanliness, Professionalism
- Mission and vision statements

### 4. Contact Page (`/contact`)
- Contact form with validation
- Company contact information
- Email integration via API route

## 🌐 Bilingual Support

The website supports Japanese (default) and English. Users can switch languages via the navbar toggle.

### How it works:
1. **LanguageContext**: Provides global language state
2. **Translation Files**: `lib/translations/ja.json` and `en.json`
3. **Language Switcher**: Button in navbar to toggle languages
4. **localStorage**: Saves user's language preference

### Adding/Editing Translations:

Edit `lib/translations/ja.json` or `en.json`:
```json
{
  "nav": {
    "home": "ホーム",
    "services": "サービス"
  }
}
```

## 📧 Email Configuration

### For Gmail (Development):
1. Enable 2-Step Verification in Google Account
2. Generate App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use App Password in `.env.local`

### For cPanel Email (Production):
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=info@yourdomain.com
SMTP_PASS=your-password
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: '#2563eb', // Blue
  secondary: '#...',
}
```

### Fonts
Current fonts: Noto Sans JP (Japanese) + Inter (English)

Change in `app/layout.tsx`:
```typescript
import { Noto_Sans_JP, Inter } from "next/font/google";
```

### Content
- **Company Info**: Edit `lib/translations/ja.json` and `en.json`
- **Services**: Modify `components/home/Services.tsx` and `app/services/page.tsx`
- **Contact Info**: Update footer data in translation files
- **Partner Links**: Edit `components/Footer.tsx` to add/modify partner logos and links
- **Hero Statistics**: Update stats in `components/home/Hero.tsx`

## 🛠️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to cPanel
See detailed instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick overview:
1. **Static Export** (basic hosting):
   - Update `next.config.ts`: add `output: 'export'`
   - Run `npm run build`
   - Upload `out/` folder to `public_html`

2. **Node.js Deployment** (full features):
   - Upload built files to cPanel
   - Configure Node.js app in cPanel
   - Set environment variables

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

## 📦 Dependencies

### Production
- **next**: React framework
- **react** & **react-dom**: UI library
- **framer-motion**: Animations
- **lucide-react**: Icons
- **nodemailer**: Email sending
- **clsx** & **tailwind-merge**: CSS utilities
- **@radix-ui**: UI primitives

### Development
- **typescript**: Type safety
- **tailwindcss**: Styling
- **eslint**: Code linting

## 🐛 Troubleshooting

### Contact form not working
- Check `.env.local` is configured correctly
- Verify SMTP credentials
- Test email settings with a simple script

### Styles not loading
- Run `npm run build` to regenerate styles
- Clear browser cache
- Check `tailwind.config.ts` is correct

### Images not displaying
- Ensure images are in `public/` folder
- Use proper paths: `/image.jpg` (not `./image.jpg`)
- Check that required images exist: `heroine.png`, `logo.jpeg`, `akaru_logo.png`, service images

### Carousel not working
- Ensure embla-carousel dependencies are installed
- Check that carousel component is properly imported from `@/components/ui/carousel`

### TypeScript errors
- Run `npm run build` to see detailed errors
- Check `tsconfig.json` paths are correct

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📝 License

This project is proprietary software for Dbright Services.

## 🤝 Support

For support or questions, contact our development team.

---

**Built with ❤️ for Dbright Services**

# DBright-Services
