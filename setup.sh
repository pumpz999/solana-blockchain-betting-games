#!/bin/bash

# Update and install system dependencies
sudo apt update
sudo apt install -y curl git

# Install Node.js and npm via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Install project dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev
