import { accountAddresses, products } from '@/lib/catalog'
import { calculateGST, formatPrice } from '@/lib/format'

const checkoutItems = [products[0], products[2]]
const subtotal = checkoutItems.reduce((sum, item) => sum + (item.discountPrice ?? item.basePrice), 0)
const gst = calculateGST(subtotal)
const total = subtotal + gst
const receiptReference = `TAN-DEMO-${subtotal.toString(36).toUpperCase()}`

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <h1 className="font-heading text-[42px] md:text-[56px]">Checkout</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <section className="space-y-8">
          <div className="border border-[#2A2A2A] bg-[#111111] p-6">
            <h2 className="font-label text-xs tracking-[0.28em] text-[#F5F5F5]">ADDRESS</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {accountAddresses.map((address) => (
                <article key={address.id} className={`border p-4 ${address.isDefault ? 'border-[#C0392B]' : 'border-[#2A2A2A]'}`}>
                  <p className="font-label text-xs tracking-[0.2em] text-[#F5F5F5]">{address.label}</p>
                  <p className="mt-3 text-sm leading-7 text-[#A0A0A0]">{address.line1}<br />{address.line2 ? <>{address.line2}<br /></> : null}{address.city}, {address.state} {address.pincode}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="border border-[#2A2A2A] bg-[#111111] p-6">
            <h2 className="font-label text-xs tracking-[0.28em] text-[#F5F5F5]">PAYMENT</h2>
            <div className="mt-5 space-y-4 text-sm text-[#A0A0A0]">
              <p>Razorpay order creation is wired through the server route so UPI, cards, and net banking can be initiated with Tangred&apos;s crimson checkout theme.</p>
              <div className="border border-[#2A2A2A] bg-black/20 p-4 font-mono-tan text-xs text-[#BFA07A]">
                Receipt: {receiptReference}
              </div>
              <button type="button" className="btn-red text-xs">Pay Securely with Razorpay</button>
            </div>
          </div>
        </section>
        <aside className="h-fit border border-[#2A2A2A] bg-[#111111] p-6">
          <h2 className="font-label text-xs tracking-[0.28em] text-[#F5F5F5]">ORDER SUMMARY</h2>
          <div className="mt-5 space-y-4 border-b border-[#2A2A2A] pb-5">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm text-[#A0A0A0]">
                <span>{item.name}</span>
                <span>{formatPrice(item.discountPrice ?? item.basePrice)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 text-sm text-[#A0A0A0]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>GST (18%)</span><span>{formatPrice(gst)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-[#BFA07A]">Included</span></div>
            <div className="flex justify-between border-t border-[#2A2A2A] pt-3 text-[#F5F5F5]"><span>Total</span><span className="font-display text-2xl text-[#C0392B]">{formatPrice(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
