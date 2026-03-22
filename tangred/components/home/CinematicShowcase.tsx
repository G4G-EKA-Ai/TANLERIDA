import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { featuredProducts } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'

const showcasedProducts = featuredProducts.slice(0, 4)
const spotlightProduct = showcasedProducts[0]
const supportingProducts = showcasedProducts.slice(1)
const featuredCategories = Array.from(
  new Map(showcasedProducts.map((product) => [product.category.id, product.category])).values()
)

const averageLeadTimeDays =
  showcasedProducts.reduce((total, product) => total + product.leadTimeDays, 0) / Math.max(showcasedProducts.length, 1)

const metrics = [
  { value: `${showcasedProducts.length}`, label: 'featured picks' },
  { value: `${featuredCategories.length}`, label: 'editorial categories' },
  { value: `${Math.round(averageLeadTimeDays)} days`, label: 'average lead time' },
]

export function CinematicShowcase() {
  if (!spotlightProduct) {
    return null
  }

  const spotlightImage = spotlightProduct.images.find((image) => image.isPrimary) ?? spotlightProduct.images[0]
  const spotlightPrice = spotlightProduct.discountPrice ?? spotlightProduct.basePrice

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,57,43,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(191,160,122,0.12),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 font-label text-[11px] tracking-[0.4em] text-[#C0392B]">FEATURED EDIT</p>
            <h2 className="max-w-3xl font-heading text-[36px] leading-[1.02] text-white md:text-[52px]">
              A cinematic spotlight for Tangred&apos;s most decisive leather pieces.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#B3B3B3] md:text-base">
            Built with the dramatic hierarchy, layered imagery, and stacked discovery patterns of streaming-style merchandising while staying grounded in Tangred&apos;s catalog and brand voice.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
          <article className="group relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#141414] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            {spotlightImage ? (
              <Image
                src={spotlightImage.url}
                alt={spotlightImage.altText ?? spotlightProduct.name}
                fill
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1280px) 100vw, 70vw"
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_10%,rgba(0,0,0,0.58)_48%,rgba(0,0,0,0.36)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.28)_40%,rgba(0,0,0,0.92)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-sm">
                  <span className="font-label text-[10px] tracking-[0.35em] text-[#C0392B]">Spotlight</span>
                  <span className="h-1 w-1 rounded-full bg-white/50" />
                  <span className="text-xs uppercase tracking-[0.28em] text-[#E5E5E5]">{spotlightProduct.category.name}</span>
                </div>

                <h3 className="max-w-xl font-display text-[44px] leading-[0.94] text-white md:text-[62px] lg:text-[76px]">
                  {spotlightProduct.name}
                </h3>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#D1D5DB] md:text-lg">
                  {spotlightProduct.longDesc}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {featuredCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm transition hover:bg-white/16 hover:text-white"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/products/${spotlightProduct.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
                  >
                    <Play size={18} fill="currentColor" />
                    Shop featured piece
                  </Link>
                  <Link
                    href="/tan-lerida"
                    className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    <Sparkles size={18} />
                    Get AI styling help
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px]">
                  <div className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-sm sm:col-span-3">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#B3B3B3]">Starting at</p>
                    <div className="mt-2 flex items-end gap-3">
                      <p className="font-display text-3xl text-white md:text-4xl">{formatPrice(spotlightPrice)}</p>
                      {spotlightProduct.discountPrice ? (
                        <p className="pb-1 text-sm text-[#A0A0A0] line-through">{formatPrice(spotlightProduct.basePrice)}</p>
                      ) : null}
                    </div>
                  </div>
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-white md:text-3xl">{metric.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#B3B3B3]">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#141414] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/30 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#B3B3B3]">Continue exploring</p>
                <p className="mt-1 text-lg font-semibold text-white">More from the Tangred edit</p>
              </div>
              <Link
                href="/products"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C0392B] text-white shadow-[0_12px_32px_rgba(192,57,43,0.35)] transition hover:bg-[#E74C3C]"
                aria-label="Browse all products"
              >
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid gap-4">
              {supportingProducts.map((product) => {
                const image = product.images.find((item) => item.isPrimary) ?? product.images[0]
                const price = product.discountPrice ?? product.basePrice

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative min-h-[168px] overflow-hidden rounded-3xl border border-white/10"
                  >
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText ?? product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 1280px) 100vw, 30vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.44)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.76)_100%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-5">
                      <div className="mb-3 inline-flex w-fit rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#E5E5E5]">
                        {product.category.name}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
                      <p className="mt-2 max-w-[22rem] text-sm leading-6 text-[#D1D5DB]">{product.description}</p>
                      <p className="mt-4 font-display text-2xl text-white">{formatPrice(price)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
