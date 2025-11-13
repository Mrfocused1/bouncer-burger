'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { HALAL_MESSAGE } from '@/lib/constants'

interface AnimatedMarqueeHeroProps {
  tagline?: string
  title?: React.ReactNode
  description?: string
  ctaText?: string
  images?: string[]
  className?: string
}

export default function Hero({
  tagline = 'TESTING IN LONDON',
  title = 'INTERNET-READY BURGERS',
  description = 'Fresh, hand-crafted burgers made to order. We\'re testing a pop-up store and want to know: would you support a permanent location?',
  ctaText = 'Order Now',
  images = [
    '/images/hero-slider/slider-01.jpg',
    '/images/hero-slider/slider-02.jpg',
    '/images/hero-slider/slider-03.jpg',
    '/images/hero-slider/slider-04.jpg',
    '/images/hero-slider/slider-05.jpg',
    '/images/hero-slider/slider-06.jpg',
    '/images/hero-slider/slider-07.jpg',
    '/images/hero-slider/slider-08.jpg',
    '/images/hero-slider/slider-09.jpg',
  ],
  className = '',
}: AnimatedMarqueeHeroProps) {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  }

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images]

  return (
    <section
      className={cn(
        'relative w-full h-screen overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Text Content - Upper Section */}
      <div className="relative z-20 flex flex-col items-center justify-start text-center px-4 pt-8 md:pt-32 pb-8 space-y-8 md:space-y-10">
        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-rockstone font-black tracking-tighter text-brand-dark leading-tight"
        >
          {typeof title === 'string'
            ? title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  className={`inline-block ${word === 'BURGERS' ? 'bg-brand-dark text-brand-pink px-3 py-1 rounded-lg' : ''}`}
                >
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.3 }}
          className="max-w-2xl text-base md:text-lg text-gray-600"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.4 }}
        >
          <Link href="/menu" className="block">
            <Button variant="cta" size="lg">
              {ctaText}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated Image Marquee - Lower Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <div className="absolute left-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ['-100%', '0%'],
              transition: {
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
              },
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square h-96 md:h-96 flex-shrink-0"
                style={{
                  rotate: `${index % 2 === 0 ? -2 : 5}deg`,
                  maxHeight: '400px',
                }}
              >
                <img
                  src={src}
                  alt={`Burger showcase ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
