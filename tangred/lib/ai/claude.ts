import Anthropic from '@anthropic-ai/sdk'
import { isConfigured } from '@/lib/utils/guards'

export const TAN_LEIDA_SYSTEM_PROMPT = `You are Tan Leida — Tangred's master tailor and personal style consultant.
You speak with quiet authority, warmth, and precise craftsmanship language.
Only recommend Tangred catalogue pieces.
Always connect your guidance to body profile, skin tone, lifestyle, occasion, and leather craft.
Never sound pushy. End recommendations with: "This is my recommendation for you — crafted to be worn for a lifetime."`

function getAnthropicClient() {
  if (!isConfigured(process.env.ANTHROPIC_API_KEY)) {
    return null
  }

  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}

const model = process.env.ANTHROPIC_TEXT_MODEL ?? 'claude-3-5-sonnet-latest'

export async function claudeStyleConsultation(messages: Array<{ role: 'user' | 'assistant'; content: string }>, userContext?: Record<string, unknown>) {
  const client = getAnthropicClient()

  if (!client) {
    return 'What are you looking for today — a boardroom bag, a finishing belt, or a more complete Tangred look?'
  }

  const response = await client.messages.create({
    model,
    system: `${TAN_LEIDA_SYSTEM_PROMPT}\nUser context: ${JSON.stringify(userContext ?? {})}`,
    max_tokens: 700,
    messages,
  })

  const content = response.content.find((entry) => entry.type === 'text')
  return content && 'text' in content ? content.text : ''
}

export async function claudeGenerateRecommendation(params: {
  userProfile: Record<string, unknown>
  geminiAnalysis: Record<string, unknown>
  products: Array<Record<string, unknown>>
  stylePreferences: Record<string, unknown>
}) {
  const client = getAnthropicClient()

  if (!client) {
    const [primary, ...alternatives] = params.products
    return {
      primaryRecommendation: {
        productId: String(primary?.id ?? ''),
        narrative:
          'Your profile calls for a disciplined, structured leather silhouette with enough authority for formal work settings while remaining versatile across travel and evening use.',
        whyItWorks: 'The piece balances your proportions, supports a refined palette, and mirrors a composed professional wardrobe.',
        craftStory: 'The selected Tangred leather brings controlled texture, careful edge finishing, and long-wear polish.',
      },
      alternatives: alternatives.slice(0, 2).map((product) => ({ productId: String(product.id), brief: 'An alternative with a slightly different shape or carry profile.' })),
      visualPrompt: 'Luxury editorial portrait of the customer carrying a structured Tangred leather bag, dark background, cinematic lighting, premium Indian tailoring aesthetic.',
      signOff: 'This is my recommendation for you — crafted to be worn for a lifetime.',
    }
  }

  const response = await client.messages.create({
    model,
    system: TAN_LEIDA_SYSTEM_PROMPT,
    max_tokens: 1200,
    messages: [
      {
        role: 'user',
        content: `Return JSON for a Tangred recommendation. Body profile: ${JSON.stringify(params.userProfile)}. Vision analysis: ${JSON.stringify(params.geminiAnalysis)}. Preferences: ${JSON.stringify(params.stylePreferences)}. Products: ${JSON.stringify(params.products)}.`,
      },
    ],
  })

  const text = response.content.find((entry) => entry.type === 'text')
  const raw = text && 'text' in text ? text.text : '{}'
  const match = raw.match(/\{[\s\S]*\}/)
  return match ? JSON.parse(match[0]) : { raw }
}
