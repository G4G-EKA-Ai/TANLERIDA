#!/bin/bash
# =============================================================================
# TANLERIDA - Google Cloud Platform Setup Script
# One-time infrastructure setup
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_ID="${PROJECT_ID:-tangred-ecommerce}"
REGION="${REGION:-asia-south1}"
BILLING_ACCOUNT="${BILLING_ACCOUNT:-}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TANLERIDA - GCP Infrastructure Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check gcloud
command -v gcloud >/dev/null 2>&1 || { 
  echo -e "${RED}Error: gcloud CLI is not installed${NC}"
  echo "Install from: https://cloud.google.com/sdk/docs/install"
  exit 1
}

# Login
echo -e "${YELLOW}Checking Google Cloud authentication...${NC}"
gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@" || {
  echo -e "${YELLOW}Please login to Google Cloud...${NC}"
  gcloud auth login
}

# Create or select project
echo ""
echo -e "${YELLOW}Setting up project: $PROJECT_ID${NC}"

if gcloud projects describe $PROJECT_ID >/dev/null 2>&1; then
  echo "Project already exists, using existing project."
else
  echo "Creating new project..."
  gcloud projects create $PROJECT_ID --name="Tangred E-Commerce"
  
  if [ -z "$BILLING_ACCOUNT" ]; then
    echo -e "${YELLOW}Please enter your Billing Account ID:${NC}"
    gcloud billing accounts list
    read -p "Billing Account ID: " BILLING_ACCOUNT
  fi
  
  gcloud billing projects link $PROJECT_ID --billing-account=$BILLING_ACCOUNT
fi

gcloud config set project $PROJECT_ID

# Enable APIs
echo ""
echo -e "${YELLOW}Enabling required APIs...${NC}"

gcloud services enable \
  cloudresourcemanager.googleapis.com \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  container.googleapis.com \
  vpcaccess.googleapis.com \
  servicenetworking.googleapis.com \
  firebase.googleapis.com \
  firestore.googleapis.com \
  storage.googleapis.com \
  cloudfunctions.googleapis.com

echo -e "${GREEN}✓ APIs enabled${NC}"

# Create Cloud SQL instance
echo ""
echo -e "${YELLOW}Creating Cloud SQL PostgreSQL instance...${NC}"

DB_INSTANCE="tangred-postgres"
DB_ROOT_PASSWORD=$(openssl rand -base64 32)

if gcloud sql instances describe $DB_INSTANCE >/dev/null 2>&1; then
  echo -e "${YELLOW}Cloud SQL instance already exists${NC}"
else
  gcloud sql instances create $DB_INSTANCE \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=$REGION \
    --storage-type=SSD \
    --storage-size=10GB \
    --storage-auto-increase \
    --availability-type=ZONAL \
    --root-password="$DB_ROOT_PASSWORD"
  
  # Create database
  gcloud sql databases create tangred_db --instance=$DB_INSTANCE
  
  # Store root password in secrets
  echo -n "$DB_ROOT_PASSWORD" | gcloud secrets create db-root-password --data-file=-
  
  echo -e "${GREEN}✓ Cloud SQL instance created${NC}"
  echo "Root password stored in Secret Manager"
fi

# Create application user
DB_APP_PASSWORD=$(openssl rand -base64 24)
echo -n "$DB_APP_PASSWORD" | gcloud secrets create db-password --data-file=-

# Create service account
echo ""
echo -e "${YELLOW}Creating service accounts...${NC}"

SA_NAME="tangred-api"
SA_EMAIL="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

if gcloud iam service-accounts describe $SA_EMAIL >/dev/null 2>&1; then
  echo "Service account already exists"
else
  gcloud iam service-accounts create $SA_NAME \
    --display-name="Tangred API Service Account"
  
  # Grant permissions
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/cloudsql.client"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/secretmanager.secretAccessor"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/logging.logWriter"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/monitoring.metricWriter"
  
  echo -e "${GREEN}✓ Service account created${NC}"
fi

# Create VPC Connector for Cloud SQL
echo ""
echo -e "${YELLOW}Setting up VPC Connector...${NC}"

VPC_CONNECTOR="tangred-connector"

if gcloud compute networks vpc-access connectors describe $VPC_CONNECTOR --region=$REGION >/dev/null 2>&1; then
  echo "VPC Connector already exists"
else
  # Enable required API
  gcloud services enable vpcaccess.googleapis.com
  
  gcloud compute networks vpc-access connectors create $VPC_CONNECTOR \
    --region=$REGION \
    --range=10.8.0.0/28 \
    --min-instances=2 \
    --max-instances=10
  
  echo -e "${GREEN}✓ VPC Connector created${NC}"
fi

# Create Cloud Storage bucket for backups
echo ""
echo -e "${YELLOW}Creating Cloud Storage bucket...${NC}"

BUCKET_NAME="$PROJECT_ID-backups"

if gsutil ls -b gs://$BUCKET_NAME >/dev/null 2>&1; then
  echo "Storage bucket already exists"
else
  gsutil mb -l $REGION gs://$BUCKET_NAME
  gsutil versioning set on gs://$BUCKET_NAME
  echo -e "${GREEN}✓ Storage bucket created${NC}"
fi

# Setup Firebase
echo ""
echo -e "${YELLOW}Setting up Firebase...${NC}"

command -v firebase >/dev/null 2>&1 || {
  echo "Installing Firebase CLI..."
  npm install -g firebase-tools
}

firebase login --reauth 2>/dev/null || firebase login

# Initialize Firebase project
firebase projects:create $PROJECT_ID --display-name="Tangred E-Commerce" 2>/dev/null || true
firebase use $PROJECT_ID

# Enable Firebase services
firebase init firestore --project=$PROJECT_ID --non-interactive 2>/dev/null || true
firebase init hosting --project=$PROJECT_ID --non-interactive 2>/dev/null || true
firebase init storage --project=$PROJECT_ID --non-interactive 2>/dev/null || true

echo -e "${GREEN}✓ Firebase initialized${NC}"

# Summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Infrastructure Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Cloud SQL Instance: $DB_INSTANCE"
echo "Service Account: $SA_EMAIL"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Configure secrets: ./scripts/deploy.sh secrets"
echo "2. Deploy application: ./scripts/deploy.sh full"
echo ""
