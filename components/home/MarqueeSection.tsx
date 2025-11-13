'use client'

import { MarqueeAnimation } from './MarqueeAnimation'

export default function MarqueeSection() {
  return (
    <>
      {/* First marquee - green background with pink text */}
      <section className="relative py-2 bg-gradient-to-r from-brand-dark via-brand-dark to-brand-dark overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-pink to-transparent"></div>
        </div>

        {/* First marquee content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <MarqueeAnimation
            baseVelocity={5}
            direction="left"
            className="text-brand-pink drop-shadow-lg"
          >
            FRESH • DELICIOUS • PREMIUM • BURGERS
          </MarqueeAnimation>
        </div>
      </section>

      {/* Gap - using background color */}
      <div className="h-4 bg-[#E4E3D9]"></div>

      {/* Second marquee - pink background with green text */}
      <section className="relative py-2 bg-brand-pink overflow-hidden">
        {/* Second marquee content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <MarqueeAnimation
            baseVelocity={5}
            direction="right"
            className="text-brand-dark drop-shadow-lg"
          >
            HAND-CRAFTED • MADE TO ORDER • 100% FRESH BEEF
          </MarqueeAnimation>
        </div>
      </section>
    </>
  )
}
