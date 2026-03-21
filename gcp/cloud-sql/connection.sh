#!/bin/bash
# =============================================================================
# TANLERIDA - Cloud SQL Connection Script
# Use this to connect to Cloud SQL from local machine or CI/CD
# =============================================================================

# Configuration
PROJECT_ID="tangred-ecommerce"
REGION="asia-south1"
INSTANCE_NAME="tangred-postgres"
DB_NAME="tangred_db"

# Function to get connection name
get_connection_name() {
  gcloud sql instances describe $INSTANCE_NAME \
    --project=$PROJECT_ID \
    --format='value(connectionName)'
}

# Start Cloud SQL Proxy
start_proxy() {
  CONNECTION_NAME=$(get_connection_name)
  
  echo "Starting Cloud SQL Proxy..."
  echo "Connection: $CONNECTION_NAME"
  
  # Download cloud_sql_proxy if not exists
  if [ ! -f "./cloud_sql_proxy" ]; then
    echo "Downloading Cloud SQL Proxy..."
    curl -o cloud_sql_proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
    chmod +x cloud_sql_proxy
  fi
  
  # Start proxy
  ./cloud_sql_proxy --port 5432 $CONNECTION_NAME
}

# Connect using psql
connect_psql() {
  echo "Connecting to Cloud SQL..."
  
  # If running in Cloud Shell or with proxy
  if [ -n "$CLOUD_SQL_CONNECTION_NAME" ]; then
    psql "postgresql://tangred_app@localhost:5432/$DB_NAME"
  else
    # Direct connection (requires IP whitelisting)
    gcloud sql connect $INSTANCE_NAME \
      --project=$PROJECT_ID \
      --user=tangred_app \
      --database=$DB_NAME
  fi
}

# Run Prisma migrations
run_migrations() {
  echo "Running Prisma migrations..."
  
  # Set connection string for proxy
  export DATABASE_URL="postgresql://tangred_app@localhost:5432/$DB_NAME"
  
  cd tangred
  npx prisma migrate deploy
}

# Backup database
backup() {
  echo "Creating database backup..."
  
  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
  BUCKET="gs://tangred-backups"
  
  gcloud sql backups create \
    --project=$PROJECT_ID \
    --instance=$INSTANCE_NAME
  
  echo "Backup initiated. Check status in Cloud Console."
}

# Main
case "$1" in
  proxy)
    start_proxy
    ;;
  connect)
    connect_psql
    ;;
  migrate)
    run_migrations
    ;;
  backup)
    backup
    ;;
  *)
    echo "Usage: $0 {proxy|connect|migrate|backup}"
    exit 1
    ;;
esac
