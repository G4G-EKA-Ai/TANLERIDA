import Link from 'next/link'
import { Crown } from 'lucide-react'
import { tanLeidaSessions } from '@/lib/catalog'
import { formatDate } from '@/lib/format'

export default function AccountTanLeidaPage() {
  const unlocked = true

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10">
      <div className="flex items-center gap-3">
        <Crown size={22} className="text-[#C0392B]" />
        <h1 className="font-heading text-[42px]">Tan Leida™ Hub</h1>
      </div>
      {!unlocked ? (
        <div className="mt-8 border border-[#C0392B] bg-[#111111] p-8">
          <p className="font-display text-3xl">Unlock your personal AI tailor for ₹99</p>
          <Link href="/tan-leida/payment" className="btn-red mt-6">Unlock Tan Leida™</Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="border border-[#2A2A2A] bg-[#111111] p-6">
              <p className="font-label text-xs tracking-[0.3em] text-[#C0392B]">YOUR TAN LEIDA ID</p>
              <p className="mt-4 font-mono-tan text-3xl text-[#BFA07A]">TL-AB3K7M2P</p>
              <p className="mt-3 text-sm text-[#A0A0A0]">Lifetime access enabled. Start a new consultation any time you need a fresh recommendation.</p>
            </div>
            <div className="border border-[#2A2A2A] bg-[#111111] p-6">
              <p className="font-label text-xs tracking-[0.3em] text-[#F5F5F5]">NEXT STEP</p>
              <Link href="/tan-leida/payment" className="btn-outline mt-6">Start New Session</Link>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {tanLeidaSessions.map((session) => (
              <article key={session.id} className="border border-[#2A2A2A] bg-[#111111] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-mono-tan text-lg text-[#BFA07A]">{session.sessionCode}</p>
                    <p className="mt-2 text-sm text-[#A0A0A0]">Created {formatDate(session.createdAt)} · {session.status}</p>
                  </div>
                  <Link href={`/account/tan-leida/session/${session.id}`} className="btn-ghost text-xs">Open Session</Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
