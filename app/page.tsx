import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedBurgers from '@/components/home/FeaturedBurgers'
import About from '@/components/home/About'

export const metadata: Metadata = {
  title: 'Ahkii Burger | Testing a Pop-Up Store in London',
  description: 'Fresh, juicy, messy burgers made with real flavour. We\'re testing a pop-up store in London and want to know if you\'d support us. Help us decide!',
  keywords: 'burger, London, street food, pop-up store, startup, test',
  openGraph: {
    title: 'Ahkii Burger | Fresh Burgers, Limited Time Pop-Up',
    description: 'Fresh. Juicy. Messy. We\'re testing a pop-up location in London. Want to help us decide if we should stay?',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedBurgers />
      <About />
    </main>
  )
}
