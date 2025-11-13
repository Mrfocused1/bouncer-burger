import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ImageReveal from '@/components/ui/ImageReveal'
import { RESTAURANT_NAME, SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: `About ${RESTAURANT_NAME} - Testing a Pop-Up in London`,
  description: `Learn about ${RESTAURANT_NAME}, a startup testing a burger pop-up in London. We're testing our concept and want to know if you'd support a permanent location.`,
  openGraph: {
    title: `About ${RESTAURANT_NAME} - Our Story`,
    description: `${RESTAURANT_NAME} is testing a limited pop-up in London. Fresh burgers, your feedback drives our future. Help us decide!`,
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-brand-pink/10 to-transparent">
        <Container>
          <div className="max-w-3xl">
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-6 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* First Image - Mobile First */}
            <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden shadow-xl order-first lg:order-last">
              <img
                src="/images/team/ahki team.png"
                alt="AHKII Burger Team"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 lg:space-y-6">
              <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark">
                The Beginning
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {RESTAURANT_NAME} started with a simple idea: create incredible burgers using fresh, quality ingredients. Now we&apos;re taking a big step—testing a pop-up store in London to see if there&apos;s demand for a permanent {RESTAURANT_NAME} location.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe great burgers come from great ingredients and genuine care. Every burger is hand-crafted fresh to order with locally-sourced toppings and premium beef. We want your feedback on this test run.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your support during this pop-up phase will directly influence whether {RESTAURANT_NAME} becomes a permanent fixture in London. If you love what we&apos;re doing, let us know—help us decide to stay!
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark mb-2">
              Meet the Team
            </h2>
            <div className="w-20 h-1 bg-brand-dark rounded-full" />
          </div>

          <div className="space-y-4 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Behind every great burger is a passionate team dedicated to excellence. Our crew combines culinary expertise with genuine care for every customer.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From our kitchen to your plate, every person on the {RESTAURANT_NAME} team shares a commitment to quality and customer satisfaction.
            </p>
          </div>

          {/* Team Gallery - Image Reveal */}
          <div className="flex justify-center">
            <ImageReveal
              leftImage="/images/team/ahki team 4.png"
              middleImage="/images/team/ahki team 3.png"
              rightImage="/images/team/team.png"
            />
          </div>
        </Container>
      </section>

      {/* Shop Sign Section */}
      <section className="py-8 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Shop Sign Image */}
            <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/team/ahki shop sign.png"
                alt="AHKII Burger Shop Sign"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark">
                Find Us During Our Pop-Up
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We&apos;re testing a limited pop-up location in London right now. Visit us during our testing phase to try our hand-crafted burgers and share your feedback about what you think.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every order counts. Your support and feedback during this pop-up phase will help us decide whether to open a permanent {RESTAURANT_NAME} location in London. Come see what we&apos;re all about!
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We appreciate every customer who stops by. Your input matters—it will directly influence our decision to stay in London long-term.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-brand-dark to-brand-dark/90 text-white">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-rockstone font-bold mb-6">
              Help Us Decide Our Future
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Visit our pop-up store during this test phase and try {RESTAURANT_NAME}. Your feedback and support will help us decide whether to open a permanent location in London. We want to hear what you think!
            </p>
            <div>
              <a href="#contact" className="block w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get In Touch
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
