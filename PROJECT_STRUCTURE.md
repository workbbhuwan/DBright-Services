# Dbright Services - Project Structure

## Complete File Tree

```
dbright/
│
├── app/                                    # Next.js App Router directory
│   ├── api/                               # API routes
│   │   └── contact/
│   │       └── route.ts                   # Contact form email handler
│   │
│   ├── company-profile/                   # Company Profile page route
│   │   └── page.tsx                       # Company info, mission, values
│   │
│   ├── contact/                           # Contact page route
│   │   └── page.tsx                       # Contact form and info
│   │
│   ├── services/                          # Services page route
│   │   └── page.tsx                       # Service cards grid
│   │
│   ├── globals.css                        # Global styles and CSS variables
│   ├── layout.tsx                         # Root layout (Navbar, Footer)
│   └── page.tsx                           # Home page (Hero, Intro, Why Choose Us)
│
├── components/                            # React components
│   ├── ui/                                # shadcn/ui base components
│   │   ├── button.tsx                     # Button with variants
│   │   ├── card.tsx                       # Card components
│   │   ├── input.tsx                      # Input field
│   │   ├── label.tsx                      # Form label
│   │   └── textarea.tsx                   # Textarea field
│   │
│   ├── Footer.tsx                         # Site footer with contact info
│   ├── LanguageSwitcher.tsx               # Language toggle (JA/EN)
│   └── Navbar.tsx                         # Navigation bar (sticky)
│
├── lib/                                   # Utility libraries
│   ├── translations/                      # Internationalization
│   │   ├── en.json                        # English translations
│   │   ├── ja.json                        # Japanese translations
│   │   ├── LanguageContext.tsx            # React Context for i18n
│   │   └── types.ts                       # TypeScript types for translations
│   │
│   └── utils.ts                           # Utility functions (cn helper)
│
├── public/                                # Static assets
│   ├── next.svg                           # Next.js logo
│   └── vercel.svg                         # Vercel logo
│
├── types/                                 # TypeScript declarations
│   └── css.d.ts                           # CSS module types
│
├── .env.local.example                     # Environment variables template
├── .eslintrc.json                         # ESLint configuration
├── .gitignore                             # Git ignore rules
├── DEPLOYMENT.md                          # Deployment guide (cPanel, Vercel)
├── README.md                              # Project documentation
├── eslint.config.mjs                      # ESLint config (new format)
├── next-env.d.ts                          # Next.js TypeScript declarations
├── next.config.ts                         # Next.js configuration
├── package.json                           # Dependencies and scripts
├── package-lock.json                      # Locked dependencies
├── postcss.config.mjs                     # PostCSS configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
└── tsconfig.json                          # TypeScript configuration
```

## Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration (image optimization, etc.) |
| `tailwind.config.ts` | Tailwind CSS theme and plugin configuration |
| `tsconfig.json` | TypeScript compiler options and paths |
| `eslint.config.mjs` | Code linting rules |
| `postcss.config.mjs` | CSS processing configuration |

### Application Core

| File/Folder | Purpose |
|-------------|---------|
| `app/layout.tsx` | Root layout wrapping all pages with Navbar/Footer |
| `app/page.tsx` | Home page (landing page) |
| `app/globals.css` | Global CSS styles and custom classes |

### Pages (Routes)

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Home page with hero, intro, why choose us |
| `/services` | `app/services/page.tsx` | Grid of 6 cleaning services |
| `/company-profile` | `app/company-profile/page.tsx` | Company info, mission, values |
| `/contact` | `app/contact/page.tsx` | Contact form and company details |
| `/api/contact` | `app/api/contact/route.ts` | Email sending API endpoint |

### Components

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Site navigation with logo, links, language switcher |
| `Footer.tsx` | Footer with company info and contact details |
| `LanguageSwitcher.tsx` | Button to toggle between Japanese and English |
| `ui/button.tsx` | Reusable button with size/variant options |
| `ui/card.tsx` | Card container for content blocks |
| `ui/input.tsx` | Form input field |
| `ui/textarea.tsx` | Multi-line text input |
| `ui/label.tsx` | Form field label |

### Translation System

| File | Purpose |
|------|---------|
| `lib/translations/ja.json` | All Japanese text content |
| `lib/translations/en.json` | All English text content |
| `lib/translations/LanguageContext.tsx` | React Context managing language state |
| `lib/translations/types.ts` | TypeScript interfaces for translations |

### Utilities

| File | Purpose |
|------|---------|
| `lib/utils.ts` | Helper functions (e.g., `cn` for className merging) |

## Data Flow

### Language Switching
1. User clicks language toggle in Navbar
2. `LanguageSwitcher` calls `setLanguage()` from `LanguageContext`
3. Context updates state and saves to localStorage
4. All components using `useLanguage()` re-render with new translations

### Contact Form Submission
1. User fills form in `app/contact/page.tsx`
2. Form submits to `/api/contact`
3. API route (`app/api/contact/route.ts`) validates data
4. Nodemailer sends email via SMTP
5. Success/error message shown to user

### Page Navigation
1. User clicks nav link
2. Next.js App Router handles client-side navigation
3. Page component loads
4. Framer Motion animations trigger
5. Content displays with smooth transitions

## Environment Variables

Required variables in `.env.local`:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
SMTP_FROM=noreply@dbright-services.jp
CONTACT_EMAIL=info@dbright-services.jp
SEND_USER_CONFIRMATION=true
```

## Build Output

### Development Mode
```bash
npm run dev
```
- Hot reload enabled
- Source maps included
- Runs on http://localhost:3000

### Production Build
```bash
npm run build
```
Creates:
- `.next/` folder with optimized bundles
- Static pages pre-rendered
- API routes as serverless functions

### Production Start
```bash
npm start
```
Serves the production build on port 3000

## Dependencies Overview

### Core Framework
- **next** (16.0.1): React framework
- **react** (19.2.0): UI library
- **react-dom** (19.2.0): React DOM renderer

### Styling
- **tailwindcss** (4.x): Utility-first CSS
- **tailwind-merge**: Merge Tailwind classes
- **clsx**: Conditional classnames
- **class-variance-authority**: Component variants

### UI Components
- **@radix-ui/react-slot**: Composition primitive
- **@radix-ui/react-label**: Accessible labels
- **lucide-react**: Icon library

### Animations
- **framer-motion**: Animation library

### Email
- **nodemailer**: Email sending

### Development
- **typescript** (5.x): Type safety
- **eslint**: Code linting
- **@types/node**: Node.js types
- **@types/react**: React types
- **@types/nodemailer**: Nodemailer types

## File Conventions

### Component Files
- Use `.tsx` extension for components
- PascalCase for component names (`Navbar.tsx`)
- Use `'use client'` directive for client components

### Page Files
- Named `page.tsx` in route folders
- Use `'use client'` if needs interactivity
- Export default function

### API Routes
- Named `route.ts` in API folders
- Export HTTP method handlers (GET, POST, etc.)
- Located in `app/api/` directory

### Style Files
- `.css` for global styles
- Tailwind utility classes in JSX
- CSS modules not used (using Tailwind instead)

## Performance Features

- ✅ Static page pre-rendering
- ✅ Image optimization (Next.js)
- ✅ Font optimization (Google Fonts)
- ✅ Code splitting (automatic)
- ✅ Lazy loading components
- ✅ CSS purging (Tailwind)
- ✅ Minification (production build)

## Accessibility Features

- ✅ Semantic HTML
- ✅ ARIA labels on buttons
- ✅ Focus visible states
- ✅ Keyboard navigation
- ✅ Form labels
- ✅ Responsive design
- ✅ Color contrast (WCAG AA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Expansion

To add new features:

1. **New Page**: Create folder in `app/` with `page.tsx`
2. **New Component**: Add to `components/` folder
3. **New Translation**: Update `ja.json` and `en.json`
4. **New API Route**: Add to `app/api/` folder
5. **New Service**: Edit `app/services/page.tsx`

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
