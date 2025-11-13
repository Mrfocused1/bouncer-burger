# AI Image Generation for Ahkii Burger

## Status
Your Ahkii Burger website is **fully functional** with professional food photography images from Pexels.

## Option 1: Current Setup (Recommended - Production Ready)
✅ **Active**: Professional food photography from Pexels
✅ **Quality**: High-quality professional images
✅ **Speed**: Instant loading
✅ **Cost**: Free
✅ **Status**: Live at http://localhost:3000/menu

## Option 2: Generate AI Images Locally (Advanced)

### Setup Required:
1. **Install CUDA** (GPU support) - Makes generation ~10x faster
   ```bash
   # For Mac with Apple Silicon: Already supported
   # For NVIDIA GPU: https://developer.nvidia.com/cuda-downloads
   ```

2. **Run the image generation script**:
   ```bash
   cd "/Users/paulbridges/ahki burger"
   source venv/bin/activate
   python3 scripts/generate_hf_images.py
   ```

   **Time Estimate:**
   - With GPU (NVIDIA/Apple Silicon): 5-10 minutes
   - With CPU: 30-60 minutes
   - First run: Additional 5 minutes for model download (4GB)

3. **Update menu.ts** to use generated images:
   ```typescript
   image: '/images/burgers/classic.jpg',
   crossSectionImage: '/images/burgers/classic-cross.jpg',
   ```

## Option 3: Use Online AI Image Service

### Using RunwayML or Leonardo AI:
1. Visit https://app.leonardo.ai or https://www.runwayml.com
2. Sign up (free credits available)
3. Generate images with the prompts provided in `scripts/generate_hf_images.py`
4. Download and place in `public/images/` directory
5. Update menu.ts with new image paths

## Image Prompts (All 30 images)

### Burgers (10 burgers × 2 views = 20 images)

**The Ahkii Classic:**
- Normal: "professional food photography of a classic cheeseburger with angus beef patty, melted cheese, fresh lettuce, ripe tomato, onions, on a soft bun, studio lighting, appetizing, high quality, 8k"
- Cross: "professional food photography cross-section of a cheeseburger showing layers of beef patty, cheese, lettuce, tomato, onions clearly visible, studio lighting, high quality, 8k"

**The Double Trouble:**
- Normal: "professional food photography of a double cheeseburger with two beef patties, double melted cheese, caramelized onions, on a toasted bun, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section of double cheeseburger showing two beef patties stacked with melted cheese and caramelized onions between layers, high quality, 8k"

**The Heatwave:**
- Normal: "professional food photography of a spicy burger with jalapeños, pepperjack cheese, crispy fried onions, on a bun, hot sauce dripping, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section spicy burger showing jalapeños, pepperjack cheese, crispy onions layers clearly visible, hot sauce, high quality, 8k"

**The BBQ Stack:**
- Normal: "professional food photography of a BBQ burger with angus beef patty, smoky BBQ sauce, crispy fried onions, melted cheddar cheese, on a brioche bun, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section BBQ burger showing beef patty, BBQ sauce, crispy onions, cheddar cheese layers, studio lighting, high quality, 8k"

**The Melt:**
- Normal: "professional food photography of a melted cheese burger with beef patty smothered in creamy cheese sauce, pickles, on a bun, cheese stretching, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section cheese burger showing beef patty drowning in melted cheese sauce with pickles visible, studio lighting, high quality, 8k"

**The Veggie Way:**
- Normal: "professional food photography of a vegan burger with plant-based patty, vegan cheese, fresh lettuce, ripe tomato, on a bun, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section vegan burger showing plant-based patty, vegan cheese, lettuce, tomato layers, studio lighting, high quality, 8k"

**The Ahkii Special:**
- Normal: "professional food photography of premium burger with signature sauce, crispy fried onions, melted cheese blend, on artisan bun, studio lighting, gourmet presentation, high quality, 8k"
- Cross: "professional food photography cross-section premium burger showing beef patty, crispy fried onions, melted cheese blend layers, signature sauce dripping, high quality, 8k"

**The Truffle Boss:**
- Normal: "professional food photography of luxury truffle burger with beef patty, truffle mayo, caramelized onions, melted Swiss cheese, on premium bun, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section luxury truffle burger showing beef patty, truffle mayo, caramelized onions, Swiss cheese layers, high quality, 8k"

**The Sweet & Spicy:**
- Normal: "professional food photography of sweet and spicy burger with hot honey glaze dripping, jalapeños, melted cheddar cheese, on toasted bun, steam rising, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section sweet spicy burger showing beef patty, hot honey glaze, jalapeños, cheddar cheese layers clearly visible, high quality, 8k"

**The Blue Smoke:**
- Normal: "professional food photography of blue cheese burger with beef patty, creamy blue cheese, crispy fried onions, BBQ glaze, on bun, studio lighting, high quality, 8k"
- Cross: "professional food photography cross-section blue cheese burger showing beef patty, blue cheese crumbles, crispy onions, BBQ glaze layers, high quality, 8k"

### Sides (5 items)

- Fries: "professional food photography of golden crispy french fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k"
- Loaded Fries: "professional food photography of loaded fries with melted cheese sauce and toppings, steam rising, appetizing, studio lighting, high quality, 8k"
- Sweet Potato Fries: "professional food photography of golden crispy sweet potato fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k"
- Onion Rings: "professional food photography of golden crispy onion rings, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k"
- Mozz Sticks: "professional food photography of melted mozzarella sticks with golden crispy exterior, cheese stretching, studio lighting, high quality, 8k"

### Drinks (5 items)

- Coca-Cola: "professional food photography of cold Coca-Cola in a glass with ice cubes, condensation on glass, vibrant red color, studio lighting, high quality, 8k"
- Sprite: "professional food photography of cold Sprite lemon-lime soda in a glass with ice cubes, refreshing, clear bubbles visible, studio lighting, high quality, 8k"
- Fanta: "professional food photography of colorful Fanta soda in a glass with ice cubes, vibrant colors, refreshing, studio lighting, high quality, 8k"
- Still Water: "professional food photography of cold clear water in a glass, ice cubes, crystal clear, condensation on glass, studio lighting, high quality, 8k"
- Sparkling Water: "professional food photography of sparkling water in a glass with bubbles visible, ice cubes, refreshing, studio lighting, high quality, 8k"

## Current Website Status

✅ **Homepage**: http://localhost:3000
✅ **Menu Page**: http://localhost:3000/menu
✅ **Features**:
- 10 burger items with toggle between normal and cross-section views
- 5 sides with food photography
- 5 drinks with beverage photography
- Mobile-responsive design
- Brand colors (#1E251B dark green, #F8E8EC soft pink)
- WhatsApp ordering integration
- Smooth animations
- Professional styling

## Next Steps

1. **For Production**: Keep Pexels images (proven, reliable, no maintenance)
2. **For Custom AI Images**: Run the generation script or use online services
3. **For Budget**: Current setup is completely free and production-ready

## Questions?
All scripts and documentation are in the `/scripts` directory.
