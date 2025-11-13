'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import {
  RESTAURANT_NAME,
  SOCIAL_LINKS,
} from '@/lib/constants'

export default function Footer() {

  return (
    <footer className="bg-brand-pink text-brand-dark mt-20">
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div className="flex items-start gap-3">
            <img
              src="/images/AHKII burger logo.svg"
              alt="AHKII Burger Logo"
              className="h-12 w-auto flex-shrink-0"
            />
            <p className="text-brand-dark text-xs leading-snug">
              Testing in London. Built on flavour. We want your feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-rockstone font-bold text-sm mb-2">Quick Links</h4>
            <nav className="space-y-1">
              <Link href="/" className="font-bold text-brand-dark hover:text-brand-dark/70 text-xs block">
                Home
              </Link>
              <Link href="/menu" className="font-bold text-brand-dark hover:text-brand-dark/70 text-xs block">
                Menu
              </Link>
              <a href="#about" className="font-bold text-brand-dark hover:text-brand-dark/70 text-xs block">
                About
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="flex items-center justify-start md:justify-end">
            <a
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark hover:text-brand-dark/70 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.011-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-dark/20 pt-4 text-center text-brand-dark text-xs">
          <p>&copy; 2024 {RESTAURANT_NAME}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
