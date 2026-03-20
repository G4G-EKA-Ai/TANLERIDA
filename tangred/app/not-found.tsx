import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 text-center">
      <div className="max-w-xl border border-[#2A2A2A] bg-[#111111] p-10">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">404</p>
        <h1 className="mt-4 font-heading text-4xl">This page slipped out of the atelier.</h1>
        <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">The route you requested could not be found. Return to the Tangred storefront or explore Tan Leida from the main collection.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/products" className="btn-ghost">Browse products</Link>
        </div>
      </div>
    </div>
  )
}
