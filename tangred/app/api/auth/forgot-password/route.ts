import { NextResponse } from 'next/server'
import { z } from 'zod'
import { buildOtpToken } from '@/lib/auth-tokens'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/resend'

const schema = z.object({ email: z.string().email() })

export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json())
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ success: true })
    }

    const token = buildOtpToken()

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: token.tokenHash,
        otpCode: token.otp,
        expiresAt: token.expiresAt,
      },
    })

    await sendPasswordResetEmail(user.email, user.name ?? 'Client', token.otp, token.expiresAt)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to start reset.' }, { status: 400 })
  }
}
