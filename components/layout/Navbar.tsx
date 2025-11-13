'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useLoading } from '@/components/providers/LoadingProvider'

export default function Navbar() {
  const { isLoading } = useLoading()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide navbar on mobile during loading screen
  if (isLoading) {
    return <nav className="hidden md:block" />
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 pointer-events-auto ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 md:h-20">

          {/* Mobile Logo - Hidden on desktop */}
          <Link href="/" className="md:hidden absolute left-4 flex items-center">
            <img
              src="/images/AHKII burger logo.svg"
              alt="AHKII Burger Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="font-rockstone font-black tracking-tighter text-sm hover:text-brand-pink transition-colors uppercase"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="font-rockstone font-black tracking-tighter text-sm hover:text-brand-pink transition-colors uppercase"
            >
              Menu
            </Link>
            <Link href="/" className="flex items-center px-2">
              <img
                src="/images/AHKII burger logo.svg"
                alt="AHKII Burger Logo"
                className="h-12 w-auto"
              />
            </Link>
            <Link
              href="/about"
              className="font-rockstone font-black tracking-tighter text-sm hover:text-brand-pink transition-colors uppercase"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-rockstone font-black tracking-tighter text-sm hover:text-brand-pink transition-colors uppercase"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button + Mobile Menu */}
          <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center space-x-4">
            <Link href="/menu">
              <Button
                variant="cta"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Order Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
