'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

const RECENT_PRODUCT_CUTOFF = new Date('2026-02-03T00:00:00.000Z').getTime()

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary)?.url ?? product.images[0]?.url
  const price = product.discountPrice ?? product.basePrice
  const hasDiscount = typeof product.discountPrice === 'number'
  const addItem = useCartStore((state) => state.addItem)
  const showNotification = useUIStore((state) => state.showNotification)

  const isNew = new Date(product.createdAt).getTime() >= RECENT_PRODUCT_CUTOFF

  return (
    <article className={`product-card group relative flex h-full flex-col ${className}`}>
      {(product.isFeatured || isNew) && (
        <div className="absolute left-3 top-3 z-10">
          <span className={isNew ? 'badge-red' : 'badge-gold'}>{isNew ? 'New Arrival' : 'Bestseller'}</span>
        </div>
      )}

      <button
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-[#2A2A2A] bg-[#0A0A0A]/70 text-[#A0A0A0] opacity-0 backdrop-blur-sm transition-luxury group-hover:opacity-100 hover:text-[#C0392B]"
        aria-label="Save to wishlist"
        type="button"
      >
        <Heart size={14} />
      </button>

      <Link href={`/products/${product.slug}`} className="block overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            width={900}
            height={1125}
            className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#111111]">
            <ShoppingBag size={42} className="text-[#2A2A2A]" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#A0A0A0]">{product.material}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg text-[#F5F5F5] transition-luxury hover:text-[#C0392B]">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-[#A0A0A0]">{product.description}</p>

        <div className="mt-4 flex items-end gap-3">
          <p className="font-display text-2xl text-[#C0392B]">{formatPrice(price)}</p>
          {hasDiscount ? <p className="text-sm text-[#A0A0A0] line-through">{formatPrice(product.basePrice)}</p> : null}
        </div>

        <button
          className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#2A2A2A] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#F5F5F5] opacity-0 transition-luxury group-hover:opacity-100 hover:border-[#C0392B] hover:bg-[#C0392B] hover:text-white"
          type="button"
          onClick={() => {
            addItem(product)
            showNotification(`${product.name} added to your bag.`, 'success')
          }}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]" style={{ borderRadius: '2px' }}>
      <div className="skeleton" style={{ aspectRatio: '4 / 5' }} />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-5 w-40" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-6 w-28" />
      </div>
    </div>
  )
}
