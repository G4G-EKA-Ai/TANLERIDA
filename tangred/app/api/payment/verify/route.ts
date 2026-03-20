import { NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyRazorpaySignature } from '@/lib/razorpay'

const schema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json())
    const verified = verifyRazorpaySignature(payload.orderId, payload.paymentId, payload.signature)

    if (!verified) {
      return NextResponse.json({ success: false, message: 'Invalid Razorpay signature.' }, { status: 400 })
    }

    return NextResponse.json({ success: true, verified })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to verify payment.' }, { status: 400 })
  }
}
