'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Crown, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'

const navLinks = [
  { label: 'Collections', href: '/products' },
  { label: 'Leather Goods', href: '/products' },
  { label: 'Our Craft', href: '/#craft' },
  { label: 'Tan Leida™', href: '/tan-leida', special: true },
]

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore()
  const { data: session } = useSession()

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <AnimatePresence>
      {isMobileMenuOpen ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0A0A0A] lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[#2A2A2A] px-6">
            <span className="font-display text-xl tracking-[0.2em]">TANGRED</span>
            <button type="button" onClick={closeMobileMenu} aria-label="Close menu" className="text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]">
              <X size={22} />
            </button>
          </div>
          <div className="flex min-h-[calc(100vh-64px)] flex-col justify-between px-8 py-10">
            <nav>
              {navLinks.map((link, index) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * index }}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 border-b border-[#2A2A2A] py-5 font-display text-4xl ${link.special ? 'text-[#C0392B]' : 'text-[#F5F5F5]'}`}
                  >
                    {link.special ? <Crown size={18} /> : null}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-3 border-t border-[#2A2A2A] pt-6">
              {session ? (
                <>
                  <Link href="/account" onClick={closeMobileMenu} className="block btn-primary text-center text-xs">
                    My Account
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut()
                      closeMobileMenu()
                    }}
                    className="block w-full btn-ghost text-xs"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMobileMenu} className="block btn-primary text-center text-xs">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu} className="block btn-ghost text-center text-xs">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
