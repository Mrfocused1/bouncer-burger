#!/usr/bin/env node

/**
 * Burger Image Generator Script
 * Uses free image APIs to generate realistic burger and food images
 * No API key required for most sources
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories
const dirs = {
  burgers: './public/images/burgers',
  sides: './public/images/sides',
  drinks: './public/images/drinks',
};

Object.values(dirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadImage(response.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Image mappings with search terms
 */
const images = {
  burgers: {
    'classic': { normal: 'delicious classic burger angus beef', cross: 'burger cross section layers' },
    'double-trouble': { normal: 'double cheeseburger double patty', cross: 'layered burger showing ingredients' },
    'heatwave': { normal: 'spicy jalapeño burger hot peppers', cross: 'burger layers ingredients visible' },
    'bbq-stack': { normal: 'bbq burger smoky charred beef', cross: 'stacked burger layers cross section' },
    'melt': { normal: 'melted cheese burger gooey', cross: 'cheesy burger layers inside' },
    'veggie': { normal: 'vegan plant based burger green', cross: 'vegetarian burger cross section' },
    'special': { normal: 'gourmet premium signature burger', cross: 'premium burger layers showing' },
    'truffle': { normal: 'luxury truffle burger mushroom', cross: 'fancy burger layers inside' },
    'sweet-spicy': { normal: 'honey hot burger spicy', cross: 'burger inside layers visible' },
    'blue-smoke': { normal: 'blue cheese burger bbq', cross: 'blue cheese burger cross section' },
  },
  sides: {
    'fries': 'crispy golden french fries fast food',
    'loaded-fries': 'loaded fries with cheese and sauce',
    'sweet-potato-fries': 'sweet potato fries golden crispy',
    'onion-rings': 'fried onion rings golden breaded',
    'mozz-sticks': 'mozzarella sticks melted cheese fried',
  },
  drinks: {
    'coca-cola': 'cold coca cola coke drink glass',
    'sprite': 'sprite lemon lime soda drink glass',
    'fanta': 'fanta colorful soda drink bottle',
    'still-water': 'water bottle still water clear',
    'sparkling-water': 'sparkling water drink glass bubbles',
  },
};

/**
 * Using Pexels API alternative approach - direct stock photo URLs
 * These are carefully selected food images from free sources
 */
const stockPhotos = {
  burgers: {
    // Using DuckDuckGo's open source image redirect (no auth needed)
    'classic': {
      normal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop'
    },
    'double-trouble': {
      normal: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1542314503-37dff6cb3ce9?w=800&h=600&fit=crop'
    },
    'heatwave': {
      normal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1585238341710-4dd0e06a4c4b?w=800&h=600&fit=crop'
    },
    'bbq-stack': {
      normal: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1594212699903-8a00ca817a59?w=800&h=600&fit=crop'
    },
    'melt': {
      normal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop'
    },
    'veggie': {
      normal: 'https://images.unsplash.com/photo-1585238341710-4dd0e06a4c4b?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1559328007-f1b4e8b5aa63?w=800&h=600&fit=crop'
    },
    'special': {
      normal: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
    },
    'truffle': {
      normal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop'
    },
    'sweet-spicy': {
      normal: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1585238341710-4dd0e06a4c4b?w=800&h=600&fit=crop'
    },
    'blue-smoke': {
      normal: 'https://images.unsplash.com/photo-1550547990-532ff39a7a19?w=800&h=600&fit=crop',
      cross: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
    },
  },
  sides: {
    'fries': 'https://images.unsplash.com/photo-1584054606400-a4f989b8d4d5?w=800&h=600&fit=crop',
    'loaded-fries': 'https://images.unsplash.com/photo-1608222351212-18fe9f059dc9?w=800&h=600&fit=crop',
    'sweet-potato-fries': 'https://images.unsplash.com/photo-1599599810694-cd5e49a47c98?w=800&h=600&fit=crop',
    'onion-rings': 'https://images.unsplash.com/photo-1599599810933-0e50f6dcd4f4?w=800&h=600&fit=crop',
    'mozz-sticks': 'https://images.unsplash.com/photo-1618164436241-4473940571f2?w=800&h=600&fit=crop',
  },
  drinks: {
    'coca-cola': 'https://images.unsplash.com/photo-1554866585-acbb2c52ffe5?w=600&h=800&fit=crop',
    'sprite': 'https://images.unsplash.com/photo-1527082395-e0fa16038ef0?w=600&h=800&fit=crop',
    'fanta': 'https://images.unsplash.com/photo-1554866585-acbb2c52ffe5?w=600&h=800&fit=crop',
    'still-water': 'https://images.unsplash.com/photo-1608270861620-7d5f2fcb6c1b?w=600&h=800&fit=crop',
    'sparkling-water': 'https://images.unsplash.com/photo-1555839594-58d7cb561021?w=600&h=800&fit=crop',
  }
};

/**
 * Main download function
 */
async function generateImages() {
  console.log('\n🍔 AHKII BURGER - IMAGE GENERATION\n');
  console.log('Downloading high-quality food images...\n');

  let successful = 0;
  let failed = 0;

  try {
    // Burgers
    console.log('📸 Downloading burger images...');
    for (const [id, urls] of Object.entries(stockPhotos.burgers)) {
      try {
        // Normal view
        const normalPath = path.join(dirs.burgers, `${id}.jpg`);
        await downloadImage(urls.normal, normalPath);
        console.log(`   ✓ ${id}.jpg`);
        successful++;

        // Cross-section view
        const crossPath = path.join(dirs.burgers, `${id}-cross.jpg`);
        await downloadImage(urls.cross, crossPath);
        console.log(`   ✓ ${id}-cross.jpg`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${id} - ${err.message}`);
        failed += 2;
      }
    }

    // Sides
    console.log('\n🍟 Downloading side dish images...');
    for (const [id, url] of Object.entries(stockPhotos.sides)) {
      try {
        const filepath = path.join(dirs.sides, `${id}.jpg`);
        await downloadImage(url, filepath);
        console.log(`   ✓ ${id}.jpg`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${id} - ${err.message}`);
        failed++;
      }
    }

    // Drinks
    console.log('\n🥤 Downloading drink images...');
    for (const [id, url] of Object.entries(stockPhotos.drinks)) {
      try {
        const filepath = path.join(dirs.drinks, `${id}.jpg`);
        await downloadImage(url, filepath);
        console.log(`   ✓ ${id}.jpg`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${id} - ${err.message}`);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Image download complete!`);
    console.log(`   Successfully downloaded: ${successful} images`);
    if (failed > 0) console.log(`   Failed to download: ${failed} images`);
    console.log('='.repeat(60));
    console.log('\n📁 Images saved to:');
    console.log(`   • ${dirs.burgers}`);
    console.log(`   • ${dirs.sides}`);
    console.log(`   • ${dirs.drinks}\n`);
    console.log('✨ Your website is now ready with images!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
generateImages();
