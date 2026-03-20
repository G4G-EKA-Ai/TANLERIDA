import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentUserIdOrDemo } from '@/lib/request-auth'
import { createTanLeidaSession, listTanLeidaSessions, updateTanLeidaSession } from '@/lib/tan-leida-store'
import { enforceRateLimit } from '@/lib/rate-limit'
import { getRequestIp } from '@/lib/utils/guards'

const createSchema = z.object({
  consent: z.literal(true),
  moderationAccepted: z.literal(true),
})

export async function GET() {
  const userId = await getCurrentUserIdOrDemo()
  return NextResponse.json({ success: true, sessions: listTanLeidaSessions(userId) })
}

export async function POST(request: Request) {
  try {
    enforceRateLimit(`tan-leida-session:${getRequestIp(request)}`, 10, 60_000)
    const body = createSchema.parse(await request.json())
    const userId = await getCurrentUserIdOrDemo()
    const session = createTanLeidaSession(userId)
    const updated = updateTanLeidaSession(session.id, body)
    return NextResponse.json({ success: true, session: updated })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to create session.' }, { status: 400 })
  }
}
