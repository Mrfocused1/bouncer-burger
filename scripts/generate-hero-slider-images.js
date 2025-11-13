const fs = require('fs');
const path = require('path');
const https = require('https');

// Create output directory
const outputDir = path.join(__dirname, '../public/images/hero-slider');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clear existing images first
const files = fs.readdirSync(outputDir);
files.forEach(file => {
  fs.unlinkSync(path.join(outputDir, file));
});
console.log('🗑️  Cleared previous images\n');

// 12 ultra-realistic burger images in London locations
const prompts = [
  // Variation 1: Street food vendor London
  "Ultra realistic advertising photography. A gourmet burger in the hand of someone at a London street market, Big Ben visible in the blurred background. Professional food photography, sharp focus on burger, shallow depth of field, studio lighting, 50mm lens, f/2.8, high contrast, vibrant colors, cinematic food advertisement, commercial grade, magazine cover quality, ultra sharp details, appetizing texture, professional photography.",

  // Variation 2: Rooftop London
  "Ultra realistic advertising photography. Gourmet burger held in hand on a London rooftop at sunset, cityscape blurred behind, modern skyscrapers silhouette. Professional food photography, sharp focus burger, shallow depth of field, golden hour lighting, 85mm lens, f/2.5, high contrast, warm cinematic colors, food magazine cover, commercial advertisement, ultra sharp texture details, mouth-watering, professional grade.",

  // Variation 3: Borough Market
  "Ultra realistic advertising photography. Premium burger at Borough Market London, market stalls blurred background, natural daylight. Professional food photography, perfectly lit burger in hand, sharp focus, shallow depth of field, 50mm lens, f/2.8, high contrast lighting, vibrant appetizing colors, food advertisement, magazine quality, commercial photography, ultra crisp details, professional grade, mouth-watering.",

  // Variation 4: Thames riverside
  "Ultra realistic advertising photography. Gourmet burger held near Thames riverside London, Tower Bridge blurred in background, water reflections. Professional food photography, sharp burger focus, shallow depth of field, 85mm lens, f/2.5, studio lighting on burger, high contrast, vibrant color grading, cinematic advertisement, food magazine cover, commercial grade, ultra sharp texture, appetizing professional.",

  // Variation 5: Brick Lane street food
  "Ultra realistic advertising photography. Premium burger at Brick Lane London street food scene, colorful street art blurred behind, vibrant atmosphere. Professional food photography, sharp focus on burger, shallow depth of field, 50mm lens, f/2.8, warm natural lighting, high contrast, saturated appetizing colors, food advertisement, magazine quality, commercial photography, ultra crisp details, professional grade.",

  // Variation 6: Notting Hill
  "Ultra realistic advertising photography. Gourmet burger in Notting Hill London, colorful houses blurred background, bright daylight. Professional food photography, perfectly lit burger in hand, sharp focus, shallow depth of field, 85mm lens, f/2.5, high contrast lighting, vibrant colors, food advertisement, magazine cover, commercial photography, ultra sharp texture details, appetizing, professional grade.",

  // Variation 7: Leicester Square
  "Ultra realistic advertising photography. Premium burger at Leicester Square London, neon signs and crowds blurred behind, urban atmosphere. Professional food photography, sharp burger focus, shallow depth of field, 50mm lens, f/2.8, vibrant artificial and natural lighting, high contrast, saturated appetizing colors, food advertisement, commercial grade, magazine quality, ultra crisp details, mouth-watering.",

  // Variation 8: Covent Garden market
  "Ultra realistic advertising photography. Gourmet burger at Covent Garden London market, street performers and crowds blurred, lively market atmosphere. Professional food photography, sharp focus on burger, shallow depth of field, 85mm lens, f/2.5, warm natural daylight, high contrast, vibrant colors, food advertisement, magazine cover quality, commercial photography, ultra sharp texture, appetizing, professional.",

  // Variation 9: Soho street
  "Ultra realistic advertising photography. Premium burger on Soho London street, historic buildings and signage blurred background. Professional food photography, perfectly lit burger in hand, sharp focus, shallow depth of field, 50mm lens, f/2.8, studio and natural lighting, high contrast, vibrant appetizing colors, food advertisement, magazine quality, commercial grade, ultra crisp details, mouth-watering.",

  // Variation 10: South Bank
  "Ultra realistic advertising photography. Gourmet burger at South Bank London, Thames, museums and art installations blurred behind. Professional food photography, sharp burger focus, shallow depth of field, 85mm lens, f/2.5, golden hour lighting, high contrast, warm cinematic colors, food advertisement, magazine cover, commercial photography, ultra sharp texture, appetizing, professional grade.",

  // Variation 11: Canary Wharf
  "Ultra realistic advertising photography. Premium burger with Canary Wharf London skyline blurred background, modern architecture. Professional food photography, perfectly lit burger in hand, sharp focus, shallow depth of field, 50mm lens, f/2.8, high contrast studio lighting, vibrant appetizing colors, food advertisement, magazine quality, commercial grade, ultra crisp details, mouth-watering.",

  // Variation 12: Piccadilly Circus
  "Ultra realistic advertising photography. Gourmet burger at Piccadilly Circus London, iconic neon signs and screens blurred behind, vibrant urban environment. Professional food photography, sharp focus on burger, shallow depth of field, 85mm lens, f/2.5, vibrant artificial lighting, high contrast, saturated appetizing colors, food advertisement, magazine cover, commercial photography, ultra sharp texture details, professional grade.",
];

// Function to download image from Pollinations
async function downloadImage(prompt, filename) {
  return new Promise((resolve, reject) => {
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(path.join(outputDir, filename));
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Generated: ${filename}`);
          resolve(filename);
        });

        fileStream.on('error', (err) => {
          fs.unlink(path.join(outputDir, filename), () => {});
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Generate all images
async function generateAllImages() {
  console.log('🍔 Generating 12 Ultra-Realistic London Burger Images...\n');
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < prompts.length; i++) {
    const filename = `burger-${String(i + 1).padStart(2, '0')}.jpg`;
    const prompt = prompts[i];

    try {
      await downloadImage(prompt, filename);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${filename} - ${error.message}`);
      failCount++;
    }

    // Add delay between requests to avoid rate limiting
    if (i < prompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log(`\n✓ Generation Complete!`);
  console.log(`Successfully generated: ${successCount}/12 images`);
  if (failCount > 0) {
    console.log(`Failed: ${failCount}/12 images`);
  }
  console.log(`\nImages saved to: ${outputDir}`);
  console.log('\n🎉 All images ready for slider!');
}

generateAllImages().catch(console.error);
