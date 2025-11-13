#!/usr/bin/env node

/**
 * Generate AI Burger Images using Replicate API
 * Stable Diffusion XL for high-quality burger images
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Use environment variable or set here
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || 'r8_JE5Jz0l0J0vZzW0vZzW0vZzW0vZzW0v';

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
 * Image generation prompts based on burger descriptions
 */
const burgers = [
  {
    id: 'classic',
    name: 'The Ahkii Classic',
    description: 'Angus beef patty, cheese, Ahkii sauce, lettuce, tomato, onions',
    prompt: 'professional food photography of a classic cheeseburger with angus beef patty, melted cheese, fresh lettuce, ripe tomato, onions, on a soft bun, studio lighting, appetizing, 8k quality',
    crossPrompt: 'professional food photography cross-section of a cheeseburger showing layers of beef patty, cheese, lettuce, tomato, onions clearly visible, studio lighting, 8k quality',
  },
  {
    id: 'double-trouble',
    name: 'The Double Trouble',
    description: 'Double patty, double cheese, caramelised onions',
    prompt: 'professional food photography of a double cheeseburger with two beef patties, double melted cheese, caramelized onions, on a toasted bun, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section of double cheeseburger showing two beef patties stacked with melted cheese and caramelized onions between layers, 8k quality',
  },
  {
    id: 'heatwave',
    name: 'The Heatwave',
    description: 'Jalapeños, spicy Ahkii sauce, pepperjack cheese, crispy onions',
    prompt: 'professional food photography of a spicy burger with jalapeños, pepperjack cheese, crispy fried onions, on a bun, hot sauce dripping, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section spicy burger showing jalapeños, pepperjack cheese, crispy onions layers clearly visible, hot sauce, 8k quality',
  },
  {
    id: 'bbq-stack',
    name: 'The BBQ Stack',
    description: 'Angus patty, smoky BBQ sauce, crispy onions, cheddar cheese',
    prompt: 'professional food photography of a BBQ burger with angus beef patty, smoky BBQ sauce, crispy fried onions, melted cheddar cheese, on a brioche bun, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section BBQ burger showing beef patty, BBQ sauce, crispy onions, cheddar cheese layers, studio lighting, 8k quality',
  },
  {
    id: 'melt',
    name: 'The Melt',
    description: 'Angus patty smothered in cheese sauce, pickles, Ahkii sauce',
    prompt: 'professional food photography of a melted cheese burger with beef patty smothered in creamy cheese sauce, pickles, on a bun, cheese stretching, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section cheese burger showing beef patty drowning in melted cheese sauce with pickles visible, studio lighting, 8k quality',
  },
  {
    id: 'veggie',
    name: 'The Veggie Way',
    description: 'Grilled plant-based patty, vegan cheese, lettuce, tomato, Ahkii sauce',
    prompt: 'professional food photography of a vegan burger with plant-based patty, vegan cheese, fresh lettuce, ripe tomato, on a bun, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section vegan burger showing plant-based patty, vegan cheese, lettuce, tomato layers, studio lighting, 8k quality',
  },
  {
    id: 'special',
    name: 'The Ahkii Special',
    description: 'Signature sauce, crispy fried onions, melted cheese blend',
    prompt: 'professional food photography of premium burger with signature sauce, crispy fried onions, melted cheese blend, on artisan bun, studio lighting, gourmet presentation, 8k quality',
    crossPrompt: 'professional food photography cross-section premium burger showing beef patty, crispy fried onions, melted cheese blend layers, signature sauce dripping, 8k quality',
  },
  {
    id: 'truffle',
    name: 'The Truffle Boss',
    description: 'Angus patty, truffle mayo, caramelised onions, Swiss cheese',
    prompt: 'professional food photography of luxury truffle burger with beef patty, truffle mayo, caramelized onions, melted Swiss cheese, on premium bun, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section luxury truffle burger showing beef patty, truffle mayo, caramelized onions, Swiss cheese layers, 8k quality',
  },
  {
    id: 'sweet-spicy',
    name: 'The Sweet & Spicy',
    description: 'Hot honey glaze, jalapeños, cheddar, Ahkii sauce',
    prompt: 'professional food photography of sweet and spicy burger with hot honey glaze dripping, jalapeños, melted cheddar cheese, on toasted bun, steam rising, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section sweet spicy burger showing beef patty, hot honey glaze, jalapeños, cheddar cheese layers clearly visible, 8k quality',
  },
  {
    id: 'blue-smoke',
    name: 'The Blue Smoke',
    description: 'Blue cheese, crispy onions, BBQ glaze',
    prompt: 'professional food photography of blue cheese burger with beef patty, creamy blue cheese, crispy fried onions, BBQ glaze, on bun, studio lighting, 8k quality',
    crossPrompt: 'professional food photography cross-section blue cheese burger showing beef patty, blue cheese crumbles, crispy onions, BBQ glaze layers, 8k quality',
  },
];

const sides = [
  {
    id: 'fries',
    prompt: 'professional food photography of golden crispy french fries, perfectly fried, hot steam rising, appetizing, studio lighting, 8k quality',
  },
  {
    id: 'loaded-fries',
    prompt: 'professional food photography of loaded fries with melted cheese sauce and toppings, steam rising, appetizing, studio lighting, 8k quality',
  },
  {
    id: 'sweet-potato-fries',
    prompt: 'professional food photography of golden crispy sweet potato fries, perfectly fried, hot steam rising, appetizing, studio lighting, 8k quality',
  },
  {
    id: 'onion-rings',
    prompt: 'professional food photography of golden crispy onion rings, perfectly fried, hot steam rising, appetizing, studio lighting, 8k quality',
  },
  {
    id: 'mozz-sticks',
    prompt: 'professional food photography of melted mozzarella sticks with golden crispy exterior, cheese stretching, studio lighting, 8k quality',
  },
];

const drinks = [
  {
    id: 'coca-cola',
    prompt: 'professional food photography of cold Coca-Cola in a glass with ice cubes, condensation on glass, vibrant red color, studio lighting, 8k quality',
  },
  {
    id: 'sprite',
    prompt: 'professional food photography of cold Sprite lemon-lime soda in a glass with ice cubes, refreshing, clear bubbles visible, studio lighting, 8k quality',
  },
  {
    id: 'fanta',
    prompt: 'professional food photography of colorful Fanta soda in a glass with ice cubes, vibrant colors, refreshing, studio lighting, 8k quality',
  },
  {
    id: 'still-water',
    prompt: 'professional food photography of cold clear water in a glass, ice cubes, crystal clear, condensation on glass, studio lighting, 8k quality',
  },
  {
    id: 'sparkling-water',
    prompt: 'professional food photography of sparkling water in a glass with bubbles visible, ice cubes, refreshing, studio lighting, 8k quality',
  },
];

/**
 * Call Replicate API to generate image
 */
function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      version: 'db21e45d3f7023abc9825e12b9592c9ec1a66a45436c34bea345f28519e50f90', // Stable Diffusion XL
      input: {
        prompt: prompt,
        num_outputs: 1,
        height: 800,
        width: 600,
        scheduler: 'K_EULER_ANCESTRAL',
        num_inference_steps: 50,
        guidance_scale: 7.5,
      },
    });

    const options = {
      hostname: 'api.replicate.com',
      port: 443,
      path: '/v1/predictions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          // Check if API returned an error
          if (response.error) {
            reject(new Error(`Replicate API Error: ${response.error}`));
            return;
          }

          // Replicate returns URLs in the output
          if (response.output && response.output.length > 0) {
            resolve(response.output[0]);
          } else {
            reject(new Error('No image URL in response'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
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
 * Main function
 */
async function generateAllImages() {
  console.log('\n🍔 AI BURGER IMAGE GENERATION (Replicate + Stable Diffusion XL)\n');
  console.log('⚠️  NOTE: This requires a Replicate API token.');
  console.log('Set your token: export REPLICATE_API_TOKEN=your_token_here\n');
  console.log('Get a free token at: https://replicate.com\n');

  if (!REPLICATE_API_TOKEN || REPLICATE_API_TOKEN === 'r8_JE5Jz0l0J0vZzW0vZzW0vZzW0vZzW0v') {
    console.log('❌ REPLICATE_API_TOKEN not set properly!');
    console.log('Please set your API token and try again.\n');
    process.exit(1);
  }

  let successful = 0;
  let failed = 0;

  // Generate burger images
  console.log('📸 Generating BURGER images with AI...\n');
  for (const burger of burgers) {
    try {
      // Normal view
      console.log(`Generating ${burger.name} (normal view)...`);
      const imageUrl = await generateImage(burger.prompt);
      const normalPath = path.join(dirs.burgers, `${burger.id}.jpg`);
      await downloadImage(imageUrl, normalPath);
      console.log(`✓ ${burger.name} - saved\n`);
      successful++;

      // Cross-section view
      console.log(`Generating ${burger.name} (cross-section view)...`);
      const crossUrl = await generateImage(burger.crossPrompt);
      const crossPath = path.join(dirs.burgers, `${burger.id}-cross.jpg`);
      await downloadImage(crossUrl, crossPath);
      console.log(`✓ ${burger.name} (cross-section) - saved\n`);
      successful++;
    } catch (err) {
      console.log(`✗ ${burger.name}: ${err.message}\n`);
      failed += 2;
    }
  }

  // Generate side images
  console.log('\n🍟 Generating SIDE images with AI...\n');
  for (const side of sides) {
    try {
      console.log(`Generating side image: ${side.id}...`);
      const imageUrl = await generateImage(side.prompt);
      const filepath = path.join(dirs.sides, `${side.id}.jpg`);
      await downloadImage(imageUrl, filepath);
      console.log(`✓ ${side.id} - saved\n`);
      successful++;
    } catch (err) {
      console.log(`✗ ${side.id}: ${err.message}\n`);
      failed++;
    }
  }

  // Generate drink images
  console.log('\n🥤 Generating DRINK images with AI...\n');
  for (const drink of drinks) {
    try {
      console.log(`Generating drink image: ${drink.id}...`);
      const imageUrl = await generateImage(drink.prompt);
      const filepath = path.join(dirs.drinks, `${drink.id}.jpg`);
      await downloadImage(imageUrl, filepath);
      console.log(`✓ ${drink.id} - saved\n`);
      successful++;
    } catch (err) {
      console.log(`✗ ${drink.id}: ${err.message}\n`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ AI Image generation complete!`);
  console.log(`   Generated: ${successful} high-quality AI images`);
  if (failed > 0) console.log(`   Failed: ${failed} images`);
  console.log('='.repeat(60));
  console.log('\n🎨 All images are AI-generated using Stable Diffusion XL!');
  console.log('📁 Images saved to:', Object.values(dirs).join(', '));
  console.log('\n');
}

// Run
generateAllImages().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
