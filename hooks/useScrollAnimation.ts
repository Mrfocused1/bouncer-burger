'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom hook for triggering animations when elements scroll into view
 * Uses Intersection Observer API for performance
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Element is visible
          entry.target.setAttribute('data-animate', 'true')
          hasAnimated.current = true
          // Optional: Stop observing after animation
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return ref
}

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY
        const elementTop = ref.current.getBoundingClientRect().top + scrollY
        const distance = scrollY - elementTop
        const yTranslate = distance * speed

        ref.current.style.transform = `translateY(${yTranslate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

/**
 * Hook for fade-in effect on scroll with customizable distance
 */
export const useFadeInOnScroll = (distance = 100) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - distance) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      } else {
        element.style.opacity = '0'
        element.style.transform = `translateY(${distance}px)`
      }
    }

    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
    element.style.opacity = '0'
    element.style.transform = `translateY(${distance}px)`

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Call once to check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [distance])

  return ref
}

/**
 * Hook to detect if element is in viewport
 */
export const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.current = true
      }
    }, {
      threshold: 0.1,
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return [ref, isVisible.current] as const
}
