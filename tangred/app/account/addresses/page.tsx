import { accountAddresses } from '@/lib/catalog'

export default function AddressesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:px-10">
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-heading text-[42px]">Saved Addresses</h1>
        <button type="button" className="btn-ghost text-xs">Add New Address</button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {accountAddresses.map((address) => (
          <article key={address.id} className={`border p-6 ${address.isDefault ? 'border-[#C0392B] bg-[#111111]' : 'border-[#2A2A2A] bg-[#111111]'}`}>
            <p className="font-label text-xs tracking-[0.25em] text-[#F5F5F5]">{address.label}</p>
            <p className="mt-4 text-sm leading-7 text-[#A0A0A0]">{address.line1}<br />{address.line2 ? <>{address.line2}<br /></> : null}{address.city}, {address.state} {address.pincode}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
