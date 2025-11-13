'use client'

import React from 'react'

interface StickerProps {
  count?: number
  className?: string
  zIndex?: number
}

export default function StickerDecoration({ count = 3, className = '', zIndex = 0 }: StickerProps) {
  const stickers = [
    '/images/stickers/1.png',
    '/images/stickers/2.png',
    '/images/stickers/3.png',
    '/images/stickers/4.png',
    '/images/stickers/5.png',
    '/images/stickers/6.png',
    '/images/stickers/7.png',
    '/images/stickers/8.png',
    '/images/stickers/9.png',
    '/images/stickers/10.png',
  ]

  // Generate random stickers for this section
  const getRandomStickers = () => {
    const shuffled = [...stickers].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const randomStickers = getRandomStickers()

  const generateRandomPosition = (index: number) => {
    // Use index as seed for consistent but varied positioning
    const seed = Math.sin(index * 12.9898 + 78.233) * 43758.5453
    const seeded = seed - Math.floor(seed)

    return {
      top: `${10 + seeded * 70}%`,
      left: `${-5 + (seeded * 1.2) * 110}%`,
      rotation: (seeded * 360) % 45 - 22.5, // -22.5 to 22.5 degrees
      scale: 0.6 + seeded * 0.6, // 0.6 to 1.2
      opacity: 1, // 100% opaque
    }
  }

  return (
    <>
      {randomStickers.map((sticker, index) => {
        const position = generateRandomPosition(index)
        return (
          <div
            key={index}
            className={`absolute pointer-events-none ${className}`}
            style={{
              top: position.top,
              left: position.left,
              transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
              opacity: position.opacity,
              zIndex: zIndex,
              width: '120px',
              height: '120px',
            }}
          >
            <img
              src={sticker}
              alt="Brand sticker decoration"
              className="w-full h-full object-contain"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        )
      })}
    </>
  )
}
