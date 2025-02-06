#!/bin/bash

# Comprehensive System Diagnostic and Setup Script

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log messages
log() {
    echo -e "${GREEN}[✓] $1${NC}"
}

# Function to log warnings
warn() {
    echo -e "${YELLOW}[!] $1${NC}"
}

# Function to log errors
error() {
    echo -e "${RED}[✗] $1${NC}"
}

# System Information
print_system_info() {
    echo "System Diagnostic Report"
    echo "----------------------"
    log "Operating System: $(uname -a)"
    log "Current User: $(whoami)"
    log "Node.js Version: $(node --version 2>/dev/null || echo 'Not Installed')"
    log "npm Version: $(npm --version 2>/dev/null || echo 'Not Installed')"
    log "Current Directory: $(pwd)"
}

# Dependency Check and Installation
install_dependencies() {
    warn "Checking and Installing System Dependencies..."

    # Update package lists
    sudo apt update || error "Failed to update package lists"

    # Install core dependencies
    sudo apt install -y \
        build-essential \
        curl \
        git \
        wget \
        software-properties-common || error "Failed to install core dependencies"
}

# Node.js and NVM Installation
setup_nodejs() {
    warn "Setting up Node.js and npm..."

    # Install NVM (Node Version Manager)
    if [ ! -d "$HOME/.nvm" ]; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        
        # Source NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    fi

    # Install latest LTS Node.js
    nvm install --lts
    nvm use --lts

    log "Node.js and npm installed successfully"
}

# Project Setup
setup_project() {
    warn "Setting up Project Environment..."

    # Clone or initialize project
    if [ ! -d "solana-blockchain-betting-games" ]; then
        git clone https://github.com/yourusername/solana-blockchain-betting-games.git || \
        mkdir -p solana-blockchain-betting-games
    fi

    cd solana-blockchain-betting-games

    # Install project dependencies
    npm install || error "Failed to install project dependencies"

    # Install global development tools
    npm install -g \
        typescript \
        @types/node \
        next \
        eslint || error "Failed to install global tools"

    log "Project environment setup complete"
}

# Troubleshooting Checks
run_diagnostics() {
    warn "Running Comprehensive Diagnostics..."

    # Check Node.js and npm
    node --version
    npm --version

    # Check project dependencies
    npm list --depth=0

    # Check for potential permission issues
    npm config get prefix
}

# Main Execution
main() {
    clear
    echo "🚀 Blockchain Gaming Platform Setup & Diagnostic Tool 🚀"
    echo "=================================================="

    print_system_info
    install_dependencies
    setup_nodejs
    setup_project
    run_diagnostics

    log "Setup Complete! You can now run 'npm run dev'"
}

# Execute main function
main
