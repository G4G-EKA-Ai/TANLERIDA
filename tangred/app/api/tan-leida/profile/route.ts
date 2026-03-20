import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentUserIdOrDemo } from '@/lib/request-auth'
import { getTanLeidaSession, updateTanLeidaSession } from '@/lib/tan-leida-store'

const profileSchema = z.object({
  sessionId: z.string().min(1),
  gender: z.enum(['Male', 'Female', 'Non-binary', 'Prefer not to say']),
  ageRange: z.string().min(1),
  heightCm: z.number().int().min(120).max(230),
  bodyBuild: z.enum(['Slim', 'Athletic', 'Regular', 'Broad', 'Plus']),
  skinTone: z.string().min(1),
  resonance: z.array(z.string()).min(1),
})

export async function POST(request: Request) {
  try {
    const payload = profileSchema.parse(await request.json())
    const session = getTanLeidaSession(payload.sessionId)
    const userId = await getCurrentUserIdOrDemo()

    if (!session || session.ownerId !== userId) {
      return NextResponse.json({ success: false, message: 'Session not found.' }, { status: 404 })
    }

    const updated = updateTanLeidaSession(payload.sessionId, {
      bodyProfile: payload,
      status: 'PROFILE_COLLECTED',
    })

    return NextResponse.json({ success: true, session: updated })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to save profile.' }, { status: 400 })
  }
}
