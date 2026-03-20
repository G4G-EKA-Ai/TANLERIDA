const globalStore = globalThis as typeof globalThis & {
  __tangredRateLimit?: Map<string, { count: number; expiresAt: number }>
}

const store = globalStore.__tangredRateLimit ?? new Map<string, { count: number; expiresAt: number }>()

if (!globalStore.__tangredRateLimit) {
  globalStore.__tangredRateLimit = store
}

export function enforceRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const current = store.get(key)

  if (!current || current.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs })
    return
  }

  if (current.count >= limit) {
    throw new Error('Rate limit exceeded. Please wait a moment and try again.')
  }

  current.count += 1
  store.set(key, current)
}
