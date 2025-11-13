'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuItem as MenuItemType } from '@/data/menu'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

interface MenuItemProps {
  item: MenuItemType
  index?: number
}

export default function MenuItem({ item, index = 0 }: MenuItemProps) {
  const [showCrossSection, setShowCrossSection] = useState(false)
  const hasSecondImage = item.crossSectionImage && item.category === 'burger'

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.05,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/products/${item.id}`} className="block h-full">
        <Card className="h-full border border-gray-200 bg-white hover:shadow-xl cursor-pointer transition-shadow">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-300 overflow-hidden group cursor-pointer">
          {/* Main Image */}
          <motion.div
            key={showCrossSection ? 'cross' : 'normal'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={showCrossSection && item.crossSectionImage ? item.crossSectionImage : item.image}
              alt={showCrossSection ? `${item.name} - Cross Section` : item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>

          {/* Toggle Button - Only show for burgers with cross-section images */}
          {hasSecondImage && (
            <button
              onClick={() => setShowCrossSection(!showCrossSection)}
              className="absolute bottom-3 left-3 bg-brand-dark text-white px-3 py-1 rounded text-xs font-bold hover:bg-opacity-90 transition-all z-10"
              title="Toggle between normal and cross-section view"
            >
              {showCrossSection ? 'Normal' : 'Layers'}
            </button>
          )}

        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-rockstone font-bold text-brand-dark mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-brand-dark">
              £{item.price.toFixed(2)}
            </span>
            {hasSecondImage && showCrossSection && (
              <span className="text-xs text-brand-pink font-semibold">
                Cross-section
              </span>
            )}
          </div>
        </div>
      </Card>
      </Link>
    </motion.div>
  )
}
