'use client'

import { motion } from 'framer-motion'

interface LoadingScreenProps {
  isLoading: boolean
  onComplete?: () => void
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: '100%',
      transition: {
        duration: 3,
        ease: 'easeInOut',
      },
    },
  }

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
      },
    },
  }

  const text = 'AHKIIIIIIIII'

  if (!isLoading) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#1a4d2e' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Animated Text */}
      <motion.div
        className="flex gap-1 mb-12"
        initial="initial"
        animate="animate"
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="font-rockstone font-black text-6xl md:text-7xl text-brand-pink"
            variants={letterVariants}
            transition={{
              delay: index * 0.15,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Loading Progress Bar */}
      <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-brand-pink rounded-full"
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-white/80 font-montserrat font-semibold text-sm tracking-widest uppercase"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        Preparing your burgers
      </motion.p>
    </motion.div>
  )
}
