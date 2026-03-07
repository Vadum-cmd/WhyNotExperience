#!/bin/bash

# Quick fix for rbenv not working in current shell

echo "🔧 Initializing rbenv in current shell..."

# Initialize rbenv
eval "$(rbenv init - zsh)"

# Rehash to update shims
rbenv rehash

# Check Ruby version
echo ""
echo "Current Ruby version:"
ruby -v

echo ""
echo "Ruby location:"
which ruby

echo ""
echo "✅ rbenv initialized!"
echo ""
echo "To make this permanent, restart your terminal or run:"
echo "  source ~/.zshrc"
echo ""

