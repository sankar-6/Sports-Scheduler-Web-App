# MongoDB Atlas Setup Guide

## 🌐 **Complete MongoDB Atlas Setup**

### **Step 1: Create Atlas Account & Cluster**

1. **Visit MongoDB Atlas:**
   - Go to: https://www.mongodb.com/atlas
   - Click "Try Free" or "Start Free"

2. **Sign Up:**
   - Create account with email or Google
   - Choose "Build a new app" → "I'm learning MongoDB"

3. **Create Free Cluster:**
   - Select **M0 Sandbox** (Free tier)
   - Choose **AWS** as cloud provider
   - Select region closest to you
   - Name: "SportsScheduler"
   - Click "Create Cluster"

### **Step 2: Configure Security**

#### **Network Access:**
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

#### **Database User:**
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: "Password"
4. Username: `sports_admin`
5. Password: Generate or create your own
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### **Step 3: Get Connection String**

1. Go to "Clusters" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: "Node.js"
5. Version: "4.1 or later"
6. Copy the connection string

### **Step 4: Update Your Application**

#### **Update .env file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://sports_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports-scheduler?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
NODE_ENV=development
```

#### **Replace in connection string:**
- `YOUR_PASSWORD` → Your actual database user password
- `cluster0.xxxxx` → Your actual cluster name
- `sports-scheduler` → Your database name

### **Step 5: Test Connection**

Run the test script to verify connection:
```bash
cd backend
node test-mongodb.js
```

### **Step 6: Start Application**

```bash
cd backend
node server.js
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **SSL/TLS Errors:**
   - Ensure IP is whitelisted in Network Access
   - Check username/password are correct
   - Verify connection string format

2. **Authentication Failed:**
   - Check database user exists
   - Verify password is correct
   - Ensure user has proper permissions

3. **Network Timeout:**
   - Check Network Access settings
   - Verify firewall isn't blocking connection
   - Try different region if available

### **Connection String Examples:**

#### **Basic Atlas Connection:**
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

#### **With Options:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

#### **With SSL Options:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&ssl=true&authSource=admin
```

## ✅ **Verification Steps**

1. **Check Cluster Status:** Should show "Running" in Atlas dashboard
2. **Test Connection:** Use the test script
3. **Verify Database:** Check if collections are created
4. **Monitor Logs:** Watch for connection success messages

## 🚀 **Benefits of MongoDB Atlas**

- **Managed Service:** No server maintenance
- **Automatic Backups:** Built-in backup system
- **Scalability:** Easy to scale up/down
- **Security:** Enterprise-grade security
- **Monitoring:** Built-in performance monitoring
- **Global:** Multiple regions available
