#!/usr/bin/env python3
"""
Generate AI Burger Images using Hugging Face Inference API
Uses free API with queuing - no authentication needed
"""

import requests
import os
from pathlib import Path
import time
import json

# Create directories
dirs = {
    'burgers': './public/images/burgers',
    'sides': './public/images/sides',
    'drinks': './public/images/drinks',
}

for dir_path in dirs.values():
    Path(dir_path).mkdir(parents=True, exist_ok=True)

# Hugging Face API endpoint for image generation
HF_API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"

# Image generation prompts
burgers = [
    {
        'id': 'classic',
        'name': 'The Ahkii Classic',
        'prompt': 'professional food photography of a classic cheeseburger with angus beef patty, melted cheese, fresh lettuce, ripe tomato, onions, on a soft bun, studio lighting, appetizing, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section of a cheeseburger showing layers of beef patty, cheese, lettuce, tomato, onions clearly visible, studio lighting, high quality, 8k',
    },
    {
        'id': 'double-trouble',
        'name': 'The Double Trouble',
        'prompt': 'professional food photography of a double cheeseburger with two beef patties, double melted cheese, caramelized onions, on a toasted bun, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section of double cheeseburger showing two beef patties stacked with melted cheese and caramelized onions between layers, high quality, 8k',
    },
    {
        'id': 'heatwave',
        'name': 'The Heatwave',
        'prompt': 'professional food photography of a spicy burger with jalapeños, pepperjack cheese, crispy fried onions, on a bun, hot sauce dripping, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section spicy burger showing jalapeños, pepperjack cheese, crispy onions layers clearly visible, hot sauce, high quality, 8k',
    },
    {
        'id': 'bbq-stack',
        'name': 'The BBQ Stack',
        'prompt': 'professional food photography of a BBQ burger with angus beef patty, smoky BBQ sauce, crispy fried onions, melted cheddar cheese, on a brioche bun, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section BBQ burger showing beef patty, BBQ sauce, crispy onions, cheddar cheese layers, studio lighting, high quality, 8k',
    },
    {
        'id': 'melt',
        'name': 'The Melt',
        'prompt': 'professional food photography of a melted cheese burger with beef patty smothered in creamy cheese sauce, pickles, on a bun, cheese stretching, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section cheese burger showing beef patty drowning in melted cheese sauce with pickles visible, studio lighting, high quality, 8k',
    },
    {
        'id': 'veggie',
        'name': 'The Veggie Way',
        'prompt': 'professional food photography of a vegan burger with plant-based patty, vegan cheese, fresh lettuce, ripe tomato, on a bun, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section vegan burger showing plant-based patty, vegan cheese, lettuce, tomato layers, studio lighting, high quality, 8k',
    },
    {
        'id': 'special',
        'name': 'The Ahkii Special',
        'prompt': 'professional food photography of premium burger with signature sauce, crispy fried onions, melted cheese blend, on artisan bun, studio lighting, gourmet presentation, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section premium burger showing beef patty, crispy fried onions, melted cheese blend layers, signature sauce dripping, high quality, 8k',
    },
    {
        'id': 'truffle',
        'name': 'The Truffle Boss',
        'prompt': 'professional food photography of luxury truffle burger with beef patty, truffle mayo, caramelized onions, melted Swiss cheese, on premium bun, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section luxury truffle burger showing beef patty, truffle mayo, caramelized onions, Swiss cheese layers, high quality, 8k',
    },
    {
        'id': 'sweet-spicy',
        'name': 'The Sweet & Spicy',
        'prompt': 'professional food photography of sweet and spicy burger with hot honey glaze dripping, jalapeños, melted cheddar cheese, on toasted bun, steam rising, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section sweet spicy burger showing beef patty, hot honey glaze, jalapeños, cheddar cheese layers clearly visible, high quality, 8k',
    },
    {
        'id': 'blue-smoke',
        'name': 'The Blue Smoke',
        'prompt': 'professional food photography of blue cheese burger with beef patty, creamy blue cheese, crispy fried onions, BBQ glaze, on bun, studio lighting, high quality, 8k',
        'cross_prompt': 'professional food photography cross-section blue cheese burger showing beef patty, blue cheese crumbles, crispy onions, BBQ glaze layers, high quality, 8k',
    },
]

sides = [
    {'id': 'fries', 'name': 'Regular Fries', 'prompt': 'professional food photography of golden crispy french fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k'},
    {'id': 'loaded-fries', 'name': 'Loaded Fries', 'prompt': 'professional food photography of loaded fries with melted cheese sauce and toppings, steam rising, appetizing, studio lighting, high quality, 8k'},
    {'id': 'sweet-potato-fries', 'name': 'Sweet Potato Fries', 'prompt': 'professional food photography of golden crispy sweet potato fries, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k'},
    {'id': 'onion-rings', 'name': 'Onion Rings', 'prompt': 'professional food photography of golden crispy onion rings, perfectly fried, hot steam rising, appetizing, studio lighting, high quality, 8k'},
    {'id': 'mozz-sticks', 'name': 'Mozz Sticks', 'prompt': 'professional food photography of melted mozzarella sticks with golden crispy exterior, cheese stretching, studio lighting, high quality, 8k'},
]

drinks = [
    {'id': 'coca-cola', 'name': 'Coca-Cola', 'prompt': 'professional food photography of cold Coca-Cola in a glass with ice cubes, condensation on glass, vibrant red color, studio lighting, high quality, 8k'},
    {'id': 'sprite', 'name': 'Sprite', 'prompt': 'professional food photography of cold Sprite lemon-lime soda in a glass with ice cubes, refreshing, clear bubbles visible, studio lighting, high quality, 8k'},
    {'id': 'fanta', 'name': 'Fanta', 'prompt': 'professional food photography of colorful Fanta soda in a glass with ice cubes, vibrant colors, refreshing, studio lighting, high quality, 8k'},
    {'id': 'still-water', 'name': 'Still Water', 'prompt': 'professional food photography of cold clear water in a glass, ice cubes, crystal clear, condensation on glass, studio lighting, high quality, 8k'},
    {'id': 'sparkling-water', 'name': 'Sparkling Water', 'prompt': 'professional food photography of sparkling water in a glass with bubbles visible, ice cubes, refreshing, studio lighting, high quality, 8k'},
]

def query_hf_api(prompt, max_retries=3):
    """
    Query Hugging Face Inference API for image generation
    Returns image bytes or None if failed
    """
    headers = {"Authorization": f"Bearer hf_token"}
    payload = {"inputs": prompt}

    for attempt in range(max_retries):
        try:
            response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=30)

            if response.status_code == 200:
                return response.content
            elif response.status_code == 503:
                # Model is loading, wait and retry
                wait_time = (attempt + 1) * 10
                print(f"   ⏳ Model loading, waiting {wait_time}s...")
                time.sleep(wait_time)
            else:
                print(f"   ⚠ API Error {response.status_code}: {response.text[:100]}")
                return None
        except requests.exceptions.Timeout:
            print(f"   ⏱ Timeout on attempt {attempt + 1}")
            continue
        except Exception as e:
            print(f"   ❌ Request failed: {str(e)[:50]}")
            return None

    return None

def generate_images():
    print("\n🍔 HUGGING FACE AI IMAGE GENERATION (API Method)\n")
    print("Generating professional AI burger images...")
    print("(Using Hugging Face Free Inference API)\n")

    successful = 0
    failed = 0

    # Generate burger images
    print("📸 Generating BURGER images...\n")
    for burger in burgers:
        try:
            # Normal view
            print(f"Generating {burger['name']} (normal view)...")
            image_data = query_hf_api(burger['prompt'])
            if image_data:
                normal_path = os.path.join(dirs['burgers'], f"{burger['id']}.jpg")
                with open(normal_path, 'wb') as f:
                    f.write(image_data)
                print(f"   ✓ Saved to {normal_path}")
                successful += 1
            else:
                print(f"   ✗ Failed to generate")
                failed += 1

            # Cross-section view
            print(f"Generating {burger['name']} (cross-section view)...")
            image_data = query_hf_api(burger['cross_prompt'])
            if image_data:
                cross_path = os.path.join(dirs['burgers'], f"{burger['id']}-cross.jpg")
                with open(cross_path, 'wb') as f:
                    f.write(image_data)
                print(f"   ✓ Saved to {cross_path}\n")
                successful += 1
            else:
                print(f"   ✗ Failed to generate\n")
                failed += 1

            time.sleep(2)  # Rate limiting
        except Exception as e:
            print(f"   ✗ Error: {str(e)[:50]}\n")
            failed += 2

    # Generate side images
    print("\n🍟 Generating SIDE DISH images...\n")
    for side in sides:
        try:
            print(f"Generating {side['name']}...")
            image_data = query_hf_api(side['prompt'])
            if image_data:
                path = os.path.join(dirs['sides'], f"{side['id']}.jpg")
                with open(path, 'wb') as f:
                    f.write(image_data)
                print(f"   ✓ Saved to {path}\n")
                successful += 1
            else:
                print(f"   ✗ Failed to generate\n")
                failed += 1
            time.sleep(2)
        except Exception as e:
            print(f"   ✗ Error: {str(e)[:50]}\n")
            failed += 1

    # Generate drink images
    print("\n🥤 Generating DRINK images...\n")
    for drink in drinks:
        try:
            print(f"Generating {drink['name']}...")
            image_data = query_hf_api(drink['prompt'])
            if image_data:
                path = os.path.join(dirs['drinks'], f"{drink['id']}.jpg")
                with open(path, 'wb') as f:
                    f.write(image_data)
                print(f"   ✓ Saved to {path}\n")
                successful += 1
            else:
                print(f"   ✗ Failed to generate\n")
                failed += 1
            time.sleep(2)
        except Exception as e:
            print(f"   ✗ Error: {str(e)[:50]}\n")
            failed += 1

    # Summary
    print("\n" + "="*60)
    print("✅ AI Image generation attempt complete!")
    print(f"   Generated: {successful} images")
    if failed > 0:
        print(f"   Failed: {failed} images")
    print("="*60)
    print("\n🎨 AI-generated images are being created!")
    print("📁 Images saved to:")
    print("   • " + dirs['burgers'])
    print("   • " + dirs['sides'])
    print("   • " + dirs['drinks'])
    print("\n✨ Your website will now display unique AI-generated burger images!")
    print("🌐 Visit http://localhost:3000/menu to see the results\n")

if __name__ == "__main__":
    generate_images()
