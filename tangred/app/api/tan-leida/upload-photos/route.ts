import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validatePhotoWithGemini } from '@/lib/ai/gemini'
import { getCurrentUserIdOrDemo } from '@/lib/request-auth'
import { getTanLeidaSession, updateTanLeidaSession } from '@/lib/tan-leida-store'

const payloadSchema = z.object({
  sessionId: z.string().min(1),
  photos: z.object({
    casual: z.string().url(),
    formal: z.string().url(),
    fullBody: z.string().url(),
    ethnic: z.string().url().optional(),
  }),
})

export async function POST(request: Request) {
  try {
    const payload = payloadSchema.parse(await request.json())
    const session = getTanLeidaSession(payload.sessionId)
    const userId = await getCurrentUserIdOrDemo()

    if (!session || session.ownerId !== userId) {
      return NextResponse.json({ success: false, message: 'Session not found.' }, { status: 404 })
    }

    const validations = await Promise.all(Object.values(payload.photos).map((url) => validatePhotoWithGemini(url)))
    const rejected = validations.find((item) => item.isRealPerson === false || item.hasFullBody === false || item.safeForProcessing === false)

    if (rejected) {
      return NextResponse.json({ success: false, message: rejected.reason ?? 'Photo validation failed.' }, { status: 400 })
    }

    const updated = updateTanLeidaSession(payload.sessionId, {
      userPhotos: payload.photos,
      status: 'PHOTOS_UPLOADED',
      moderationAccepted: true,
      consent: true,
    })

    return NextResponse.json({ success: true, session: updated })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to save photos.' }, { status: 400 })
  }
}
