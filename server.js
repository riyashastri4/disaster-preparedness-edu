// Disaster Preparedness Education System - Real-time Express Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Database Connection ---
// Connects to the MongoDB database using the connection string from your .env file.
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- User Schema ---
// Defines the structure for user documents in the database.
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preparednessScore: { type: Number, default: 0 },
    modulesCompleted: { type: [String], default: [] },
    badges: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'disaster-preparedness-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// In-memory data stores (for non-persistent data like WebSocket clients and logs)
const clients = new Map();
const loginLogs = [];

// Create an HTTP server + WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', ws => {
    const clientId = Math.random().toString(36).substring(2, 15);
    clients.set(clientId, { ws, location: null });

    ws.on('message', message => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'location-update') {
                const client = clients.get(clientId);
                if (client) {
                    client.location = data.location;
                    console.log(`Location updated for ${clientId}:`, data.location);
                }
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    });

    ws.on('close', () => {
        console.log(`Client ${clientId} disconnected.`);
        clients.delete(clientId);
    });

    ws.on('error', error => {
        console.error(`WebSocket error for client ${clientId}:`, error);
    });
});

// Helper: Haversine formula for calculating distance
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// =====================
// AUTH ROUTES (Updated for DB)
// =====================

// Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        req.session.userId = newUser._id;
        req.session.user = { id: newUser._id, username: newUser.username, email: newUser.email };

        console.log('New user signed up:', newUser.username);
        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'An internal error occurred during signup.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        req.session.userId = user._id;
        req.session.user = { id: user._id, username: user.username, email: user.email };

        loginLogs.push({ username: user.username, email: user.email, timestamp: new Date().toISOString() });
        console.log('User logged in:', user.username);

        res.json({ success: true, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'An internal error occurred during login.' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Logout error' });
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Current user session check
app.get('/api/user', async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).select('-password');
            if (user) {
                return res.json({ success: true, user: { id: user._id, username: user.username, email: user.email } });
            }
        } catch (error) {
            return res.json({ success: false, message: 'Error fetching user data.' });
        }
    }
    res.json({ success: false, message: 'Not authenticated' });
});


// =====================
// EMERGENCY & ADMIN ROUTES
// =====================

app.post('/api/trigger-alarm', (req, res) => {
    const { userId, disasterType, location } = req.body;
    // ... (This function remains the same)
});

// Admin route for login logs
app.get('/api/logs', (req, res) => {
    res.json(loginLogs.slice().reverse());
});

// Admin route for user progress
app.get('/api/users/progress', async (req, res) => {
    try {
        const users = await User.find().select('username email preparednessScore modulesCompleted');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user progress' });
    }
});

// =====================
// FALLBACK ROUTE
// =====================

// This sends the main HTML file for any requests that don't match the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Modules: Earthquake, Fire, Flood, Cyclone safety`);
    console.log(`🎯 Features: Drills, progress tracking, alerts`);
});
