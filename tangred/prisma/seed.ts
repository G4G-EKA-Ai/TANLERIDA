// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Office Bags', slug: 'office-bags', description: 'Structured office carriers for founders and executives.' },
    { name: 'Belts', slug: 'belts', description: 'Sharp finishing pieces in premium leather.' },
    { name: 'Jackets', slug: 'jackets', description: 'Luxury leather outerwear for formal and smart casual wardrobes.' },
    { name: 'Wallets', slug: 'wallets', description: 'Refined everyday leather carry essentials.' },
    { name: 'Briefcases', slug: 'briefcases', description: 'Boardroom-grade legal and executive briefcases.' },
    { name: 'Accessories', slug: 'accessories', description: 'Compact leather accessories and organisers.' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  const categoryMap = Object.fromEntries((await prisma.category.findMany()).map((category) => [category.slug, category.id]))

  const products = [
    { name: 'Tangred Executive Tote', slug: 'tangred-executive-tote', categorySlug: 'office-bags', basePrice: 899900, material: 'Full-grain leather', leadTimeDays: 14 },
    { name: 'Tangred Slim Bifold', slug: 'tangred-slim-bifold', categorySlug: 'wallets', basePrice: 249900, material: 'Top-grain leather', leadTimeDays: 7 },
    { name: 'The Boardroom Belt', slug: 'the-boardroom-belt', categorySlug: 'belts', basePrice: 349900, material: 'Vegetable-tanned leather', leadTimeDays: 10 },
    { name: 'Tangred Moto Jacket', slug: 'tangred-moto-jacket', categorySlug: 'jackets', basePrice: 2499900, material: 'Nappa leather', leadTimeDays: 21 },
    { name: 'The Counsel Briefcase', slug: 'the-counsel-briefcase', categorySlug: 'briefcases', basePrice: 1499900, material: 'Full-grain cowhide', leadTimeDays: 16 },
    { name: 'Tangred Card Case', slug: 'tangred-card-case', categorySlug: 'accessories', basePrice: 129900, material: 'Calf leather', leadTimeDays: 5 },
    { name: 'The Mumbai Weekender', slug: 'the-mumbai-weekender', categorySlug: 'office-bags', basePrice: 1249900, material: 'Crazy horse leather', leadTimeDays: 18 },
    { name: 'Tangred Officer Belt', slug: 'tangred-officer-belt', categorySlug: 'belts', basePrice: 299900, material: 'Genuine leather', leadTimeDays: 7 },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: `${product.name} crafted for Tangred's premium catalogue.`,
        basePrice: product.basePrice,
        material: product.material,
        leadTimeDays: product.leadTimeDays,
        categoryId: categoryMap[product.categorySlug],
        sku: `SKU-${product.slug.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 18)}`,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: `${product.name} crafted for Tangred's premium catalogue.`,
        basePrice: product.basePrice,
        sku: `SKU-${product.slug.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 18)}`,
        stock: 10,
        isActive: true,
        isFeatured: ['tangred-executive-tote', 'the-boardroom-belt', 'tangred-moto-jacket', 'the-mumbai-weekender'].includes(product.slug),
        categoryId: categoryMap[product.categorySlug],
        material: product.material,
        origin: 'Handcrafted in India',
        leadTimeDays: product.leadTimeDays,
      },
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
