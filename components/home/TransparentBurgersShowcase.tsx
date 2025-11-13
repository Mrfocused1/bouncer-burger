'use client'

import Container from '@/components/ui/Container'
import { motion } from 'framer-motion'
import { MENU_ITEMS } from '@/data/menu'

export default function TransparentBurgersShowcase() {
  // Get only the burgers that have transparent images
  const burgersWithTransparent = MENU_ITEMS.filter(
    item => item.category === 'burger' && item.transparentImage
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-rockstone font-black mb-4 text-brand-dark">
              FEATURED SELECTION
            </h2>
            <p className="text-lg text-gray-600">
              Our chef&apos;s top picks, ready to devour
            </p>
          </motion.div>

          {/* Transparent Burgers Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6"
          >
            {burgersWithTransparent.map((burger) => (
              <motion.div key={burger.id} variants={itemVariants} className="pointer-events-none">
                <div className="pointer-events-none">
                  {/* Image Container */}
                  <div className="relative h-80 sm:h-96 bg-gradient-to-b from-brand-pink/10 to-brand-dark/5 rounded-lg flex items-center justify-center overflow-hidden mb-4 pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={burger.transparentImage!}
                      alt={burger.name}
                      className="w-3/4 h-3/4 object-contain drop-shadow-lg pointer-events-none"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center pointer-events-none">
                    <h3 className="text-xl sm:text-2xl font-rockstone font-bold text-brand-dark mb-2 pointer-events-none">
                      {burger.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 pointer-events-none">
                      {burger.description}
                    </p>
                    <p className="text-2xl font-bold text-brand-dark pointer-events-none">
                      £{burger.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
