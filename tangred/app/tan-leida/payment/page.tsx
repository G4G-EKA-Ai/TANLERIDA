import Link from 'next/link'

export default function TanLeidaPaymentPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 md:px-10">
      <div className="border border-[#2A2A2A] bg-[#111111] p-8 md:p-10">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">TAN LEIDA PAYMENT</p>
        <h1 className="mt-4 font-heading text-[42px] md:text-[56px]">Unlock Your Consultation</h1>
        <p className="mt-5 max-w-2xl text-[#A0A0A0]">Authenticate the client, create a Razorpay order, issue a Tangred session code in the format TL-XXXXXXXX, then redirect into the multi-step wizard.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-[#2A2A2A] p-5"><p className="text-sm text-[#A0A0A0]">Base Price</p><p className="mt-2 font-display text-3xl">₹99</p></div>
          <div className="border border-[#2A2A2A] p-5"><p className="text-sm text-[#A0A0A0]">GST</p><p className="mt-2 font-display text-3xl">₹17.82</p></div>
          <div className="border border-[#C0392B] p-5"><p className="text-sm text-[#A0A0A0]">Total</p><p className="mt-2 font-display text-3xl text-[#C0392B]">₹116.82</p></div>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button type="button" className="btn-red">Pay Securely with Razorpay</button>
          <Link href="/account/tan-leida/session/session-1" className="btn-ghost">View Sample Session</Link>
        </div>
      </div>
    </div>
  )
}
