'use client'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingProvider from '@/components/providers/LoadingProvider'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Ahkii Burger | Premium Burgers in London',
  description: 'Fresh, juicy, messy burgers made with real flavour. Born in London. Built on flavour. Order now from Ahkii Burger.',
  keywords: 'burger, London, street food, fast food, premium burgers',
  openGraph: {
    title: 'Ahkii Burger | Burgers That Hit Different',
    description: 'Fresh. Juicy. Messy. Made with real flavour.',
    type: 'website',
    locale: 'en_GB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" className={`${montserrat.variable} overflow-x-hidden`}>
      <body className="font-montserrat overflow-x-hidden">
        <LoadingProvider>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <ScrollToTop />
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  )
}

