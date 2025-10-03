#!/bin/bash

# Sports Scheduler Web App - Setup Script
echo "🏈 Sports Scheduler Web App Setup"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB first."
    echo "   Visit: https://www.mongodb.com/try/download/community"
    echo "   Or use MongoDB Atlas for cloud database"
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "🔧 Creating .env file..."
    cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sports-scheduler
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(date +%s)
NODE_ENV=development
EOL
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the application:"
echo "  1. Make sure MongoDB is running"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:5000"
echo ""
echo "To create your first admin account:"
echo "  1. Open the app in your browser"
echo "  2. Click 'Sign Up'"
echo "  3. Select 'Admin' role"
echo "  4. Complete registration"
echo ""
echo "Happy scheduling! 🏈⚽🏀"
