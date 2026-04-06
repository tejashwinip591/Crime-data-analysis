/**
 * API Configuration and Database Setup Guide
 * This file demonstrates how to enhance the API with a real database
 */

// ============================================
// OPTION 1: MongoDB Integration Example
// ============================================

/*
// 1. Install MongoDB driver:
// npm install mongoose

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crimedata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Crime Schema
const crimeSchema = new mongoose.Schema({
    city: String,
    crimeType: String,
    count: Number,
    solvedCount: Number,
    year: Number,
    timestamp: { type: Date, default: Date.now }
});

const Crime = mongoose.model('Crime', crimeSchema);

// Usage in route:
app.get('/api/crime/stats', async (req, res) => {
    try {
        const stats = await Crime.find();
        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
*/

// ============================================
// OPTION 2: PostgreSQL Integration Example
// ============================================

/*
// 1. Install PostgreSQL driver:
// npm install pg

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'crimedata'
});

// Usage in route:
app.get('/api/crime/stats', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM crime_statistics');
        res.json({ success: true, stats: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
*/

// ============================================
// OPTION 3: Firebase Integration Example
// ============================================

/*
// 1. Install Firebase:
// npm install firebase-admin

const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(require('./path/to/serviceAccountKey.json')),
    databaseURL: 'https://your-project.firebaseio.com'
});

const db = admin.database();

// Usage in route:
app.get('/api/crime/stats', async (req, res) => {
    try {
        const snapshot = await db.ref('crime_stats').once('value');
        res.json({ success: true, stats: snapshot.val() });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
*/

// ============================================
// OPTION 4: External API Integration Examples
// ============================================

/*
// A. OpenDataAmerica API
const openDataUSA = async (city) => {
    const response = await axios.get(
        `https://api.opendata.us/gov/crime?city=${city}`
    );
    return response.data;
};

// B. DataUSA API
const dataUSA = async (location) => {
    const response = await axios.get(
        `https://api.datausa.io/api/data?drilldowns=State&measures=Population&year=latest`
    );
    return response.data;
};

// C. Google Maps Safety API
const googleSafetyData = async (lat, lng) => {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
            params: {
                location: `${lat},${lng}`,
                radius: 1000,
                type: 'police',
                key: process.env.GOOGLE_API_KEY
            }
        }
    );
    return response.data;
};
*/

// ============================================
// ADVANCED: Caching Implementation
// ============================================

/*
// 1. Install Redis:
// npm install redis

const redis = require('redis');
const client = redis.createClient();

// Cache middleware
const cacheRoute = (req, res, next) => {
    const key = `route:${req.originalUrl}`;
    
    client.get(key, (err, data) => {
        if (err) throw err;
        
        if (data) {
            res.json(JSON.parse(data));
        } else {
            res.sendResponse = res.json;
            res.json = (body) => {
                client.setex(key, 3600, JSON.stringify(body));
                res.sendResponse(body);
            };
            next();
        }
    });
};

// Usage:
app.get('/api/crime/stats', cacheRoute, async (req, res) => {
    // Your route logic here
});
*/

// ============================================
// ADVANCED: Authentication
// ============================================

/*
// 1. Install JWT:
// npm install jsonwebtoken bcryptjs

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Usage:
app.get('/api/crime/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is protected data' });
});
*/

// ============================================
// ADVANCED: Rate Limiting
// ============================================

/*
// 1. Install rate limiter:
// npm install express-rate-limit

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later'
});

// Apply to all routes
app.use(limiter);

// Or specific routes:
app.get('/api/crime/search', limiter, (req, res) => {
    // Route logic
});
*/

// ============================================
// DEPLOYMENT: Environment Setup
// ============================================

/*
Production .env example:
PORT=5000
NODE_ENV=production
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/crimedata
GOOGLE_API_KEY=your_google_api_key
FACEBOOK_API_KEY=your_facebook_api_key
TWITTER_API_KEY=your_twitter_api_key
ACCESS_TOKEN_SECRET=your_jwt_secret
CORS_ORIGIN=https://yourdomain.com
*/

// ============================================
// MIGRATION STEPS
// ============================================

/*
1. Create Database
   - MongoDB: Create cluster on Atlas
   - PostgreSQL: Create database locally or on managed service
   - Firebase: Create project on Console

2. Update server.js
   - Remove simulated data
   - Add database connection
   - Replace data routes with DB queries

3. Test Each Route
   - Test with Postman before deploying
   - Verify data structure matches frontend

4. Deploy
   - Push to GitHub
   - Connect to Heroku/AWS/DigitalOcean
   - Set environment variables
   - Run database migrations

5. Monitor
   - Set up logging
   - Monitor API performance
   - Track error rates
*/

module.exports = {
    setupGuide: 'See comments above for database integration examples'
};
