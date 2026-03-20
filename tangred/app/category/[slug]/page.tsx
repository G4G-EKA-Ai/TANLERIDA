import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/catalog'
import { ProductCard } from '@/components/product/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">CATEGORY</p>
      <h1 className="mt-4 font-heading text-[44px] md:text-[60px]">{category.name}</h1>
      <p className="mt-4 max-w-2xl text-[#A0A0A0]">{category.description}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
