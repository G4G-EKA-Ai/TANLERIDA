import Link from 'next/link'
import { Crown, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Office Bags', href: '/category/office-bags' },
    { label: 'Belts', href: '/category/belts' },
    { label: 'Jackets', href: '/category/jackets' },
    { label: 'Wallets', href: '/category/wallets' },
  ],
  Support: [
    { label: 'Shipping & Returns', href: '/checkout' },
    { label: 'Care Instructions', href: '/products' },
    { label: 'FAQs', href: '/tan-leida' },
  ],
  Account: [
    { label: 'My Profile', href: '/account/profile' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Tan Leida™', href: '/account/tan-leida' },
  ],
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="border-b border-[#2A2A2A] bg-[#111111] px-6 py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <Crown size={18} className="text-[#C0392B]" />
            <div>
              <p className="font-label text-sm tracking-[0.24em] text-[#F5F5F5]">TAN LEIDA™ — YOUR AI MASTER TAILOR</p>
              <p className="text-xs text-[#A0A0A0]">Personalised styling, recommendation intelligence, and a made-for-you Tangred perspective.</p>
            </div>
          </div>
          <Link href="/tan-leida/payment" className="btn-outline text-xs">
            Begin Consultation — ₹99
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-16">
        <div>
          <Link href="/" className="font-display text-3xl tracking-[0.2em] text-[#F5F5F5]">TANGRED</Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#A0A0A0]">
            A premium Indian leather house for ambitious professionals who prefer presence over spectacle.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Linkedin].map((Icon, index) => (
              <span key={index} className="flex h-10 w-10 items-center justify-center border border-[#2A2A2A] text-[#A0A0A0]">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="mb-5 font-label text-xs tracking-[0.3em] text-[#F5F5F5]">{heading}</h3>
            <ul className="space-y-3 text-sm text-[#A0A0A0]">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-luxury hover:text-[#F5F5F5]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-[#2A2A2A] px-6 py-6 text-xs text-[#A0A0A0] md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <p>© {new Date().getFullYear()} Tangred. Handcrafted in India.</p>
        <div className="flex gap-5">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>GST Ready Billing</span>
        </div>
      </div>
    </footer>
  )
}
