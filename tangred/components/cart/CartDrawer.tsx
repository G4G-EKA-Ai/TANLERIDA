'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { CartItemType } from '@/types'
import { formatPrice } from '@/lib/format'

export function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQuantity, getSubtotal, getGST, getTotal } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70" onClick={closeCart} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-0 right-0 top-0 z-[201] flex w-full max-w-md flex-col border-l border-[#2A2A2A] bg-[#111111]"
          >
            <div className="flex items-center justify-between border-b border-[#2A2A2A] px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[#C0392B]" />
                <p className="font-label text-sm tracking-[0.25em]">YOUR BAG</p>
              </div>
              <button type="button" onClick={closeCart} className="text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.length ? (
                items.map((item) => <CartItemCard key={item.id} item={item} removeItem={removeItem} updateQuantity={updateQuantity} />)
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={44} className="text-[#2A2A2A]" />
                  <div>
                    <p className="font-heading text-xl">Your bag is empty</p>
                    <p className="mt-2 text-sm text-[#A0A0A0]">Discover handcrafted leather pieces built for ambition.</p>
                  </div>
                  <Link href="/products" onClick={closeCart} className="btn-red text-xs">
                    Explore Collection
                  </Link>
                </div>
              )}
            </div>

            {items.length ? (
              <div className="border-t border-[#2A2A2A] px-6 py-6">
                <div className="space-y-2 text-sm text-[#A0A0A0]">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
                  <div className="flex justify-between"><span>GST (18%)</span><span>{formatPrice(getGST())}</span></div>
                  <div className="flex justify-between border-t border-[#2A2A2A] pt-3 text-[#F5F5F5]"><span className="font-label text-xs tracking-[0.2em]">TOTAL</span><span className="font-display text-xl text-[#C0392B]">{formatPrice(getTotal())}</span></div>
                </div>
                <Link href="/checkout" onClick={closeCart} className="btn-red mt-5 flex w-full justify-center text-xs">
                  Proceed to Checkout
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function CartItemCard({ item, removeItem, updateQuantity }: { item: CartItemType; removeItem: (id: string) => void; updateQuantity: (id: string, quantity: number) => void }) {
  const image = item.product.images.find((entry) => entry.isPrimary)?.url ?? item.product.images[0]?.url
  const unitPrice = item.product.discountPrice ?? item.product.basePrice

  return (
    <div className="flex gap-4 border-b border-[#2A2A2A] pb-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
        {image ? <Image src={image} alt={item.product.name} fill className="object-cover" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm text-[#F5F5F5]">{item.product.name}</p>
        <p className="mt-1 text-xs text-[#A0A0A0]">{item.product.material}</p>
        <p className="mt-2 font-display text-lg text-[#C0392B]">{formatPrice(unitPrice * item.quantity)}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center border border-[#2A2A2A]">
            <button type="button" className="flex h-8 w-8 items-center justify-center text-[#A0A0A0] transition-luxury hover:bg-[#1A1A1A] hover:text-[#F5F5F5]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs">{item.quantity}</span>
            <button type="button" className="flex h-8 w-8 items-center justify-center text-[#A0A0A0] transition-luxury hover:bg-[#1A1A1A] hover:text-[#F5F5F5]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus size={12} />
            </button>
          </div>
          <button type="button" onClick={() => removeItem(item.id)} className="text-[#A0A0A0] transition-luxury hover:text-[#C0392B]" aria-label="Remove item">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
