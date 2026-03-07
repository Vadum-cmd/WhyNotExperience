#!/bin/bash

# Ruby 3.2.0 Setup Script for BOAT Project
# This script installs rbenv and Ruby 3.2.0

set -e

echo "🚀 Setting up Ruby 3.2.0 for BOAT project"
echo "=========================================="
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed."
    echo "Please install Homebrew first:"
    echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

echo "✅ Homebrew found"
echo ""

# Install rbenv if not installed
if ! command -v rbenv &> /dev/null; then
    echo "📦 Installing rbenv..."
    brew install rbenv ruby-build
    echo "✅ rbenv installed"
else
    echo "✅ rbenv already installed"
fi

# Add rbenv to shell
if ! grep -q 'rbenv init' ~/.zshrc 2>/dev/null; then
    echo "📝 Adding rbenv to ~/.zshrc..."
    echo '' >> ~/.zshrc
    echo '# rbenv' >> ~/.zshrc
    echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
    echo "✅ Added to ~/.zshrc"
else
    echo "✅ rbenv already in ~/.zshrc"
fi

# Initialize rbenv for current session
eval "$(rbenv init - zsh)"

# Check if Ruby 3.2.0 is installed
if rbenv versions | grep -q "3.2.0"; then
    echo "✅ Ruby 3.2.0 already installed"
else
    echo "📦 Installing Ruby 3.2.0 (this may take a few minutes)..."
    rbenv install 3.2.0
    echo "✅ Ruby 3.2.0 installed"
fi

# Set as global default
echo "🔧 Setting Ruby 3.2.0 as global default..."
rbenv global 3.2.0
rbenv rehash

# Verify installation
echo ""
echo "Verifying installation..."
RUBY_VERSION=$(ruby -v | awk '{print $2}')
echo "Current Ruby version: $RUBY_VERSION"

if [[ "$RUBY_VERSION" == "3.2.0"* ]]; then
    echo "✅ Ruby 3.2.0 is active!"
else
    echo "⚠️  Warning: Ruby version is $RUBY_VERSION, expected 3.2.0"
    echo "Try running: source ~/.zshrc"
fi

# Install bundler
echo ""
echo "📦 Installing bundler..."
gem install bundler
echo "✅ Bundler installed"

echo ""
echo "=========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your terminal OR run: source ~/.zshrc"
echo "2. Navigate to backend: cd backend-rails"
echo "3. Install gems: bundle install"
echo "4. Set up database: bundle exec rails db:create db:migrate db:seed"
echo "5. Start server: bundle exec rails server"
echo ""
echo "Note: If you see 'command not found: #', you're copying comments."
echo "      Only run the actual commands (without the # symbol)."
echo ""

