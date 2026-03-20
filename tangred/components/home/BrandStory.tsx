import Image from 'next/image'

export function BrandStory() {
  return (
    <section id="craft" className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
      <div className="relative min-h-[420px] overflow-hidden border border-[#2A2A2A]">
        <Image
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Tangred leather craftsmanship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">OUR CRAFT</p>
        <h2 className="font-heading text-[36px] leading-[1.05] md:text-[48px]">Born in India. Built for Ambition.</h2>
        <div className="my-8 h-px w-24 bg-[#C0392B]" />
        <div className="space-y-5 text-base text-[#A0A0A0] md:text-lg">
          <p>
            Tangred is shaped for India’s new luxury class: leaders, founders, counsel, and creators who want pieces with gravitas rather than noise.
          </p>
          <p>
            Each silhouette is cut in small batches, crafted by leather artisans, and finished with a disciplined eye for proportion, texture, and longevity.
          </p>
          <p>
            The result is a digital maison for premium Indian leather goods — and Tan Leida extends that maison into a personal consultation experience.
          </p>
        </div>
      </div>
    </section>
  )
}
