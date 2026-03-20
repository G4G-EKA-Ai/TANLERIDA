import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentUserIdOrDemo } from '@/lib/request-auth'
import { getTanLeidaSession } from '@/lib/tan-leida-store'

const schema = z.object({ sessionId: z.string().min(1) })

export async function POST(request: Request) {
  try {
    const { sessionId } = schema.parse(await request.json())
    const session = getTanLeidaSession(sessionId)
    const userId = await getCurrentUserIdOrDemo()

    if (!session || session.ownerId !== userId) {
      return NextResponse.json({ success: false, message: 'Session not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, recommendation: session.recommendation, session })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to fetch recommendation.' }, { status: 400 })
  }
}
