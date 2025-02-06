#!/bin/bash

# Aggressive cleanup
echo "🧹 Resetting project environment..."

# Remove conflicting directories
rm -rf pages
rm -rf .next
rm -rf node_modules
rm -f package-lock.json
rm -f next.config.js
rm -f tsconfig.json

# Clear npm cache
npm cache clean --force

# Create clean project structure
mkdir -p src/app
mkdir -p src/components
mkdir -p src/styles

# Install dependencies with explicit versions
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node
npm install ethers web3modal tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

echo "✅ Project reset complete."
