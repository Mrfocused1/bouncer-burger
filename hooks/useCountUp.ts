'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(targetValue: number, duration: number = 2000) {
  const [displayValue, setDisplayValue] = useState(0)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (hasStartedRef.current) return

    hasStartedRef.current = true
    const startTime = Date.now()
    const startValue = 0

    const updateValue = () => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      }
    }

    requestAnimationFrame(updateValue)
  }, [targetValue, duration])

  return displayValue
}
