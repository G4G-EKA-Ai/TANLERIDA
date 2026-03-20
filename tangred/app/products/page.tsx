import Link from 'next/link'
import { filterGroups, products } from '@/lib/catalog'
import { ProductCard } from '@/components/product/ProductCard'
import { formatPrice } from '@/lib/format'

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <div className="mb-10 flex flex-col gap-4 border-b border-[#2A2A2A] pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">LEATHER GOODS</p>
          <h1 className="font-heading text-[42px] leading-none md:text-[56px]">Tangred Collection</h1>
          <p className="mt-4 max-w-2xl text-[#A0A0A0]">Luxury leather essentials for work, travel, and ceremonial dressing — built with Indian craft and editorial restraint.</p>
        </div>
        <div className="flex gap-3 text-xs uppercase tracking-[0.16em] text-[#A0A0A0]">
          {filterGroups.sorts.map((sort) => (
            <span key={sort.value} className={`border px-3 py-2 ${sort.value === 'newest' ? 'border-[#C0392B] text-[#F5F5F5]' : 'border-[#2A2A2A]'}`}>
              {sort.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-8 border border-[#2A2A2A] bg-[#111111] p-6 h-fit">
          <section>
            <h2 className="mb-4 font-label text-xs tracking-[0.28em] text-[#F5F5F5]">Category</h2>
            <div className="space-y-2 text-sm text-[#A0A0A0]">
              {['Office Bags', 'Belts', 'Jackets', 'Wallets', 'Briefcases', 'Accessories'].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[#1E1E1E] pb-2">
                  <span>{item}</span>
                  <span>+</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 font-label text-xs tracking-[0.28em] text-[#F5F5F5]">Price Range</h2>
            <div className="space-y-3 text-sm text-[#A0A0A0]">
              <div className="h-1 bg-[#2A2A2A]"><div className="h-full w-2/3 bg-[#C0392B]" /></div>
              <div className="flex justify-between">
                <span>{formatPrice(129900)}</span>
                <span>{formatPrice(2499900)}</span>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 font-label text-xs tracking-[0.28em] text-[#F5F5F5]">Material</h2>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.15em] text-[#A0A0A0]">
              {filterGroups.materials.map((material) => (
                <span key={material} className="border border-[#2A2A2A] px-3 py-2">{material}</span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 font-label text-xs tracking-[0.28em] text-[#F5F5F5]">Colour</h2>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.15em] text-[#A0A0A0]">
              {filterGroups.colours.map((colour) => (
                <span key={colour} className="border border-[#2A2A2A] px-3 py-2">{colour}</span>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <div className="mb-6 flex items-center justify-between text-sm text-[#A0A0A0]">
            <p>Showing {products.length} premium pieces</p>
            <Link href="/tan-leida" className="text-[#C0392B]">Need help choosing? Meet Tan Leida™</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-3 text-xs uppercase tracking-[0.18em]">
            <span className="border border-[#C0392B] px-4 py-3 text-white">1</span>
            <span className="border border-[#2A2A2A] px-4 py-3 text-[#A0A0A0]">2</span>
            <span className="border border-[#2A2A2A] px-4 py-3 text-[#A0A0A0]">3</span>
          </div>
        </section>
      </div>
    </div>
  )
}
