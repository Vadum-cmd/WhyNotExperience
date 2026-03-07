#!/bin/bash

# Test if Rails server can start

cd /Users/s.petryshyn/Documents/PersonalProjects/BOAT/backend-rails

echo "🧪 Testing Rails server..."
echo ""

# Check if server is already running
if lsof -ti:3001 > /dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use"
    echo "Stopping existing process..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Start server in background
echo "Starting Rails server..."
bundle exec rails server -p 3001 > /tmp/rails-server.log 2>&1 &
RAILS_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
for i in {1..10}; do
    sleep 1
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Server is running!"
        echo ""
        echo "Testing endpoints:"
        curl -s http://localhost:3001/health | head -3
        echo ""
        echo "✅ Server test successful!"
        kill $RAILS_PID 2>/dev/null
        exit 0
    fi
done

echo "❌ Server failed to start"
echo "Check logs:"
tail -20 /tmp/rails-server.log
kill $RAILS_PID 2>/dev/null
exit 1

