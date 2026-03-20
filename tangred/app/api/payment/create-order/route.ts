import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRazorpayOrder } from '@/lib/razorpay'

const schema = z.object({
  amount: z.number().int().positive(),
  receipt: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json())
    const order = await createRazorpayOrder(payload.amount, payload.receipt)
    return NextResponse.json({ success: true, order })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to create payment order.' }, { status: 400 })
  }
}
