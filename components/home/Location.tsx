'use client'

import Container from '@/components/ui/Container'
import { OPENING_HOURS, ADDRESS, GOOGLE_MAPS_EMBED } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Location() {
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
    <section id="location" className="relative pt-32 pb-20 bg-gray-50">
      {/* Curved Wave Divider - Top */}
      <svg
        className="absolute top-0 left-0 w-full h-32 -translate-y-1/2"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 Q300,30 600,90 T1200,90 L1200,0 L0,0 Z"
          fill="rgb(249, 250, 251)"
          opacity="1"
        />
        <path
          d="M0,80 Q300,40 600,80 T1200,80 L1200,0 L0,0 Z"
          fill="rgba(41, 52, 33, 0.03)"
          opacity="0.5"
        />
      </svg>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-pink text-brand-dark text-sm font-bold rounded-full mb-4">
              VISIT US
            </span>
            <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark">
              LOCATION & HOURS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div variants={itemVariants} className="rounded-lg overflow-hidden h-96 lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={GOOGLE_MAPS_EMBED}
              />
            </motion.div>

            {/* Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-2xl font-rockstone font-bold text-brand-dark mb-3">
                  📍 Address
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">{ADDRESS}</p>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-2xl font-rockstone font-bold text-brand-dark mb-4">
                  ⏰ Opening Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Monday</span>
                    <span>{OPENING_HOURS.MONDAY}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Tuesday</span>
                    <span>{OPENING_HOURS.TUESDAY}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Wednesday</span>
                    <span>{OPENING_HOURS.WEDNESDAY}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Thursday</span>
                    <span>{OPENING_HOURS.THURSDAY}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Friday</span>
                    <span>{OPENING_HOURS.FRIDAY}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Saturday</span>
                    <span>{OPENING_HOURS.SATURDAY}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold">Sunday</span>
                    <span>{OPENING_HOURS.SUNDAY}</span>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-brand-pink p-6 rounded-lg">
                <p className="text-brand-dark font-semibold">
                  💡 Tip: Order via WhatsApp for faster service!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
