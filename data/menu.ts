export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  crossSectionImage?: string
  transparentImage?: string
  category: 'burger' | 'sides' | 'drinks'
  spicy?: boolean
  vegetarian?: boolean
  vegan?: boolean
}

export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'classic',
    name: 'The Ahkii Classic',
    description: 'Angus beef patty, cheese, Ahkii sauce, lettuce, tomato, onions',
    price: 11.99,
    image: '/images/burgers/classic.jpg',
    crossSectionImage: '/images/burgers/classic-cross.jpg',
    transparentImage: '/images/burgers/burger-transparent-2.png',
    category: 'burger',
  },
  {
    id: 'double-trouble',
    name: 'The Double Trouble',
    description: 'Double patty, double cheese, caramelised onions',
    price: 13.99,
    image: '/images/burgers/double-trouble.jpg',
    crossSectionImage: '/images/burgers/double-trouble-cross.jpg',
    transparentImage: '/images/burgers/burger-transparent-1.png',
    category: 'burger',
  },
  {
    id: 'heatwave',
    name: 'The Heatwave',
    description: 'Jalapeños, spicy Ahkii sauce, pepperjack cheese, crispy onions',
    price: 12.99,
    image: '/images/burgers/heatwave.jpg',
    crossSectionImage: '/images/burgers/heatwave-cross.jpg',
    category: 'burger',
    spicy: true,
  },
  {
    id: 'bbq-stack',
    name: 'The BBQ Stack',
    description: 'Angus patty, smoky BBQ sauce, crispy onions, cheddar cheese',
    price: 12.49,
    image: '/images/burgers/bbq-stack.jpg',
    crossSectionImage: '/images/burgers/bbq-stack-cross.jpg',
    category: 'burger',
  },
  {
    id: 'melt',
    name: 'The Melt',
    description: 'Angus patty smothered in cheese sauce, pickles, Ahkii sauce',
    price: 12.99,
    image: '/images/burgers/melt.jpg',
    crossSectionImage: '/images/burgers/melt-cross.jpg',
    category: 'burger',
  },
  {
    id: 'veggie-way',
    name: 'The Veggie Way',
    description: 'Grilled plant-based patty, vegan cheese, lettuce, tomato, Ahkii sauce',
    price: 11.99,
    image: '/images/burgers/veggie.jpg',
    crossSectionImage: '/images/burgers/veggie-cross.jpg',
    category: 'burger',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'special',
    name: 'The Ahkii Special',
    description: 'Signature sauce, crispy fried onions, melted cheese blend',
    price: 12.99,
    image: '/images/burgers/special.jpg',
    crossSectionImage: '/images/burgers/special-cross.jpg',
    transparentImage: '/images/burgers/burger-transparent-3.png',
    category: 'burger',
  },
  {
    id: 'truffle-boss',
    name: 'The Truffle Boss',
    description: 'Angus patty, truffle mayo, caramelised onions, Swiss cheese',
    price: 13.99,
    image: '/images/burgers/truffle.jpg',
    crossSectionImage: '/images/burgers/truffle-cross.jpg',
    category: 'burger',
  },
  {
    id: 'sweet-spicy',
    name: 'The Sweet & Spicy',
    description: 'Hot honey glaze, jalapeños, cheddar, Ahkii sauce',
    price: 12.99,
    image: '/images/burgers/sweet-spicy.jpg',
    crossSectionImage: '/images/burgers/sweet-spicy-cross.jpg',
    category: 'burger',
    spicy: true,
  },
  {
    id: 'blue-smoke',
    name: 'The Blue Smoke',
    description: 'Blue cheese, crispy onions, BBQ glaze',
    price: 13.49,
    image: '/images/burgers/blue-smoke.jpg',
    crossSectionImage: '/images/burgers/blue-smoke-cross.jpg',
    category: 'burger',
  },

  // SIDES
  {
    id: 'fries-regular',
    name: 'Regular Fries',
    description: 'Crispy golden fries seasoned to perfection',
    price: 3.99,
    image: '/images/sides/fries.jpg',
    category: 'sides',
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    description: 'Fries topped with melted cheese and Ahkii sauce',
    price: 5.49,
    image: '/images/sides/loaded-fries.jpg',
    category: 'sides',
  },
  {
    id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    description: 'Sweet potato fries with a crispy exterior',
    price: 4.49,
    image: '/images/sides/sweet-potato-fries.jpg',
    category: 'sides',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Golden fried onion rings, crispy and delicious',
    price: 4.49,
    image: '/images/sides/onion-rings.jpg',
    category: 'sides',
    vegetarian: true,
  },
  {
    id: 'mozz-sticks',
    name: 'Mozz Sticks (5 pcs)',
    description: 'Deep-fried mozzarella sticks with a crispy coating',
    price: 5.49,
    image: '/images/sides/mozz-sticks.jpg',
    category: 'sides',
    vegetarian: true,
  },

  // DRINKS
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Ice-cold Coca-Cola, 330ml',
    price: 2.49,
    image: '/images/drinks/coca-cola.jpg',
    category: 'drinks',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'sprite',
    name: 'Sprite',
    description: 'Refreshing Sprite, 330ml',
    price: 2.49,
    image: '/images/drinks/sprite.jpg',
    category: 'drinks',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'fanta',
    name: 'Fanta',
    description: 'Fanta assorted flavours, 330ml',
    price: 2.49,
    image: '/images/drinks/fanta.jpg',
    category: 'drinks',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'water-still',
    name: 'Still Water',
    description: 'Pure still water, 500ml',
    price: 1.99,
    image: '/images/drinks/water-still.jpg',
    category: 'drinks',
    vegetarian: true,
    vegan: true,
  },
  {
    id: 'water-sparkling',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling water, 500ml',
    price: 2.29,
    image: '/images/drinks/water-sparkling.jpg',
    category: 'drinks',
    vegetarian: true,
    vegan: true,
  },
]

export function getMenuByCategory(category: 'burger' | 'sides' | 'drinks') {
  return MENU_ITEMS.filter(item => item.category === category)
}

export function getMenuItemById(id: string) {
  return MENU_ITEMS.find(item => item.id === id)
}
