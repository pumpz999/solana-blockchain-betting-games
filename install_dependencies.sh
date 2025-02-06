#!/bin/bash

# Ensure clean installation
npm cache clean --force

# Install dependencies with verbose output
npm install \
  @react-three/fiber \
  @react-three/drei \
  three \
  three-stdlib \
  framer-motion \
  --verbose
