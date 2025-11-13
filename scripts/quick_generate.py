#!/usr/bin/env python3
"""
Quick AI Burger Image Generation - Optimized for Speed
Uses minimal inference steps and memory optimizations
"""

import torch
from diffusers import StableDiffusionPipeline
from pathlib import Path
import gc

# Create directories
dirs = {
    'burgers': './public/images/burgers',
    'sides': './public/images/sides',
    'drinks': './public/images/drinks',
}

for dir_path in dirs.values():
    Path(dir_path).mkdir(parents=True, exist_ok=True)

# Simplified burger list (5 most important burgers)
burgers = [
    {
        'id': 'classic',
        'name': 'The Ahkii Classic',
        'prompt': 'delicious cheeseburger with beef patty, cheese, lettuce, tomato, onions, studio photography, professional food photo',
        'cross_prompt': 'cross section of cheeseburger showing layers of beef, cheese, lettuce, tomato, onions, food photography',
    },
    {
        'id': 'double-trouble',
        'name': 'The Double Trouble',
        'prompt': 'double patty cheeseburger with two beef patties, double cheese, caramelized onions, professional food photography',
        'cross_prompt': 'cross section double cheeseburger showing two beef patties with melted cheese and caramelized onions, food photo',
    },
    {
        'id': 'heatwave',
        'name': 'The Heatwave',
        'prompt': 'spicy burger with jalapeños, pepperjack cheese, crispy onions, hot sauce, professional food photography',
        'cross_prompt': 'cross section spicy burger showing jalapeños, pepperjack cheese, crispy onions, hot sauce, food photo',
    },
]

print("\n🍔 QUICK AI BURGER IMAGE GENERATION\n")
print("Loading Stable Diffusion model (optimized)...")

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Device: {device.upper()}\n")

try:
    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
        safety_checker=None,
    )
    pipe = pipe.to(device)

    # Optimize for speed
    pipe.enable_attention_slicing()
    if device == "cuda":
        pipe.enable_sequential_cpu_offload()

    successful = 0
    failed = 0

    print("📸 Generating burger images...\n")

    for burger in burgers:
        try:
            # Normal view - only 15 steps for speed
            print(f"Generating {burger['name']}...")
            image = pipe(
                burger['prompt'],
                height=512,
                width=768,
                num_inference_steps=15,  # Low steps = faster
                guidance_scale=7.5
            ).images[0]

            normal_path = Path(dirs['burgers']) / f"{burger['id']}.jpg"
            image.save(normal_path)
            print(f"   ✓ Saved normal view")
            successful += 1

            # Cross section
            image = pipe(
                burger['cross_prompt'],
                height=512,
                width=768,
                num_inference_steps=15,
                guidance_scale=7.5
            ).images[0]

            cross_path = Path(dirs['burgers']) / f"{burger['id']}-cross.jpg"
            image.save(cross_path)
            print(f"   ✓ Saved cross-section\n")
            successful += 1

            # Free memory
            gc.collect()
            if device == "cuda":
                torch.cuda.empty_cache()

        except Exception as e:
            print(f"   ✗ Error: {str(e)[:80]}\n")
            failed += 2

    print("="*60)
    print(f"✅ Generated {successful} images")
    if failed > 0:
        print(f"⚠ Failed: {failed} images")
    print("="*60)
    print("\n✨ AI burger images ready!")
    print(f"📁 Saved to: {dirs['burgers']}\n")

except Exception as e:
    print(f"\n❌ Error: {e}\n")
    print("Make sure you have:")
    print("1. Enough disk space (5GB+ for model)")
    print("2. 8GB+ RAM available")
    print("3. Run: pip install torch diffusers transformers pillow\n")
