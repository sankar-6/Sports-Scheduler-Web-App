# Sports Scheduler Web App

A comprehensive web application for scheduling sports sessions, built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

### User Authentication
- User registration and login
- Role-based access (Player/Admin)
- Secure JWT authentication
- Session management

### Player Features
- Browse available sports sessions
- Create new sports sessions
- Join existing sessions
- View personal session history
- Cancel created sessions with reason

### Admin Features
- Create and manage sports
- View session analytics and reports
- Access to all player features
- Configurable time period reports

### Session Management
- Create sessions with team details
- Specify venue, date, and time
- Track joined players
- Prevent joining past sessions
- Session cancellation with notifications

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - Client-side logic
- **Font Awesome** - Icons

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd sports-scheduler-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB on your system
   - Start MongoDB service
   - Create a database named `sports-scheduler` (or update the connection string)

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sports-scheduler
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Or production mode
   npm start
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:5000`
   - The frontend will be served from the root directory

## Usage

### Getting Started

1. **Create an Admin Account**
   - Click "Sign Up" on the homepage
   - Select "Admin" as your role
   - Complete the registration

2. **Add Sports**
   - Sign in as admin
   - Go to the Admin panel
   - Add sports that players can create sessions for

3. **Create Player Accounts**
   - Players can sign up with "Player" role
   - Or admins can also act as players

### Creating Sessions

1. Sign in as a player
2. Go to "Sessions" section
3. Click "Create Session"
4. Fill in the details:
   - Select a sport
   - Choose date and time
   - Specify venue
   - Add team players
   - Set number of additional players needed

### Joining Sessions

1. Browse available sessions
2. Click "Join Session" on sessions you want to participate in
3. Your name will appear in the joined players list

### Admin Reports

1. Sign in as admin
2. Go to Admin panel
3. Set date range for reports
4. Click "Generate Report" to see:
   - Total sessions in the period
   - Sport popularity statistics
   - Player participation data

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Sports
- `GET /api/sports` - Get all sports
- `POST /api/sports` - Create new sport (Admin only)

### Sessions
- `GET /api/sessions` - Get all active sessions
- `POST /api/sessions` - Create new session
- `POST /api/sessions/:id/join` - Join a session
- `POST /api/sessions/:id/cancel` - Cancel a session
- `GET /api/user/sessions` - Get user's sessions

### Admin
- `GET /api/admin/reports` - Get session reports

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['player', 'admin']),
  createdAt: Date
}
```

### Sport Model
```javascript
{
  name: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

### Session Model
```javascript
{
  sport: ObjectId (ref: Sport),
  createdBy: ObjectId (ref: User),
  team1Players: [String],
  team2Players: [String],
  additionalPlayersNeeded: Number,
  date: Date,
  venue: String,
  joinedPlayers: [{
    user: ObjectId (ref: User),
    joinedAt: Date
  }],
  status: String (enum: ['active', 'cancelled']),
  cancellationReason: String,
  createdAt: Date
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Role-based access control

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Project Structure
```
sports-scheduler-web-app/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── index.html            # Frontend HTML
├── styles.css            # Frontend CSS
├── script.js             # Frontend JavaScript
└── README.md             # This file
```

### Available Scripts
- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on the port

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in .env file
   - Verify token expiration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository or contact the development team.
