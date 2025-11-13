const https = require('https');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/images/burgers');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const prompts = [
  "professional product photography of a gourmet burger with sesame seed bun, cheese, lettuce, tomato, pickles, and sauce, isolated on a beige background, studio lighting, PNG format, beige background #E4E3D9",
  "professional product photography of a premium double cheeseburger with multiple beef patties, melted cheese, crispy bacon, fresh vegetables, isolated on beige background, studio lighting, PNG format, beige background #E4E3D9",
  "professional product photography of a classic cheeseburger with perfectly toasted bun, juicy beef patty, golden melted cheese, fresh lettuce and tomato, isolated on beige background, studio lighting, PNG format, beige background #E4E3D9"
];

async function generateBurgers() {
  console.log('Regenerating burger images...');

  for (let i = 0; i < prompts.length; i++) {
    try {
      console.log(`Generating burger ${i + 1}/3...`);
      
      // Using Pollinations API for image generation with seed for consistency
      const encodedPrompt = encodeURIComponent(prompts[i]);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=600&height=600&seed=${i}`;
      
      const filename = path.join(outputDir, `burger-transparent-${i + 1}.png`);
      
      await new Promise((resolve, reject) => {
        https.get(url, (response) => {
          const fileStream = fs.createWriteStream(filename);
          response.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✓ Regenerated: burger-transparent-${i + 1}.png`);
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
  
  console.log('✓ All burger images regenerated!');
}

generateBurgers();
