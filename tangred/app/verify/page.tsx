export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-md border border-[#2A2A2A] bg-[#111111] p-8 text-center">
        <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">EMAIL VERIFICATION</p>
        <h1 className="mt-4 font-heading text-3xl">Enter Your OTP</h1>
        <p className="mt-4 text-sm text-[#A0A0A0]">A Resend-powered verification code would be sent here in the production flow.</p>
        <input className="input-luxury mt-8 text-center tracking-[0.5em]" placeholder="123456" />
        <button type="button" className="btn-primary mt-6 w-full">Verify & Continue</button>
      </div>
    </div>
  )
}
