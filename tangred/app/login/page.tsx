import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="w-full max-w-md border border-[#2A2A2A] bg-[#111111] p-8">
        <p className="text-center font-display text-4xl tracking-[0.2em]">TANGRED</p>
        <h1 className="mt-6 font-heading text-3xl text-center">Welcome Back</h1>
        <div className="mt-8 space-y-4">
          <input className="input-luxury" placeholder="Email address" />
          <input className="input-luxury" placeholder="Password" type="password" />
          <button type="button" className="btn-primary w-full">Login</button>
          <button type="button" className="btn-ghost w-full">Continue with Google</button>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-[#A0A0A0]">
          <Link href="/register">Create account</Link>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
