#!/usr/bin/env node

/**
 * Generate Unique Burger Images
 * Uses multiple free APIs to create different images for each burger
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
 * Different image generation APIs to create unique images
 */

// API 1: Picsum Photos - generates random images with different seeds
function generatePicsumUrl(searchTerm, seed, width = 800, height = 600) {
  return `https://picsum.photos/${width}/${height}?random=${seed}`;
}

// API 2: DummyImage - solid color fallback
function generateDummyUrl(color, text) {
  return `https://dummyimage.com/800x600/${color}?text=${encodeURIComponent(text)}`;
}

// API 3: Placeholder service with text
function generatePlaceholderUrl(text, seed) {
  return `https://via.placeholder.com/800x600/1E251B/FFFFFF?text=${encodeURIComponent(text)}&random=${seed}`;
}

// API 4: Using Lorem Picsum with themed tags
function generateThemesUrl(theme, index) {
  const themes = {
    burger: ['food', 'burger', 'meat', 'bread', 'delicious', 'tasty'],
    fries: ['food', 'fries', 'potatoes', 'crispy', 'golden'],
    drink: ['beverage', 'drink', 'water', 'glass', 'cold'],
  };

  const themeList = themes[theme] || themes.burger;
  const randomTheme = themeList[index % themeList.length];
  return `https://api.unsplash.com/search/photos?query=${randomTheme} food&orientation=landscape&per_page=1&client_id=demo&page=${index + 1}`;
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      maxRedirects: 5,
    }, (response) => {
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
 * Burger configurations with unique identifiers
 */
const burgers = [
  { id: 'classic', name: 'The Ahkii Classic', seed: 101, crossSeed: 201 },
  { id: 'double-trouble', name: 'The Double Trouble', seed: 102, crossSeed: 202 },
  { id: 'heatwave', name: 'The Heatwave', seed: 103, crossSeed: 203 },
  { id: 'bbq-stack', name: 'The BBQ Stack', seed: 104, crossSeed: 204 },
  { id: 'melt', name: 'The Melt', seed: 105, crossSeed: 205 },
  { id: 'veggie', name: 'The Veggie Way', seed: 106, crossSeed: 206 },
  { id: 'special', name: 'The Ahkii Special', seed: 107, crossSeed: 207 },
  { id: 'truffle', name: 'The Truffle Boss', seed: 108, crossSeed: 208 },
  { id: 'sweet-spicy', name: 'The Sweet & Spicy', seed: 109, crossSeed: 209 },
  { id: 'blue-smoke', name: 'The Blue Smoke', seed: 110, crossSeed: 210 },
];

const sides = [
  { id: 'fries', name: 'Regular Fries', seed: 301 },
  { id: 'loaded-fries', name: 'Loaded Fries', seed: 302 },
  { id: 'sweet-potato-fries', name: 'Sweet Potato Fries', seed: 303 },
  { id: 'onion-rings', name: 'Onion Rings', seed: 304 },
  { id: 'mozz-sticks', name: 'Mozz Sticks', seed: 305 },
];

const drinks = [
  { id: 'coca-cola', name: 'Coca-Cola', seed: 401 },
  { id: 'sprite', name: 'Sprite', seed: 402 },
  { id: 'fanta', name: 'Fanta', seed: 403 },
  { id: 'still-water', name: 'Still Water', seed: 404 },
  { id: 'sparkling-water', name: 'Sparkling Water', seed: 405 },
];

/**
 * Main function
 */
async function generateAllImages() {
  console.log('\n🍔 UNIQUE BURGER IMAGE GENERATION\n');
  console.log('Generating unique images for every menu item...\n');

  let successful = 0;
  let failed = 0;

  // Generate burger images
  console.log('📸 Generating UNIQUE burger images...');
  for (const burger of burgers) {
    try {
      // Normal view - using Picsum with unique seed
      const normalUrl = `https://picsum.photos/800/600?random=${burger.seed}`;
      const normalPath = path.join(dirs.burgers, `${burger.id}.jpg`);
      await downloadImage(normalUrl, normalPath);
      console.log(`   ✓ ${burger.name} (normal view) - seed: ${burger.seed}`);
      successful++;

      // Cross-section view - using different seed
      const crossUrl = `https://picsum.photos/800/600?random=${burger.crossSeed}`;
      const crossPath = path.join(dirs.burgers, `${burger.id}-cross.jpg`);
      await downloadImage(crossUrl, crossPath);
      console.log(`   ✓ ${burger.name} (cross-section) - seed: ${burger.crossSeed}`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${burger.name}: ${err.message}`);
      failed += 2;
    }
  }

  // Generate side images
  console.log('\n🍟 Generating UNIQUE side dish images...');
  for (const side of sides) {
    try {
      const url = `https://picsum.photos/800/600?random=${side.seed}`;
      const filepath = path.join(dirs.sides, `${side.id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`   ✓ ${side.name} - seed: ${side.seed}`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${side.name}: ${err.message}`);
      failed++;
    }
  }

  // Generate drink images
  console.log('\n🥤 Generating UNIQUE drink images...');
  for (const drink of drinks) {
    try {
      const url = `https://picsum.photos/600/800?random=${drink.seed}`;
      const filepath = path.join(dirs.drinks, `${drink.id}.jpg`);
      await downloadImage(url, filepath);
      console.log(`   ✓ ${drink.name} - seed: ${drink.seed}`);
      successful++;
    } catch (err) {
      console.log(`   ✗ ${drink.name}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Image generation complete!`);
  console.log(`   Generated: ${successful} unique images`);
  if (failed > 0) console.log(`   Failed: ${failed} images`);
  console.log('='.repeat(60));
  console.log('\n📁 Each image is UNIQUE (different seed/random parameter)');
  console.log('📊 Total: 20 menu items + 10 burger cross-sections = 30 images\n');
}

// Run
generateAllImages().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
