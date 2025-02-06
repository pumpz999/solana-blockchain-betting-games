#!/bin/bash

# Ensure clean slate
rm -rf node_modules
rm package-lock.json

# Reinstall dependencies with specific versions
npm install \
  @project-serum/anchor@0.25.0 \
  @solana/web3.js@^1.78.0 \
  react@^18.2.0 \
  react-dom@^18.2.0 \
  typescript@^5.1.6

# Verify installations
npm list @project-serum/anchor
