# Ahkii Burger - Deployment Checklist

## ✅ Pre-Deployment Tasks

Complete these before launching your website:

### 1. Content Updates

- [ ] **Update Restaurant Info** (`lib/constants.ts`)
  - [ ] Set correct WhatsApp number
  - [ ] Add full restaurant address
  - [ ] Verify phone number
  - [ ] Confirm email address
  - [ ] Set correct opening hours for each day
  - [ ] Update social media links (Instagram, Facebook, Twitter)
  - [ ] Get Google Maps embed URL for your location

- [ ] **Customize Menu** (`data/menu.ts`)
  - [ ] Review all burger names and descriptions
  - [ ] Verify prices (currently £10-14 range)
  - [ ] Check ingredient lists are accurate
  - [ ] Update any dietary restrictions
  - [ ] Add/remove items if needed

- [ ] **Add Images** (`/public/images/`)
  - [ ] Add 10 burger photos to `/burgers/`
  - [ ] Add 5 side dish photos to `/sides/`
  - [ ] Add 5 drink photos to `/drinks/`
  - [ ] Optimize images (recommended: 800x600px, <200KB each)
  - [ ] Add logo to `/images/logo.svg` or `/images/logo.png`

### 2. Branding & Design

- [ ] **Colors** (if customizing)
  - [ ] Update brand colors in `tailwind.config.ts`
  - [ ] Verify color contrast is accessible
  - [ ] Test colors on different devices

- [ ] **Fonts**
  - [ ] Rockstone displays correctly (headings)
  - [ ] Montserrat displays correctly (body text)
  - [ ] Test on all browsers

- [ ] **Logo**
  - [ ] Update Navbar to use your logo image
  - [ ] Logo displays at correct size
  - [ ] Logo works on light and dark backgrounds

### 3. Testing

- [ ] **Desktop Testing**
  - [ ] Homepage loads correctly
  - [ ] Menu page displays all items
  - [ ] Navbar is sticky and responsive
  - [ ] Footer displays all information
  - [ ] All links work (internal and external)
  - [ ] WhatsApp buttons open correctly

- [ ] **Mobile Testing**
  - [ ] Test on iPhone (Safari)
  - [ ] Test on Android (Chrome)
  - [ ] Mobile menu hamburger works
  - [ ] Touch buttons are easy to tap
  - [ ] Images load properly
  - [ ] Text is readable at small sizes

- [ ] **Tablet Testing**
  - [ ] Layout adapts well to tablet size
  - [ ] All buttons are accessible

- [ ] **Browser Compatibility**
  - [ ] Chrome/Edge (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)

- [ ] **Performance**
  - [ ] Run Lighthouse audit (aim for 90+)
  - [ ] Check Core Web Vitals
  - [ ] Verify page load time < 3 seconds
  - [ ] Check bundle size is reasonable

- [ ] **WhatsApp Integration**
  - [ ] WhatsApp buttons send to correct number
  - [ ] Message pre-fill is appropriate
  - [ ] Links work on desktop and mobile
  - [ ] No error messages

- [ ] **Forms**
  - [ ] Newsletter signup works
  - [ ] Email validation works
  - [ ] Submit button gives feedback

- [ ] **Accessibility**
  - [ ] Can navigate with keyboard only
  - [ ] Color contrast is accessible
  - [ ] Images have alt text
  - [ ] Forms are properly labeled

### 4. SEO Preparation

- [ ] **Metadata**
  - [ ] Homepage title is compelling
  - [ ] Homepage description is accurate
  - [ ] Menu page has proper title and description
  - [ ] All pages have unique meta tags
  - [ ] Open Graph image is set (1200x630px)

- [ ] **Local SEO**
  - [ ] Google My Business account created
  - [ ] Address is consistent across web
  - [ ] Phone number is correct
  - [ ] Hours are accurate
  - [ ] Business category is set

- [ ] **Technical SEO**
  - [ ] Sitemap is generated
  - [ ] Robots.txt is configured
  - [ ] Mobile-friendly (Mobile-Friendly Test)
  - [ ] No broken links
  - [ ] HTTPS is enabled (if using custom domain)

### 5. Analytics & Tracking

- [ ] **Google Analytics**
  - [ ] Create Google Analytics account
  - [ ] Add tracking code to app
  - [ ] Verify tracking is working
  - [ ] Set up goals (WhatsApp clicks, page views)

- [ ] **Google Search Console**
  - [ ] Submit sitemap
  - [ ] Verify domain ownership
  - [ ] Monitor for errors
  - [ ] Check coverage

- [ ] **Google My Business**
  - [ ] Create/claim business profile
  - [ ] Add photos
  - [ ] Add opening hours
  - [ ] Respond to reviews

### 6. Deployment Setup

Choose your hosting platform:

#### **Vercel (Recommended)**
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set environment variables (if any)
- [ ] Deploy first version
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic)
- [ ] Configure analytics
- [ ] Set up preview deployments

#### **Netlify**
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build command: `npm run build`
- [ ] Configure publish directory: `.next`
- [ ] Deploy first version
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic)

#### **Traditional Hosting**
- [ ] Set up Node.js environment (v18+)
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Set up process manager (PM2, systemd)
- [ ] Configure reverse proxy (nginx, Apache)
- [ ] Set up SSL certificate
- [ ] Configure domain DNS

### 7. Domain & DNS

- [ ] **Domain Setup**
  - [ ] Register domain (if not done)
  - [ ] Purchase SSL certificate (if needed)
  - [ ] Point DNS to hosting provider
  - [ ] Allow 24-48 hours for propagation
  - [ ] Verify domain is live

- [ ] **Email Setup** (Optional)
  - [ ] Set up email forwarding
  - [ ] Create business email accounts
  - [ ] Update contact form email

### 8. Security

- [ ] **HTTPS/SSL**
  - [ ] Enable HTTPS
  - [ ] Redirect HTTP to HTTPS
  - [ ] Check SSL certificate is valid

- [ ] **Security Headers**
  - [ ] Configure Content-Security-Policy
  - [ ] Add X-Frame-Options
  - [ ] Enable HSTS (if using custom domain)

- [ ] **Environment Variables**
  - [ ] All sensitive data removed from code
  - [ ] `.env.local` is in `.gitignore`
  - [ ] Production secrets set properly
  - [ ] No API keys in repository

### 9. Launch Preparation

- [ ] **Final Review**
  - [ ] All content is correct
  - [ ] No typos or grammar errors
  - [ ] All images are optimized
  - [ ] Phone number is prominent
  - [ ] WhatsApp ordering is clear
  - [ ] Opening hours are visible

- [ ] **Backup & Version Control**
  - [ ] Repository is backed up
  - [ ] Production branch is protected
  - [ ] Deployment history is tracked
  - [ ] Rollback plan is ready

- [ ] **Documentation**
  - [ ] README.md is up to date
  - [ ] QUICK_START.md is accurate
  - [ ] Environment setup is documented
  - [ ] Deployment process is documented

### 10. Post-Launch

- [ ] **Monitor Performance**
  - [ ] Check analytics daily for first week
  - [ ] Monitor error logs
  - [ ] Check Lighthouse scores weekly
  - [ ] Monitor Core Web Vitals

- [ ] **Marketing**
  - [ ] Share website on social media
  - [ ] Add link to Instagram bio
  - [ ] Update Google My Business
  - [ ] Send to email list (if you have one)
  - [ ] Update physical location signage

- [ ] **Ongoing Maintenance**
  - [ ] Update menu regularly
  - [ ] Respond to reviews
  - [ ] Monitor and fix broken links
  - [ ] Keep dependencies updated
  - [ ] Back up data regularly

---

## 🚀 Deployment Commands

### Vercel Deployment
```bash
npx vercel
```

### Netlify Deployment
```bash
npm run build
# Deploy .next folder to Netlify
```

### Manual/Traditional Deployment
```bash
npm install
npm run build
npm start
```

## 📋 Launch Checklist Summary

```
Content & Design
├── [ ] Restaurant info updated
├── [ ] Menu items verified
├── [ ] All images added
├── [ ] Branding customized
└── [ ] Logo added

Testing
├── [ ] Desktop tested
├── [ ] Mobile tested
├── [ ] All browsers tested
├── [ ] Performance checked
├── [ ] Links verified
└── [ ] WhatsApp working

SEO & Analytics
├── [ ] Metadata optimized
├── [ ] Google Analytics set up
├── [ ] Google My Business claimed
└── [ ] Sitemap submitted

Deployment
├── [ ] Hosting provider chosen
├── [ ] Domain configured
├── [ ] SSL/HTTPS enabled
├── [ ] Environment set up
└── [ ] Site live

Post-Launch
├── [ ] Analytics monitored
├── [ ] Social media updated
├── [ ] Performance tracked
└── [ ] Maintenance plan ready
```

## 🎉 Launch Day

1. **Final check** - Run through checklist one more time
2. **Deploy** - Push to production
3. **Monitor** - Watch for errors in first hour
4. **Announce** - Share on social media
5. **Celebrate** - Your site is live! 🎊

---

**Good luck with your launch!**

For any questions, refer to:
- QUICK_START.md - Setup and customization
- README.md - Full documentation
- PROJECT_SUMMARY.md - Overview of what was built
