#!/bin/bash

# Clear existing dependencies
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
npm cache clean --force

# Install dependencies
npm install

# Verify installations
npm list --depth=0
