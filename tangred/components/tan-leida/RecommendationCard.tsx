'use client'

import { formatPrice } from '@/lib/format'
import type { Product } from '@/types'

export function RecommendationCard({ product, narrative, estimatedDelivery }: { product: Product; narrative: string; estimatedDelivery?: string | null }) {
  return (
    <div className="border border-[#2A2A2A] bg-[#111111] p-6">
      <p className="font-label text-xs tracking-[0.25em] text-[#C0392B]">TAN LEIDA RECOMMENDS</p>
      <h2 className="mt-4 font-heading text-3xl">{product.name}</h2>
      <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">{narrative}</p>
      <p className="mt-4 font-display text-3xl text-[#C0392B]">{formatPrice(product.discountPrice ?? product.basePrice)}</p>
      <p className="mt-2 text-sm text-[#BFA07A]">{estimatedDelivery}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="btn-primary">Add to Cart</button>
        <button type="button" className="btn-ghost">Save to Profile</button>
      </div>
    </div>
  )
}
