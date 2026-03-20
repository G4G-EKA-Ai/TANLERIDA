'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/format'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getGST, getTotal } = useCartStore()

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <h1 className="font-heading text-[42px] md:text-[56px]">Your Cart</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.length ? items.map((item) => {
            const image = item.product.images.find((entry) => entry.isPrimary)?.url ?? item.product.images[0]?.url
            const unitPrice = item.product.discountPrice ?? item.product.basePrice
            return (
              <article key={item.id} className="grid gap-5 border border-[#2A2A2A] bg-[#111111] p-5 md:grid-cols-[120px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden border border-[#2A2A2A]">
                  {image ? <Image src={image} alt={item.product.name} fill className="object-cover" /> : null}
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl">{item.product.name}</h2>
                    <p className="mt-2 text-sm text-[#A0A0A0]">{item.product.material}</p>
                    <p className="mt-3 font-display text-2xl text-[#C0392B]">{formatPrice(unitPrice * item.quantity)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.16em]">
                    <button type="button" className="border border-[#2A2A2A] px-4 py-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" className="border border-[#2A2A2A] px-4 py-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button type="button" className="text-[#A0A0A0]" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </article>
            )
          }) : (
            <div className="border border-[#2A2A2A] bg-[#111111] p-10 text-center text-[#A0A0A0]">Your cart is empty.</div>
          )}
        </div>
        <aside className="h-fit border border-[#2A2A2A] bg-[#111111] p-6">
          <h2 className="font-label text-xs tracking-[0.28em] text-[#F5F5F5]">ORDER SUMMARY</h2>
          <div className="mt-6 space-y-3 text-sm text-[#A0A0A0]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
            <div className="flex justify-between"><span>GST</span><span>{formatPrice(getGST())}</span></div>
            <div className="flex justify-between border-t border-[#2A2A2A] pt-3 text-[#F5F5F5]"><span>Total</span><span className="font-display text-2xl text-[#C0392B]">{formatPrice(getTotal())}</span></div>
          </div>
          <Link href="/checkout" className="btn-red mt-8 flex w-full justify-center text-xs">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  )
}
