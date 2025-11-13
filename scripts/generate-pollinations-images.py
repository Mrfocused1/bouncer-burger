#!/usr/bin/env python3
"""
Generate AI Burger Images for Ahkii Burger using Pollinations AI
Uses the same method that worked perfectly for AhkiCafe
Free, no API key required, generates high-quality food photography
"""

import requests
import os
import time
from urllib.parse import quote
from pathlib import Path

# Create image directories
dirs = {
    'burgers': './public/images/burgers',
    'sides': './public/images/sides',
    'drinks': './public/images/drinks',
}

for dir_path in dirs.values():
    Path(dir_path).mkdir(parents=True, exist_ok=True)

# Menu items with descriptions
burgers = [
    {
        'id': 'classic',
        'name': 'The Ahkii Classic',
        'description': 'Angus beef patty, cheese, Ahkii sauce, lettuce, tomato, onions',
    },
    {
        'id': 'double-trouble',
        'name': 'The Double Trouble',
        'description': 'Double patty, double cheese, caramelised onions',
    },
    {
        'id': 'heatwave',
        'name': 'The Heatwave',
        'description': 'Jalapeños, spicy Ahkii sauce, pepperjack cheese, crispy onions',
    },
    {
        'id': 'bbq-stack',
        'name': 'The BBQ Stack',
        'description': 'Angus patty, smoky BBQ sauce, crispy onions, cheddar cheese',
    },
    {
        'id': 'melt',
        'name': 'The Melt',
        'description': 'Angus patty smothered in cheese sauce, pickles, Ahkii sauce',
    },
    {
        'id': 'veggie',
        'name': 'The Veggie Way',
        'description': 'Grilled plant-based patty, vegan cheese, lettuce, tomato, Ahkii sauce',
    },
    {
        'id': 'special',
        'name': 'The Ahkii Special',
        'description': 'Signature sauce, crispy fried onions, melted cheese blend',
    },
    {
        'id': 'truffle',
        'name': 'The Truffle Boss',
        'description': 'Angus patty, truffle mayo, caramelised onions, Swiss cheese',
    },
    {
        'id': 'sweet-spicy',
        'name': 'The Sweet & Spicy',
        'description': 'Hot honey glaze, jalapeños, cheddar, Ahkii sauce',
    },
    {
        'id': 'blue-smoke',
        'name': 'The Blue Smoke',
        'description': 'Blue cheese, crispy onions, BBQ glaze',
    },
]

sides = [
    {'id': 'fries', 'name': 'Regular Fries', 'description': 'Crispy golden fries seasoned to perfection'},
    {'id': 'loaded-fries', 'name': 'Loaded Fries', 'description': 'Fries topped with melted cheese and Ahkii sauce'},
    {'id': 'sweet-potato-fries', 'name': 'Sweet Potato Fries', 'description': 'Sweet potato fries with a crispy exterior'},
    {'id': 'onion-rings', 'name': 'Onion Rings', 'description': 'Golden fried onion rings, crispy and delicious'},
    {'id': 'mozz-sticks', 'name': 'Mozz Sticks', 'description': 'Deep-fried mozzarella sticks with a crispy coating'},
]

drinks = [
    {'id': 'coca-cola', 'name': 'Coca-Cola', 'description': 'Ice-cold Coca-Cola, 330ml'},
    {'id': 'sprite', 'name': 'Sprite', 'description': 'Refreshing Sprite, 330ml'},
    {'id': 'fanta', 'name': 'Fanta', 'description': 'Fanta assorted flavours, 330ml'},
    {'id': 'water-still', 'name': 'Still Water', 'description': 'Pure still water, 500ml'},
    {'id': 'water-sparkling', 'name': 'Sparkling Water', 'description': 'Refreshing sparkling water, 500ml'},
]

def create_prompt(item_name, description, is_cross_section=False):
    """Create optimized prompt for realistic food photography"""
    if is_cross_section:
        prompt = f"{item_name} cross-section showing inside layers and ingredients, {description}, professional food photography, studio lighting, high quality, ultra realistic, appetizing, commercial photography, 4k, centered composition"
    else:
        prompt = f"{item_name}, {description}, professional food photography, studio lighting, high quality, ultra realistic, appetizing, commercial photography, 4k, centered composition, clean background"
    return prompt

def generate_image(item_name, description, filepath, is_cross_section=False):
    """Generate and download image using Pollinations AI"""
    prompt = create_prompt(item_name, description, is_cross_section)

    # Create URL with encoded prompt
    url = f"https://image.pollinations.ai/prompt/{quote(prompt)}"
    params = {
        "width": 1024,
        "height": 1024,
        "model": "flux",
        "enhance": "true",
        "nologo": "true"
    }

    try:
        print(f"  Generating: {os.path.basename(filepath)}...")

        # Download image
        response = requests.get(url, params=params, timeout=60)
        response.raise_for_status()

        # Save image
        with open(filepath, 'wb') as f:
            f.write(response.content)

        print(f"  ✅ Saved")
        return True

    except requests.exceptions.Timeout:
        print(f"  ❌ Timeout (generation takes a moment, try again)")
        return False
    except Exception as e:
        print(f"  ❌ Error: {str(e)[:80]}")
        return False

def main():
    print("\n🍔 AHKII BURGER AI IMAGE GENERATION")
    print("=" * 60)
    print("📡 Using Pollinations AI (Free, no API key required)")
    print("🤖 Model: Flux (Ultra-realistic food photography)")
    print(f"🖼️  Generating {len(burgers) * 2 + len(sides) + len(drinks)} images")
    print("=" * 60)
    print()

    success_count = 0
    fail_count = 0

    # Generate burger images (normal + cross-section)
    print("📸 BURGER IMAGES\n")
    for i, burger in enumerate(burgers, 1):
        print(f"[{i}/{len(burgers)}] {burger['name']}")

        # Normal view
        normal_path = os.path.join(dirs['burgers'], f"{burger['id']}.jpg")
        if generate_image(burger['name'], burger['description'], normal_path):
            success_count += 1
        else:
            fail_count += 1

        # Cross-section view
        cross_path = os.path.join(dirs['burgers'], f"{burger['id']}-cross.jpg")
        if generate_image(burger['name'], burger['description'], cross_path, is_cross_section=True):
            success_count += 1
        else:
            fail_count += 1

        # Rate limiting - 2 seconds between requests
        time.sleep(2)
        print()

    # Generate side images
    print("🍟 SIDE DISH IMAGES\n")
    for i, side in enumerate(sides, 1):
        print(f"[{i}/{len(sides)}] {side['name']}")

        side_path = os.path.join(dirs['sides'], f"{side['id']}.jpg")
        if generate_image(side['name'], side['description'], side_path):
            success_count += 1
        else:
            fail_count += 1

        time.sleep(2)
        print()

    # Generate drink images
    print("🥤 DRINK IMAGES\n")
    for i, drink in enumerate(drinks, 1):
        print(f"[{i}/{len(drinks)}] {drink['name']}")

        drink_path = os.path.join(dirs['drinks'], f"{drink['id']}.jpg")
        if generate_image(drink['name'], drink['description'], drink_path):
            success_count += 1
        else:
            fail_count += 1

        time.sleep(2)
        print()

    # Summary
    print("=" * 60)
    print("✨ IMAGE GENERATION COMPLETE!")
    print(f"✅ Success: {success_count} images")
    if fail_count > 0:
        print(f"❌ Failed: {fail_count} images")
    print("=" * 60)
    print()
    print("📁 Images saved to:")
    print(f"   • {dirs['burgers']}")
    print(f"   • {dirs['sides']}")
    print(f"   • {dirs['drinks']}")
    print()
    print("🌐 Your website is ready!")
    print("   Visit: http://localhost:3000/menu")
    print()

if __name__ == "__main__":
    main()
