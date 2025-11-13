'use client'

import { MenuItem as MenuItemType } from '@/data/menu'

interface MenuFilterProps {
  items: MenuItemType[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function MenuFilter({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: MenuFilterProps) {
  const categories = [
    { id: 'burger', label: 'Burgers' },
    { id: 'sides', label: 'Sides' },
    { id: 'drinks', label: 'Drinks' },
  ]

  // Calculate filtered count for display
  let filteredCount = items.length

  if (selectedCategory) {
    filteredCount = items.filter(item => item.category === selectedCategory).length
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredCount = items.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    ).length
  }

  if (selectedCategory && searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredCount = items.filter(
      item =>
        item.category === selectedCategory &&
        (item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query))
    ).length
  }

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-pink transition-colors"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-6 py-2 font-bold rounded-full whitespace-nowrap transition-all ${
            selectedCategory === null
              ? 'bg-brand-pink text-brand-dark'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-2 font-bold rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-brand-pink text-brand-dark'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {filteredCount > 0 && (
        <p className="text-sm text-gray-600">
          Showing {filteredCount} item{filteredCount !== 1 ? 's' : ''}
        </p>
      )}
      {filteredCount === 0 && searchQuery && (
        <p className="text-sm text-red-600">
          No items found matching &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  )
}
