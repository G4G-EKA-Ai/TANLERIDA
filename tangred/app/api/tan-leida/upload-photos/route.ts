import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    urls: [
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    ],
    message: 'Photos uploaded and queued for validation.',
  })
}
