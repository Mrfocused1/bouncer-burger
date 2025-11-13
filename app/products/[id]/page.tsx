import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { getMenuItemById, MENU_ITEMS } from '@/data/menu'
import ProductDetail from '@/components/products/ProductDetail'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = getMenuItemById(params.id)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: `${product.name} | Ahkii Burger`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getMenuItemById(params.id)

  if (!product) {
    return (
      <main className="pt-24 pb-20 min-h-screen">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-4xl font-rockstone font-bold text-brand-dark mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/menu">
              <Button variant="primary" size="lg">
                Back to Menu
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  // Get related products (same category)
  const relatedProducts = MENU_ITEMS.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 3)

  return (
    <main className="pt-24 pb-20">
      <Container>
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </Container>
    </main>
  )
}
