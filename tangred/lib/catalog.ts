import type {
  AddressType,
  Category,
  OrderType,
  Product,
  Review,
  TanLeidaSessionType,
  Testimonial,
} from '@/types'

const now = new Date()

function daysAgo(days: number, hours = 0, minutes = 0) {
  const date = new Date(now)
  date.setDate(date.getDate() - days)
  date.setHours(date.getHours() - hours)
  date.setMinutes(date.getMinutes() - minutes)
  return date
}

export const categories: Category[] = [
  {
    id: 'cat-office-bags',
    name: 'Office Bags',
    slug: 'office-bags',
    description: 'Structured leather carriers designed for boardrooms, daily commutes, and long-haul ambition.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-belts',
    name: 'Belts',
    slug: 'belts',
    description: 'Sharp, quietly confident finishing pieces cut from premium hides.',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-jackets',
    name: 'Jackets',
    slug: 'jackets',
    description: 'Architectural outerwear built with supple leather, precise tailoring, and cinematic presence.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-wallets',
    name: 'Wallets',
    slug: 'wallets',
    description: 'Compact leather essentials with refined edge finishing and everyday endurance.',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-briefcases',
    name: 'Briefcases',
    slug: 'briefcases',
    description: 'Legacy pieces for counsel, founders, and executives who travel with intent.',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Card cases, organisers, and finishing details that complete a polished Tangred profile.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  },
]

const reviews: Review[] = [
  {
    id: 'review-1',
    rating: 5,
    title: 'Exceptional finish',
    body: 'The leather smells rich, the stitching is exact, and it feels like it belongs in a legacy wardrobe.',
    isApproved: true,
    createdAt: now,
    user: { name: 'Arjun Mehta' },
  },
  {
    id: 'review-2',
    rating: 5,
    title: 'Worth the wait',
    body: 'Delivery took the promised made-to-order timeline and the final piece looked better than the photographs.',
    isApproved: true,
    createdAt: now,
    user: { name: 'Sanya Rao' },
  },
]

function buildProduct(input: Omit<Product, 'category' | 'categoryId'> & { categorySlug: string }): Product {
  const category = categories.find((item) => item.slug === input.categorySlug)

  if (!category) {
    throw new Error(`Unknown category slug: ${input.categorySlug}`)
  }

  return {
    ...input,
    categoryId: category.id,
    category,
  }
}

export const products: Product[] = [
  buildProduct({
    id: 'prod-executive-tote',
    slug: 'tangred-executive-tote',
    name: 'Tangred Executive Tote',
    description: 'A structured full-grain leather office tote engineered for founders, consultants, and city boardrooms.',
    longDesc:
      'Cut from full-grain leather with a suede-lined interior, the Executive Tote balances a commanding silhouette with soft architectural drape. Inside, a padded 15-inch laptop sleeve, document compartments, and a detachable strap keep the workday disciplined.',
    basePrice: 899900,
    discountPrice: 829900,
    sku: 'TAN-OB-0001',
    stock: 6,
    isActive: true,
    isFeatured: true,
    material: 'Full-grain leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 14,
    createdAt: daysAgo(33),
    updatedAt: now,
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80', altText: 'Tangred Executive Tote', isPrimary: true, sortOrder: 0 },
      { id: 'img-1b', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80', altText: 'Executive Tote side view', isPrimary: false, sortOrder: 1 },
    ],
    variants: [
      { id: 'var-1', color: 'Onyx', size: '15-inch', finish: 'Matte', stock: 4, priceAdj: 0 },
      { id: 'var-2', color: 'Mahogany', size: '15-inch', finish: 'Glossy', stock: 2, priceAdj: 20000 },
    ],
    tags: [{ id: 'tag-1', tag: 'Bestseller' }, { id: 'tag-2', tag: 'Boardroom' }],
    reviews,
    categorySlug: 'office-bags',
  }),
  buildProduct({
    id: 'prod-slim-bifold',
    slug: 'tangred-slim-bifold',
    name: 'Tangred Slim Bifold',
    description: 'A top-grain bifold with hand-burnished edges and a discreet cash sleeve.',
    longDesc: 'A compact silhouette with six card slots, cash sleeve, and subtle hot-stamped branding. Built for daily carry without visual clutter.',
    basePrice: 249900,
    sku: 'TAN-WA-0002',
    stock: 15,
    isActive: true,
    isFeatured: false,
    material: 'Top-grain leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 7,
    createdAt: daysAgo(69),
    updatedAt: now,
    images: [
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80', altText: 'Tangred Slim Bifold wallet', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-3', color: 'Espresso', size: 'Standard', finish: 'Matte', stock: 15, priceAdj: 0 }],
    tags: [{ id: 'tag-3', tag: 'Everyday' }],
    reviews,
    categorySlug: 'wallets',
  }),
  buildProduct({
    id: 'prod-boardroom-belt',
    slug: 'the-boardroom-belt',
    name: 'The Boardroom Belt',
    description: 'Vegetable-tanned leather with a brushed metal buckle and disciplined edge paint.',
    longDesc: 'Designed to sharpen tailoring and formal separates, the Boardroom Belt is cut with a slim profile that complements structured suiting and occasionwear alike.',
    basePrice: 349900,
    sku: 'TAN-BE-0003',
    stock: 20,
    isActive: true,
    isFeatured: true,
    material: 'Vegetable-tanned leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 10,
    createdAt: daysAgo(19),
    updatedAt: now,
    images: [
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=80', altText: 'The Boardroom Belt', isPrimary: true, sortOrder: 0 },
    ],
    variants: [
      { id: 'var-4', color: 'Midnight', size: '32', finish: 'Matte', stock: 8, priceAdj: 0 },
      { id: 'var-5', color: 'Midnight', size: '34', finish: 'Matte', stock: 6, priceAdj: 0 },
      { id: 'var-6', color: 'Oxblood', size: '34', finish: 'Glossy', stock: 6, priceAdj: 15000 },
    ],
    tags: [{ id: 'tag-4', tag: 'New Arrival' }],
    reviews,
    categorySlug: 'belts',
  }),
  buildProduct({
    id: 'prod-moto-jacket',
    slug: 'tangred-moto-jacket',
    name: 'Tangred Moto Jacket',
    description: 'Supple nappa leather outerwear cut for a contemporary metropolitan stance.',
    longDesc: 'The Moto Jacket pairs a clean shoulder line, tonal hardware, and a softly structured waist. It is the Tan Leida answer for evenings, presentations, and high-confidence entrances.',
    basePrice: 2499900,
    sku: 'TAN-JA-0004',
    stock: 4,
    isActive: true,
    isFeatured: true,
    material: 'Nappa leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 21,
    createdAt: daysAgo(20),
    updatedAt: now,
    images: [
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80', altText: 'Tangred Moto Jacket', isPrimary: true, sortOrder: 0 },
    ],
    variants: [
      { id: 'var-7', color: 'Obsidian', size: 'M', finish: 'Matte', stock: 2, priceAdj: 0 },
      { id: 'var-8', color: 'Obsidian', size: 'L', finish: 'Matte', stock: 2, priceAdj: 0 },
    ],
    tags: [{ id: 'tag-5', tag: 'Tan Leida Pick' }],
    reviews,
    categorySlug: 'jackets',
  }),
  buildProduct({
    id: 'prod-counsel-briefcase',
    slug: 'the-counsel-briefcase',
    name: 'The Counsel Briefcase',
    description: 'A full-grain cowhide briefcase with document dividers and a courtroom-grade presence.',
    longDesc: 'With reinforced structure, a central legal-pad compartment, and detachable shoulder strap, the Counsel Briefcase is designed for leaders who move between strategy, travel, and ceremony.',
    basePrice: 1499900,
    sku: 'TAN-BR-0005',
    stock: 7,
    isActive: true,
    isFeatured: false,
    material: 'Full-grain cowhide',
    origin: 'Handcrafted in India',
    leadTimeDays: 16,
    createdAt: daysAgo(54),
    updatedAt: now,
    images: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80', altText: 'The Counsel Briefcase', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-9', color: 'Saddle Brown', size: '15-inch', finish: 'Glossy', stock: 7, priceAdj: 0 }],
    tags: [{ id: 'tag-6', tag: 'Heritage' }],
    reviews,
    categorySlug: 'briefcases',
  }),
  buildProduct({
    id: 'prod-card-case',
    slug: 'tangred-card-case',
    name: 'Tangred Card Case',
    description: 'A slim calf leather card case for polished everyday carry.',
    longDesc: 'Minimal, tactile, and precise. Built to slide into a jacket pocket while carrying the essentials with discipline.',
    basePrice: 129900,
    sku: 'TAN-AC-0006',
    stock: 24,
    isActive: true,
    isFeatured: false,
    material: 'Calf leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 5,
    createdAt: daysAgo(43),
    updatedAt: now,
    images: [
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1518544866330-95a4291e6606?auto=format&fit=crop&w=1200&q=80', altText: 'Tangred Card Case', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-10', color: 'Noir', size: 'Standard', finish: 'Matte', stock: 24, priceAdj: 0 }],
    tags: [{ id: 'tag-7', tag: 'Giftable' }],
    reviews,
    categorySlug: 'accessories',
  }),
  buildProduct({
    id: 'prod-mumbai-weekender',
    slug: 'the-mumbai-weekender',
    name: 'The Mumbai Weekender',
    description: 'Crazy horse leather travel bag for founders who leave Friday with one decisive bag.',
    longDesc: 'Generous volume, brass hardware, and a detachable shoulder strap. Designed for airport lounges, highway retreats, and client dinners away from home.',
    basePrice: 1249900,
    sku: 'TAN-OB-0007',
    stock: 5,
    isActive: true,
    isFeatured: true,
    material: 'Crazy horse leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 18,
    createdAt: daysAgo(8),
    updatedAt: now,
    images: [
      { id: 'img-7', url: 'https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1200&q=80', altText: 'The Mumbai Weekender', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-11', color: 'Tobacco', size: 'Weekend', finish: 'Distressed', stock: 5, priceAdj: 0 }],
    tags: [{ id: 'tag-8', tag: 'Travel' }],
    reviews,
    categorySlug: 'office-bags',
  }),
  buildProduct({
    id: 'prod-officer-belt',
    slug: 'tangred-officer-belt',
    name: 'Tangred Officer Belt',
    description: 'A versatile genuine leather belt with polished buckle hardware.',
    longDesc: 'A dependable dress belt designed for everyday office wear, ceremonial tailoring, and understated confidence.',
    basePrice: 299900,
    sku: 'TAN-BE-0008',
    stock: 16,
    isActive: true,
    isFeatured: false,
    material: 'Genuine leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 7,
    createdAt: daysAgo(61),
    updatedAt: now,
    images: [
      { id: 'img-8', url: 'https://images.unsplash.com/photo-1604176424472-9d2b268c5881?auto=format&fit=crop&w=1200&q=80', altText: 'Tangred Officer Belt', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-12', color: 'Ebony', size: '34', finish: 'Matte', stock: 16, priceAdj: 0 }],
    tags: [{ id: 'tag-9', tag: 'Classic' }],
    reviews,
    categorySlug: 'belts',
  }),
  buildProduct({
    id: 'prod-founder-satchel',
    slug: 'the-founder-satchel',
    name: 'The Founder Satchel',
    description: 'A structured leather satchel with laptop compartment and heritage brass trim.',
    longDesc: 'This silhouette marries old-world formality with startup-era mobility. Carry it crossbody or by the rolled leather handles.',
    basePrice: 1099900,
    sku: 'TAN-OB-0009',
    stock: 8,
    isActive: true,
    isFeatured: false,
    material: 'Pebbled leather',
    origin: 'Handcrafted in India',
    leadTimeDays: 12,
    createdAt: daysAgo(12),
    updatedAt: now,
    images: [
      { id: 'img-9', url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1200&q=80', altText: 'The Founder Satchel', isPrimary: true, sortOrder: 0 },
    ],
    variants: [{ id: 'var-13', color: 'Coal', size: '14-inch', finish: 'Matte', stock: 8, priceAdj: 0 }],
    tags: [{ id: 'tag-10', tag: 'Executive' }],
    reviews,
    categorySlug: 'office-bags',
  }),
]

export const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 4)

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ritika Sharma',
    city: 'New Delhi',
    quote: 'Tan Leida recommended the exact bag silhouette I needed for investor meetings. The result felt tailored, not generic.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Karan Bedi',
    city: 'Mumbai',
    quote: 'The finish of the Counsel Briefcase is remarkable. Every room notices it before I speak.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Ayesha Khan',
    city: 'Bengaluru',
    quote: 'Luxury without noise. The jacket and wallet both feel expensive in the quietest, most confident way.',
    rating: 5,
  },
]

export const accountAddresses: AddressType[] = [
  {
    id: 'addr-1',
    label: 'Primary Residence',
    line1: '22 Golf Links',
    line2: 'Near Lodhi Estate',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Studio Office',
    line1: 'Level 12, Prestige Trade Tower',
    line2: 'Brigade Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: false,
  },
]

export const accountOrders: OrderType[] = [
  {
    id: 'order-1',
    orderNumber: 'TAN-20260312-0042',
    status: 'PROCESSING',
    subtotal: 1099900,
    gst: 197982,
    shippingCharge: 0,
    total: 1297882,
    paidAt: daysAgo(8, -12),
    createdAt: daysAgo(8, -11, -45),
    items: [
      {
        id: 'order-item-1',
        quantity: 1,
        unitPrice: 1099900,
        total: 1099900,
        product: products.find((product) => product.id === 'prod-founder-satchel')!,
      },
    ],
  },
  {
    id: 'order-2',
    orderNumber: 'TAN-20260226-0036',
    status: 'DELIVERED',
    subtotal: 349900,
    gst: 62982,
    shippingCharge: 0,
    total: 412882,
    paidAt: daysAgo(22, -9, -30),
    createdAt: daysAgo(22, -9, -10),
    items: [
      {
        id: 'order-item-2',
        quantity: 1,
        unitPrice: 349900,
        total: 349900,
        product: products.find((product) => product.id === 'prod-boardroom-belt')!,
      },
    ],
  },
]

export const tanLeidaSessions: TanLeidaSessionType[] = [
  {
    id: 'session-1',
    sessionCode: 'TL-AB3K7M2P',
    isPaid: true,
    status: 'RECOMMENDATION_READY',
    userPhotos: {
      casual: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      formal: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      fullBody: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
    },
    bodyProfile: {
      gender: 'Male',
      ageRange: '31-35',
      heightCm: 182,
      bodyBuild: 'Athletic',
      skinTone: 'Warm medium',
      resonance: ['Classic Professional', 'Minimalist'],
    },
    stylePreferences: {
      need: 'Office bag for investor meetings and weekly travel',
      laptop: '15 inch',
      structure: 'Structured',
      budget: '₹10,000 - ₹15,000',
      occasion: 'Quarterly board presentations',
      avoid: 'Bright colours',
    },
    aiAnalysis: {
      bodyShape: 'Rectangle athletic frame',
      undertone: 'Warm neutral',
      styleSensibility: 'Controlled, refined, business formal',
      posture: 'Confident upright stance',
      faceShape: 'Oval',
    },
    recommendation: {
      primaryProductSlug: 'the-founder-satchel',
      visualPrompt: 'Professional Indian male carrying a structured black Tangred satchel, cinematic lighting, luxury editorial photography, dark background.',
      narrative:
        'Your proportions and warm undertone respond particularly well to the disciplined architecture of The Founder Satchel. Its clean, matte leather finish complements a composed professional wardrobe without overpowering it.',
      alternatives: ['tangred-executive-tote', 'the-counsel-briefcase'],
    },
    generatedImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    recommendedProductId: 'prod-founder-satchel',
    estimatedDelivery: 'Ready in 12 working days from today',
    createdAt: daysAgo(2, -8),
  },
]

export const tanLeidaFaqs = [
  {
    question: 'What does the ₹99 + GST consultation include?',
    answer: 'You receive a guided consultation, profile analysis, Tangred product matching, and a generated visual recommendation with pricing and delivery guidance.',
  },
  {
    question: 'How long does the session remain available?',
    answer: 'Your Tan Leida ID remains attached to your account, and each completed session stays accessible from your dashboard for future review.',
  },
  {
    question: 'Do I need to upload all four photos?',
    answer: 'The formal look, everyday look, and full-body shot are strongly recommended. An ethnic look is optional but improves occasion-aware styling.',
  },
  {
    question: 'Can I start a new consultation later?',
    answer: 'Yes. Once access is unlocked, you can initiate additional sessions from your Tan Leida hub and preserve a personal recommendation history.',
  },
]

export const tanLeidaSteps = [
  {
    id: 'step-1',
    title: 'Upload Photos',
    description: 'Share casual, formal, and full-body images so Tan Leida can read silhouette, drape, and personal presence.',
  },
  {
    id: 'step-2',
    title: 'Share Your Profile',
    description: 'Record build, undertone, and preferences to sharpen every recommendation.',
  },
  {
    id: 'step-3',
    title: 'Tell Us Your Need',
    description: 'Describe your use case, budget, and occasion in a conversational consultation.',
  },
  {
    id: 'step-4',
    title: 'See Yourself in Tangred',
    description: 'Receive a personalised narrative, product shortlist, and generated visual direction.',
  },
]

export const filterGroups = {
  materials: ['Full-grain leather', 'Vegetable-tanned leather', 'Nappa leather', 'Calf leather', 'Crazy horse leather'],
  colours: ['Onyx', 'Mahogany', 'Midnight', 'Obsidian', 'Tobacco', 'Coal'],
  sorts: [
    { label: 'Newest', value: 'newest' },
    { label: 'Price ↑', value: 'price-asc' },
    { label: 'Price ↓', value: 'price-desc' },
    { label: 'Bestsellers', value: 'bestsellers' },
  ],
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug?: string) {
  if (!slug) return products
  return products.filter((product) => product.category.slug === slug)
}

export function getRelatedProducts(product: Product) {
  return products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 3)
}
