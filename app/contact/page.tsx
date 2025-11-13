import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ContactForm from '@/components/contact/ContactForm'
import { RESTAURANT_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Contact ${RESTAURANT_NAME} - Share Your Feedback`,
  description: `Get in touch with ${RESTAURANT_NAME}. We're testing a pop-up in London and want your feedback. Tell us what you think!`,
  openGraph: {
    title: `Contact ${RESTAURANT_NAME} - We Want Your Feedback`,
    description: `Help us decide the future of ${RESTAURANT_NAME}. Share your feedback about our pop-up store testing in London.`,
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main>
      {/* Full CTA Section with Dark Background */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-brand-dark to-brand-dark/90 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-rockstone font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                We&apos;re testing a pop-up store in London and want your feedback! Share your thoughts on our burgers, let us know about your experience, or tell us if you&apos;d support a permanent location. Your input matters!
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <a
                    href="mailto:logosbola@gmail.com"
                    className="text-brand-pink hover:text-white transition-colors underline"
                  >
                    logosbola@gmail.com
                  </a>
                </div>

                {/* Response Time */}
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <p className="text-sm text-white/90">
                    We typically respond to all inquiries within 24 hours during business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="flex justify-center lg:justify-end">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
