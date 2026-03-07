#!/bin/bash

# Start Rails Backend Server

cd /Users/s.petryshyn/Documents/PersonalProjects/BOAT/backend-rails

echo "🚀 Starting Rails Backend Server..."
echo ""

# Check if port 3001 is in use
if lsof -ti:3001 > /dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use"
    read -p "Kill existing process? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:3001 | xargs kill -9 2>/dev/null
        sleep 2
        echo "✅ Port cleared"
    else
        echo "❌ Cannot start server - port in use"
        exit 1
    fi
fi

# Initialize rbenv if needed
if ! command -v rbenv &> /dev/null; then
    eval "$(rbenv init - zsh)" 2>/dev/null || true
fi

# Start server
echo "Starting Rails server on http://localhost:3001"
echo "Press Ctrl+C to stop"
echo ""

bundle exec rails server -p 3001

