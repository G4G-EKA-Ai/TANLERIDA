'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatPrice } from '@/lib/format'
import { TAN_LEIDA_TOTAL_PAISE } from '@/lib/utils/currency'

export default function TanLeidaPaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function startSession() {
    setLoading(true)
    const response = await fetch('/api/tan-leida/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: true, moderationAccepted: true }),
    })
    const data = await response.json()
    setLoading(false)

    if (data.success) {
      router.push(`/account/tan-leida/session/${data.session.id}`)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 md:px-10">
      <div className="border border-[#2A2A2A] bg-[#111111] p-8 md:p-10">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">TAN LEIDA PAYMENT</p>
        <h1 className="mt-4 font-heading text-[42px] md:text-[56px]">Unlock Your Consultation</h1>
        <p className="mt-5 max-w-2xl text-[#A0A0A0]">Consent to likeness-based image generation, confirm your premium styling session, and enter the multi-step Tan Leida wizard with persisted status polling.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-[#2A2A2A] p-5"><p className="text-sm text-[#A0A0A0]">Base Price</p><p className="mt-2 font-display text-3xl">₹99.00</p></div>
          <div className="border border-[#2A2A2A] p-5"><p className="text-sm text-[#A0A0A0]">GST</p><p className="mt-2 font-display text-3xl">₹17.82</p></div>
          <div className="border border-[#C0392B] p-5"><p className="text-sm text-[#A0A0A0]">Total</p><p className="mt-2 font-display text-3xl text-[#C0392B]">{formatPrice(TAN_LEIDA_TOTAL_PAISE)}</p></div>
        </div>
        <div className="mt-8 rounded-sm border border-[#2A2A2A] bg-black/20 p-4 text-sm text-[#A0A0A0]">
          By continuing, you confirm you have explicit consent to use uploaded likenesses for styling analysis and generated visual outputs.
        </div>
        <button type="button" className="btn-red mt-8" onClick={startSession} disabled={loading}>
          {loading ? 'Creating session…' : 'Proceed with Tan Leida™'}
        </button>
      </div>
    </div>
  )
}
