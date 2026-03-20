import { NextResponse } from 'next/server'
import { accountOrders } from '@/lib/catalog'

export async function GET() {
  return NextResponse.json({ success: true, orders: accountOrders })
}
