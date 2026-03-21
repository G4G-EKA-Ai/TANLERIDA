#!/bin/bash
# =============================================================================
# TANLERIDA - Deployment Script
# Firebase Frontend + Google Cloud Backend
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="${PROJECT_ID:-tangred-ecommerce}"
REGION="${REGION:-asia-south1}"
BACKEND_SERVICE="tangred-api"
FRONTEND_SITE="tangred-ecommerce"
DB_INSTANCE="tangred-postgres"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TANLERIDA Deployment Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
check_prerequisites() {
  echo -e "${YELLOW}Checking prerequisites...${NC}"
  
  command -v gcloud >/dev/null 2>&1 || { echo -e "${RED}Error: gcloud CLI is required${NC}"; exit 1; }
  command -v firebase >/dev/null 2>&1 || { echo -e "${RED}Error: Firebase CLI is required${NC}"; exit 1; }
  command -v docker >/dev/null 2>&1 || { echo -e "${RED}Error: Docker is required${NC}"; exit 1; }
  
  # Check gcloud authentication
  gcloud auth print-access-token >/dev/null 2>&1 || {
    echo -e "${YELLOW}Authenticating with Google Cloud...${NC}"
    gcloud auth login
  }
  
  # Set project
  gcloud config set project $PROJECT_ID
  
  echo -e "${GREEN}✓ Prerequisites met${NC}"
  echo ""
}

# Setup infrastructure (run once)
setup_infrastructure() {
  echo -e "${YELLOW}Setting up Google Cloud infrastructure...${NC}"
  
  # Enable APIs
  echo "Enabling required APIs..."
  gcloud services enable \
    run.googleapis.com \
    sqladmin.googleapis.com \
    secretmanager.googleapis.com \
    cloudbuild.googleapis.com \
    containerregistry.googleapis.com \
    vpcaccess.googleapis.com \
    servicenetworking.googleapis.com
  
  # Create Cloud SQL instance (if not exists)
  if ! gcloud sql instances describe $DB_INSTANCE >/dev/null 2>&1; then
    echo "Creating Cloud SQL instance..."
    gcloud sql instances create $DB_INSTANCE \
      --database-version=POSTGRES_15 \
      --tier=db-f1-micro \
      --region=$REGION \
      --storage-type=SSD \
      --storage-size=10GB \
      --availability-type=ZONAL \
      --root-password=$(openssl rand -base64 32)
    
    # Create database
    gcloud sql databases create tangred_db --instance=$DB_INSTANCE
    
    echo -e "${GREEN}✓ Cloud SQL instance created${NC}"
  fi
  
  # Create service account
  SA_EMAIL="tangred-api@$PROJECT_ID.iam.gserviceaccount.com"
  if ! gcloud iam service-accounts describe $SA_EMAIL >/dev/null 2>&1; then
    echo "Creating service account..."
    gcloud iam service-accounts create tangred-api \
      --display-name="Tangred API Service Account"
    
    # Grant permissions
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:$SA_EMAIL" \
      --role="roles/cloudsql.client"
    
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:$SA_EMAIL" \
      --role="roles/secretmanager.secretAccessor"
  fi
  
  echo -e "${GREEN}✓ Infrastructure setup complete${NC}"
  echo ""
}

# Setup secrets
setup_secrets() {
  echo -e "${YELLOW}Setting up secrets...${NC}"
  
  # Function to create or update secret
  create_secret() {
    local name=$1
    local value=$2
    
    if gcloud secrets describe $name >/dev/null 2>&1; then
      echo "Updating secret: $name"
      echo -n "$value" | gcloud secrets versions add $name --data-file=-
    else
      echo "Creating secret: $name"
      echo -n "$value" | gcloud secrets create $name --data-file=-
    fi
  }
  
  # Prompt for required secrets
  echo "Please enter the following configuration values:"
  echo ""
  
  read -p "Database URL (postgresql://...): " db_url
  create_secret "db-url" "$db_url"
  
  read -p "Auth Secret (random string): " auth_secret
  create_secret "auth-secret" "$auth_secret"
  
  read -p "Google Client ID: " google_id
  create_secret "google-client-id" "$google_id"
  
  read -p "Google Client Secret: " google_secret
  create_secret "google-client-secret" "$google_secret"
  
  read -p "Gemini API Key: " gemini_key
  create_secret "gemini-api-key" "$gemini_key"
  
  read -p "Anthropic API Key: " anthropic_key
  create_secret "anthropic-api-key" "$anthropic_key"
  
  read -p "Pinecone API Key: " pinecone_key
  create_secret "pinecone-api-key" "$pinecone_key"
  
  read -p "Cloudinary Cloud Name: " cname
  create_secret "cloudinary-cloud-name" "$cname"
  
  read -p "Cloudinary API Key: " ckey
  create_secret "cloudinary-api-key" "$ckey"
  
  read -p "Cloudinary API Secret: " csecret
  create_secret "cloudinary-api-secret" "$csecret"
  
  read -p "Razorpay Key ID: " rkey
  create_secret "razorpay-key-id" "$rkey"
  
  read -p "Razorpay Key Secret: " rsecret
  create_secret "razorpay-key-secret" "$rsecret"
  
  read -p "Resend API Key: " resend_key
  create_secret "resend-api-key" "$resend_key"
  
  echo -e "${GREEN}✓ Secrets configured${NC}"
  echo ""
}

# Deploy backend
deploy_backend() {
  echo -e "${YELLOW}Deploying backend to Cloud Run...${NC}"
  
  # Get Cloud SQL connection name
  CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE --format='value(connectionName)')
  
  # Build and deploy
  gcloud builds submit --config=gcp/cloudbuild.yaml \
    --substitutions=_REGION=$REGION,_SERVICE_NAME=$BACKEND_SERVICE
  
  echo -e "${GREEN}✓ Backend deployed${NC}"
  echo ""
}

# Deploy frontend
deploy_frontend() {
  echo -e "${YELLOW}Deploying frontend to Firebase...${NC}"
  
  # Get backend URL
  BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE --region=$REGION --format='value(status.url)')
  
  # Update environment for frontend build
  cd tangred
  echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > .env.production
  echo "NEXT_PUBLIC_FIREBASE_PROJECT=$PROJECT_ID" >> .env.production
  
  # Build
  npm run build
  
  # Copy to dist folder for Firebase
  mkdir -p ../dist
  cp -r .next/standalone/* ../dist/ 2>/dev/null || cp -r .next/* ../dist/
  cp -r public ../dist/ 2>/dev/null || true
  
  cd ..
  
  # Deploy to Firebase
  firebase deploy --only hosting
  
  echo -e "${GREEN}✓ Frontend deployed${NC}"
  echo ""
}

# Run database migrations
run_migrations() {
  echo -e "${YELLOW}Running database migrations...${NC}"
  
  CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE --format='value(connectionName)')
  
  # Download and run Cloud SQL Proxy
  if [ ! -f "./cloud-sql-proxy" ]; then
    curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
    chmod +x cloud-sql-proxy
  fi
  
  # Run proxy in background
  ./cloud-sql-proxy --port 5432 $CONNECTION_NAME &
  PROXY_PID=$!
  sleep 5
  
  # Get database password from secret
  DB_PASSWORD=$(gcloud secrets versions access latest --secret=db-password 2>/dev/null || echo "")
  
  # Run migrations
  cd tangred
  export DATABASE_URL="postgresql://tangred_app:${DB_PASSWORD}@localhost:5432/tangred_db"
  npx prisma migrate deploy
  cd ..
  
  # Stop proxy
  kill $PROXY_PID 2>/dev/null || true
  
  echo -e "${GREEN}✓ Migrations complete${NC}"
  echo ""
}

# Full deployment
full_deploy() {
  check_prerequisites
  setup_infrastructure
  setup_secrets
  deploy_backend
  run_migrations
  deploy_frontend
  
  echo -e "${GREEN}========================================${NC}"
  echo -e "${GREEN}  Deployment Complete!${NC}"
  echo -e "${GREEN}========================================${NC}"
  echo ""
  echo "Frontend: https://$FRONTEND_SITE.web.app"
  echo "Backend: $(gcloud run services describe $BACKEND_SERVICE --region=$REGION --format='value(status.url)')"
  echo ""
}

# Main menu
case "${1:-menu}" in
  setup)
    check_prerequisites
    setup_infrastructure
    setup_secrets
    ;;
  backend)
    deploy_backend
    ;;
  frontend)
    deploy_frontend
    ;;
  migrate)
    run_migrations
    ;;
  full)
    full_deploy
    ;;
  secrets)
    setup_secrets
    ;;
  *)
    echo "Usage: $0 {setup|backend|frontend|migrate|full|secrets}"
    echo ""
    echo "Commands:"
    echo "  setup     - Setup infrastructure and secrets (first time)"
    echo "  backend   - Deploy backend only"
    echo "  frontend  - Deploy frontend only"
    echo "  migrate   - Run database migrations"
    echo "  full      - Full deployment"
    echo "  secrets   - Update secrets"
    echo ""
    ;;
esac
