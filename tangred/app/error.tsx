'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 text-center">
      <div className="max-w-xl border border-[#2A2A2A] bg-[#111111] p-10">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">APPLICATION ERROR</p>
        <h1 className="mt-4 font-heading text-4xl">Something interrupted the Tangred experience.</h1>
        <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">Please retry the view. If the issue persists, review your environment keys or database connectivity.</p>
        <button type="button" className="btn-red mt-8" onClick={reset}>Try again</button>
      </div>
    </div>
  )
}
