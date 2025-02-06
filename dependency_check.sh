#!/bin/bash

# System and Environment Check
echo "🔍 System Diagnostic Report"
echo "------------------------"

# Node.js Version Check
echo "Node.js Version:"
node --version || echo "Node.js not installed"

# NPM Version Check
echo -e "\nNPM Version:"
npm --version || echo "NPM not installed"

# Current Directory
echo -e "\nCurrent Directory:"
pwd

# Check if Node.js and NPM are in PATH
echo -e "\nNode.js Path:"
which node

echo -e "\nNPM Path:"
which npm

# Check system architecture
echo -e "\nSystem Architecture:"
uname -m

# Check potential permission issues
echo -e "\nNPM Configuration:"
npm config list
