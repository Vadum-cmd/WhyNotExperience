#!/bin/bash

# BOAT Project Startup Script
# This script helps you start all parts of the application

echo "🚤 BOAT Project Startup"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby is not installed. Please install Ruby 3.2.0+"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL 14+"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Function to start backend
start_backend() {
    echo -e "${YELLOW}Starting Rails Backend...${NC}"
    cd backend-rails
    
    if [ ! -f "Gemfile.lock" ]; then
        echo "Installing Ruby dependencies..."
        bundle install
    fi
    
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        cp .env.example .env
        echo "⚠️  Please edit backend-rails/.env with your database credentials"
    fi
    
    echo "Starting Rails server on port 3001..."
    bundle exec rails server
}

# Function to start frontend
start_frontend() {
    echo -e "${YELLOW}Starting React Frontend...${NC}"
    cd frontend-web
    
    if [ ! -d "node_modules" ]; then
        echo "Installing Node dependencies..."
        npm install
    fi
    
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        cp .env.example .env
    fi
    
    echo "Starting React dev server on port 3000..."
    npm start
}

# Main menu
echo "What would you like to start?"
echo "1) Backend (Rails) only"
echo "2) Frontend (React Web) only"
echo "3) Both Backend and Frontend"
echo "4) Show manual instructions"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo "Starting both services..."
        echo "⚠️  You'll need to run this script twice in separate terminals"
        echo ""
        echo "Terminal 1 - Backend:"
        echo "  cd backend-rails && bundle exec rails server"
        echo ""
        echo "Terminal 2 - Frontend:"
        echo "  cd frontend-web && npm start"
        ;;
    4)
        echo ""
        echo "Manual Startup Instructions:"
        echo "============================"
        echo ""
        echo "Terminal 1 - Backend:"
        echo "  cd backend-rails"
        echo "  bundle install          # First time only"
        echo "  bundle exec rails db:create db:migrate db:seed  # First time only"
        echo "  bundle exec rails server"
        echo ""
        echo "Terminal 2 - Frontend:"
        echo "  cd frontend-web"
        echo "  npm install             # First time only"
        echo "  npm start"
        echo ""
        echo "Then open: http://localhost:3000"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
