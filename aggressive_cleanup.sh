#!/bin/bash

# Print current directory structure
echo "Current Directory Structure:"
find . -maxdepth 2 -type d

# Forcefully remove potential conflict sources
echo "🔥 Initiating Aggressive Cleanup..."

# Remove pages directory with force and verbose output
if [ -d "pages" ]; then
    echo "Removing pages directory..."
    rm -rfv pages
fi

# Remove any index files that might cause conflicts
find . -name "index.tsx" -delete
find . -name "index.ts" -delete

# Ensure app directory exists
mkdir -p app

# Create clean slate for Next.js 14
echo "Creating clean Next.js 14 structure..."
mkdir -p app/admin
mkdir -p app/games
mkdir -p components

# Create mandatory files with minimal content
cat > app/page.tsx << EOL
export default function Home() {
  return <main>Blockchain Gaming Platform</main>
}
EOL

cat > app/layout.tsx << EOL
export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOL

# Remove any lingering configuration files
rm -f next.config.js
rm -f next.config.mjs
rm -f tsconfig.json

# Clear npm cache and node modules
npm cache clean --force
rm -rf node_modules
rm -f package-lock.json

echo "✅ Cleanup Complete. Ready for fresh setup."
