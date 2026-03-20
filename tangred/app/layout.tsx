import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Notification } from '@/components/shared/Notification'

export const metadata: Metadata = {
  title: {
    default: 'Tangred — Premium Handcrafted Indian Leather Goods',
    template: '%s | Tangred',
  },
  description:
    'Tangred crafts premium Indian leather goods and offers Tan Leida™, an AI styling consultation for bespoke recommendations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] font-body text-[#F5F5F5] antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Notification />
        </Providers>
      </body>
    </html>
  )
}
