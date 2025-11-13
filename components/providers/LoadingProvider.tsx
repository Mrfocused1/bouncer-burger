'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'

interface LoadingContextType {
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    return { isLoading: false }
  }
  return context
}

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('ahkii-loading-shown')

    if (hasSeenLoading) {
      // If they've already seen it, skip the loading screen
      setIsLoading(false)
    } else {
      // Show loading screen for 3 seconds on first visit
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('ahkii-loading-shown', 'true')
      }, 3000)

      return () => clearTimeout(loadingTimer)
    }
  }, [isMounted])

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  )
}
