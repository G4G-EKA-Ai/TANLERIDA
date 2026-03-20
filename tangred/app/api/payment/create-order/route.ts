import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    order: {
      id: 'order_RAZORPAY_SAMPLE_123',
      amount: 11682,
      currency: 'INR',
      receipt: `TAN-${Date.now()}`,
    },
  })
}
