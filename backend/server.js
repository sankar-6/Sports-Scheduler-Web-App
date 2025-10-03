const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

// Import database connection
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const sportsRoutes = require('./routes/sports');
const sessionsRoutes = require('./routes/sessions');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('../frontend'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
