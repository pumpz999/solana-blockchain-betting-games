#!/bin/bash

# Aggressive dependency cleanup
echo "🧹 Cleaning up dependencies..."

# Remove node_modules and package-lock
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
npm cache clean --force

# Install dependencies with latest versions
npm install --legacy-peer-deps

# Update npm itself
npm install -g npm@latest

echo "✅ Dependency cleanup complete."
