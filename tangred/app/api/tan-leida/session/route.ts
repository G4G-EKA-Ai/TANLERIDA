import { NextResponse } from 'next/server'
import { tanLeidaSessions } from '@/lib/catalog'

export async function GET() {
  return NextResponse.json({ success: true, sessions: tanLeidaSessions })
}

export async function POST() {
  return NextResponse.json({ success: true, sessionId: 'session-1', sessionCode: 'TL-AB3K7M2P' })
}
