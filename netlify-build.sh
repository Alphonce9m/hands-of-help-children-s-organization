#!/bin/bash

# Exit on any error
set -e

# Clean up any existing node_modules and cache
rm -rf node_modules/.prisma
rm -rf node_modules/.cache
rm -rf .next/cache

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build the application
npm run build
