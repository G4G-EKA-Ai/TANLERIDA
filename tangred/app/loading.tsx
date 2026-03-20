export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 text-center">
      <div>
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">TANGRED</p>
        <h1 className="mt-4 font-display text-5xl text-[#F5F5F5]">Preparing your atelier…</h1>
        <div className="mx-auto mt-8 h-px w-32 bg-[#2A2A2A]"><div className="h-full w-1/2 bg-[#C0392B] animate-pulse" /></div>
      </div>
    </div>
  )
}
