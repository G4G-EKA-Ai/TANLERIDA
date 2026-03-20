import crypto from 'crypto'
import Razorpay from 'razorpay'
import { TAN_LEIDA_TOTAL_PAISE } from '@/lib/utils/currency'
import { generateOrderNumber } from '@/lib/utils/ids'
import { isConfigured } from '@/lib/utils/guards'

export function getRazorpayClient() {
  if (!isConfigured(process.env.RAZORPAY_KEY_ID) || !isConfigured(process.env.RAZORPAY_KEY_SECRET)) {
    return null
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function createRazorpayOrder(amount: number, receipt = generateOrderNumber()) {
  const client = getRazorpayClient()

  if (!client) {
    return {
      id: `mock_order_${Date.now()}`,
      amount,
      currency: 'INR',
      receipt,
    }
  }

  return client.orders.create({
    amount,
    currency: 'INR',
    receipt,
  })
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  if (!isConfigured(process.env.RAZORPAY_KEY_SECRET)) {
    return signature === 'mock_signature'
  }

  const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string).update(`${orderId}|${paymentId}`).digest('hex')
  return digest === signature
}

export function getTanLeidaPaymentBreakdown() {
  return {
    subtotal: TAN_LEIDA_TOTAL_PAISE - 1782,
    gst: 1782,
    total: TAN_LEIDA_TOTAL_PAISE,
  }
}
