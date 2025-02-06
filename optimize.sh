#!/bin/bash

# Clean build artifacts
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
npm ci

# Build with performance optimizations
NODE_OPTIONS='--max_old_space_size=4096' npm run build

# Start optimized production server
npm run start
