import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    pipeline: [
      'Tan Leida is studying your photographs…',
      'Analysing your body profile and style markers…',
      'Matching with the finest Tangred pieces…',
      'Crafting your personalised look…',
    ],
    analysis: {
      bodyShape: 'Rectangle athletic frame',
      undertone: 'Warm neutral',
      styleSensibility: 'Classic professional',
    },
  })
}
