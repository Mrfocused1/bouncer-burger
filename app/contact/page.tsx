'use client'

import Container from '@/components/ui/Container'
import ContactForm from '@/components/contact/ContactForm'
import { RESTAURANT_NAME } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 },
    },
  }

  return (
    <main>
      {/* Full CTA Section with Dark Background */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-brand-dark to-brand-dark/90 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={headingVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-rockstone font-bold mb-6"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                variants={textVariants}
                className="text-lg text-white/90 mb-8 leading-relaxed"
              >
                We&apos;re testing a pop-up store in London and want your feedback! Share your thoughts on our burgers, let us know about your experience, or tell us if you&apos;d support a permanent location. Your input matters!
              </motion.p>

              {/* Contact Information */}
              <motion.div variants={containerVariants} className="space-y-4">
                {/* Email */}
                <motion.div variants={textVariants}>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <a
                    href="mailto:logosbola@gmail.com"
                    className="text-brand-pink hover:text-white transition-colors underline"
                  >
                    logosbola@gmail.com
                  </a>
                </motion.div>

                {/* Response Time */}
                <motion.div
                  variants={textVariants}
                  className="bg-white/10 p-4 rounded-lg border border-white/20"
                >
                  <p className="text-sm text-white/90">
                    We typically respond to all inquiries within 24 hours during business hours.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <ContactForm />
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  )
}
