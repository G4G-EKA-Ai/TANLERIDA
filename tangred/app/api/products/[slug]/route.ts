import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/catalog'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, product })
}
