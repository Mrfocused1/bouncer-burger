import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  rel?: string
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  rel,
}: ButtonProps) {
  const baseStyles = 'font-montserrat font-bold rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 inline-flex items-center justify-center whitespace-nowrap'

  const variants = {
    primary: 'bg-brand-dark text-white hover:bg-opacity-90 hover:shadow-lg',
    secondary: 'bg-brand-pink text-brand-dark hover:bg-opacity-90 hover:shadow-lg',
    outline: 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white',
    cta: 'font-rockstone font-black tracking-tighter bg-brand-pink text-brand-dark hover:bg-opacity-90 hover:shadow-lg uppercase',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  )
}
