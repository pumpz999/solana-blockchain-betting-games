#!/bin/bash

# Remove conflicting routes
echo "🧹 Cleaning up route conflicts..."

# Remove duplicate index files
find . -name "index.tsx" -delete
find . -name "index.ts" -delete

# Ensure clean separation of routes
rm -rf pages/index.tsx
rm -rf app/index.tsx

# Create placeholder files if needed
touch src/app/page.tsx
touch src/pages/_app.tsx

echo "✅ Route cleanup complete."
