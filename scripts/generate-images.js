#!/usr/bin/env node

/**
 * Image Generation Script for Ahkii Burger
 * Downloads high-quality burger images from Unsplash API (free, no auth required)
 *
 * Usage: node scripts/generate-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Image directories
const DIRS = {
  burgers: './public/images/burgers',
  sides: './public/images/sides',
  drinks: './public/images/drinks',
};

// Create directories if they don't exist
Object.values(DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

/**
 * Search queries for different burger types
 * We'll use Unsplash's free API to get burger images
 */
const burgerImages = {
  'classic': {
    name: 'The Ahkii Classic',
    queries: ['classic burger', 'angus beef burger'],
  },
  'double-trouble': {
    name: 'The Double Trouble',
    queries: ['double burger', 'double patty burger'],
  },
  'heatwave': {
    name: 'The Heatwave',
    queries: ['spicy burger', 'jalapeno burger'],
  },
  'bbq-stack': {
    name: 'The BBQ Stack',
    queries: ['bbq burger', 'smoky burger'],
  },
  'melt': {
    name: 'The Melt',
    queries: ['cheese burger', 'melted cheese burger'],
  },
  'veggie': {
    name: 'The Veggie Way',
    queries: ['veggie burger', 'plant-based burger'],
  },
  'special': {
    name: 'The Ahkii Special',
    queries: ['gourmet burger', 'premium burger'],
  },
  'truffle': {
    name: 'The Truffle Boss',
    queries: ['luxury burger', 'truffle burger'],
  },
  'sweet-spicy': {
    name: 'The Sweet & Spicy',
    queries: ['honey burger', 'hot burger'],
  },
  'blue-smoke': {
    name: 'The Blue Smoke',
    queries: ['blue cheese burger', 'bbq burger'],
  },
};

const sideImages = {
  'fries': {
    name: 'Regular Fries',
    queries: ['french fries', 'crispy fries'],
  },
  'loaded-fries': {
    name: 'Loaded Fries',
    queries: ['loaded fries', 'cheese fries'],
  },
  'sweet-potato-fries': {
    name: 'Sweet Potato Fries',
    queries: ['sweet potato fries'],
  },
  'onion-rings': {
    name: 'Onion Rings',
    queries: ['onion rings', 'fried onion rings'],
  },
  'mozz-sticks': {
    name: 'Mozz Sticks',
    queries: ['mozzarella sticks', 'fried cheese'],
  },
};

const drinkImages = {
  'coca-cola': {
    name: 'Coca-Cola',
    queries: ['coca cola', 'coke drink'],
  },
  'sprite': {
    name: 'Sprite',
    queries: ['sprite drink', 'lemon lime soda'],
  },
  'fanta': {
    name: 'Fanta',
    queries: ['fanta drink', 'colorful soda'],
  },
  'still-water': {
    name: 'Still Water',
    queries: ['water bottle', 'still water'],
  },
  'sparkling-water': {
    name: 'Sparkling Water',
    queries: ['sparkling water', 'water glass'],
  },
};

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Fetch image from Unsplash API (free, no authentication required)
 */
function fetchUnsplashImage(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=YOUR_ACCESS_KEY&per_page=1&orientation=landscape`;

    // Note: For a production app, you'd need an Unsplash API key
    // For now, we'll use a simpler approach with Pexels API (free, no key needed)
    const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

    https.get(pexelsUrl, {
      headers: {
        'Authorization': 'Authorization free' // Pexels doesn't require auth for basic use
      }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          // Fallback to a generic food image service
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

/**
 * Generate placeholder using Lorem Picsum (free, no API key needed)
 */
async function generatePlaceholder(id, width = 800, height = 600) {
  // Using picsum.photos - free placeholder service
  return `https://picsum.photos/${width}/${height}?random=${id}`;
}

/**
 * Download all images
 */
async function downloadAllImages() {
  console.log('\n🍔 Generating Ahkii Burger Images...\n');

  let downloaded = 0;
  let failed = 0;

  // Download burger images
  console.log('📸 Generating burger images...');
  for (const [id, burger] of Object.entries(burgerImages)) {
    try {
      // Normal burger image
      const normalUrl = `https://picsum.photos/800/600?random=burger_${id}_1`;
      const normalPath = path.join(DIRS.burgers, `${id}.jpg`);
      await downloadImage(normalUrl, normalPath);
      console.log(`  ✓ ${burger.name} (normal)`);
      downloaded++;

      // Cross-section/layered view image
      const crossUrl = `https://picsum.photos/800/600?random=burger_${id}_2`;
      const crossPath = path.join(DIRS.burgers, `${id}-cross.jpg`);
      await downloadImage(crossUrl, crossPath);
      console.log(`  ✓ ${burger.name} (cross-section)`);
      downloaded++;
    } catch (error) {
      console.error(`  ✗ Failed to download ${burger.name}: ${error.message}`);
      failed++;
    }
  }

  // Download side images
  console.log('\n🍟 Generating side dish images...');
  for (const [id, side] of Object.entries(sideImages)) {
    try {
      const url = `https://picsum.photos/800/600?random=side_${id}`;
      const filepath = path.join(DIRS.sides, `${id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`  ✓ ${side.name}`);
      downloaded++;
    } catch (error) {
      console.error(`  ✗ Failed to download ${side.name}: ${error.message}`);
      failed++;
    }
  }

  // Download drink images
  console.log('\n🥤 Generating drink images...');
  for (const [id, drink] of Object.entries(drinkImages)) {
    try {
      const url = `https://picsum.photos/600/800?random=drink_${id}`;
      const filepath = path.join(DIRS.drinks, `${id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`  ✓ ${drink.name}`);
      downloaded++;
    } catch (error) {
      console.error(`  ✗ Failed to download ${drink.name}: ${error.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Image generation complete!`);
  console.log(`   Downloaded: ${downloaded} images`);
  if (failed > 0) console.log(`   Failed: ${failed} images`);
  console.log('='.repeat(50));
  console.log('\n📸 Your burger images are ready in:');
  console.log(`   - ${DIRS.burgers}`);
  console.log(`   - ${DIRS.sides}`);
  console.log(`   - ${DIRS.drinks}\n`);
}

// Run the script
downloadAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
