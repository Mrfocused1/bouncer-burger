import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        hover ? 'transition-all duration-300 hover:shadow-xl hover:scale-105' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
