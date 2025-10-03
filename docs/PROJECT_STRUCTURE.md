# Sports Scheduler Web App - Project Structure

## 📁 **Proper File Organization**

```
Sports Scheduler Web App/
├── 📁 backend/                    # Backend API Server
│   ├── 📁 config/                 # Configuration files
│   │   └── database.js           # MongoDB connection
│   ├── 📁 middleware/             # Custom middleware
│   │   └── auth.js               # Authentication middleware
│   ├── 📁 models/                 # Database models
│   │   └── index.js              # User, Sport, Session models
│   ├── 📁 routes/                 # API route handlers
│   │   ├── auth.js               # Authentication routes
│   │   ├── sports.js             # Sports management routes
│   │   ├── sessions.js           # Session management routes
│   │   └── admin.js              # Admin panel routes
│   ├── server.js                 # Main server file
│   └── package.json              # Backend dependencies
├── 📁 frontend/                   # Frontend Application
│   ├── 📁 css/                   # Stylesheets
│   │   └── styles.css            # Main stylesheet
│   ├── 📁 js/                    # JavaScript files
│   │   └── script.js             # Main frontend logic
│   ├── 📁 assets/                # Static assets (images, icons)
│   └── index.html                # Main HTML file
├── 📁 docs/                       # Documentation
│   ├── README.md                 # Project documentation
│   └── MONGODB_SETUP.md          # Database setup guide
├── 📁 public/                     # Public static files
├── package.json                   # Root package configuration
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── setup.bat                      # Windows setup script
└── setup.sh                       # Linux/Mac setup script
```

## 🔗 **File Connections & Dependencies**

### **Backend Structure**
```
backend/server.js
├── config/database.js            # MongoDB connection
├── middleware/auth.js            # JWT authentication
├── models/index.js               # Database models
└── routes/
    ├── auth.js                   # /api/auth/* routes
    ├── sports.js                 # /api/sports/* routes
    ├── sessions.js               # /api/sessions/* routes
    └── admin.js                  # /api/admin/* routes
```

### **Frontend Structure**
```
frontend/index.html
├── css/styles.css                # All styling
├── js/script.js                  # All JavaScript logic
└── assets/                       # Images, icons, etc.
```

### **API Endpoint Mapping**
| Frontend Function | Backend Route | File Location |
|-------------------|---------------|---------------|
| `handleSignIn()` | `POST /api/auth/signin` | `backend/routes/auth.js` |
| `handleSignUp()` | `POST /api/auth/signup` | `backend/routes/auth.js` |
| `loadSports()` | `GET /api/sports` | `backend/routes/sports.js` |
| `loadSessions()` | `GET /api/sessions` | `backend/routes/sessions.js` |
| `handleCreateSession()` | `POST /api/sessions` | `backend/routes/sessions.js` |
| `joinSession()` | `POST /api/sessions/:id/join` | `backend/routes/sessions.js` |
| `handleCancelSession()` | `POST /api/sessions/:id/cancel` | `backend/routes/sessions.js` |
| `loadUserSessions()` | `GET /api/sessions/user/sessions` | `backend/routes/sessions.js` |
| `handleCreateSport()` | `POST /api/sports` | `backend/routes/sports.js` |
| `generateReport()` | `GET /api/admin/reports` | `backend/routes/admin.js` |

## 🚀 **Benefits of This Structure**

### **1. Separation of Concerns**
- **Backend**: Pure API logic, database operations
- **Frontend**: UI/UX, user interactions
- **Config**: Environment-specific settings
- **Docs**: Project documentation

### **2. Modular Architecture**
- **Models**: Centralized database schemas
- **Routes**: Organized by feature/functionality
- **Middleware**: Reusable authentication logic
- **Config**: Centralized configuration

### **3. Scalability**
- Easy to add new features
- Clear file organization
- Modular code structure
- Independent frontend/backend development

### **4. Maintainability**
- Clear file naming conventions
- Logical directory structure
- Separated concerns
- Easy to debug and test

## 📋 **File Responsibilities**

### **Backend Files**
- `server.js`: Main server setup, middleware, route mounting
- `config/database.js`: MongoDB connection configuration
- `middleware/auth.js`: JWT authentication and admin authorization
- `models/index.js`: Database schemas and models
- `routes/auth.js`: User authentication endpoints
- `routes/sports.js`: Sports management endpoints
- `routes/sessions.js`: Session management endpoints
- `routes/admin.js`: Admin panel endpoints

### **Frontend Files**
- `index.html`: Main HTML structure and UI components
- `css/styles.css`: All styling and responsive design
- `js/script.js`: Frontend logic, API calls, UI interactions

### **Configuration Files**
- `package.json`: Project metadata and scripts
- `.env.example`: Environment variables template
- `.gitignore`: Git ignore rules
- `setup.bat/setup.sh`: Automated setup scripts

## 🔧 **Development Workflow**

1. **Backend Development**: Work in `backend/` directory
2. **Frontend Development**: Work in `frontend/` directory
3. **API Testing**: Use the organized route structure
4. **Database Changes**: Update models in `backend/models/`
5. **New Features**: Add routes in appropriate `backend/routes/` files

This structure provides a professional, scalable, and maintainable codebase that follows industry best practices!
