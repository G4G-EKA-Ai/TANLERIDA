import { NextResponse } from 'next/server'
import { z } from 'zod'
import { runTanLeidaPipeline } from '@/lib/ai/orchestrator'
import { getCurrentUserIdOrDemo } from '@/lib/request-auth'
import { getTanLeidaSession, updateTanLeidaSession } from '@/lib/tan-leida-store'

const schema = z.object({ sessionId: z.string().min(1) })

export async function POST(request: Request) {
  try {
    const { sessionId } = schema.parse(await request.json())
    const session = getTanLeidaSession(sessionId)
    const userId = await getCurrentUserIdOrDemo()

    if (!session || session.ownerId !== userId) {
      return NextResponse.json({ success: false, message: 'Session not found.' }, { status: 404 })
    }

    updateTanLeidaSession(sessionId, { status: 'ANALYSING' })
    void runTanLeidaPipeline(sessionId)

    return NextResponse.json({
      success: true,
      status: 'ANALYSING',
      messages: [
        'Tan Leida is studying your photographs…',
        'Analysing your body profile and style markers…',
        'Matching with the finest Tangred pieces…',
        'Crafting your personalised look…',
      ],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to start analysis.' }, { status: 400 })
  }
}
