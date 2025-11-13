'use client'

import { MenuItem as MenuItemType } from '@/data/menu'
import MenuItem from '@/components/menu/MenuItem'
import { motion } from 'framer-motion'

interface MenuSectionProps {
  title: string
  icon?: string
  items: MenuItemType[]
}

export default function MenuSection({ title, icon, items }: MenuSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section className="relative mb-20 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-4xl sm:text-5xl font-rockstone font-bold text-brand-dark mb-2">
          {icon} {title}
        </h2>
        <div className="w-20 h-1 bg-brand-dark rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item, index) => (
          <MenuItem key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  )
}
