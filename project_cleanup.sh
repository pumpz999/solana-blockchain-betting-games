#!/bin/bash

# Remove conflicting directories and files
rm -rf pages
rm -rf .next
rm -rf node_modules
rm -f package-lock.json
rm -f tsconfig.json

# Clear npm cache
npm cache clean --force

# Recreate essential directories
mkdir -p app/admin
mkdir -p app/games
mkdir -p components

# Create placeholder files to prevent future conflicts
touch app/page.tsx
touch app/layout.tsx
