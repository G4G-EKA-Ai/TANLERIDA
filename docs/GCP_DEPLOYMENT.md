# 🚀 Google Cloud Platform Deployment Guide

Complete guide for deploying TANLERIDA on **Firebase Hosting (Frontend)** + **Google Cloud Run (Backend)** + **Cloud SQL (Database)**.

---

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS                                          │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Firebase Hosting    │
                    │   (Static Frontend)   │
                    │   tangred.in          │
                    └───────────┬───────────┘
                                │ API Calls
                    ┌───────────▼───────────┐
                    │   Google Cloud Run    │
                    │   (Next.js API)       │
                    │   Auto-scaling        │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Cloud SQL (PostgreSQL)│
                    │   (Private VPC)         │
                    └───────────────────────┘
```

---

## 🏗️ Infrastructure Components

| Component | Service | Purpose |
|-----------|---------|---------|
| **Frontend** | Firebase Hosting | Static site hosting with CDN |
| **Backend** | Cloud Run | Containerized API server |
| **Database** | Cloud SQL (PostgreSQL) | Managed relational database |
| **Secrets** | Secret Manager | Secure configuration storage |
| **Storage** | Cloud Storage | File backups and assets |
| **Build** | Cloud Build | CI/CD pipeline |

---

## ✅ Prerequisites

1. **Google Cloud Account** with billing enabled
2. **gcloud CLI** installed and authenticated
3. **Firebase CLI** installed (`npm install -g firebase-tools`)
4. **Docker** installed (for local testing)
5. **Node.js 20+**

---

## 🔧 Step 1: Initial Setup

### 1.1 Clone Repository

```bash
git clone https://github.com/G4G-EKA-Ai/TANLERIDA.git
cd TANLERIDA
```

### 1.2 Run Setup Script

```bash
# Make script executable
chmod +x scripts/setup-gcp.sh

# Run setup (creates project, enables APIs, provisions infrastructure)
./scripts/setup-gcp.sh
```

This script will:
- Create/select GCP project
- Enable required APIs
- Create Cloud SQL PostgreSQL instance
- Create service accounts
- Set up VPC connector
- Initialize Firebase

### 1.3 Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Set project
gcloud config set project tangred-ecommerce

# Enable APIs
gcloud services enable run.googleapis.com sqladmin.googleapis.com \
  secretmanager.googleapis.com cloudbuild.googleapis.com \
  vpcaccess.googleapis.com firebase.googleapis.com

# Create Cloud SQL instance
gcloud sql instances create tangred-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-south1 \
  --storage-size=10GB \
  --root-password=$(openssl rand -base64 32)

# Create database
gcloud sql databases create tangred_db --instance=tangred-postgres
```

---

## 🔐 Step 2: Configure Secrets

### 2.1 Using Deployment Script

```bash
./scripts/deploy.sh secrets
```

### 2.2 Manual Secret Creation

```bash
# Database URL
printf "postgresql://tangred_app:PASSWORD@/tangred_db?host=/cloudsql/PROJECT:REGION:INSTANCE" | \
  gcloud secrets create db-url --data-file=-

# Auth Secret
openssl rand -base64 32 | gcloud secrets create auth-secret --data-file=-

# Google OAuth
echo "your-google-client-id" | gcloud secrets create google-client-id --data-file=-
echo "your-google-client-secret" | gcloud secrets create google-client-secret --data-file=-

# AI Services
echo "your-gemini-key" | gcloud secrets create gemini-api-key --data-file=-
echo "your-anthropic-key" | gcloud secrets create anthropic-api-key --data-file=-
echo "your-pinecone-key" | gcloud secrets create pinecone-api-key --data-file=-

# Cloudinary
echo "your-cloud-name" | gcloud secrets create cloudinary-cloud-name --data-file=-
echo "your-api-key" | gcloud secrets create cloudinary-api-key --data-file=-
echo "your-api-secret" | gcloud secrets create cloudinary-api-secret --data-file=-

# Razorpay
echo "rzp_live_xxx" | gcloud secrets create razorpay-key-id --data-file=-
echo "your-secret" | gcloud secrets create razorpay-key-secret --data-file=-

# Resend
echo "re_xxx" | gcloud secrets create resend-api-key --data-file=-
```

---

## 🚀 Step 3: Deploy Backend (Cloud Run)

### 3.1 Using Cloud Build (Recommended)

```bash
# Trigger build and deploy
gcloud builds submit --config=gcp/cloudbuild.yaml
```

### 3.2 Manual Docker Deploy

```bash
# Build image
gcloud builds submit --tag gcr.io/tangred-ecommerce/tangred-api

# Deploy to Cloud Run
gcloud run deploy tangred-api \
  --image gcr.io/tangred-ecommerce/tangred-api \
  --region=asia-south1 \
  --platform=managed \
  --allow-unauthenticated \
  --set-secrets=DATABASE_URL=db-url:latest,AUTH_SECRET=auth-secret:latest \
  --memory=2Gi \
  --cpu=2 \
  --min-instances=1
```

### 3.3 Get Backend URL

```bash
# Get the deployed service URL
BACKEND_URL=$(gcloud run services describe tangred-api \
  --region=asia-south1 \
  --format='value(status.url)')

echo "Backend URL: $BACKEND_URL"
```

---

## 🎨 Step 4: Deploy Frontend (Firebase)

### 4.1 Configure Environment

```bash
cd tangred

# Create production environment
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=$BACKEND_URL
NEXT_PUBLIC_FIREBASE_PROJECT=tangred-ecommerce
NEXT_PUBLIC_APP_URL=https://tangred.in
EOF
```

### 4.2 Build Static Export

```bash
# Use Firebase config
mv next.config.ts next.config.vercel.ts
mv next.config.firebase.ts next.config.ts

# Install dependencies
npm install

# Build for static export
npm run build

# Copy to dist folder
mkdir -p ../dist
cp -r dist/* ../dist/ 2>/dev/null || cp -r out/* ../dist/ 2>/dev/null || cp -r .next/* ../dist/
cp -r public ../dist/ 2>/dev/null || true
```

### 4.3 Deploy to Firebase

```bash
# Login to Firebase
firebase login

# Set project
firebase use tangred-ecommerce

# Deploy
firebase deploy --only hosting
```

---

## 🗄️ Step 5: Database Migrations

### 5.1 Using Cloud SQL Proxy

```bash
# Download Cloud SQL Proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy

# Get connection name
CONNECTION_NAME=$(gcloud sql instances describe tangred-postgres --format='value(connectionName)')

# Start proxy
./cloud-sql-proxy --port 5432 $CONNECTION_NAME &

# Run migrations
cd tangred
export DATABASE_URL="postgresql://tangred_app@localhost:5432/tangred_db"
npx prisma migrate deploy

# Seed data
npm run db:seed
```

### 5.2 Using Cloud Build

The cloudbuild.yaml includes a migration step that runs automatically during deployment.

---

## 🌐 Step 6: Configure Custom Domain (Optional)

### 6.1 Firebase Hosting Custom Domain

```bash
# Add custom domain
firebase hosting:channel:deploy production --expires 30d

# Or via console: Firebase Console > Hosting > Add custom domain
```

### 6.2 Cloud Run Custom Domain

```bash
# Map custom domain to Cloud Run service
gcloud run domain-mappings create \
  --service=tangred-api \
  --region=asia-south1 \
  --domain=api.tangred.in
```

---

## 📊 Monitoring & Logging

### View Logs

```bash
# Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision" --limit=50

# Real-time logs
gcloud alpha logging tail "resource.type=cloud_run_revision"
```

### Monitoring Dashboard

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **Monitoring > Dashboards**
3. View pre-built dashboards for:
   - Cloud Run metrics
   - Cloud SQL metrics
   - Error reporting

---

## 🔒 Security Best Practices

### 1. Use Secret Manager
All sensitive values are stored in Secret Manager, not in code.

### 2. Service Account Permissions
The service account has minimal required permissions:
- `roles/cloudsql.client` - Database access
- `roles/secretmanager.secretAccessor` - Secret access
- `roles/logging.logWriter` - Logging

### 3. VPC Connector
Cloud Run connects to Cloud SQL via VPC connector (private network).

### 4. HTTPS Only
Both Firebase and Cloud Run enforce HTTPS.

---

## 💰 Cost Optimization

| Component | Free Tier | Paid Tier |
|-----------|-----------|-----------|
| Firebase Hosting | 10GB/month | $0.15/GB |
| Cloud Run | 2M requests/month | $0.40/million |
| Cloud SQL | None | ~$7/month (db-f1-micro) |
| Secret Manager | 10K requests/month | $0.03/10K |

**Estimated Monthly Cost (Production):**
- Low traffic: $15-25/month
- Medium traffic: $50-100/month
- High traffic: $200+/month

---

## 🐛 Troubleshooting

### Issue: Database Connection Failed

```bash
# Test connection
./cloud-sql-proxy --port 5432 PROJECT:REGION:INSTANCE
psql postgresql://tangred_app@localhost:5432/tangred_db

# Check service account permissions
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --format="table(bindings.role)" \
  --filter="bindings.members:serviceAccount:tangred-api@PROJECT_ID.iam.gserviceaccount.com"
```

### Issue: CORS Errors

```bash
# Update CORS settings
gcloud run services update tangred-api \
  --region=asia-south1 \
  --set-env-vars=FRONTEND_URL=https://your-domain.com
```

### Issue: Build Fails

```bash
# Check build logs
gcloud builds list

gcloud builds log BUILD_ID
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Integration

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GCP

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup gcloud
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: tangred-ecommerce
          service_account_key: ${{ secrets.GCP_SA_KEY }}
      
      - name: Deploy
        run: |
          gcloud builds submit --config=gcp/cloudbuild.yaml
```

---

## 📞 Support

- **Google Cloud Documentation**: https://cloud.google.com/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **TANLERIDA Issues**: https://github.com/G4G-EKA-Ai/TANLERIDA/issues

---

**Last Updated**: March 2026
