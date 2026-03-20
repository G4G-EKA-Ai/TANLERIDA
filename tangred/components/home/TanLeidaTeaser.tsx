import Link from 'next/link'

const features = ['📸 Upload Your Photos', '🎨 AI Style Analysis', '✨ See Yourself in Tangred']

export function TanLeidaTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-[#2A2A2A] bg-[#111111] px-6 py-20 md:px-10 lg:px-16">
      <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(192,57,43,0.16) 0%, transparent 55%)' }} />
      <div className="relative mx-auto max-w-[1100px] text-center">
        <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">FLAGSHIP EXPERIENCE</p>
        <h2 className="font-display text-[42px] leading-none md:text-[56px]">Your Personal Master Tailor. Now Digital.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#A0A0A0] md:text-lg">
          Tan Leida studies your profile, interprets your wardrobe intent, matches you to Tangred’s catalogue, and presents your most flattering leather recommendation.
        </p>
        <Link href="/tan-leida/payment" className="btn-red mt-10">
          Begin Your Consultation — ₹99
        </Link>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {features.map((feature) => (
            <span key={feature} className="border border-[#2A2A2A] bg-black/30 px-4 py-2 text-sm text-[#F5F5F5]">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
