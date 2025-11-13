'use client'

import Container from '@/components/ui/Container'
import ImageSwiper from '@/components/ui/ImageSwiper'
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { HALAL_MESSAGE } from '@/lib/constants'

export default function About() {
  const freshIngredientCount = useCountUp(100, 2000)
  const signatureBurgersCount = useCountUp(10, 2000)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section id="about" className="relative pt-32 pb-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark">
                  AHKII ORIGINS
                </h2>
              </div>

              <p className="text-lg text-brand-dark leading-relaxed">
                Ahkii Burger started with a simple idea: create incredible burgers with fresh ingredients and real care. Now we&apos;re testing our concept in London with a limited pop-up to see if there&apos;s demand for a permanent burger destination.
              </p>

              <p className="text-lg text-brand-dark leading-relaxed">
                Every burger is hand-crafted to order using premium Angus beef, carefully selected toppings, and our signature sauce. We want your feedback—help us decide if Ahkii Burger should become a permanent spot in London.
              </p>

              <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
                <p className="text-green-800 font-semibold">{HALAL_MESSAGE}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-dark mb-2">{freshIngredientCount}%</div>
                  <p className="text-sm text-brand-dark">Fresh Ingredients</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-dark mb-2">{signatureBurgersCount}+</div>
                  <p className="text-sm text-brand-dark">Signature Burgers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-dark mb-2">24hrs</div>
                  <p className="text-sm text-brand-dark">Made to Order</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image - Image Swiper */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <ImageSwiper
                images="/images/team/about.png, /images/team/about-2.png, /images/team/about-3.png"
                cardWidth={320}
                cardHeight={400}
                className="w-full flex justify-center"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
