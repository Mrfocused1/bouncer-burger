const https = require('https');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/images/burgers');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const prompts = [
  "A delicious gourmet burger with sesame seed bun, cheese, lettuce, tomato, pickles, and sauce, professional food photography, isolated on transparent background, PNG format",
  "A premium burger with multiple patties, melted cheese, crispy bacon, fresh vegetables, professional food photography, isolated on transparent background, PNG format",
  "A classic cheeseburger with perfectly toasted bun, juicy patty, golden cheese, fresh toppings, professional food photography, isolated on transparent background, PNG format"
];

async function generateBurgers() {
  console.log('Generating burger images with transparent backgrounds...');

  for (let i = 0; i < prompts.length; i++) {
    try {
      console.log(`Generating burger ${i + 1}/3...`);
      
      // Using Pollinations API for image generation
      const encodedPrompt = encodeURIComponent(prompts[i]);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=500&height=500&format=png`;
      
      const filename = path.join(outputDir, `burger-transparent-${i + 1}.png`);
      
      await new Promise((resolve, reject) => {
        https.get(url, (response) => {
          const fileStream = fs.createWriteStream(filename);
          response.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✓ Generated: burger-transparent-${i + 1}.png`);
            resolve();
          });
          
          fileStream.on('error', reject);
        }).on('error', reject);
      });
      
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating burger ${i + 1}:`, error.message);
    }
  }
  
  console.log('✓ All burger images generated!');
}

generateBurgers();
