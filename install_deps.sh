#!/bin/bash

# Clear npm cache
npm cache clean --force

# Install dependencies with retry mechanism
max_attempts=3
attempt=0

while [ $attempt -lt $max_attempts ]; do
  npm install && break
  attempt=$((attempt+1))
  echo "Installation attempt $attempt failed. Retrying..."
  sleep 2
done

# Verify installations
npm list
