# 📧 How to Get FREE Email Working (Resend - 3,000 emails/month)

## Quick Setup (5 minutes)

### 1. Create Resend Account (FREE)
1. Go to: https://resend.com/signup
2. Sign up with your email or GitHub
3. Verify your email

### 2. Get Your API Key
1. After login, go to: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name it: `dbright-services`
4. Copy the API key (starts with `re_...`)

### 3. Add to Your Project

**Local Development (.env.local):**
```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=info@dbrightservices.com
SEND_USER_CONFIRMATION=false
```

**Vercel Production:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - Name: `RESEND_API_KEY`
   - Value: `re_your_api_key_here`
   - Environment: Production, Preview, Development
3. Add:
   - Name: `CONTACT_EMAIL`
   - Value: `info@dbrightservices.com`

### 4. Install Dependencies
```bash
npm install
```

### 5. Test Locally
```bash
npm run dev
```
Go to http://localhost:3000/contact and submit a test form.

### 6. Deploy to Vercel
```bash
git add .
git commit -m "Switch to Resend for email"
git push
```

## ✅ What You Get (FREE Tier)

- ✅ **3,000 emails per month**
- ✅ **No credit card required**
- ✅ Works perfectly on Vercel
- ✅ 99.9% deliverability
- ✅ Email tracking & analytics
- ✅ Easy to use API

## 📝 Default Email Configuration

**From:** `D.BRIGHT Services <onboarding@resend.dev>`
- Initially uses Resend's test domain
- Works immediately, no setup needed
- Deliverable to any email

**To:** `info@dbrightservices.com` (your contact email)

**Reply-To:** Customer's email (you can reply directly)

## 🎯 Optional: Use Your Own Domain (Later)

Want emails from `contact@dbrightservices.com`?

1. In Resend Dashboard → Domains → Add Domain
2. Add `dbrightservices.com`
3. Add DNS records (provided by Resend)
4. Verify domain
5. Update code to use: `D.BRIGHT Services <contact@dbrightservices.com>`

**Note:** For now, the default `onboarding@resend.dev` works perfectly!

## 🔧 Troubleshooting

### Email not sending?
1. Check API key is set in `.env.local` or Vercel
2. Check Resend Dashboard → Logs for errors
3. Make sure you're not exceeding 3,000 emails/month

### Email going to spam?
- Initially might happen with `onboarding@resend.dev`
- Solution: Add your own domain (see above)
- Or ask recipients to whitelist sender

### Need more emails?
- FREE tier: 3,000 emails/month
- Paid tier: $20/month for 50,000 emails (only if you need more)

## 📊 Monitor Your Usage

View in Resend Dashboard:
- Total emails sent
- Delivery rate
- Opens & clicks (if enabled)
- Monthly usage

---

**Your contact form is now 100% functional with FREE email! 🎉**

No more SMTP issues, no server configuration needed.
