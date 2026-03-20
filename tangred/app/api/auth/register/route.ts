import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { buildOtpToken } from '@/lib/auth-tokens'
import { sendVerificationEmail } from '@/lib/resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json())
    const passwordHash = await bcrypt.hash(payload.password, 12)
    const token = buildOtpToken()

    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: {
        name: payload.name,
        phone: payload.phone,
        passwordHash,
      },
      create: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        passwordHash,
      },
    })

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash: token.tokenHash,
        expiresAt: token.expiresAt,
      },
    })

    await sendVerificationEmail(user.email, user.name ?? 'Client', token.otp, token.expiresAt)

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to register.' }, { status: 400 })
  }
}
