import Link from 'next/link'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20">
      <Container className="text-center">
        <div className="space-y-6">
          <h1 className="text-7xl sm:text-8xl font-rockstone font-bold text-brand-dark">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-rockstone font-bold text-brand-dark">
            Burger Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have been devoured. Let&apos;s get you back to ordering some delicious burgers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href="/menu" variant="secondary" size="lg">
              View Menu
            </Button>
          </div>
        </div>
      </Container>
    </main>
  )
}
