'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 35%, rgba(191,160,122,0.12) 0%, transparent 28%), radial-gradient(circle at 75% 40%, rgba(192,57,43,0.14) 0%, transparent 26%), linear-gradient(135deg, #090909 0%, #140c08 40%, #0A0A0A 100%)',
        }}
      />
      <div className="grain-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(10,10,10,0.55))]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 font-label text-[14px] tracking-[0.4em] text-[#C0392B]"
        >
          TANGRED
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-display text-[52px] leading-[1.02] text-[#F5F5F5] md:text-[72px] lg:text-[88px]"
        >
          Crafted for Those Who <br />
          <span className="italic text-[#BFA07A]">Command Respect</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[#A0A0A0] md:text-xl"
        >
          Premium Indian Leather, Tailored to Your Legacy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/products" className="btn-primary">
            Explore Collection
          </Link>
          <Link href="/tan-leida" className="btn-outline shadow-[0_0_24px_rgba(192,57,43,0.15)]">
            Meet Tan Leida™
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#A0A0A0]">
        <span className="font-label text-[10px] tracking-[0.35em]">SCROLL</span>
        <ChevronDown size={18} className="animate-[chevronBounce_2s_ease-in-out_infinite]" />
      </div>
    </section>
  )
}
