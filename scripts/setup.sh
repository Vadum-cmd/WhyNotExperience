#!/bin/bash

# BOAT Application Setup Script
# This script automates the setup process

set -e  # Exit on error

echo "🚀 BOAT Application Setup"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL client not found. Make sure PostgreSQL is installed.${NC}"
else
    PSQL_VERSION=$(psql --version)
    echo -e "${GREEN}✅ PostgreSQL: $PSQL_VERSION${NC}"
fi

echo ""
echo "📦 Installing dependencies..."

# Install root dependencies
if [ -f "package.json" ]; then
    echo "Installing root dependencies..."
    npm install
fi

# Install frontend dependencies
if [ -d "frontend" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Install backend dependencies
if [ -d "backend" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Check for .env files
echo "🔧 Checking environment files..."

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found. Please create it from .env.example${NC}"
    echo "   You can run: cp backend/.env.example backend/.env"
    echo "   Then edit backend/.env with your configuration"
else
    echo -e "${GREEN}✅ backend/.env exists${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env not found. Creating from .env.example...${NC}"
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        echo -e "${GREEN}✅ frontend/.env created${NC}"
    fi
else
    echo -e "${GREEN}✅ frontend/.env exists${NC}"
fi

echo ""
echo "📊 Database setup..."
echo "   Please ensure PostgreSQL is running and create the database:"
echo "   createdb boat_db"
echo ""
echo "   Then run migrations:"
echo "   cd backend && npm run build && npm run migrate"
echo ""

echo "✅ Setup script completed!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your database and email settings"
echo "2. Create PostgreSQL database: createdb boat_db"
echo "3. Run migrations: cd backend && npm run build && npm run migrate"
echo "4. (Optional) Seed data: psql boat_db < backend/src/database/seed.sql"
echo "5. Start backend: cd backend && npm run dev"
echo "6. Start frontend: cd frontend && npm start"


