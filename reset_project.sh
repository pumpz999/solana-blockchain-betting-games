#!/bin/bash

# Remove conflicting directories and files
rm -rf pages
rm -rf .next
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Ensure clean Next.js configuration
rm -f next.config.js
rm -f tsconfig.json
