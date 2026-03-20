import { isConfigured } from '@/lib/utils/guards'

const provider = process.env.IMAGE_GEN_PROVIDER ?? 'mock'
const model = process.env.IMAGE_GEN_MODEL ?? 'mock-editorial'

export async function generateOutfitImage(params: { baseUserPhoto: string; productName: string; stylePrompt: string }) {
  if (provider === 'mock' || !isConfigured(process.env.STABILITY_API_KEY) && !isConfigured(process.env.REPLICATE_API_TOKEN)) {
    return {
      provider: 'mock',
      model,
      generatedImageUrl: params.baseUserPhoto,
    }
  }

  return {
    provider,
    model,
    generatedImageUrl: params.baseUserPhoto,
  }
}
