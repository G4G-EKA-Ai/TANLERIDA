# 🚀 TANLERIDA Deployment Guide

Complete guide for deploying Tangred e-commerce platform to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Database Setup](#database-setup)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 20.x installed locally
- [ ] Git repository with latest code
- [ ] Accounts for all third-party services
- [ ] Domain name (optional but recommended)

### Required Services

| Service | Purpose | Sign Up |
|---------|---------|---------|
| Vercel | Hosting | [vercel.com](https://vercel.com) |
| Supabase / Railway | PostgreSQL | [supabase.com](https://supabase.com) |
| Cloudinary | Image Storage | [cloudinary.com](https://cloudinary.com) |
| Razorpay | Payments | [razorpay.com](https://razorpay.com) |
| Resend | Email | [resend.com](https://resend.com) |
| Google AI | Vision AI | [ai.google.dev](https://ai.google.dev) |
| Anthropic | LLM | [anthropic.com](https://anthropic.com) |
| Pinecone | Vector DB | [pinecone.io](https://pinecone.io) |

---

## 🔧 Environment Setup

### 1. Create Production Environment File

Create `.env.production` locally (don't commit to git):

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="openssl rand -base64 32"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# AI Services
GEMINI_API_KEY="..."
ANTHROPIC_API_KEY="..."
PINECONE_API_KEY="..."
PINECONE_INDEX="tangred-products-prod"

# Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Payments
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."

# Email
RESEND_API_KEY="..."
FROM_EMAIL="noreply@tangred.com"

# App
NEXT_PUBLIC_APP_URL="https://tangred.com"
```

---

## ▲ Vercel Deployment (Recommended)

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `G4G-EKA-Ai/TANLERIDA`
4. Select the `tangred` directory as root

### Step 2: Configure Build Settings

**Build Command:**
```bash
cd tangred && npm run build
```

**Output Directory:**
```
tangred/.next
```

**Install Command:**
```bash
cd tangred && npm install
```

### Step 3: Environment Variables

Add all environment variables from `.env.production` in Vercel Dashboard:

```
Project Settings → Environment Variables → Add All
```

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

**Build time:** ~3-5 minutes

### Step 5: Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `tangred.com`
3. Configure DNS records as instructed
4. Enable SSL (automatic)

---

## 🖥️ Self-Hosted Deployment

### Using Docker

#### Dockerfile

```dockerfile
# tangred/Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: ./tangred
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - AUTH_SECRET=${AUTH_SECRET}
      # ... other env vars
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: tangred
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: tangred_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

### Deploy to VPS (DigitalOcean/AWS/Azure)

```bash
# 1. SSH into server
ssh root@your-server-ip

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clone repository
git clone https://github.com/G4G-EKA-Ai/TANLERIDA.git
cd TANLERIDA

# 4. Create .env file
nano .env

# 5. Start services
docker-compose up -d

# 6. Run migrations
docker-compose exec app npx prisma migrate deploy

# 7. Seed database (optional)
docker-compose exec app npm run db:seed
```

---

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database
3. Format: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Option 2: Railway

1. Create PostgreSQL database at [railway.app](https://railway.app)
2. Copy connection string
3. Deploy migrations

### Option 3: Self-Hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
create database tangred_db;
create user tangred with encrypted password 'your-password';
grant all privileges on database tangred_db to tangred;
\q

# Configure in pg_hba.conf for remote access
sudo nano /etc/postgresql/15/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

# Restart
sudo systemctl restart postgresql
```

---

## ✅ Post-Deployment Checklist

### Functionality Tests

- [ ] Homepage loads correctly
- [ ] Product listing page works
- [ ] Product detail page displays
- [ ] Add to cart functionality
- [ ] Cart persistence across sessions
- [ ] User registration
- [ ] User login/logout
- [ ] Email verification sent
- [ ] Password reset flow
- [ ] Checkout process
- [ ] Payment integration (test mode)
- [ ] Order confirmation email
- [ ] Tan Leida session creation
- [ ] Photo upload works
- [ ] AI analysis pipeline

### Security Checks

- [ ] HTTPS enabled
- [ ] Secure cookies set
- [ ] Environment variables not exposed
- [ ] API rate limiting active
- [ ] Input validation working
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens validated

### Performance Checks

- [ ] Page load time < 3s
- [ ] Images optimized
- [ ] CDN delivering assets
- [ ] Database queries optimized
- [ ] API response time < 500ms

### SEO & Analytics

- [ ] Meta tags set
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Google Analytics added
- [ ] Search Console verified

---

## 📊 Monitoring & Maintenance

### Monitoring Tools

| Tool | Purpose | Setup |
|------|---------|-------|
| Vercel Analytics | Performance | Built-in |
| Sentry | Error tracking | [sentry.io](https://sentry.io) |
| UptimeRobot | Uptime monitoring | [uptimerobot.com](https://uptimerobot.com) |
| Google Analytics | User analytics | [analytics.google.com](https://analytics.google.com) |

### Backup Strategy

```bash
# Automated daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
gzip backup_$DATE.sql
aws s3 cp backup_$DATE.sql.gz s3://tangred-backups/
```

### Health Check Endpoint

Create `app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: 'Database connection failed'
    }, { status: 503 });
  }
}
```

### Regular Maintenance Tasks

| Task | Frequency | Command |
|------|-----------|---------|
| Update dependencies | Weekly | `npm update` |
| Security audit | Weekly | `npm audit` |
| Database backup | Daily | Automated |
| Log cleanup | Monthly | Manual |
| SSL renewal | 90 days | Auto (Let's Encrypt) |

---

## 🆘 Troubleshooting

### Common Issues

#### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

#### Database Connection Error

- Check DATABASE_URL format
- Verify IP whitelist
- Check SSL requirements

#### Environment Variables Not Loading

- Verify variable names (NEXT_PUBLIC_ for client)
- Redeploy after adding variables
- Check Vercel environment settings

---

## 📞 Support

For deployment support:
- GitHub Issues: [github.com/G4G-EKA-Ai/TANLERIDA/issues](https://github.com/G4G-EKA-Ai/TANLERIDA/issues)
- Email: [vivek@go4garage.in](mailto:vivek@go4garage.in)

---

Last Updated: March 2026
