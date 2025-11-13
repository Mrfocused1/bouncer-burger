# Ahkii Burger - London Premium Burger Restaurant Website

A modern, mobile-first website for **Ahkii Burger**, a premium burger restaurant in London. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Bold, rugged, handcrafted aesthetic matching urban street-food vibes
- **Mobile-First**: Fully responsive design optimized for all screen sizes
- **Fast & SEO-Optimized**: Built with Next.js for server-side rendering and excellent SEO
- **Smooth Animations**: Framer Motion for engaging micro-interactions
- **Menu System**: Complete menu with 10+ burgers, sides, and drinks
- **WhatsApp Integration**: Direct ordering via WhatsApp with pre-filled messages
- **Location Mapping**: Embedded Google Maps with opening hours
- **Newsletter Signup**: Email subscription form in footer
- **TypeScript**: Full type safety throughout the codebase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font Management**: Google Fonts (Montserrat) + Rockstone custom font
- **Language**: TypeScript
- **Image Optimization**: Next.js Image Component

## Project Structure

```
ahki-burger/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── menu/
│   │   └── page.tsx            # Menu page
│   ├── globals.css             # Global styles
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navigation with mobile menu
│   │   └── Footer.tsx          # Footer with contact & newsletter
│   ├── home/
│   │   ├── Hero.tsx            # Hero section with CTA
│   │   ├── FeaturedBurgers.tsx # Featured burgers preview
│   │   ├── About.tsx           # About section
│   │   └── Location.tsx        # Location & hours with map
│   ├── menu/
│   │   ├── MenuSection.tsx     # Menu category sections
│   │   └── MenuItem.tsx        # Individual menu item cards
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── Card.tsx            # Card wrapper with hover
│       └── Container.tsx       # Max-width container
├── data/
│   └── menu.ts                 # Menu items database
├── lib/
│   └── constants.ts            # Restaurant info, WhatsApp config
├── public/
│   └── images/                 # Image assets organized by category
├── tailwind.config.ts          # Tailwind theme configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Configuration

### Brand Colors

Colors are defined in `tailwind.config.ts`:
- **Dark Green**: `#1E251B` (brand-dark) - Primary color
- **Soft Pink**: `#F8E8EC` (brand-pink) - Accent/secondary color
- **White/Off-white**: For contrast

### Restaurant Information

Update `lib/constants.ts` with:
- **Restaurant Name & Address**
- **Phone & Email**
- **WhatsApp Number** (for order link)
- **Opening Hours**
- **Social Media Links**
- **Google Maps Embed URL**

### Menu Items

Edit `data/menu.ts` to:
- Add/remove burger items
- Update prices (currently mid-range £10-14)
- Change descriptions and ingredients
- Add/remove categories

### Images

Place images in `/public/images/`:
- Burger images → `/public/images/burgers/`
- Side images → `/public/images/sides/`
- Drink images → `/public/images/drinks/`

**Image Format**: WebP with PNG/JPG fallbacks (Next.js handles automatically)

## Key Components

### Navbar
- Sticky positioning that becomes solid on scroll
- Responsive mobile menu
- "Order Now" WhatsApp CTA
- Logo using Rockstone font

### Hero Section
- Full-screen gradient background
- Animated title and subheading
- Dual CTA buttons (Order Now, View Menu)
- Scroll indicator animation

### Menu System
- Organized by category (Burgers, Sides, Drinks)
- Image with hover zoom effect
- Spicy/Vegetarian/Vegan badges
- Price display with currency symbol

### Footer
- Contact information
- Opening hours table
- Social media links
- Newsletter signup form
- WhatsApp order button

## Animations

All animations use Framer Motion:
- **Fade In**: Page load animations
- **Slide Up**: Section reveals on scroll
- **Scale**: Hover effects on buttons and cards
- **Custom**: Scroll-triggered animations

## SEO

- Dynamic metadata on all pages
- Semantic HTML structure
- Open Graph tags
- Mobile-friendly
- Fast load times (Lighthouse optimized)

## WhatsApp Integration

WhatsApp order links are configured in `lib/constants.ts`:
- Uses direct WhatsApp Web protocol (`wa.me/`)
- Pre-filled order message
- Opens in new tab
- Works on mobile & desktop

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel dashboard or CLI
vercel
```

### Other Platforms
- **Netlify**: Supported
- **AWS Amplify**: Supported
- **Traditional Hosting**: Use `npm run build` then `npm start`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Bundle Size**: ~150KB gzipped
- **Images**: Optimized and lazy-loaded
- **Animations**: GPU-accelerated with `will-change`
- **Code Splitting**: Automatic with Next.js

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliant

## Future Enhancements

- [ ] Online ordering system integration
- [ ] Instagram feed display
- [ ] Customer testimonials/reviews
- [ ] Blog for food updates
- [ ] Loyalty program
- [ ] Multiple restaurant locations
- [ ] CMS integration (Sanity, Contentful)
- [ ] Analytics dashboard

## Support

For questions or issues:
- Email: hello@ahkiiburger.com
- Phone: +44 20 1234 5678
- WhatsApp: (Check constants.ts for number)

## License

© 2024 Ahkii Burger. All rights reserved.
