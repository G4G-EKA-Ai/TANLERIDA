'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  unstable_retry: unstableRetry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] font-body text-[#F5F5F5] antialiased">
        <div className="flex min-h-screen items-center justify-center px-6 text-center">
          <div className="max-w-xl border border-[#2A2A2A] bg-[#111111] p-10">
            <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">APPLICATION ERROR</p>
            <h1 className="mt-4 font-heading text-4xl">Something interrupted the Tangred experience.</h1>
            <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">
              Please retry the view. If the issue persists, review your environment keys or database connectivity.
            </p>
            <button type="button" className="btn-red mt-8" onClick={unstableRetry}>Try again</button>
          </div>
        </div>
      </body>
    </html>
  )
}
