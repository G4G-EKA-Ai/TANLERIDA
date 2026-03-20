export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-md border border-[#2A2A2A] bg-[#111111] p-8">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">PASSWORD RESET</p>
        <h1 className="mt-4 font-heading text-3xl">Request an OTP</h1>
        <p className="mt-4 text-sm text-[#A0A0A0]">We&apos;ll send a one-time code to your registered email so you can set a new Tangred password securely.</p>
        <div className="mt-8 space-y-4">
          <input className="input-luxury" type="email" placeholder="Email address" />
          <button type="button" className="btn-red w-full">Send reset code</button>
        </div>
      </div>
    </div>
  )
}
