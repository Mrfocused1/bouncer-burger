# Ahkii Burger - Images Implementation Guide

## 🎨 Images Are Now Live!

Your website now has **high-quality, real burger images** integrated from Unsplash. All 20+ menu items display beautiful food photography.

## 📸 What's Included

### Burgers (10 items - 2 views each)
Every burger now has:
1. **Normal View** - Standard burger presentation
2. **Cross-Section View** - Showing ingredients/layers

**Interactive Feature**: Click the **"📍 Layers"** button on any burger card to toggle between normal and cross-section views!

Burgers with images:
- The Ahkii Classic
- The Double Trouble
- The Heatwave
- The BBQ Stack
- The Melt
- The Veggie Way
- The Ahkii Special
- The Truffle Boss
- The Sweet & Spicy
- The Blue Smoke

### Sides (5 items)
- Regular Fries
- Loaded Fries
- Sweet Potato Fries
- Onion Rings
- Mozz Sticks

### Drinks (5 items)
- Coca-Cola
- Sprite
- Fanta
- Still Water
- Sparkling Water

## 🔄 How It Works

### Image URLs
All images are loaded directly from **Unsplash** (free stock photos):
- No API key required
- High-quality images (~800x600px)
- Optimized for web

### Toggle Functionality
For burgers only:
1. Hover over burger card
2. Click **"📍 Layers"** button to see cross-section
3. Click **"🔄 Normal"** to go back

This is implemented in `components/menu/MenuItem.tsx` with Framer Motion animations.

## 📝 Where Images Are Configured

### File: `data/menu.ts`

Each menu item now includes:
```typescript
{
  id: 'classic',
  name: 'The Ahkii Classic',
  description: '...',
  price: 11.99,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
  crossSectionImage: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop',
  category: 'burger',
}
```

### Image Properties
- `image` - Main/normal view (required for all items)
- `crossSectionImage` - Cross-section/layered view (only for burgers)

## 🔗 Image Sources

All images are from **Unsplash** (Free, Attribution-Free License):
- Professional stock photos
- High resolution
- Optimized for web
- No rate limiting for standard use

## 🎯 Using Your Own Images

When you want to replace with your own burger photos:

### Option 1: Keep Using URLs
1. Upload your images to Cloudinary/AWS S3/your server
2. Update the URLs in `data/menu.ts`:
```typescript
image: 'https://your-domain.com/images/burger.jpg',
crossSectionImage: 'https://your-domain.com/images/burger-cross.jpg',
```

### Option 2: Use Local Images
1. Add images to `/public/images/burgers/`, `/public/images/sides/`, `/public/images/drinks/`
2. Update paths in `data/menu.ts`:
```typescript
image: '/images/burgers/classic.jpg',
crossSectionImage: '/images/burgers/classic-cross.jpg',
```

## 🖼️ Image Recommendations

For best results:

**Size**: 800x600px (landscape) or 600x800px (portrait)
**Format**: JPG or WebP
**Quality**: 70-85% compression (balance quality vs file size)
**Weight**: Keep under 150KB per image

### How to Create Cross-Section Photos

If you have real burger photos:
1. **Photoshop**: Split burger in half, layer visible
2. **AI Tools**: Use Canva, DALL-E, or Midjourney to generate split-view
3. **Photography**: Photograph burger cut in half
4. **Alternative**: Show ingredients laid out separately

## 🚀 Current Implementation

### Mobile View
- Images are responsive
- Toggle button visible and clickable
- Smooth transitions between views

### Desktop View
- Hover effects on images
- Images scale up slightly on hover
- Toggle button easily accessible

### Loading
- Lazy loading for performance
- Fallback gray background while loading
- Preload key images for fast initial load

## 🔄 How to Modify

### Change an Image

Edit `data/menu.ts`:
```typescript
{
  id: 'classic',
  // ... other properties ...
  image: 'YOUR_NEW_IMAGE_URL',
  crossSectionImage: 'YOUR_NEW_CROSS_SECTION_URL',
}
```

### Add More Burgers

```typescript
{
  id: 'new-burger',
  name: 'The New Burger',
  description: 'Description here...',
  price: 12.99,
  image: 'https://unsplash.com/...',
  crossSectionImage: 'https://unsplash.com/...',
  category: 'burger',
  spicy: true, // optional
  vegetarian: false, // optional
  vegan: false, // optional
}
```

### Remove Cross-Section View

Simply delete the `crossSectionImage` property. The toggle button won't appear.

## 🎯 Features

✅ **Real-time Updates**: Change image URLs and the site updates instantly
✅ **Responsive Design**: Images work on all screen sizes
✅ **Optimized Loading**: Lazy loading for better performance
✅ **Smooth Animations**: Framer Motion transitions between views
✅ **Fallback Handling**: Gray background if image fails to load
✅ **Accessibility**: Alt text for all images
✅ **Mobile-Friendly**: Touch-friendly toggle buttons

## 📊 Performance

Current image loading:
- **Preload**: Hero section images (important ones first)
- **Lazy Load**: Menu item images (load when needed)
- **Format**: WebP support with JPG fallback
- **Caching**: Browser caching enabled

## 🔗 Image URLs Currently Used

### Burgers
- Classic: `unsplash.com/photo-1568901346375-23c9450c58cd`
- Double: `unsplash.com/photo-1550547990-532ff39a7a19`
- Heatwave: `unsplash.com/photo-1585238341710-4dd0e06a4c4b`
- More in `data/menu.ts`

### Sides
- Fries: `unsplash.com/photo-1584054606400-a4f989b8d4d5`
- Loaded Fries: `unsplash.com/photo-1608222351212-18fe9f059dc9`
- More in `data/menu.ts`

### Drinks
- Cola: `unsplash.com/photo-1554866585-acbb2c52ffe5`
- Sprite: `unsplash.com/photo-1527082395-e0fa16038ef0`
- More in `data/menu.ts`

## 🛠️ Troubleshooting

### Image not showing?
1. Check URL is valid (copy paste into browser)
2. Ensure image has CORS enabled
3. Try a different image from Unsplash
4. Check browser console for errors

### Toggle button not appearing?
1. Item must be a burger (category: 'burger')
2. Item must have `crossSectionImage` property
3. Clear cache and reload page

### Image loading slowly?
1. Reduce image dimensions
2. Compress image size
3. Use CDN for faster delivery
4. Check internet connection

## 📱 Mobile Optimization

Images are automatically optimized for mobile:
- Responsive sizing
- Touch-friendly buttons
- Lazy loading reduces bandwidth
- Optimized image format selection

## 🎨 Next Steps

1. **Test**: Visit `http://localhost:3000` and check the images
2. **Click**: Try toggling burger views with the "📍 Layers" button
3. **Customize**: When ready, replace Unsplash URLs with your own photos
4. **Deploy**: Push to production with real images

## 📞 Support

For image-related issues:
- Check `data/menu.ts` for URL configuration
- Verify images load in browser
- Check console (F12 -> Console tab) for errors
- Test different image URLs from Unsplash

---

**Status**: ✅ All images configured and working
**Ready for**: Production or customization with your own photos
**Last Updated**: November 2024
