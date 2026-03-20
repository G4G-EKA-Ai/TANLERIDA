import { NextResponse } from 'next/server'
import { products } from '@/lib/catalog'

export async function POST() {
  return NextResponse.json({
    success: true,
    recommendation: {
      product: products[8],
      alternatives: [products[0], products[4]],
      narrative:
        'You present best in structured silhouettes with matte leather finishes. The Founder Satchel supports your proportion, your boardroom use case, and your stated preference for disciplined colour.',
    },
  })
}
