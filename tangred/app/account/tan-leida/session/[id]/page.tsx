import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products, tanLeidaSessions } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'

export default async function TanLeidaSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = tanLeidaSessions.find((entry) => entry.id === id)

  if (!session) notFound()

  const recommended = products.find((product) => product.id === session.recommendedProductId)
  const alternatives = products.filter((product) => (session.recommendation?.alternatives as string[] | undefined)?.includes(product.slug))

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">YOUR SESSION: {session.sessionCode}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[620px] overflow-hidden border border-[#2A2A2A] bg-[#111111]">
          {session.generatedImageUrl ? <Image src={session.generatedImageUrl} alt="Tan Leida generated outfit" fill className="object-cover" /> : null}
        </div>
        <div>
          <h1 className="font-heading text-[42px] md:text-[56px]">Tan Leida Recommends</h1>
          <p className="mt-5 text-[#A0A0A0]">{String(session.recommendation?.narrative ?? '')}</p>
          {recommended ? (
            <div className="mt-8 border border-[#2A2A2A] bg-[#111111] p-6">
              <p className="font-label text-xs tracking-[0.25em] text-[#C0392B]">PRIMARY MATCH</p>
              <h2 className="mt-4 font-heading text-3xl">{recommended.name}</h2>
              <p className="mt-3 text-sm text-[#A0A0A0]">{recommended.description}</p>
              <p className="mt-4 font-display text-3xl text-[#C0392B]">{formatPrice(recommended.discountPrice ?? recommended.basePrice)}</p>
              <p className="mt-3 text-sm text-[#BFA07A]">{session.estimatedDelivery}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-primary">Add to Cart</button>
                <button type="button" className="btn-ghost">Save to My Tangred Profile</button>
              </div>
            </div>
          ) : null}
          <div className="mt-8">
            <p className="font-label text-xs tracking-[0.25em] text-[#F5F5F5]">ALTERNATIVE RECOMMENDATIONS</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {alternatives.map((alternative) => (
                <article key={alternative.id} className="border border-[#2A2A2A] bg-[#111111] p-5">
                  <h3 className="font-heading text-2xl">{alternative.name}</h3>
                  <p className="mt-2 text-sm text-[#A0A0A0]">{alternative.material}</p>
                  <p className="mt-4 font-display text-2xl text-[#C0392B]">{formatPrice(alternative.discountPrice ?? alternative.basePrice)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
