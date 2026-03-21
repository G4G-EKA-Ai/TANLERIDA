/**
 * CORS Configuration for Google Cloud Run + Firebase Hosting
 */

export const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://tangred.in',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}

export function setCorsHeaders(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set('Access-Control-Allow-Origin', corsOptions.origin as string)
  headers.set('Access-Control-Allow-Credentials', 'true')
  headers.set('Access-Control-Allow-Methods', corsOptions.methods.join(', '))
  headers.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '))
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
