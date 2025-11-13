'use client'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { HALAL_MESSAGE } from '@/lib/constants'

export default function FeaturedBurgers() {
  const sectionRef = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // All unique burger images - no repetition
  const allBurgers = [
    { id: 1, image: '/images/3burgers/1.png' },
    { id: 2, image: '/images/3burgers/2.png' },
    { id: 3, image: '/images/3burgers/3.png' },
    { id: 4, image: '/images/3burgers/more burgers/15.png' },
    { id: 5, image: '/images/3burgers/more burgers/16.png' },
    { id: 6, image: '/images/3burgers/more burgers/17.png' },
    { id: 7, image: '/images/3burgers/more burgers/18.png' },
    { id: 8, image: '/images/3burgers/more burgers/19.png' },
    { id: 9, image: '/images/3burgers/more burgers/20.png' },
  ]


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

  const burgerItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
    },
  }

  return (
    <>
    <section ref={sectionRef} className="relative pt-8 md:pt-32 pb-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-rockstone font-black mb-4 text-left">
              <span className="text-brand-pink">SIGNATURE</span> <span className="text-brand-dark">BURGERS</span>
            </h2>
            <p className="text-lg text-gray-600 text-left mb-4">
              Hand-crafted burgers made fresh to order using premium ingredients. Try our signature burgers during this limited pop-up test.
            </p>
            <div className="inline-block bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
              <p className="text-sm font-semibold text-green-800">{HALAL_MESSAGE}</p>
            </div>
          </motion.div>

          {/* Burger Scrollable Carousel - Desktop & Mobile */}
          <div className="relative mb-12">
            {/* Mobile gradient overlay - Left side */}
            <div className="block md:hidden absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-[#E4E3D9] via-transparent to-transparent pointer-events-none z-10"></div>

            {/* Mobile gradient overlay - Right side */}
            <div className="block md:hidden absolute right-0 top-0 bottom-0 w-full bg-gradient-to-l from-[#E4E3D9] via-transparent to-transparent pointer-events-none z-10"></div>

            {/* Desktop gradient overlay - Left side */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-[#E4E3D9] to-transparent pointer-events-none z-10"></div>

            {/* Desktop gradient overlay - Right side */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-[#E4E3D9] to-transparent pointer-events-none z-10"></div>

            <div className="overflow-x-auto pb-4 scrollbar-hide" ref={carouselRef}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              <div className="-mx-4 sm:-mx-6 flex gap-4 px-4 sm:px-6 w-max">
                {allBurgers.map((burger, index) => (
                  <motion.div
                    key={`${burger.id}-${index}`}
                    variants={burgerItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 pointer-events-none"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-40 md:w-48 lg:w-56 overflow-visible bg-[#E4E3D9] flex items-center justify-center pointer-events-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={burger.image}
                        alt="Signature burger"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* CTA */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center -mt-8"
          >
            <Link href="/menu">
              <Button variant="primary" size="md">
                MORE
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>

    {/* Scrolling Text - Above Video */}
    <div className="md:hidden w-full overflow-hidden bg-brand-dark py-4">
      <div className="flex animate-scroll whitespace-nowrap">
        <span className="text-brand-pink font-rockstone font-bold text-xl px-8">
          • DELICIOUS • PREMIUM • BURGERS • FRESH • DELICIOUS • PREMIUM • BURGERS • FRESH •
        </span>
        <span className="text-brand-pink font-rockstone font-bold text-xl px-8">
          • DELICIOUS • PREMIUM • BURGERS • FRESH • DELICIOUS • PREMIUM • BURGERS • FRESH •
        </span>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>

    {/* Video Section - Below Featured Burgers Section */}
    <div className="md:hidden w-full overflow-hidden">
      <video
        width="100%"
        height="auto"
        autoPlay
        muted
        loop
        playsInline
        className="w-full object-cover block"
        style={{ display: 'block' }}
      >
        <source src="/images/Ahki Chef.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    {/* Scrolling Text - Below Video */}
    <div className="md:hidden w-full overflow-hidden bg-brand-pink py-4 relative -top-5">
        <div className="flex animate-scroll-reverse whitespace-nowrap">
        <span className="text-brand-dark font-rockstone font-bold text-xl px-8">
          • DELICIOUS • PREMIUM • BURGERS • FRESH • DELICIOUS • PREMIUM • BURGERS • FRESH •
        </span>
        <span className="text-brand-dark font-rockstone font-bold text-xl px-8">
          • DELICIOUS • PREMIUM • BURGERS • FRESH • DELICIOUS • PREMIUM • BURGERS • FRESH •
        </span>
      </div>
      <style>{`
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 20s linear infinite;
        }
      `}</style>
    </div>
    </>
  )
}
