import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItemType, Product } from '@/types'

interface CartStore {
  items: CartItemType[]
  isOpen: boolean
  addItem: (product: Product, variantId?: string, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getGST: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variantId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.productId === product.id && item.variantId === variantId
          )

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id && item.variantId === variantId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            }
          }

          const newItem: CartItemType = {
            id: `${product.id}-${variantId ?? 'default'}-${Date.now()}`,
            productId: product.id,
            variantId: variantId ?? null,
            quantity,
            product,
          }

          return { items: [...state.items, newItem], isOpen: true }
        })
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.discountPrice ?? item.product.basePrice
          return sum + price * item.quantity
        }, 0)
      },

      getSubtotal: () => get().getTotalPrice(),

      getGST: () => {
        const subtotal = get().getSubtotal()
        return Math.round(subtotal * 0.18)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const gst = get().getGST()
        return subtotal + gst
      },
    }),
    {
      name: 'tangred-cart',
    }
  )
)
