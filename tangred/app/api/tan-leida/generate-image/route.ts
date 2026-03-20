import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    generatedImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  })
}
