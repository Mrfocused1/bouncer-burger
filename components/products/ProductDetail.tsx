'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { MenuItem } from '@/data/menu'

interface ProductDetailProps {
  product: MenuItem
  relatedProducts: MenuItem[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'burger':
        return 'BURGER'
      case 'sides':
        return 'SIDES'
      case 'drinks':
        return 'DRINKS'
      default:
        return 'ITEM'
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        <Link href="/menu" className="text-brand-dark hover:text-brand-pink transition">
          Menu
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="relative h-96 sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
              {product.spicy && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SPICY
                </span>
              )}
              {product.vegetarian && !product.vegan && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  VEGETARIAN
                </span>
              )}
              {product.vegan && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  VEGAN
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between"
        >
          {/* Content */}
          <div>
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-brand-pink text-brand-dark text-sm font-bold rounded-full mb-4">
              {getCategoryLabel(product.category)}
            </span>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-rockstone font-bold text-brand-dark mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-5xl font-bold text-brand-dark">
                £{product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Info Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-brand-dark mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-brand-pink">•</span>
                  <span>Fresh ingredients, made to order</span>
                </li>
                {product.spicy && (
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">•</span>
                    <span>Spicy</span>
                  </li>
                )}
                {product.vegetarian && (
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">•</span>
                    <span>Vegetarian</span>
                  </li>
                )}
                {product.vegan && (
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">•</span>
                    <span>Vegan</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href="/menu" className="w-full block">
              <Button variant="primary" size="lg" className="w-full">
                View Full Menu
              </Button>
            </Link>
            <Link href="/menu" className="w-full block">
              <Button variant="secondary" size="lg" className="w-full">
                Back to Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-rockstone font-bold text-brand-dark mb-2">
              More {product.category}s
            </h2>
            <div className="w-20 h-1 bg-brand-dark rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {relatedProducts.map((relatedItem) => (
              <Link key={relatedItem.id} href={`/products/${relatedItem.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
                >
                  <div className="w-full aspect-square bg-gray-300 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={relatedItem.image}
                      alt={relatedItem.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-brand-dark mb-1">{relatedItem.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{relatedItem.description}</p>
                    <span className="text-xl font-bold text-brand-dark">
                      £{relatedItem.price.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      )}
    </>
  )
}
