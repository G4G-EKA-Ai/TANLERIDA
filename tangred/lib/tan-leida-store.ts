import crypto from 'crypto'
import { products, tanLeidaSessions } from '@/lib/catalog'
import { formatDeliveryEstimate } from '@/lib/utils/date'
import { generateTanLeidaSessionCode } from '@/lib/utils/ids'
import type { TanLeidaSessionType } from '@/types'

export type RuntimeSession = TanLeidaSessionType & {
  ownerId: string
  consent?: boolean
  moderationAccepted?: boolean
}

const globalStore = globalThis as typeof globalThis & {
  __tangredTanLeidaStore?: Map<string, RuntimeSession>
}

const store =
  globalStore.__tangredTanLeidaStore ??
  new Map<string, RuntimeSession>(
    tanLeidaSessions.map((session) => [
      session.id,
      {
        ...session,
        ownerId: 'demo-user',
        consent: true,
        moderationAccepted: true,
      },
    ])
  )

if (!globalStore.__tangredTanLeidaStore) {
  globalStore.__tangredTanLeidaStore = store
}

export function listTanLeidaSessions(ownerId: string) {
  return Array.from(store.values()).filter((session) => session.ownerId === ownerId)
}

export function getTanLeidaSession(sessionId: string) {
  return store.get(sessionId)
}

export function createTanLeidaSession(ownerId: string) {
  const id = `session-${crypto.randomUUID()}`
  const session: RuntimeSession = {
    id,
    ownerId,
    sessionCode: generateTanLeidaSessionCode(),
    isPaid: true,
    status: 'INITIATED',
    createdAt: new Date(),
    consent: false,
    moderationAccepted: false,
  }

  store.set(id, session)
  return session
}

export function updateTanLeidaSession(sessionId: string, patch: Partial<RuntimeSession>) {
  const current = store.get(sessionId)
  if (!current) return null

  const next = {
    ...current,
    ...patch,
  }

  store.set(sessionId, next)
  return next
}

export function completeTanLeidaSession(sessionId: string) {
  const session = store.get(sessionId)
  if (!session) return null

  const recommendedProduct = products.find((product) => product.id === session.recommendedProductId) ?? products[0]
  const next = {
    ...session,
    status: 'COMPLETED' as const,
    estimatedDelivery: formatDeliveryEstimate(recommendedProduct.leadTimeDays),
  }

  store.set(sessionId, next)
  return next
}
