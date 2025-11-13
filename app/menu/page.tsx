'use client'

import type { Metadata } from 'next'
import { useState, useMemo } from 'react'
import Container from '@/components/ui/Container'
import MenuFilter from '@/components/menu/MenuFilter'
import MenuItem from '@/components/menu/MenuItem'
import { getMenuByCategory } from '@/data/menu'
import { MenuItem as MenuItemType } from '@/data/menu'
import { HALAL_MESSAGE } from '@/lib/constants'

// Note: Metadata should be in a separate layout file for client components
// export const metadata: Metadata = {
//   title: 'Menu | Ahkii Burger',
//   description: 'Explore our full menu of premium burgers, sides, and drinks. Fresh ingredients, signature sauces, and bold flavours.',
//   keywords: 'burger menu, London burgers, premium burgers, burger prices',
// }

export default function MenuPage() {
  const burgers = getMenuByCategory('burger')
  const sides = getMenuByCategory('sides')
  const drinks = getMenuByCategory('drinks')
  const allItems = [...burgers, ...sides, ...drinks]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let result = allItems

    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [allItems, searchQuery, selectedCategory])

  return (
    <main className="pt-24 pb-20">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-rockstone font-bold text-brand-dark mb-6">
            OUR MENU
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our signature burgers available during this limited pop-up test in London. Choose from our collection, add sides, and let us know what you think!
          </p>
          <div className="inline-block bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
            <p className="text-sm font-semibold text-green-800">{HALAL_MESSAGE}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <MenuFilter
          items={allItems}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <MenuItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* No results message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No items found. Try a different search.</p>
          </div>
        )}
      </Container>
    </main>
  )
}
