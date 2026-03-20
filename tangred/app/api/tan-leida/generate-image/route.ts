import { NextResponse } from 'next/server'
import { z } from 'zod'
import { generateOutfitImage } from '@/lib/ai/image-gen'

const schema = z.object({
  baseUserPhoto: z.string().url(),
  productName: z.string().min(1),
  stylePrompt: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json())
    const image = await generateOutfitImage(payload)
    return NextResponse.json({ success: true, image })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to generate image.' }, { status: 400 })
  }
}
