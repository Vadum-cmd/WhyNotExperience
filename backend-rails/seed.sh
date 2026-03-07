#!/bin/bash

# Database Seeding Script
# This script seeds the database with boats, hosts, and experiences

cd "$(dirname "$0")"

echo "🌱 Seeding database..."
echo ""

# Try to run the seed file via Rails console
bundle exec rails runner "load 'db/seeds.rb'"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database seeded successfully!"
    echo ""
    echo "You can now:"
    echo "  - View boats at http://localhost:3000/boats"
    echo "  - Click on 'Azzurra' to see the boat detail page"
    echo ""
else
    echo ""
    echo "❌ Seeding failed. Try running manually:"
    echo ""
    echo "  cd backend-rails"
    echo "  bundle exec rails console"
    echo "  load 'db/seeds.rb'"
    echo ""
fi

