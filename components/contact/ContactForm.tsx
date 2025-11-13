'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full bg-transparent space-y-4">
        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-900 font-medium text-sm">
              Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-white mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full px-4 py-3 text-sm bg-white/95 text-brand-dark border-2 border-transparent rounded-lg focus:outline-none focus:border-brand-pink hover:border-brand-pink transition-colors placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 text-sm bg-white/95 text-brand-dark border-2 border-transparent rounded-lg focus:outline-none focus:border-brand-pink hover:border-brand-pink transition-colors placeholder-gray-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+44 123 456 7890"
            className="w-full px-4 py-3 text-sm bg-white/95 text-brand-dark border-2 border-transparent rounded-lg focus:outline-none focus:border-brand-pink hover:border-brand-pink transition-colors placeholder-gray-400"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-white mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="What is this about?"
            className="w-full px-4 py-3 text-sm bg-white/95 text-brand-dark border-2 border-transparent rounded-lg focus:outline-none focus:border-brand-pink hover:border-brand-pink transition-colors placeholder-gray-400"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-white mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us more about your inquiry..."
            rows={4}
            className="w-full px-4 py-3 text-sm bg-white/95 text-brand-dark border-2 border-transparent rounded-lg focus:outline-none focus:border-brand-pink hover:border-brand-pink transition-colors resize-none placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 text-sm font-rockstone font-black tracking-tighter bg-brand-pink text-green-900 hover:bg-opacity-90 hover:shadow-lg uppercase rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
