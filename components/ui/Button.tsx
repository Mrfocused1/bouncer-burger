'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

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
  const baseStyles = 'font-montserrat font-bold rounded-lg cursor-pointer inline-flex items-center justify-center whitespace-nowrap'

  const variants_map = {
    primary: 'bg-brand-dark text-white hover:bg-opacity-90',
    secondary: 'bg-brand-pink text-brand-dark hover:bg-opacity-90',
    outline: 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white',
    cta: 'font-rockstone font-black tracking-tighter bg-brand-pink text-brand-dark hover:bg-opacity-90 uppercase',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants_map[variant]} ${sizes[size]} ${className}`

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
      scale: 0.95,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: { duration: 0.1 }
    }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {children}
    </motion.button>
  )
}
