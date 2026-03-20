import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Office Bags',
    slug: 'office-bags',
    description: 'Structured office carriers for founders and executives.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Belts',
    slug: 'belts',
    description: 'Sharp finishing pieces in premium leather.',
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Jackets',
    slug: 'jackets',
    description: 'Luxury leather outerwear for formal and smart casual wardrobes.',
    imageUrl: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Wallets',
    slug: 'wallets',
    description: 'Refined everyday leather carry essentials.',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Briefcases',
    slug: 'briefcases',
    description: 'Boardroom-grade legal and executive briefcases.',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Compact leather accessories and organisers.',
    imageUrl: 'https://images.unsplash.com/photo-1518544866330-95a4291e6606?auto=format&fit=crop&w=1200&q=80',
  },
] as const


type SeedProduct = {
  name: string
  slug: string
  categorySlug: string
  description: string
  longDesc: string
  basePrice: number
  discountPrice?: number
  sku: string
  stock: number
  isFeatured: boolean
  material: string
  leadTimeDays: number
  images: string[]
  tags: string[]
  variants: Array<{ color?: string; size?: string; finish?: string; stock: number; priceAdj: number }>
}

const products: SeedProduct[] = [
  {
    name: 'Tangred Executive Tote',
    slug: 'tangred-executive-tote',
    categorySlug: 'office-bags',
    description: 'Structured full-grain leather office tote for founders and consultants.',
    longDesc: 'Cut from full-grain leather with a suede-lined interior and disciplined organisation for the modern boardroom.',
    basePrice: 899900,
    discountPrice: 829900,
    sku: 'TAN-OB-0001',
    stock: 6,
    isFeatured: true,
    material: 'Full-grain leather',
    leadTimeDays: 14,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Bestseller', 'Boardroom'],
    variants: [
      { color: 'Onyx', size: '15-inch', finish: 'Matte', stock: 4, priceAdj: 0 },
      { color: 'Mahogany', size: '15-inch', finish: 'Glossy', stock: 2, priceAdj: 20000 },
    ],
  },
  {
    name: 'Tangred Slim Bifold',
    slug: 'tangred-slim-bifold',
    categorySlug: 'wallets',
    description: 'A top-grain bifold with hand-burnished edges and a discreet cash sleeve.',
    longDesc: 'A compact silhouette with six card slots and refined edge finishing for daily carry.',
    basePrice: 249900,
    sku: 'TAN-WA-0002',
    stock: 15,
    isFeatured: false,
    material: 'Top-grain leather',
    leadTimeDays: 7,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Everyday'],
    variants: [{ color: 'Espresso', size: 'Standard', finish: 'Matte', stock: 15, priceAdj: 0 }],
  },
  {
    name: 'The Boardroom Belt',
    slug: 'the-boardroom-belt',
    categorySlug: 'belts',
    description: 'Vegetable-tanned leather with a brushed metal buckle and disciplined edge paint.',
    longDesc: 'Designed to sharpen tailoring and formal separates with a slim premium profile.',
    basePrice: 349900,
    sku: 'TAN-BE-0003',
    stock: 20,
    isFeatured: true,
    material: 'Vegetable-tanned leather',
    leadTimeDays: 10,
    images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=80'],
    tags: ['New Arrival'],
    variants: [
      { color: 'Midnight', size: '32', finish: 'Matte', stock: 8, priceAdj: 0 },
      { color: 'Oxblood', size: '34', finish: 'Glossy', stock: 6, priceAdj: 15000 },
    ],
  },
  {
    name: 'Tangred Moto Jacket',
    slug: 'tangred-moto-jacket',
    categorySlug: 'jackets',
    description: 'Supple nappa leather outerwear cut for a contemporary metropolitan stance.',
    longDesc: 'A sharply balanced leather jacket with a soft structured waist and tonal hardware.',
    basePrice: 2499900,
    sku: 'TAN-JA-0004',
    stock: 4,
    isFeatured: true,
    material: 'Nappa leather',
    leadTimeDays: 21,
    images: ['https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Tan Leida Pick'],
    variants: [
      { color: 'Obsidian', size: 'M', finish: 'Matte', stock: 2, priceAdj: 0 },
      { color: 'Obsidian', size: 'L', finish: 'Matte', stock: 2, priceAdj: 0 },
    ],
  },
  {
    name: 'The Counsel Briefcase',
    slug: 'the-counsel-briefcase',
    categorySlug: 'briefcases',
    description: 'A full-grain cowhide briefcase with document dividers and a courtroom-grade presence.',
    longDesc: 'Reinforced structure, a legal-pad compartment, and detachable shoulder strap for decisive workdays.',
    basePrice: 1499900,
    sku: 'TAN-BR-0005',
    stock: 7,
    isFeatured: false,
    material: 'Full-grain cowhide',
    leadTimeDays: 16,
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Heritage'],
    variants: [{ color: 'Saddle Brown', size: '15-inch', finish: 'Glossy', stock: 7, priceAdj: 0 }],
  },
  {
    name: 'Tangred Card Case',
    slug: 'tangred-card-case',
    categorySlug: 'accessories',
    description: 'A slim calf leather card case for polished everyday carry.',
    longDesc: 'Minimal, tactile, and precise — designed for jacket pockets and disciplined carry.',
    basePrice: 129900,
    sku: 'TAN-AC-0006',
    stock: 24,
    isFeatured: false,
    material: 'Calf leather',
    leadTimeDays: 5,
    images: ['https://images.unsplash.com/photo-1518544866330-95a4291e6606?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Giftable'],
    variants: [{ color: 'Noir', size: 'Standard', finish: 'Matte', stock: 24, priceAdj: 0 }],
  },
  {
    name: 'The Mumbai Weekender',
    slug: 'the-mumbai-weekender',
    categorySlug: 'office-bags',
    description: 'Crazy horse leather travel bag for founders who leave Friday with one decisive bag.',
    longDesc: 'Generous volume, brass hardware, and a detachable shoulder strap for travel with intent.',
    basePrice: 1249900,
    sku: 'TAN-OB-0007',
    stock: 5,
    isFeatured: true,
    material: 'Crazy horse leather',
    leadTimeDays: 18,
    images: ['https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Travel'],
    variants: [{ color: 'Tobacco', size: 'Weekend', finish: 'Distressed', stock: 5, priceAdj: 0 }],
  },
  {
    name: 'Tangred Officer Belt',
    slug: 'tangred-officer-belt',
    categorySlug: 'belts',
    description: 'A versatile genuine leather belt with polished buckle hardware.',
    longDesc: 'A dependable dress belt designed for everyday office wear and understated confidence.',
    basePrice: 299900,
    sku: 'TAN-BE-0008',
    stock: 16,
    isFeatured: false,
    material: 'Genuine leather',
    leadTimeDays: 7,
    images: ['https://images.unsplash.com/photo-1604176424472-9d2b268c5881?auto=format&fit=crop&w=1200&q=80'],
    tags: ['Classic'],
    variants: [{ color: 'Ebony', size: '34', finish: 'Matte', stock: 16, priceAdj: 0 }],
  },
] as const

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  const categoryMap = Object.fromEntries((await prisma.category.findMany()).map((category) => [category.slug, category.id]))

  for (const product of products) {
    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        longDesc: product.longDesc,
        basePrice: product.basePrice,
        discountPrice: product.discountPrice,
        sku: product.sku,
        stock: product.stock,
        isActive: true,
        isFeatured: product.isFeatured,
        categoryId: categoryMap[product.categorySlug],
        material: product.material,
        origin: 'Handcrafted in India',
        leadTimeDays: product.leadTimeDays,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        longDesc: product.longDesc,
        basePrice: product.basePrice,
        discountPrice: product.discountPrice,
        sku: product.sku,
        stock: product.stock,
        isActive: true,
        isFeatured: product.isFeatured,
        categoryId: categoryMap[product.categorySlug],
        material: product.material,
        origin: 'Handcrafted in India',
        leadTimeDays: product.leadTimeDays,
      },
    })

    await prisma.productImage.deleteMany({ where: { productId: record.id } })
    await prisma.productVariant.deleteMany({ where: { productId: record.id } })
    await prisma.productTag.deleteMany({ where: { productId: record.id } })

    await prisma.productImage.createMany({
      data: product.images.map((url, index) => ({
        productId: record.id,
        url,
        altText: product.name,
        isPrimary: index === 0,
        sortOrder: index,
      })),
    })

    await prisma.productVariant.createMany({
      data: product.variants.map((variant) => ({
        productId: record.id,
        ...variant,
      })),
    })

    await prisma.productTag.createMany({
      data: product.tags.map((tag) => ({ productId: record.id, tag })),
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
