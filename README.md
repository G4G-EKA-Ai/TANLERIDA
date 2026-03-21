<div align="center">

<img src="https://raw.githubusercontent.com/G4G-EKA-Ai/TANLERIDA/main/assets/tangred-logo.svg" alt="Tangred Logo" width="200"/>

# 🎩 TANLERIDA

### **Premium Indian Leather Goods E-Commerce Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.5.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com)

**🌐 Live Demo**: [https://tangred.vercel.app](https://tangred.vercel.app) *(Coming Soon)*

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [The Tan Leida AI Agent](#-the-tan-leida-ai-agent)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## 🎯 Overview

**TANLERIDA** (तानलेरिडा) is a full-stack e-commerce web application built for **Tangred** — an Indian premium leather goods brand that sells handcrafted luxury products including:

- 👔 **Leather Belts** - Premium full-grain leather belts
- 💼 **Office Bags** - Executive briefcases and laptop bags
- 🧥 **Leather Jackets** - Premium suede and leather outerwear
- 👛 **Wallets** - Handcrafted cardholders and wallets
- 🎒 **Briefcases** - Professional business cases
- 🎩 **Suits & Accessories** - Complete luxury ensemble

### 🎨 Brand Philosophy

Tangred represents the perfect fusion of **Indian craftsmanship** with **European luxury aesthetics**. Our platform delivers:

- **Visual Gravitas**: Dark, luxurious UI inspired by European fashion houses
- **Premium Experience**: Every interaction feels bespoke and exclusive
- **AI-Powered Styling**: Revolutionary "Tan Leida" AI tailor for personalized recommendations
- **Seamless Commerce**: End-to-end shopping experience from discovery to delivery

---

## 🤖 The Tan Leida AI Agent

**Tan Leida** (तान लेइडा) — *Your AI Bespoke Styling Assistant*

### What is Tan Leida?

Tan Leida is an innovative AI-powered styling consultant that helps customers find the perfect leather products based on their:

- 📸 **Body Profile Analysis** - Upload photos for AI vision analysis
- 🎨 **Skin Tone Matching** - Color recommendations that complement you
- 📏 **Body Measurements** - Size and fit recommendations
- 💡 **Style Preferences** - Personal taste and occasion-based suggestions

### How It Works

```
Step 1: Upload Photos → Gemini Vision AI analyzes body type & skin tone
Step 2: Answer Preferences → Claude AI understands style requirements  
Step 3: AI Analysis → Vector search finds matching products in catalog
Step 4: Generate Visualization → See yourself wearing recommended items
Step 5: Complete Purchase → Checkout with personalized recommendations
```

### Pricing

- **Tan Leida Consultation**: ₹99 + GST (one-time fee)
- Includes: AI analysis, personalized recommendations, generated preview image

---

## ✨ Features

### 🛍️ E-Commerce Core

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | NextAuth.js with Email/Password + Google OAuth | ✅ |
| 🛒 **Shopping Cart** | Persistent cart with Zustand state management | ✅ |
| 💳 **Payments** | Razorpay integration (UPI, Cards, Net Banking) | ✅ |
| 📦 **Order Management** | Complete order lifecycle tracking | ✅ |
| 🔍 **Product Search** | Full-text search with filters | ✅ |
| ❤️ **Wishlist** | Save favorites for later | ✅ |
| 📧 **Email Notifications** | Order confirmations, shipping updates | ✅ |

### 🎨 UI/UX

| Feature | Description | Status |
|---------|-------------|--------|
| 🌙 **Dark Luxury Theme** | Near-black (#0A0A0A) premium aesthetic | ✅ |
| 📱 **Responsive Design** | Mobile-first, breakpoints: 375px - 1440px | ✅ |
| ✨ **Smooth Animations** | Framer Motion with cubic-bezier transitions | ✅ |
| 🎯 **Accessibility** | WCAG 2.1 AA compliant | ✅ |
| 🚀 **Performance** | Optimized images, lazy loading | ✅ |

### 🤖 AI Features

| Feature | Technology | Status |
|---------|------------|--------|
| 👁️ **Vision Analysis** | Google Gemini 1.5 Pro Vision | ✅ |
| 💬 **Recommendations** | Anthropic Claude Sonnet | ✅ |
| 🖼️ **Image Generation** | Stable Diffusion / Replicate API | ✅ |
| 🔍 **Vector Search** | Pinecone semantic search | ✅ |
| 🧠 **Orchestration** | LangChain.js multi-agent pipeline | ✅ |

---

## 🛠️ Tech Stack

### Frontend
```
┌─────────────────────────────────────────────────────────────┐
│  Next.js 16.2.0      │  React Framework (App Router)       │
│  TypeScript 5.0      │  Type-safe development              │
│  Tailwind CSS 4.0    │  Utility-first styling              │
│  Framer Motion       │  Animations & transitions           │
│  Lucide React        │  Icon library                       │
│  Zustand             │  State management                   │
└─────────────────────────────────────────────────────────────┘
```

### Backend
```
┌─────────────────────────────────────────────────────────────┐
│  Next.js API Routes  │  Server-side API endpoints            │
│  NextAuth.js v5      │  Authentication & sessions            │
│  Prisma ORM 7.5      │  Database ORM                         │
│  PostgreSQL          │  Primary database                     │
│  Zod                 │  Schema validation                    │
└─────────────────────────────────────────────────────────────┘
```

### AI/ML Services
```
┌─────────────────────────────────────────────────────────────┐
│  Google Gemini       │  Vision analysis for body profiling   │
│  Anthropic Claude    │  Natural language recommendations     │
│  Pinecone            │  Vector database for product search   │
│  LangChain.js        │  AI agent orchestration               │
│  Cloudinary          │  Image upload & optimization          │
└─────────────────────────────────────────────────────────────┘
```

### Payment & Communication
```
┌─────────────────────────────────────────────────────────────┐
│  Razorpay            │  Indian payment gateway               │
│  Resend              │  Transactional email service          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
TANLERIDA/
├── 📄 README.md                    # This file
├── 📄 LICENSE                      # MIT License
├── 📄 CONTRIBUTING.md              # Contribution guidelines
├── 📄 CHANGELOG.md                 # Version history
├── 📄 SECURITY.md                  # Security policies
├── 📄 CODE_OF_CONDUCT.md           # Community guidelines
│
├── 📁 tangred/                     # Main application
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── 📁 (auth)/              # Authentication routes
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── verify/
│   │   ├── 📁 (shop)/              # Shopping routes
│   │   │   ├── products/
│   │   │   ├── category/[slug]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── 📁 account/             # User account
│   │   │   ├── addresses/
│   │   │   ├── orders/
│   │   │   ├── wishlist/
│   │   │   └── tan-leida/
│   │   ├── 📁 tan-leida/           # AI styling feature
│   │   │   ├── payment/
│   │   │   └── session/[id]/
│   │   ├── 📁 api/                 # API routes
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── payment/
│   │   │   └── tan-leida/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   │
│   ├── 📁 components/              # React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/                   # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   └── TanLeidaTeaser.tsx
│   │   ├── product/                # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── cart/                   # Cart components
│   │   │   └── CartDrawer.tsx
│   │   ├── tan-leida/              # AI feature components
│   │   │   ├── PhotoUpload.tsx
│   │   │   ├── BodyProfile.tsx
│   │   │   ├── StylePreferences.tsx
│   │   │   ├── AnalysisLoader.tsx
│   │   │   └── GeneratedOutfit.tsx
│   │   └── shared/                 # Shared components
│   │       └── Notification.tsx
│   │
│   ├── 📁 lib/                     # Utility libraries
│   │   ├── ai/                     # AI integrations
│   │   │   ├── gemini.ts           # Google Gemini client
│   │   │   ├── anthropic.ts        # Claude client
│   │   │   ├── pinecone.ts         # Vector search
│   │   │   ├── cloudinary.ts       # Image uploads
│   │   │   └── pipeline.ts         # Tan Leida orchestrator
│   │   ├── auth.ts                 # Authentication config
│   │   ├── catalog.ts              # Product catalog data
│   │   ├── prisma.ts               # Database client
│   │   ├── format.ts               # Formatting utilities
│   │   └── utils.ts                # General utilities
│   │
│   ├── 📁 store/                   # Zustand stores
│   │   ├── cartStore.ts            # Cart state
│   │   └── uiStore.ts              # UI state
│   │
│   ├── 📁 prisma/                  # Database schema
│   │   ├── schema.prisma           # Prisma schema
│   │   └── seed.ts                 # Seed data
│   │
│   ├── 📁 types/                   # TypeScript types
│   │   └── index.ts                # Global type definitions
│   │
│   ├── 📁 public/                  # Static assets
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 tsconfig.json            # TypeScript config
│   ├── 📄 tailwind.config.ts       # Tailwind config
│   ├── 📄 next.config.ts           # Next.js config
│   └── 📄 .env.example             # Environment template
│
├── 📁 docs/                        # Documentation
│   ├── ARCHITECTURE.md             # System architecture
│   ├── API.md                      # API documentation
│   └── DEPLOYMENT.md               # Deployment guide
│
└── 📁 assets/                      # Repository assets
    └── tangred-logo.svg
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher (or pnpm/yarn)
- **PostgreSQL** 14.x or higher (local or cloud)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/G4G-EKA-Ai/TANLERIDA.git
   cd TANLERIDA/tangred
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the `tangred/` directory with the following variables:

```env
# =============================================================================
# DATABASE
# =============================================================================
DATABASE_URL="postgresql://username:password@localhost:5432/tangred_db"

# =============================================================================
# AUTHENTICATION (NextAuth.js)
# =============================================================================
AUTH_SECRET="your-random-secret-key-min-32-chars"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

# =============================================================================
# AI SERVICES
# =============================================================================
# Google Gemini (Vision Analysis)
GEMINI_API_KEY="your-gemini-api-key"

# Anthropic Claude (Recommendations)
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Pinecone (Vector Search)
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_INDEX="tangred-products"

# Image Generation (Replicate/Stable Diffusion)
REPLICATE_API_TOKEN="your-replicate-api-token"

# =============================================================================
# FILE STORAGE
# =============================================================================
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# =============================================================================
# PAYMENTS
# =============================================================================
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# =============================================================================
# EMAIL
# =============================================================================
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@tangred.com"

# =============================================================================
# APPLICATION
# =============================================================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_TAN_LEIDA_PRICE="99"
```

> 💡 **Note**: For development without real API keys, the app includes mock fallbacks for all services.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture & design decisions |
| [API.md](./docs/API.md) | Complete API endpoint documentation |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Production deployment guide |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute to the project |
| [CHANGELOG.md](./CHANGELOG.md) | Version history & release notes |
| [SECURITY.md](./SECURITY.md) | Security policies & reporting |

---

## 🗄️ Database Schema

Our database is designed using **Prisma ORM** with the following core entities:

```prisma
┌─────────────────────────────────────────────────────────────────┐
│                          USER                                   │
├─────────────────────────────────────────────────────────────────┤
│  id • email • name • passwordHash • googleId • phone           │
│  isVerified • tanLeidaAccess • tanLeidaId • createdAt          │
└──────────────────┬──────────────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼
┌─────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ ADDRESS │  │  ORDER  │  │   CART   │  │ WISHLIST │  │ TanLeida │
└─────────┘  └─────────┘  └──────────┘  └──────────┘  │ SESSION  │
                                                       └──────────┘
```

For the complete schema, see [`tangred/prisma/schema.prisma`](./tangred/prisma/schema.prisma)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables
4. Deploy!

### Self-Hosted

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions on:
- Docker deployment
- VPS setup (AWS, DigitalOcean, etc.)
- Database hosting (Supabase, Railway, etc.)
- CDN configuration
- SSL/TLS setup

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👥 Team

| Role | Name | Contact |
|------|------|---------|
| **Founder & Developer** | GO4GARAGE | [vivek@go4garage.in](mailto:vivek@go4garage.in) |
| **Brand** | Tangred | [hello@tangred.com](mailto:hello@tangred.com) |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Tangred** - For the vision of premium Indian leather craftsmanship
- **Next.js Team** - For the incredible React framework
- **Vercel** - For seamless deployment platform
- **Open Source Community** - For the amazing tools and libraries

---

<div align="center">

**[⬆ Back to Top](#tanlerida)**

Made with ❤️ in India 🇮🇳

© 2026 Tangred. All rights reserved.

</div>
