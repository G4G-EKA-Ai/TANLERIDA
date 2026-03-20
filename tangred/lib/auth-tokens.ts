import crypto from 'crypto'
import { generateOtp } from '@/lib/utils/ids'

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function buildOtpToken(expiryMinutes = 10) {
  const otp = generateOtp()
  const expiresAt = new Date(Date.now() + expiryMinutes * 60_000)

  return {
    otp,
    tokenHash: hashToken(otp),
    expiresAt,
  }
}
