import Link from 'next/link'
import { Crown } from 'lucide-react'
import { accountOrders, tanLeidaSessions } from '@/lib/catalog'
import { formatDate } from '@/lib/format'

const navItems = [
  { label: 'My Profile', href: '/account/profile' },
  { label: 'My Orders', href: '/orders' },
  { label: 'My Wishlist', href: '/account/wishlist' },
  { label: 'Saved Addresses', href: '/account/addresses' },
  { label: 'Tan Leida™', href: '/account/tan-leida', special: true },
]

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit border border-[#2A2A2A] bg-[#111111] p-6">
          <h1 className="font-heading text-3xl">My Account</h1>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={`flex items-center gap-3 border px-4 py-3 text-sm uppercase tracking-[0.16em] ${item.special ? 'border-[#C0392B] text-[#C0392B]' : 'border-[#2A2A2A] text-[#A0A0A0]'}`}>
                {item.special ? <Crown size={14} /> : null}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="space-y-6">
          <div className="border border-[#2A2A2A] bg-[#111111] p-6">
            <p className="font-label text-xs tracking-[0.3em] text-[#C0392B]">ACCOUNT SNAPSHOT</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="border border-[#2A2A2A] p-4"><p className="text-sm text-[#A0A0A0]">Orders</p><p className="mt-2 font-display text-4xl">{accountOrders.length}</p></div>
              <div className="border border-[#2A2A2A] p-4"><p className="text-sm text-[#A0A0A0]">Tan Leida Sessions</p><p className="mt-2 font-display text-4xl">{tanLeidaSessions.length}</p></div>
              <div className="border border-[#2A2A2A] p-4"><p className="text-sm text-[#A0A0A0]">Latest Session</p><p className="mt-2 font-mono-tan text-xl text-[#BFA07A]">{tanLeidaSessions[0]?.sessionCode}</p></div>
            </div>
          </div>
          <div className="border border-[#2A2A2A] bg-[#111111] p-6">
            <h2 className="font-heading text-3xl">Recent Activity</h2>
            <div className="mt-5 space-y-4">
              {accountOrders.map((order) => (
                <div key={order.id} className="flex flex-col gap-2 border-b border-[#1F1F1F] pb-4 text-sm text-[#A0A0A0] md:flex-row md:items-center md:justify-between">
                  <span>{order.orderNumber} · {order.status}</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
