import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'
import { featuredProducts } from '@/lib/catalog'

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-16">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">THE TANGRED EDIT</p>
          <h2 className="font-heading text-[36px] leading-[1.05] text-[#F5F5F5] md:text-[48px]">
            The Tangred <span className="font-display italic text-[#BFA07A]">Edit</span>
          </h2>
        </div>
        <Link href="/products" className="text-sm uppercase tracking-[0.18em] text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]">
          View all products
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
