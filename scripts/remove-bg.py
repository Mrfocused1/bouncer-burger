#!/usr/bin/env python3
"""
Remove white/light backgrounds from burger images and make them transparent
"""
import os
from PIL import Image
import numpy as np

# Directory containing burger images
burger_dir = os.path.join(os.path.dirname(__file__), '../public/images/burgers')

# Process each burger transparent image
for i in range(1, 4):
    image_path = os.path.join(burger_dir, f'burger-transparent-{i}.png')

    if not os.path.exists(image_path):
        print(f"⚠ File not found: {image_path}")
        continue

    try:
        # Open image
        img = Image.open(image_path).convert('RGBA')

        # Convert to numpy array
        data = np.array(img)

        # Define threshold for white/light colors (values > 240 for all channels)
        # This will catch the white background while preserving burger colors
        threshold = 240

        # Create a mask for white/light pixels
        # A pixel is considered white if R, G, B are all > threshold
        white_mask = (data[:,:,0] > threshold) & (data[:,:,1] > threshold) & (data[:,:,2] > threshold)

        # Set alpha channel to 0 for white pixels (make transparent)
        data[white_mask, 3] = 0

        # Create new image from modified data
        result = Image.fromarray(data, 'RGBA')

        # Save back to file
        result.save(image_path)
        print(f"✓ Processed: burger-transparent-{i}.png")

    except Exception as e:
        print(f"✗ Error processing burger-transparent-{i}.png: {e}")

print("\n✓ Background removal complete!")
