-- =============================================================================
-- TANLERIDA - Google Cloud SQL (PostgreSQL) Setup Script
-- =============================================================================

-- Create database (run as postgres user)
-- CREATE DATABASE tangred_db;

-- Connect to tangred_db
\c tangred_db;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'Asia/Kolkata';

-- Create application user (replace with strong password)
-- CREATE USER tangred_app WITH PASSWORD 'your-strong-password';

-- Grant privileges
-- GRANT ALL PRIVILEGES ON DATABASE tangred_db TO tangred_app;
-- GRANT ALL ON SCHEMA public TO tangred_app;

-- Create indexes for performance
-- These will be created by Prisma migrations, but listed here for reference

-- Product search index
CREATE INDEX IF NOT EXISTS idx_product_name ON Product USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_product_slug ON Product(slug);
CREATE INDEX IF NOT EXISTS idx_product_category ON Product(categoryId);
CREATE INDEX IF NOT EXISTS idx_product_featured ON Product(isFeatured) WHERE isFeatured = true;

-- Order indexes
CREATE INDEX IF NOT EXISTS idx_order_user ON "Order"(userId);
CREATE INDEX IF NOT EXISTS idx_order_status ON "Order"(status);
CREATE INDEX IF NOT EXISTS idx_order_created ON "Order"(createdAt);

-- User indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_google ON "User"(googleId) WHERE googleId IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_tanleida ON "User"(tanLeidaId) WHERE tanLeidaId IS NOT NULL;

-- Tan Leida Session indexes
CREATE INDEX IF NOT EXISTS idx_tl_session_user ON TanLeidaSession(userId);
CREATE INDEX IF NOT EXISTS idx_tl_session_code ON TanLeidaSession(sessionCode);
CREATE INDEX IF NOT EXISTS idx_tl_session_status ON TanLeidaSession(status);

-- Cart indexes
CREATE INDEX IF NOT EXISTS idx_cart_user ON Cart(userId);
CREATE INDEX IF NOT EXISTS idx_cartitem_cart ON CartItem(cartId);

-- Review indexes
CREATE INDEX IF NOT EXISTS idx_review_product ON Review(productId);
CREATE INDEX IF NOT EXISTS idx_review_user ON Review(userId);

-- Maintenance and monitoring
-- Enable query statistics extension for Cloud SQL Insights
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Set performance parameters (configured in Cloud SQL flags)
-- effective_cache_size = '6GB'
-- shared_buffers = '2GB'
-- work_mem = '50MB'
-- maintenance_work_mem = '512MB'
