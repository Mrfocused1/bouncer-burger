'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function LoadingDemoPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Show for 5 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleRestart = () => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }

  return (
    <main className="min-h-screen bg-brand-pink flex flex-col items-center justify-center">
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-rockstone font-black text-brand-dark">
            Loading Complete!
          </h1>
          <p className="text-lg text-brand-dark max-w-xl">
            Your burgers are ready to be served. Click the button below to see the animation again.
          </p>
          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-brand-dark text-white font-bold rounded-full hover:bg-opacity-90 transition-all"
          >
            Show Loading Screen Again
          </button>
        </div>
      )}
    </main>
  )
}
