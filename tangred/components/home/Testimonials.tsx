import { Star } from 'lucide-react'
import { testimonials } from '@/lib/catalog'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-16">
      <div className="mb-10">
        <p className="mb-4 font-label text-[11px] tracking-[0.35em] text-[#C0392B]">CLIENT NOTES</p>
        <h2 className="font-heading text-[36px] md:text-[48px]">What Tangred Clients Say</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="border border-[#2A2A2A] bg-[#111111] p-8">
            <div className="mb-5 flex gap-1 text-[#C0392B]">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="font-display text-2xl leading-snug text-[#F5F5F5]">“{testimonial.quote}”</p>
            <div className="mt-8 text-sm uppercase tracking-[0.18em] text-[#A0A0A0]">
              {testimonial.name} · {testimonial.city}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
