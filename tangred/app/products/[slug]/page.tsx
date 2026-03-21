import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, Minus, Plus, Truck } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, products } from '@/lib/catalog'
import { formatDeliveryWindow, formatPrice } from '@/lib/format'
import { ProductCard } from '@/components/product/ProductCard'

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product)
  const primaryImage = product.images.find((image) => image.isPrimary)?.url ?? product.images[0]?.url

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden border border-[#2A2A2A] bg-[#111111]">
            {primaryImage ? <Image src={primaryImage} alt={product.name} fill className="object-cover" /> : null}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.map((image) => (
              <div key={image.id} className="relative aspect-[4/5] overflow-hidden border border-[#2A2A2A] bg-[#111111]">
                <Image src={image.url} alt={image.altText ?? product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#A0A0A0]">Leather Goods &gt; {product.category.name}</p>
          <h1 className="mt-4 font-heading text-[40px] leading-none md:text-[52px]">{product.name}</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[#A0A0A0]">{product.material} | {product.origin}</p>
          <p className="mt-6 font-display text-[38px] text-[#C0392B]">{formatPrice(product.discountPrice ?? product.basePrice)}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-[#A0A0A0]"><Truck size={16} className="text-[#BFA07A]" /> {formatDeliveryWindow(product.leadTimeDays)}</div>
          <p className="mt-6 max-w-xl text-[#A0A0A0]">{product.longDesc}</p>

          <div className="mt-8 space-y-6 border-y border-[#2A2A2A] py-8">
            <div>
              <p className="mb-3 font-label text-xs tracking-[0.25em] text-[#F5F5F5]">Colour / Size</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <span key={variant.id} className="border border-[#2A2A2A] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#A0A0A0]">
                    {[variant.color, variant.size].filter(Boolean).join(' · ')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-label text-xs tracking-[0.25em] text-[#F5F5F5]">Quantity</p>
              <div className="inline-flex items-center border border-[#2A2A2A]">
                <button type="button" className="flex h-11 w-11 items-center justify-center text-[#A0A0A0]"><Minus size={14} /></button>
                <span className="w-12 text-center text-sm">1</span>
                <button type="button" className="flex h-11 w-11 items-center justify-center text-[#A0A0A0]"><Plus size={14} /></button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button type="button" className="btn-primary flex-1">Add to Cart</button>
            <button type="button" className="btn-ghost flex items-center justify-center gap-2 px-6"><Heart size={16} /> Add to Wishlist</button>
          </div>

          <div className="mt-10 space-y-5">
            {[
              ['Product Description', product.description],
              ['Dimensions & Specs', 'Fits up to 15-inch laptop where applicable, premium metal hardware, reinforced lining, and handcrafted edge finishing.'],
              ['Care Instructions', 'Condition leather periodically, avoid direct moisture, and store in the provided dust bag when not in use.'],
              ['Shipping & Returns', 'Made-to-order timelines vary by piece. Returns accepted only for damaged or incorrectly fulfilled orders.'],
            ].map(([label, content]) => (
              <div key={label} className="border border-[#2A2A2A] bg-[#111111] p-5">
                <h2 className="font-label text-xs tracking-[0.25em] text-[#F5F5F5]">{label}</h2>
                <p className="mt-3 text-sm leading-7 text-[#A0A0A0]">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-[34px]">You May Also Like</h2>
          <Link href="/tan-lerida" className="text-sm uppercase tracking-[0.16em] text-[#C0392B]">Consult Tan Lerida™</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}
