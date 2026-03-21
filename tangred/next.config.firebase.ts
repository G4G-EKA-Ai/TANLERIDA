import type { NextConfig } from 'next'

/**
 * Next.js Configuration for Firebase + Google Cloud Run Deployment
 * 
 * Frontend: Firebase Hosting (Static Export)
 * Backend: Google Cloud Run (API Routes)
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
      {
        protocol: 'https',
        hostname: '*.firebaseapp.com',
      },
    ],
  },
  
  // Trailing slashes for clean URLs
  trailingSlash: true,
  
  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXT_PUBLIC_FIREBASE_PROJECT: process.env.NEXT_PUBLIC_FIREBASE_PROJECT || '',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
  },
  
  // Experimental features
  experimental: {
    // Enable if using App Router with static export
    typedRoutes: true,
  },
}

export default nextConfig
