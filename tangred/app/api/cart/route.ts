import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ success: true, message: 'Cart state is managed client-side with Zustand in this implementation.' })
}
