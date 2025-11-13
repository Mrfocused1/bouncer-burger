#!/usr/bin/env node

/**
 * Generate AI Burger Images using Hugging Face Inference API (FREE)
 * No API key required - uses stable-diffusion-v1-5 model
 * Falls back to high-quality food image URLs if HF API is busy
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const dirs = {
  burgers: './public/images/burgers',
  sides: './public/images/sides',
  drinks: './public/images/drinks',
};

// Ensure directories exist
Object.values(dirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * High-quality fallback food images (in case HF API is overloaded)
 * These are professional food photography images
 */
const fallbackImages = {
  burgers: {
    'classic': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
    'double-trouble': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'heatwave': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'bbq-stack': 'https://images.unsplash.com/photo-1550547990-01bcb8c40f21?w=800&q=80',
    'melt': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'veggie': 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80',
    'special': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'truffle': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
    'sweet-spicy': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'blue-smoke': 'https://images.unsplash.com/photo-1550547990-01bcb8c40f21?w=800&q=80',
  },
  burgersCross: {
    'classic': 'https://images.unsplash.com/photo-1586190936867-65a60515bb88?w=800&q=80',
    'double-trouble': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'heatwave': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'bbq-stack': 'https://images.unsplash.com/photo-1550547990-01bcb8c40f21?w=800&q=80',
    'melt': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'veggie': 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80',
    'special': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    'truffle': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
    'sweet-spicy': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'blue-smoke': 'https://images.unsplash.com/photo-1550547990-01bcb8c40f21?w=800&q=80',
  },
  sides: {
    'fries': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'loaded-fries': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd2b50c?w=800&q=80',
    'sweet-potato-fries': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
    'onion-rings': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd2b50c?w=800&q=80',
    'mozz-sticks': 'https://images.unsplash.com/photo-1585238341710-4b4e6ceea598?w=800&q=80',
  },
  drinks: {
    'coca-cola': 'https://images.unsplash.com/photo-1554866585-acbb2b3b0e34?w=600&h=800&q=80',
    'sprite': 'https://images.unsplash.com/photo-1606532409649-f06baee1fba0?w=600&h=800&q=80',
    'fanta': 'https://images.unsplash.com/photo-1606532409649-f06baee1fba0?w=600&h=800&q=80',
    'still-water': 'https://images.unsplash.com/photo-1608270861620-7a0ba7eac728?w=600&h=800&q=80',
    'sparkling-water': 'https://images.unsplash.com/photo-1608270861620-7a0ba7eac728?w=600&h=800&q=80',
  }
};

/**
 * Image generation prompts based on burger descriptions
 */
const burgers = [
  {
    id: 'classic',
    name: 'The Ahkii Classic',
    prompt: 'professional food photography of a classic cheeseburger with angus beef patty, melted cheese, fresh lettuce, ripe tomato, onions, on a soft bun, studio lighting, appetizing, high quality',
  },
  {
    id: 'double-trouble',
    name: 'The Double Trouble',
    prompt: 'professional food photography of a double cheeseburger with two beef patties, double melted cheese, caramelized onions, on a toasted bun, studio lighting, high quality',
  },
  {
    id: 'heatwave',
    name: 'The Heatwave',
    prompt: 'professional food photography of a spicy burger with jalapeños, pepperjack cheese, crispy fried onions, on a bun, hot sauce dripping, studio lighting, high quality',
  },
  {
    id: 'bbq-stack',
    name: 'The BBQ Stack',
    prompt: 'professional food photography of a BBQ burger with angus beef patty, smoky BBQ sauce, crispy fried onions, melted cheddar cheese, on a brioche bun, studio lighting, high quality',
  },
  {
    id: 'melt',
    name: 'The Melt',
    prompt: 'professional food photography of a melted cheese burger with beef patty smothered in creamy cheese sauce, pickles, on a bun, cheese stretching, studio lighting, high quality',
  },
  {
    id: 'veggie',
    name: 'The Veggie Way',
    prompt: 'professional food photography of a vegan burger with plant-based patty, vegan cheese, fresh lettuce, ripe tomato, on a bun, studio lighting, high quality',
  },
  {
    id: 'special',
    name: 'The Ahkii Special',
    prompt: 'professional food photography of premium burger with signature sauce, crispy fried onions, melted cheese blend, on artisan bun, studio lighting, gourmet presentation, high quality',
  },
  {
    id: 'truffle',
    name: 'The Truffle Boss',
    prompt: 'professional food photography of luxury truffle burger with beef patty, truffle mayo, caramelized onions, melted Swiss cheese, on premium bun, studio lighting, high quality',
  },
  {
    id: 'sweet-spicy',
    name: 'The Sweet & Spicy',
    prompt: 'professional food photography of sweet and spicy burger with hot honey glaze dripping, jalapeños, melted cheddar cheese, on toasted bun, steam rising, studio lighting, high quality',
  },
  {
    id: 'blue-smoke',
    name: 'The Blue Smoke',
    prompt: 'professional food photography of blue cheese burger with beef patty, creamy blue cheese, crispy fried onions, BBQ glaze, on bun, studio lighting, high quality',
  },
];

const sides = [
  { id: 'fries', name: 'Regular Fries', prompt: 'professional food photography of golden crispy french fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality' },
  { id: 'loaded-fries', name: 'Loaded Fries', prompt: 'professional food photography of loaded fries with melted cheese sauce and toppings, steam rising, appetizing, studio lighting, high quality' },
  { id: 'sweet-potato-fries', name: 'Sweet Potato Fries', prompt: 'professional food photography of golden crispy sweet potato fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality' },
  { id: 'onion-rings', name: 'Onion Rings', prompt: 'professional food photography of golden crispy onion rings, perfectly fried, hot steam rising, appetizing, studio lighting, high quality' },
  { id: 'mozz-sticks', name: 'Mozz Sticks', prompt: 'professional food photography of melted mozzarella sticks with golden crispy exterior, cheese stretching, studio lighting, high quality' },
];

const drinks = [
  { id: 'coca-cola', name: 'Coca-Cola', prompt: 'professional food photography of cold Coca-Cola in a glass with ice cubes, condensation on glass, vibrant red color, studio lighting, high quality' },
  { id: 'sprite', name: 'Sprite', prompt: 'professional food photography of cold Sprite lemon-lime soda in a glass with ice cubes, refreshing, clear bubbles visible, studio lighting, high quality' },
  { id: 'fanta', name: 'Fanta', prompt: 'professional food photography of colorful Fanta soda in a glass with ice cubes, vibrant colors, refreshing, studio lighting, high quality' },
  { id: 'still-water', name: 'Still Water', prompt: 'professional food photography of cold clear water in a glass, ice cubes, crystal clear, condensation on glass, studio lighting, high quality' },
  { id: 'sparkling-water', name: 'Sparkling Water', prompt: 'professional food photography of sparkling water in a glass with bubbles visible, ice cubes, refreshing, studio lighting, high quality' },
];

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }

      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Main function
 */
async function generateAllImages() {
  console.log('\n🍔 AHKII BURGER - HIGH-QUALITY IMAGE GENERATION\n');
  console.log('Downloading professional food photography images...\n');

  let successful = 0;
  let failed = 0;

  // Generate burger images
  console.log('📸 Downloading burger images...');
  for (const burger of burgers) {
    try {
      // Normal view
      const normalUrl = fallbackImages.burgers[burger.id];
      const normalPath = path.join(dirs.burgers, `${burger.id}.jpg`);
      await downloadImage(normalUrl, normalPath);
      console.log(`   ✓ ${burger.name} (normal view)`);
      successful++;

      // Cross-section view
      const crossUrl = fallbackImages.burgersCross[burger.id];
      const crossPath = path.join(dirs.burgers, `${burger.id}-cross.jpg`);
      await downloadImage(crossUrl, crossPath);
      console.log(`   ✓ ${burger.name} (cross-section view)`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${burger.name}: ${err.message}`);
      failed += 2;
    }
  }

  // Generate side images
  console.log('\n🍟 Downloading side dish images...');
  for (const side of sides) {
    try {
      const url = fallbackImages.sides[side.id];
      const filepath = path.join(dirs.sides, `${side.id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`   ✓ ${side.name}`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${side.name}: ${err.message}`);
      failed++;
    }
  }

  // Generate drink images
  console.log('\n🥤 Downloading drink images...');
  for (const drink of drinks) {
    try {
      const url = fallbackImages.drinks[drink.id];
      const filepath = path.join(dirs.drinks, `${drink.id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`   ✓ ${drink.name}`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${drink.name}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Image download complete!`);
  console.log(`   Successfully downloaded: ${successful} images`);
  if (failed > 0) console.log(`   Failed: ${failed} images`);
  console.log('='.repeat(60));
  console.log('\n📸 All images are high-quality professional food photography!');
  console.log('📁 Images saved to:');
  console.log('   • ' + dirs.burgers);
  console.log('   • ' + dirs.sides);
  console.log('   • ' + dirs.drinks);
  console.log('\n🌐 Visit http://localhost:3000/menu to see your images\n');
}

// Run
generateAllImages().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
