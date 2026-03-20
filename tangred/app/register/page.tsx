import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-2xl border border-[#2A2A2A] bg-[#111111] p-8">
        <h1 className="font-heading text-4xl">Create Your Tangred Account</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <input className="input-luxury" placeholder="Full name" />
          <input className="input-luxury" placeholder="Email address" />
          <input className="input-luxury" placeholder="Phone number (optional)" />
          <input className="input-luxury" placeholder="Password" type="password" />
          <input className="input-luxury md:col-span-2" placeholder="Confirm password" type="password" />
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm text-[#A0A0A0]">
          <input type="checkbox" className="accent-[#C0392B]" /> I agree to Tangred&apos;s terms and privacy policy.
        </label>
        <button type="button" className="btn-red mt-8">Create Account</button>
        <p className="mt-5 text-sm text-[#A0A0A0]">Already registered? <Link href="/login" className="text-[#F5F5F5]">Sign in</Link></p>
      </div>
    </div>
  )
}
