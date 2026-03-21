# 🎩 Tangred Application

This is the main Next.js application for the Tangred e-commerce platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run db:seed` | Seed database with sample data |

## 📁 Directory Structure

```
app/              # Next.js App Router pages
components/       # React components
lib/              # Utility functions and configurations
store/            # Zustand state management
prisma/           # Database schema and seed
public/           # Static assets
types/            # TypeScript type definitions
```

## 🔗 Related Documentation

- [Root README](../README.md) - Project overview
- [Architecture](../docs/ARCHITECTURE.md) - System design
- [API Docs](../docs/API.md) - API endpoints
- [Deployment](../docs/DEPLOYMENT.md) - Deployment guide

---

**Tangred** © 2026 - Premium Leather Goods
