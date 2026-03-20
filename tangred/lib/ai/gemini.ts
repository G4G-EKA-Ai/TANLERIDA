import { GoogleGenerativeAI } from '@google/generative-ai'
import { isConfigured } from '@/lib/utils/guards'

const DEFAULT_VISION_MODEL = process.env.GEMINI_VISION_MODEL ?? 'gemini-1.5-pro'
const DEFAULT_VALIDATION_MODEL = process.env.GEMINI_VALIDATION_MODEL ?? 'gemini-1.5-flash'

function getGeminiClient() {
  if (!isConfigured(process.env.GOOGLE_GEMINI_API_KEY)) {
    return null
  }

  return new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string)
}

function extractJson<T>(text: string, fallback: T): T {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return fallback

  try {
    return JSON.parse(match[0]) as T
  } catch {
    return fallback
  }
}

export async function validatePhotoWithGemini(photoUrl: string) {
  const client = getGeminiClient()

  if (!client) {
    return {
      isRealPerson: true,
      hasFullBody: true,
      safeForProcessing: true,
      reason: 'Mock validation accepted the image in development mode.',
    }
  }

  const model = client.getGenerativeModel({ model: DEFAULT_VALIDATION_MODEL })
  const result = await model.generateContent([
    { fileData: { mimeType: 'image/jpeg', fileUri: photoUrl } },
    {
      text: 'Validate whether this is a real human photo, whether the body is sufficiently visible for body analysis, and whether the image appears safe for premium styling use. Return JSON with keys isRealPerson, hasFullBody, safeForProcessing, and reason.',
    },
  ])

  return extractJson<{ isRealPerson: boolean; hasFullBody: boolean; safeForProcessing: boolean; reason: string }>(result.response.text(), {
    isRealPerson: true,
    hasFullBody: true,
    safeForProcessing: true,
    reason: 'Unable to parse provider response.',
  })
}

export async function analysePhotosWithGemini(params: { photoUrls: string[]; prompt?: string }) {
  const client = getGeminiClient()

  if (!client) {
    return {
      bodyShape: 'Rectangle athletic frame',
      undertone: 'Warm neutral',
      styleSensibility: 'Classic professional',
      posture: 'Upright and assured',
      faceShape: 'Oval',
      validation: 'Mock analysis used because Gemini is not configured.',
    }
  }

  const model = client.getGenerativeModel({ model: DEFAULT_VISION_MODEL })
  const parts: Array<{ text: string } | { fileData: { mimeType: string; fileUri: string } }> = params.photoUrls.map((url) => ({
    fileData: { mimeType: 'image/jpeg', fileUri: url },
  }))

  parts.push({
    text:
      params.prompt ??
      'Analyse these user photos and return strict JSON with keys: bodyShape, undertone, styleSensibility, posture, faceShape, notes, colourBias.',
  })

  const result = await model.generateContent(parts)
  return extractJson(result.response.text(), {
    bodyShape: 'Rectangle athletic frame',
    undertone: 'Warm neutral',
    styleSensibility: 'Classic professional',
    posture: 'Confident posture',
    faceShape: 'Oval',
    notes: 'Fallback parse result.',
    colourBias: ['black', 'brown'],
  })
}
