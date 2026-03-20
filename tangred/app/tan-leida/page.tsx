import Link from 'next/link'
import { Crown } from 'lucide-react'
import { tanLeidaFaqs, tanLeidaSteps } from '@/lib/catalog'

export default function TanLeidaPage() {
  return (
    <div className="pb-20 pt-24">
      <section className="relative overflow-hidden border-b border-[#2A2A2A] px-6 py-24 md:px-10 lg:px-16">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 75% 30%, rgba(192,57,43,0.16), transparent 28%), linear-gradient(135deg, #0A0A0A, #130b09)' }} />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#C0392B]"><Crown size={18} /><span className="font-label text-[11px] tracking-[0.35em]">TAN LEIDA™</span></div>
            <h1 className="mt-6 font-display text-[52px] leading-none md:text-[76px]">Your AI Master Tailor</h1>
            <p className="mt-6 max-w-2xl text-lg text-[#A0A0A0]">A premium consultation flow that reads your photographs, understands your wardrobe needs, and recommends the Tangred piece that will wear most convincingly on you.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/tan-leida/payment" className="btn-red">Begin Consultation</Link>
              <div className="border border-[#2A2A2A] bg-[#111111] px-6 py-4 text-sm text-[#A0A0A0]">One-time fee. Lifetime session ID.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">HOW IT WORKS</p>
            <h2 className="mt-4 font-heading text-[40px] md:text-[52px]">A Four-Step Bespoke Flow</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tanLeidaSteps.map((step, index) => (
            <article key={step.id} className="border border-[#2A2A2A] bg-[#111111] p-6">
              <p className="font-mono-tan text-sm text-[#BFA07A]">0{index + 1}</p>
              <h3 className="mt-4 font-heading text-2xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
        <div className="border border-[#C0392B] bg-[#111111] p-8 md:p-10">
          <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">PRICING</p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-[56px] leading-none text-[#C0392B]">₹99 + GST</p>
              <p className="mt-4 text-[#A0A0A0]">One-time fee. Lifetime session ID.</p>
            </div>
            <Link href="/tan-leida/payment" className="btn-red">Unlock Tan Leida™</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">FAQ</p>
        <div className="mt-8 space-y-4">
          {tanLeidaFaqs.map((faq) => (
            <article key={faq.question} className="border border-[#2A2A2A] bg-[#111111] p-6">
              <h3 className="font-heading text-2xl">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[#A0A0A0]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
