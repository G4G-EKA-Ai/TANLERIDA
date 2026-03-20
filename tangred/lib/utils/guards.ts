export function isConfigured(value?: string | null) {
  return Boolean(value && value.trim().length > 0)
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

export function getRequestIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
}
