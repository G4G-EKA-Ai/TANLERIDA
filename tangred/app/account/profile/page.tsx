export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 md:px-10">
      <h1 className="font-heading text-[42px]">Profile</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input className="input-luxury" defaultValue="Arjun Mehta" />
        <input className="input-luxury" defaultValue="arjun@tangred.in" />
        <input className="input-luxury" defaultValue="+91 98765 43210" />
        <input className="input-luxury" defaultValue="New Delhi" />
      </div>
      <button type="button" className="btn-primary mt-8">Save Changes</button>
    </div>
  )
}
