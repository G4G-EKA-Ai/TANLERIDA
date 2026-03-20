import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { hashToken } from '@/lib/auth-tokens'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json())
    const user = await prisma.user.findUnique({ where: { email: payload.email } })
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 })
    }

    const token = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        tokenHash: hashToken(payload.otp),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!token) {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP.' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(payload.password, 12)

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { id: token.id }, data: { usedAt: new Date() } }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to reset password.' }, { status: 400 })
  }
}
