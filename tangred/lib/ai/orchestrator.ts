import { products } from '@/lib/catalog'
import { completeTanLeidaSession, getTanLeidaSession, updateTanLeidaSession } from '@/lib/tan-leida-store'
import { analysePhotosWithGemini } from '@/lib/ai/gemini'
import { claudeGenerateRecommendation } from '@/lib/ai/claude'
import { generateOutfitImage } from '@/lib/ai/image-gen'

export async function runTanLeidaPipeline(sessionId: string) {
  const session = getTanLeidaSession(sessionId)
  if (!session) return

  updateTanLeidaSession(sessionId, { status: 'ANALYSING' })

  const photoUrls = Object.values(session.userPhotos ?? {})
  const analysis = await analysePhotosWithGemini({ photoUrls })

  const candidateProducts = products.slice(0, 3)
  const recommendation = await claudeGenerateRecommendation({
    userProfile: session.bodyProfile ?? {},
    geminiAnalysis: analysis,
    stylePreferences: session.stylePreferences ?? {},
    products: candidateProducts as unknown as Array<Record<string, unknown>>,
  })

  const primaryProductId = String(recommendation.primaryRecommendation?.productId ?? candidateProducts[0]?.id ?? '')
  const product = products.find((item) => item.id === primaryProductId) ?? candidateProducts[0]

  const image = await generateOutfitImage({
    baseUserPhoto: String((session.userPhotos ?? {}).fullBody ?? Object.values(session.userPhotos ?? {})[0] ?? ''),
    productName: product.name,
    stylePrompt: String(recommendation.visualPrompt ?? ''),
  })

  updateTanLeidaSession(sessionId, {
    aiAnalysis: analysis,
    recommendation,
    recommendedProductId: product.id,
    generatedImageUrl: image.generatedImageUrl,
    status: 'RECOMMENDATION_READY',
  })

  completeTanLeidaSession(sessionId)
}
