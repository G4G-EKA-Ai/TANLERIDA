'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDown, Crown, Heart, Search, ShoppingBag, User } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'Collections', href: '/products' },
  { label: 'Leather Goods', href: '/products' },
  { label: 'Our Craft', href: '/#craft' },
  { label: 'Tan Leida™', href: '/tan-leida', special: true },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session } = useSession()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const toggleCart = useCartStore((state) => state.toggleCart)
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-luxury ${
          scrolled ? 'border-b border-[#2A2A2A] bg-[rgba(10,10,10,0.95)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:h-20 md:px-10 lg:px-16">
          <Link href="/" className="font-display text-2xl tracking-[0.2em] text-[#F5F5F5] md:text-[28px]">
            TANGRED
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative text-[13px] uppercase tracking-[0.15em] transition-luxury ${
                    link.special ? 'nav-glow text-[#F5F5F5]' : 'text-[#A0A0A0] hover:text-[#F5F5F5]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-5">
            <button type="button" className="hidden p-1 text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5] md:flex" aria-label="Search">
              <Search size={18} />
            </button>
            <Link href="/account" className="hidden p-1 text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5] md:flex" aria-label="Wishlist">
              <Heart size={18} />
            </Link>
            <button type="button" onClick={toggleCart} className="relative p-1 text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]" aria-label="Cart">
              <ShoppingBag size={18} />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C0392B] text-[9px] text-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              ) : null}
            </button>

            {session ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((value) => !value)}
                  className="flex items-center gap-2 text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111111]">
                    <User size={14} />
                  </div>
                  <ChevronDown size={12} className={userMenuOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>
                <AnimatePresence>
                  {userMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-3 w-56 border border-[#2A2A2A] bg-[#111111] shadow-2xl"
                    >
                      <div className="border-b border-[#2A2A2A] p-4 text-xs text-[#A0A0A0]">{session.user?.email}</div>
                      <div className="py-2">
                        {[
                          { label: 'My Account', href: '/account' },
                          { label: 'My Orders', href: '/orders' },
                          { label: 'Saved Addresses', href: '/account/addresses' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#A0A0A0] transition-luxury hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href="/account/tan-leida"
                          className="flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#C0392B] transition-luxury hover:bg-[#1A1A1A]"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Crown size={12} />
                          Tan Leida™
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            signOut()
                            setUserMenuOpen(false)
                          }}
                          className="mt-2 w-full border-t border-[#2A2A2A] px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#A0A0A0] transition-luxury hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="hidden md:inline-flex btn-ghost text-xs">
                Login
              </Link>
            )}

            <button type="button" onClick={toggleMobileMenu} className="flex flex-col gap-[5px] p-1 lg:hidden" aria-label="Open menu">
              <span className={`block h-px w-6 bg-[#F5F5F5] transition-luxury ${isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block h-px w-6 bg-[#F5F5F5] transition-luxury ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-[#F5F5F5] transition-luxury ${isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu />
    </>
  )
}
