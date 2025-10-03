# 🏈 Sports Scheduler Web App

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive web application for scheduling sports sessions, built with Node.js, Express, MongoDB, and vanilla JavaScript. Perfect for sports clubs, communities, and organizations to organize and manage sports activities.

## 🌟 **Live Demo**

🚀 **[View Live Demo](https://your-app-url.herokuapp.com)** | 📱 **[API Documentation](https://your-app-url.herokuapp.com/api)**

## 📸 **Screenshots**

| Home Page | Sessions | Admin Panel |
|-----------|----------|-------------|
| ![Home](screenshots/home.png) | ![Sessions](screenshots/sessions.png) | ![Admin](screenshots/admin.png) |

## ✨ **Features**

### 🔐 **Authentication & Security**
- **User Registration & Login** - Secure account creation
- **Role-Based Access** - Player and Admin roles
- **JWT Authentication** - Secure token-based auth
- **Password Security** - bcrypt hashing
- **Session Management** - Persistent user sessions

### 👥 **Player Features**
- **Browse Sessions** - View all available sports sessions
- **Create Sessions** - Organize new sports activities
- **Join Sessions** - Participate in existing sessions
- **Session History** - Track personal activity
- **Cancel Sessions** - Cancel with reason tracking
- **Activity Dashboard** - Personal statistics

### 👨‍💼 **Admin Features**
- **Sports Management** - Add/edit sports categories
- **Analytics Dashboard** - Comprehensive reports
- **User Management** - Monitor user activity
- **Session Oversight** - Manage all sessions
- **Time-based Reports** - Custom date range analytics

### 🏆 **Session Management**
- **Team Organization** - Pre-assign team members
- **Venue Management** - Location-based sessions
- **Date & Time** - Flexible scheduling
- **Player Capacity** - Configurable limits
- **Conflict Prevention** - Smart scheduling
- **Real-time Updates** - Live session status

## 🚀 **Quick Start**

### **Prerequisites**
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) or **MongoDB Atlas** account
- **Git** - [Download](https://git-scm.com/)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sports-scheduler-web-app.git
   cd sports-scheduler-web-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Configure environment variables**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sports-scheduler
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NODE_ENV=development
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - **Frontend**: http://localhost:5000
   - **API**: http://localhost:5000/api

## 🌐 **Deployment**

### **Deploy to Heroku**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/your-username/sports-scheduler-web-app)

1. **Fork this repository**
2. **Create Heroku app**
3. **Set environment variables**
4. **Deploy**

### **Deploy to Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sports-scheduler-web-app)

### **Deploy to Railway**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

### **Manual Deployment**

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 **Documentation**

- 📖 **[Complete Documentation](docs/COMPLETE_MODULE_DOCUMENTATION.txt)** - Full technical documentation
- 🚀 **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- 🌐 **[GitHub Deployment Guide](docs/GITHUB_DEPLOYMENT_GUIDE.md)** - GitHub-specific deployment
- 🗄️ **[MongoDB Setup](docs/MONGODB_SETUP.md)** - Database configuration
- ☁️ **[MongoDB Atlas Setup](docs/MONGODB_ATLAS_SETUP.md)** - Cloud database setup
- 🏗️ **[Project Structure](docs/PROJECT_STRUCTURE.md)** - File organization guide

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **Vanilla JavaScript** - Client-side logic
- **Font Awesome** - Icon library
- **Responsive Design** - Mobile-first approach

### **DevOps & Tools**
- **Git** - Version control
- **npm** - Package management
- **MongoDB Atlas** - Cloud database
- **Heroku/Vercel** - Deployment platforms

## 📋 **API Endpoints**

### **Authentication**
```
POST /api/auth/signup          # User registration
POST /api/auth/signin          # User login
POST /api/auth/change-password # Password change
GET  /api/auth/profile         # Get user profile
```

### **Sports Management**
```
GET    /api/sports             # Get all sports
POST   /api/sports             # Create sport (Admin)
DELETE /api/sports/:id         # Delete sport (Admin)
```

### **Session Management**
```
GET  /api/sessions                    # Get all sessions
POST /api/sessions                    # Create session
POST /api/sessions/:id/join           # Join session
POST /api/sessions/:id/cancel         # Cancel session
GET  /api/sessions/user/sessions      # User's sessions
GET  /api/sessions/user/activity      # User activity stats
```

### **Admin Features**
```
GET /api/admin/reports                # Generate reports
```

## 🎯 **Usage Guide**

### **Getting Started**
1. **Create Admin Account**
   - Sign up with "Admin" role
   - Access admin panel
   - Add sports categories

2. **Create Player Accounts**
   - Sign up with "Player" role
   - Browse available sessions
   - Create and join sessions

3. **Start Scheduling**
   - Create sports sessions
   - Invite players
   - Track activity

### **Creating Sessions**
1. Sign in as a player
2. Navigate to "Sessions" section
3. Click "Create Session"
4. Fill in session details:
   - Select sport
   - Choose date/time
   - Specify venue
   - Set team members
   - Add description

### **Admin Reports**
1. Sign in as admin
2. Go to Admin panel
3. Set date range for reports
4. Generate analytics
5. View session statistics

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/sports-scheduler-web-app.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### **Development Guidelines**
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Follow the existing code style

## 🐛 **Bug Reports**

Found a bug? Please report it:

1. **Check existing issues** - Search for similar problems
2. **Create new issue** - Use the bug report template
3. **Provide details**:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Contributors**

- **Your Name** - *Initial work* - [GitHub](https://github.com/your-username)
- **Contributor 2** - *Feature addition* - [GitHub](https://github.com/contributor2)

## 🙏 **Acknowledgments**

- **Express.js** team for the amazing framework
- **MongoDB** for the robust database
- **Font Awesome** for the beautiful icons
- **Open source community** for inspiration

## 📞 **Support**

Need help? We're here for you:

- 📧 **Email**: support@sports-scheduler.com
- 💬 **Discord**: [Join our community](https://discord.gg/your-server)
- 📖 **Documentation**: Check the `docs/` folder
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/sports-scheduler-web-app/issues)

## 🌟 **Star History**

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/sports-scheduler-web-app&type=Date)](https://star-history.com/#your-username/sports-scheduler-web-app&Date)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the Sports Scheduler Team

[🏠 Homepage](https://your-app-url.com) • [📖 Documentation](docs/) • [🐛 Report Bug](https://github.com/your-username/sports-scheduler-web-app/issues) • [✨ Request Feature](https://github.com/your-username/sports-scheduler-web-app/issues)

</div>

## 📁 **Project Structure**

```
Sports Scheduler Web App/
├── 📁 backend/                    # Backend API Server
│   ├── 📁 config/                # Configuration files
│   ├── 📁 middleware/            # Custom middleware
│   ├── 📁 models/                # Database models
│   ├── 📁 routes/                # API route handlers
│   ├── server.js                 # Main server file
│   └── package.json              # Backend dependencies
├── 📁 frontend/                  # Frontend Application
│   ├── 📁 css/                   # Stylesheets
│   ├── 📁 js/                    # JavaScript files
│   ├── 📁 assets/                # Static assets
│   └── index.html                # Main HTML file
├── 📁 docs/                      # Documentation
├── 📁 public/                    # Public static files
├── package.json                  # Root package configuration
└── setup scripts                 # Automated setup
```

## ✨ **Features**

### **User Authentication**
- User registration and login
- Role-based access (Player/Admin)
- Secure JWT authentication
- Session management

### **Player Features**
- Browse available sports sessions
- Create new sports sessions
- Join existing sessions
- View personal session history
- Cancel created sessions with reason

### **Admin Features**
- Create and manage sports
- View session analytics and reports
- Access to all player features
- Configurable time period reports

### **Session Management**
- Create sessions with team details
- Specify venue, date, and time
- Track joined players
- Prevent joining past sessions
- Session cancellation with notifications

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) or MongoDB Atlas account
- npm (comes with Node.js)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sports-scheduler-web-app
   ```

2. **Run setup script**
   ```bash
   # Windows
   setup.bat
   
   # Linux/Mac
   chmod +x setup.sh && ./setup.sh
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string
   - Set JWT secret

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open browser to `http://localhost:5000`

## 📚 **Documentation**

- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Detailed file organization
- **[Complete Module Documentation](docs/COMPLETE_MODULE_DOCUMENTATION.txt)** - Full technical documentation
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[MongoDB Setup](docs/MONGODB_SETUP.md)** - Database configuration guide
- **[MongoDB Atlas Setup](docs/MONGODB_ATLAS_SETUP.md)** - Cloud database setup

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### **Frontend**
- **HTML5** - Markup
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - Client-side logic
- **Font Awesome** - Icons

## 📋 **Available Scripts**

```bash
# Development
npm run dev          # Start development server with auto-reload

# Production
npm start            # Start production server

# Setup
npm run setup        # Install all dependencies
npm run install-all  # Install backend dependencies
```

## 🚀 **Production Deployment**

### **Prerequisites for Production**
- Node.js (v14 or higher)
- MongoDB Atlas account (recommended)
- Domain name and hosting service
- SSL certificate (for HTTPS)

### **Quick Production Setup**
1. **Configure Environment**
   ```bash
   # Create production environment file
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Database Setup**
   - Create MongoDB Atlas cluster
   - Configure network access
   - Create database user
   - Update MONGODB_URI in .env

3. **Deploy Application**
   ```bash
   npm run install-all
   npm start
   ```

4. **Configure Web Server**
   - Serve static files from `frontend/` directory
   - Set up HTTPS
   - Configure reverse proxy

### **Production Features**
✅ **Security**
- JWT authentication with strong secrets
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection

✅ **Performance**
- MongoDB Atlas optimization
- Efficient API endpoints
- Responsive frontend design
- Static file serving

✅ **Reliability**
- Error handling and logging
- Database connection management
- Graceful shutdown handling
- Production-ready configuration

**📖 For detailed deployment instructions, see [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**

## 🔧 **Configuration**

### **Environment Variables**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sports-scheduler
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### **MongoDB Setup**
- **Local**: Install MongoDB Community Server
- **Cloud**: Use MongoDB Atlas (recommended)

## 🎯 **Usage Guide**

### **Getting Started**
1. Create an admin account (select "Admin" role)
2. Add sports in the admin panel
3. Create player accounts
4. Start creating and joining sessions!

### **Creating Sessions**
1. Sign in as a player
2. Go to "Sessions" section
3. Click "Create Session"
4. Fill in session details

### **Admin Reports**
1. Sign in as admin
2. Go to Admin panel
3. Set date range for reports
4. Generate analytics

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

For support or questions:
- Create an issue in the repository
- Check the documentation in `docs/` folder
- Contact the development team

---

**Happy Scheduling! 🏈⚽🏀**
