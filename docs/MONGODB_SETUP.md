# MongoDB Configuration Guide

## Option 1: Local MongoDB Installation

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download Windows version
   - Install with default settings

2. **Start MongoDB Service:**
   ```bash
   # Run as Administrator:
   net start MongoDB
   ```

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   ```

## Option 2: MongoDB Atlas (Cloud - Recommended)

1. **Create Atlas Account:**
   - Go to: https://www.mongodb.com/atlas
   - Sign up for free
   - Create a new cluster (M0 Sandbox - Free)

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update .env file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sports-scheduler?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

## Option 3: Docker (If you have Docker installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Quick Test

After setting up MongoDB, restart your application:
```bash
npm run dev
```

You should see: "Connected to MongoDB" instead of connection errors.
