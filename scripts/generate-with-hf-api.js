#!/usr/bin/env node

/**
 * Generate AI Images using Hugging Face Inference API
 * Free, no authentication for basic usage
 * Fast and reliable
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

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

// Models and prompts
const burgers = [
  {
    id: 'classic',
    name: 'The Ahkii Classic',
    prompt: 'delicious beef cheeseburger with angus patty, melted cheese, lettuce, tomato, onions, professional food photography',
    crossPrompt: 'burger cross section showing beef patty, cheese, lettuce, tomato, onions layers, food photography',
  },
  {
    id: 'double-trouble',
    name: 'The Double Trouble',
    prompt: 'double beef patty cheeseburger with double cheese, caramelized onions, professional food photography',
    crossPrompt: 'double burger cross section showing two beef patties, melted cheese, caramelized onions layers',
  },
  {
    id: 'heatwave',
    name: 'The Heatwave',
    prompt: 'spicy burger with jalapeños, pepperjack cheese, crispy onions, hot sauce, professional food photo',
    crossPrompt: 'spicy burger cross section showing jalapeños, pepperjack cheese, crispy onions, hot sauce',
  },
];

const sides = [
  { id: 'fries', name: 'Regular Fries', prompt: 'crispy golden french fries, hot steam rising, food photography' },
  { id: 'loaded-fries', name: 'Loaded Fries', prompt: 'loaded fries with cheese sauce and toppings, food photography' },
];

const drinks = [
  { id: 'coca-cola', name: 'Coca-Cola', prompt: 'cold Coca-Cola in a glass with ice, vibrant red color, beverage photo' },
  { id: 'sprite', name: 'Sprite', prompt: 'cold Sprite in a glass with ice and bubbles, beverage photography' },
];

/**
 * Query Hugging Face Inference API
 */
function generateImageFromAPI(prompt) {
  return new Promise((resolve, reject) => {
    const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

    const payload = JSON.stringify({ inputs: prompt });

    const options = {
      hostname: 'api-inference.huggingface.co',
      path: '/models/stabilityai/stable-diffusion-2-1',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Ahkii-Burger-Generator/1.0',
      },
      timeout: 60000,
    };

    const req = https.request(options, (res) => {
      const chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const imageBuffer = Buffer.concat(chunks);
          resolve(imageBuffer);
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Download and save image
 */
async function downloadAndSaveImage(prompt, filepath) {
  try {
    console.log(`   Generating: ${path.basename(filepath)}...`);
    const imageBuffer = await generateImageFromAPI(prompt);
    fs.writeFileSync(filepath, imageBuffer);
    console.log(`   ✓ Saved`);
    return true;
  } catch (err) {
    console.log(`   ✗ ${err.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function generateAllImages() {
  console.log('\n🍔 HUGGING FACE AI IMAGE GENERATION (API Method)\n');
  console.log('Generating AI burger images using free Hugging Face API...');
  console.log('(No authentication required, no local model needed)\n');

  let successful = 0;
  let failed = 0;

  // Burgers
  console.log('📸 Generating BURGER images...\n');
  for (const burger of burgers) {
    // Normal view
    const normalPath = path.join(dirs.burgers, `${burger.id}.jpg`);
    if (await downloadAndSaveImage(burger.prompt, normalPath)) {
      successful++;
    } else {
      failed++;
    }

    // Cross-section view
    const crossPath = path.join(dirs.burgers, `${burger.id}-cross.jpg`);
    if (await downloadAndSaveImage(burger.crossPrompt, crossPath)) {
      successful++;
    } else {
      failed++;
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Sides
  console.log('\n🍟 Generating SIDE images...\n');
  for (const side of sides) {
    const path_side = path.join(dirs.sides, `${side.id}.jpg`);
    if (await downloadAndSaveImage(side.prompt, path_side)) {
      successful++;
    } else {
      failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Drinks
  console.log('\n🥤 Generating DRINK images...\n');
  for (const drink of drinks) {
    const drinksPath = path.join(dirs.drinks, `${drink.id}.jpg`);
    if (await downloadAndSaveImage(drink.prompt, drinksPath)) {
      successful++;
    } else {
      failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ AI Image Generation Complete!`);
  console.log(`   Generated: ${successful} images`);
  if (failed > 0) console.log(`   Failed: ${failed} images`);
  console.log('='.repeat(60));
  console.log('\n🎨 AI-generated burger images are ready!');
  console.log('📁 Images saved to:');
  console.log('   • ' + dirs.burgers);
  console.log('   • ' + dirs.sides);
  console.log('   • ' + dirs.drinks);
  console.log('\n✨ Visit http://localhost:3000/menu to see your AI burger images!\n');
}

// Run
generateAllImages().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  console.error('\nTroubleshooting:');
  console.error('1. Check internet connection');
  console.error('2. The Hugging Face API may be temporarily busy');
  console.error('3. Try again in a few moments\n');
  process.exit(1);
});
