#!/bin/bash

# Forcefully remove all potential conflict sources
echo "🧹 Starting Ultimate Cleanup Process..."

# Remove pages directory completely
rm -rf pages

# Remove any existing Next.js build artifacts
rm -rf .next
rm -rf node_modules
rm -f package-lock.json
rm -f tsconfig.json

# Remove any lingering configuration files
rm -f next.config.js
rm -f next.config.mjs

# Create clean project structure
mkdir -p app
mkdir -p components
mkdir -p lib

# Create a clean slate for Next.js 14
touch app/page.tsx
touch app/layout.tsx

# Clear npm cache
npm cache clean --force

echo "✅ Cleanup Complete. Ready for fresh setup."
