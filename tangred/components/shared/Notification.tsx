'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export function Notification() {
  const { notification, clearNotification } = useUIStore()

  const icons = {
    success: <CheckCircle2 size={16} className="shrink-0 text-[#BFA07A]" />,
    error: <XCircle size={16} className="shrink-0 text-[#C0392B]" />,
    info: <Info size={16} className="shrink-0 text-[#BFA07A]" />,
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[300]">
      <AnimatePresence>
        {notification ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 border border-[#2A2A2A] bg-[#111111] px-4 py-3 shadow-2xl"
          >
            {icons[notification.type]}
            <p className="flex-1 text-sm text-[#F5F5F5]">{notification.message}</p>
            <button type="button" onClick={clearNotification} className="text-[#A0A0A0] transition-luxury hover:text-[#F5F5F5]" aria-label="Dismiss notification">
              <X size={14} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
