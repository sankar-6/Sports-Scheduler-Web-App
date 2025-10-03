const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sports-scheduler';
    
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log(`📡 Connection String: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials in logs
    
    const options = {
      // Basic connection options
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      // Timeout settings
      serverSelectionTimeoutMS: 30000, // 30 seconds
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      
      // Retry settings
      retryWrites: true,
      retryReads: true,
      
      // For MongoDB Atlas (cloud)
      ...(mongoUri.includes('mongodb+srv://') && {
        // Atlas-specific options
        ssl: true,
        sslValidate: false, // For development only
        authSource: 'admin',
      }),
      
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
    };

    await mongoose.connect(mongoUri, options);

    console.log('✅ Successfully connected to MongoDB!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(`   Error Type: ${error.name}`);
    console.error(`   Error Message: ${error.message}`);
    
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n💡 SSL/TLS Error Solutions:');
      console.log('   1. Check if your IP is whitelisted in Atlas Network Access');
      console.log('   2. Verify database user credentials');
      console.log('   3. Ensure connection string is correct');
      console.log('   4. Try updating Node.js to latest version');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;