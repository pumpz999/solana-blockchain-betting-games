#!/bin/bash

# Aggressive route cleanup
echo "🧹 Cleaning up route conflicts..."

# Remove Pages Router completely
rm -rf pages

# Remove any lingering index files
find . -name "index.tsx" -delete
find . -name "index.ts" -delete

# Ensure clean App Router structure
mkdir -p src/app
mkdir -p src/app/admin
mkdir -p src/app/games

echo "✅ Route cleanup complete."
