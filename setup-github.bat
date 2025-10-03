@echo off
echo 🚀 Sports Scheduler Web App - GitHub Setup
echo ==========================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Add all files to git
echo 📝 Adding files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Sports Scheduler Web App

- Complete web application for sports session scheduling
- Node.js/Express backend with MongoDB
- Responsive frontend with vanilla JavaScript
- User authentication and role-based access
- Session management and admin features
- Production-ready with comprehensive documentation"

echo ✅ Initial commit created

echo.
echo 📋 Repository Information:
echo =========================
echo Repository Name: sports-scheduler-web-app
echo Description: A comprehensive web application for scheduling sports sessions
echo Topics: sports, scheduler, web-app, mongodb, express, nodejs
echo.

echo 🎯 Next Steps:
echo ==============
echo 1. Create repository on GitHub:
echo    - Go to https://github.com/new
echo    - Repository name: sports-scheduler-web-app
echo    - Description: A comprehensive web application for scheduling sports sessions
echo    - Make it public
echo    - Don't initialize with README (we already have one)
echo.
echo 2. Add remote origin:
echo    git remote add origin https://github.com/YOUR_USERNAME/sports-scheduler-web-app.git
echo.
echo 3. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. Configure deployment:
echo    - Follow docs\GITHUB_DEPLOYMENT_GUIDE.md
echo    - Set up Heroku, Vercel, or Railway
echo    - Configure environment variables
echo    - Deploy your application
echo.

echo 📁 Repository Structure:
echo ========================
echo Sports Scheduler Web App\
echo ├── 📁 backend\                    # Backend API Server
echo │   ├── 📁 config\                  # Configuration files
echo │   ├── 📁 middleware\              # Custom middleware
echo │   ├── 📁 models\                  # Database models
echo │   ├── 📁 routes\                  # API route handlers
echo │   ├── server.js                   # Main server file
echo │   └── package.json               # Backend dependencies
echo ├── 📁 frontend\                    # Frontend Application
echo │   ├── 📁 css\                     # Stylesheets
echo │   ├── 📁 js\                      # JavaScript files
echo │   ├── 📁 assets\                  # Static assets
echo │   └── index.html                  # Main HTML file
echo ├── 📁 docs\                        # Documentation
echo ├── 📁 .github\                     # GitHub templates
echo ├── README.md                       # Project documentation
echo ├── LICENSE                         # MIT License
echo ├── CONTRIBUTING.md                 # Contribution guidelines
echo ├── .gitignore                      # Git ignore rules
echo └── package.json                    # Root package configuration
echo.

echo ✨ Key Features:
echo ================
echo ✅ User authentication with JWT
echo ✅ Role-based access (Player/Admin)
echo ✅ Sports session management
echo ✅ Real-time session updates
echo ✅ Admin analytics dashboard
echo ✅ Responsive design
echo ✅ MongoDB integration
echo ✅ Production-ready deployment
echo ✅ Comprehensive documentation
echo.

echo 🌐 Deployment Options:
echo =====================
echo 1. Heroku (Recommended)
echo    - One-click deployment
echo    - Free tier available
echo    - Easy MongoDB Atlas integration
echo.
echo 2. Vercel
echo    - Fast deployment
echo    - Great for frontend
echo    - Automatic deployments
echo.
echo 3. Railway
echo    - Modern platform
echo    - Easy database integration
echo    - Competitive pricing
echo.

echo 🎉 Your Sports Scheduler Web App is ready for GitHub!
echo 📖 Check docs\GITHUB_DEPLOYMENT_GUIDE.md for detailed deployment instructions
echo.
echo Happy coding! 🚀
pause
