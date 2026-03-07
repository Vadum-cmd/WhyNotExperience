#!/bin/bash

# PostgreSQL Setup Script for BOAT Application
# This script helps set up the database

set -e

echo "🐘 PostgreSQL Setup for BOAT Application"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed.${NC}"
    echo "Please install PostgreSQL first:"
    echo "  macOS: brew install postgresql@14"
    echo "  Linux: sudo apt install postgresql"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL found: $(psql --version)${NC}"
echo ""

# Check if PostgreSQL is running
if pg_isready -h localhost -p 5432 &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL might not be running${NC}"
    echo "Starting PostgreSQL..."
    
    # Try to start PostgreSQL (macOS Homebrew)
    if command -v brew &> /dev/null; then
        brew services start postgresql@16 2>/dev/null || brew services start postgresql@14 2>/dev/null || true
        sleep 2
    fi
    
    if ! pg_isready -h localhost -p 5432 &> /dev/null; then
        echo -e "${RED}❌ Could not start PostgreSQL. Please start it manually.${NC}"
        echo "  macOS: brew services start postgresql@16"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}Setting up database...${NC}"
echo ""

# Get current user
CURRENT_USER=$(whoami)
echo "Current user: $CURRENT_USER"
echo ""

# Try to connect and create database
echo "Attempting to create database 'boat_db'..."

# Try different connection methods
if psql -U postgres -d postgres -c "SELECT 1;" &> /dev/null; then
    DB_USER="postgres"
    echo -e "${GREEN}✅ Connected as 'postgres' user${NC}"
elif psql -U $CURRENT_USER -d postgres -c "SELECT 1;" &> /dev/null; then
    DB_USER=$CURRENT_USER
    echo -e "${GREEN}✅ Connected as '$CURRENT_USER' user${NC}"
elif psql -d postgres -c "SELECT 1;" &> /dev/null; then
    DB_USER=$CURRENT_USER
    echo -e "${GREEN}✅ Connected (no user specified)${NC}"
else
    echo -e "${YELLOW}⚠️  Could not connect automatically.${NC}"
    echo ""
    echo "Please run these commands manually:"
    echo "  1. psql -U postgres"
    echo "  2. CREATE DATABASE boat_db;"
    echo "  3. \\q"
    echo ""
    read -p "Press Enter to continue with manual setup..."
    exit 0
fi

# Create database
if psql -U $DB_USER -d postgres -c "SELECT 1 FROM pg_database WHERE datname='boat_db';" | grep -q 1; then
    echo -e "${YELLOW}⚠️  Database 'boat_db' already exists${NC}"
    read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        psql -U $DB_USER -d postgres -c "DROP DATABASE boat_db;"
        echo -e "${GREEN}✅ Dropped existing database${NC}"
    else
        echo -e "${GREEN}✅ Using existing database${NC}"
        exit 0
    fi
fi

# Create the database
psql -U $DB_USER -d postgres -c "CREATE DATABASE boat_db;" || {
    echo -e "${RED}❌ Failed to create database${NC}"
    exit 1
}

echo -e "${GREEN}✅ Database 'boat_db' created successfully${NC}"
echo ""

# Set password if using postgres user
if [ "$DB_USER" = "postgres" ]; then
    echo -e "${BLUE}Setting password for 'postgres' user...${NC}"
    echo "Enter a password for the 'postgres' user (or press Enter to skip):"
    read -s POSTGRES_PASSWORD
    
    if [ -n "$POSTGRES_PASSWORD" ]; then
        psql -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD '$POSTGRES_PASSWORD';" || {
            echo -e "${YELLOW}⚠️  Could not set password automatically${NC}"
            echo "You can set it manually:"
            echo "  psql -U postgres"
            echo "  ALTER USER postgres WITH PASSWORD 'your_password';"
        }
        echo -e "${GREEN}✅ Password set${NC}"
        echo ""
        echo -e "${BLUE}Your database configuration:${NC}"
        echo "  DB_HOST=localhost"
        echo "  DB_PORT=5432"
        echo "  DB_NAME=boat_db"
        echo "  DB_USER=postgres"
        echo "  DB_PASSWORD=$POSTGRES_PASSWORD"
    else
        echo -e "${YELLOW}⚠️  No password set. Using default authentication.${NC}"
        echo ""
        echo -e "${BLUE}Your database configuration:${NC}"
        echo "  DB_HOST=localhost"
        echo "  DB_PORT=5432"
        echo "  DB_NAME=boat_db"
        echo "  DB_USER=postgres"
        echo "  DB_PASSWORD="
    fi
else
    echo -e "${BLUE}Your database configuration:${NC}"
    echo "  DB_HOST=localhost"
    echo "  DB_PORT=5432"
    echo "  DB_NAME=boat_db"
    echo "  DB_USER=$DB_USER"
    echo "  DB_PASSWORD="
fi

echo ""
echo -e "${GREEN}✅ PostgreSQL setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with the database configuration above"
echo "2. Run database migrations: cd backend && npm run build && npm run migrate"


