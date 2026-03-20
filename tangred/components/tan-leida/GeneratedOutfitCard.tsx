'use client'

import Image from 'next/image'

export function GeneratedOutfitCard({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative min-h-[560px] overflow-hidden border border-[#2A2A2A] bg-[#111111]">
      <Image src={imageUrl} alt="Generated Tangred styling result" fill className="object-cover" />
    </div>
  )
}
