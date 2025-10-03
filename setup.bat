@echo off
echo 🏈 Sports Scheduler Web App Setup
echo =================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version

echo.
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo.
    echo 🔧 Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/sports-scheduler
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-%RANDOM%
        echo NODE_ENV=development
    ) > .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the application:
echo   1. Make sure MongoDB is running
echo   2. Run: npm run dev
echo   3. Open: http://localhost:5000
echo.
echo To create your first admin account:
echo   1. Open the app in your browser
echo   2. Click 'Sign Up'
echo   3. Select 'Admin' role
echo   4. Complete registration
echo.
echo Happy scheduling! 🏈⚽🏀
pause
