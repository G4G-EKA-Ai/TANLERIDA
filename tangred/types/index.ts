import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    tanLeidaAccess?: boolean
    tanLeidaId?: string | null
  }

  interface Session {
    user: User & {
      id: string
      tanLeidaAccess: boolean
      tanLeidaId: string | null
    }
  }
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDesc?: string | null
  basePrice: number
  discountPrice?: number | null
  sku: string
  stock: number
  isActive: boolean
  isFeatured: boolean
  categoryId: string
  material: string
  origin: string
  leadTimeDays: number
  createdAt: Date
  updatedAt: Date
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: ProductTag[]
  reviews?: Review[]
}

export interface ProductImage {
  id: string
  url: string
  altText?: string | null
  isPrimary: boolean
  sortOrder: number
}

export interface ProductVariant {
  id: string
  color?: string | null
  size?: string | null
  finish?: string | null
  stock: number
  priceAdj: number
}

export interface ProductTag {
  id: string
  tag: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
}

export interface Review {
  id: string
  rating: number
  title?: string | null
  body?: string | null
  isApproved: boolean
  createdAt: Date
  user?: {
    name?: string | null
  }
}

export interface CartItemType {
  id: string
  productId: string
  variantId?: string | null
  quantity: number
  product: Product
}

export interface AddressType {
  id: string
  label: string
  line1: string
  line2?: string | null
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface OrderType {
  id: string
  orderNumber: string
  status: OrderStatus
  subtotal: number
  gst: number
  shippingCharge: number
  total: number
  paidAt?: Date | null
  createdAt: Date
  items: OrderItemType[]
}

export interface OrderItemType {
  id: string
  quantity: number
  unitPrice: number
  total: number
  product: Product
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type TanLeidaStatus =
  | 'INITIATED'
  | 'PHOTOS_UPLOADED'
  | 'PROFILE_COLLECTED'
  | 'ANALYSING'
  | 'RECOMMENDATION_READY'
  | 'COMPLETED'

export interface TanLeidaSessionType {
  id: string
  sessionCode: string
  isPaid: boolean
  status: TanLeidaStatus
  userPhotos?: Record<string, string>
  bodyProfile?: Record<string, unknown>
  stylePreferences?: Record<string, unknown>
  aiAnalysis?: Record<string, unknown>
  recommendation?: Record<string, unknown>
  generatedImageUrl?: string | null
  recommendedProductId?: string | null
  estimatedDelivery?: string | null
  createdAt: Date
}

export interface Testimonial {
  id: string
  name: string
  city: string
  quote: string
  rating: number
}

export type BodyBuild = 'SLIM' | 'ATHLETIC' | 'REGULAR' | 'BROAD' | 'PLUS'
export type SkinTone = 'VERY_FAIR' | 'FAIR' | 'MEDIUM' | 'WHEAT' | 'TAN' | 'DEEP'
export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY'
