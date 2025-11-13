#!/usr/bin/env node

/**
 * Image Fetcher - Uses LoremFlickr API (Free, no auth required)
 * Generates realistic food images dynamically
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
 * LoremFlickr generates random images based on search terms
 * Free, no API key needed
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

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
    }).on('error', reject).on('timeout', function() {
      this.destroy();
      reject(new Error('Timeout'));
    });
  });
}

/**
 * Image configurations using LoremFlickr API
 * Format: https://loremflickr.com/[width]/[height]/[tags]
 */
const imageConfigs = {
  burgers: [
    { id: 'classic', normal: 'burger,beef,cheese', cross: 'burger,cross,section,layers' },
    { id: 'double-trouble', normal: 'double,burger,beef', cross: 'burger,layers,ingredients' },
    { id: 'heatwave', normal: 'spicy,burger,hot', cross: 'burger,inside,layers' },
    { id: 'bbq-stack', normal: 'bbq,burger,smoky', cross: 'stacked,burger,layers' },
    { id: 'melt', normal: 'cheese,burger,melted', cross: 'cheese,burger,inside' },
    { id: 'veggie', normal: 'vegan,burger,plant', cross: 'vegetarian,burger,layers' },
    { id: 'special', normal: 'gourmet,burger,premium', cross: 'special,burger,inside' },
    { id: 'truffle', normal: 'luxury,burger,truffle', cross: 'fancy,burger,layers' },
    { id: 'sweet-spicy', normal: 'honey,burger,spicy', cross: 'burger,inside,view' },
    { id: 'blue-smoke', normal: 'cheese,burger,bbq', cross: 'burger,section,view' },
  ],
  sides: [
    { id: 'fries', tags: 'fries,potatoes,crispy' },
    { id: 'loaded-fries', tags: 'fries,cheese,loaded' },
    { id: 'sweet-potato-fries', tags: 'sweet,fries,potatoes' },
    { id: 'onion-rings', tags: 'onion,rings,fried' },
    { id: 'mozz-sticks', tags: 'mozzarella,cheese,fried' },
  ],
  drinks: [
    { id: 'coca-cola', tags: 'cola,drink,beverage' },
    { id: 'sprite', tags: 'soda,lemon,drink' },
    { id: 'fanta', tags: 'soda,colorful,drink' },
    { id: 'still-water', tags: 'water,bottle,drink' },
    { id: 'sparkling-water', tags: 'water,beverage,glass' },
  ],
};

async function fetchAllImages() {
  console.log('\n🍔 AHKII BURGER - IMAGE GENERATION\n');
  console.log('Using LoremFlickr API to generate food images...\n');

  let successful = 0;
  let failed = 0;

  try {
    // Burgers
    console.log('📸 Generating burger images...');
    for (const burger of imageConfigs.burgers) {
      try {
        // Normal view
        const normalUrl = `https://loremflickr.com/800/600/${burger.normal}?random=${Math.random()}`;
        const normalPath = path.join(dirs.burgers, `${burger.id}.jpg`);
        await downloadImage(normalUrl, normalPath);
        console.log(`   ✓ ${burger.id}.jpg (normal)`);
        successful++;

        // Cross-section view
        const crossUrl = `https://loremflickr.com/800/600/${burger.cross}?random=${Math.random()}`;
        const crossPath = path.join(dirs.burgers, `${burger.id}-cross.jpg`);
        await downloadImage(crossUrl, crossPath);
        console.log(`   ✓ ${burger.id}-cross.jpg (cross-section)`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${burger.id}: ${err.message}`);
        failed += 2;
      }
    }

    // Sides
    console.log('\n🍟 Generating side dish images...');
    for (const side of imageConfigs.sides) {
      try {
        const url = `https://loremflickr.com/800/600/${side.tags}?random=${Math.random()}`;
        const filepath = path.join(dirs.sides, `${side.id}.jpg`);
        await downloadImage(url, filepath);
        console.log(`   ✓ ${side.id}.jpg`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${side.id}: ${err.message}`);
        failed++;
      }
    }

    // Drinks
    console.log('\n🥤 Generating drink images...');
    for (const drink of imageConfigs.drinks) {
      try {
        const url = `https://loremflickr.com/600/800/${drink.tags}?random=${Math.random()}`;
        const filepath = path.join(dirs.drinks, `${drink.id}.jpg`);
        await downloadImage(url, filepath);
        console.log(`   ✓ ${drink.id}.jpg`);
        successful++;
      } catch (err) {
        console.log(`   ✗ ${drink.id}: ${err.message}`);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Image generation complete!`);
    console.log(`   Generated: ${successful} images`);
    if (failed > 0) console.log(`   Failed: ${failed} images`);
    console.log('='.repeat(60));
    console.log('\n📁 Images saved to:');
    console.log(`   • ./public/images/burgers/ (${successful > 0 ? Math.floor(successful/2) : 0} burgers with 2 views each)`);
    console.log(`   • ./public/images/sides/`);
    console.log(`   • ./public/images/drinks/\n`);
    console.log('✨ Your website is now ready with images!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Add small delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run with delays
(async () => {
  await fetchAllImages();
})();
