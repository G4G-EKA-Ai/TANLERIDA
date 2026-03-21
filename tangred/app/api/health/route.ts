import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Health Check Endpoint for Google Cloud Run
 * 
 * Cloud Run uses this to verify the service is healthy.
 * Also used for liveness and startup probes.
 */

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
    },
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
  }

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    checks.services.database = 'connected'
    checks.status = 'healthy'

    return NextResponse.json(checks, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    checks.status = 'unhealthy'
    checks.services.database = 'disconnected'

    console.error('Health check failed:', error)

    return NextResponse.json(checks, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  }
}

// HEAD request for lightweight health checks
export async function HEAD() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 503 })
  }
}
