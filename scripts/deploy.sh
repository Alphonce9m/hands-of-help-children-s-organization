#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting deployment process..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "ℹ️  Please create a .env.production file based on .env.example"
    exit 1
fi

# Load environment variables
echo "🔍 Loading environment variables..."
if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

# Check Node.js version
REQUIRED_NODE="18.18.0"
CURRENT_NODE=$(node -v | cut -d'v' -f2)
if [ "$(printf '%s\n' "$REQUIRED_NODE" "$CURRENT_NODE" | sort -V | head -n1)" != "$REQUIRED_NODE" ]; then
    echo "⚠️  Warning: Node.js $REQUIRED_NODE is required. Current version is $CURRENT_NODE"
    echo "ℹ️  Consider using nvm to manage Node.js versions"
    read -p "Continue anyway? [y/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️  Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "🚀 Starting the application..."

# Run the application
npm run start
