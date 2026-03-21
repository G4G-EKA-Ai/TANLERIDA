import type { NextConfig } from 'next'

/**
 * Next.js Configuration for Firebase Static Hosting
 * 
 * Note: API routes are deployed separately to Google Cloud Run
 * This config only builds the frontend static pages
 */

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting
  output: 'export',
  distDir: 'dist',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  
  // Trailing slashes for clean URLs
  trailingSlash: true,
  
  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.tangred.in',
    NEXT_PUBLIC_FIREBASE_PROJECT: process.env.NEXT_PUBLIC_FIREBASE_PROJECT || '',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://tangred.in',
  },
  
  // Disable type checking during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
