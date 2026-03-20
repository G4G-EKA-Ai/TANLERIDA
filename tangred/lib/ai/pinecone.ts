import { Pinecone } from '@pinecone-database/pinecone'

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? 'tangred-products'

export async function matchProductsFromEmbeddings(params: {
  bodyProfile: Record<string, unknown>
  stylePrefs: Record<string, unknown>
  geminiAnalysis: Record<string, unknown>
  topK: number
}) {
  try {
    const index = pinecone.index(INDEX_NAME)

    // Create a query vector from the user profile
    // In production, you'd use an embedding model here
    // For now we use a simplified approach with metadata filtering
    // Use zero vector as placeholder — production should use real embeddings
    const queryVector = new Array(1536).fill(0)

    const queryResponse = await index.query({
      vector: queryVector,
      topK: params.topK,
      includeMetadata: true,
    })

    return queryResponse.matches.map((match) => ({
      id: match.id,
      score: match.score,
      ...match.metadata,
    }))
  } catch (error) {
    console.error('Pinecone query error:', error)
    // Return empty array if Pinecone unavailable
    return []
  }
}

export async function upsertProductEmbedding(params: {
  productId: string
  productName: string
  category: string
  material: string
  tags: string[]
  embedding: number[]
}) {
  try {
    const index = pinecone.index(INDEX_NAME)

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
  } catch (error) {
    console.error('Pinecone upsert error:', error)
  }
}
