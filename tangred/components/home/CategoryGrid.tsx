import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/catalog'

export function CategoryGrid() {
  const editorialCategories = categories.filter((category) => ['office-bags', 'belts', 'jackets'].includes(category.slug))

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-16">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">COLLECTIONS</p>
          <h2 className="font-heading text-[36px] md:text-[48px]">Editorial Categories</h2>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {editorialCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative block min-h-[420px] overflow-hidden border border-[#2A2A2A]"
          >
            <Image src={category.imageUrl ?? ''} alt={category.name} fill className="object-cover transition-luxury group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 border border-transparent transition-luxury group-hover:border-[#C0392B]" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#BFA07A]">Tangred Category</p>
              <h3 className="font-display text-4xl leading-none text-white md:text-5xl">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
