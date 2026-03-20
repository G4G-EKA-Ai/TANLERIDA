import { Pinecone } from '@pinecone-database/pinecone'
import { isConfigured } from '@/lib/utils/guards'

const indexName = process.env.PINECONE_INDEX_NAME ?? 'tangred-products'

function getClient() {
  if (!isConfigured(process.env.PINECONE_API_KEY)) {
    return null
  }

  return new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string })
}

export async function matchProductsFromEmbeddings(params: {
  bodyProfile: Record<string, unknown>
  stylePrefs: Record<string, unknown>
  geminiAnalysis: Record<string, unknown>
  topK: number
}) {
  const client = getClient()

  if (!client) {
    return []
  }

  const index = client.index(indexName)
  const response = await index.query({
    vector: new Array(1536).fill(0),
    topK: params.topK,
    includeMetadata: true,
  })

  return response.matches.map((match) => ({ id: match.id, score: match.score, ...(match.metadata ?? {}) }))
}

export async function upsertProductEmbedding(params: {
  productId: string
  productName: string
  category: string
  material: string
  tags: string[]
  embedding: number[]
}) {
  const client = getClient()
  if (!client) return

  const index = client.index(indexName)
  await index.upsert({
    records: [
      {
        id: params.productId,
        values: params.embedding,
        metadata: {
          name: params.productName,
          category: params.category,
          material: params.material,
          tags: params.tags.join(','),
        },
      },
    ],
  })
}
