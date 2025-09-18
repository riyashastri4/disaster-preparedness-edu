// Disaster Preparedness Education System - Real-time Express Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'disaster-preparedness-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set true if using HTTPS in production
}));

// In-memory data store (replace with DB later)
const clients = new Map();
let userData = {};
let emergencyAlerts = [];
const users = []; // user store

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

            // Handle location updates
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

// Helper: Haversine formula
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
// AUTH ROUTES
// =====================

// Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check existing user
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);

        // Save session
        req.session.userId = newUser.id;
        req.session.user = { id: newUser.id, username: newUser.username, email: newUser.email };

        console.log('New user signed up:', newUser.username);
        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Signup failed.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        req.session.userId = user.id;
        req.session.user = { id: user.id, username: user.username, email: user.email };

        console.log('User logged in:', user.username);
        res.json({
            success: true,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed.' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Logout error' });
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Current user
app.get('/api/user', (req, res) => {
    if (req.session.userId) {
        const user = users.find(u => u.id === req.session.userId);
        if (user) {
            return res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
        }
    }
    res.json({ success: false, message: 'Not authenticated' });
});

// =====================
// EMERGENCY ALERT ROUTES
// =====================

app.post('/api/trigger-alarm', (req, res) => {
    const { userId, disasterType, location } = req.body;

    if (!location || !location.latitude || !location.longitude) {
        return res.status(400).json({ success: false, message: 'Location data is required.' });
    }

    const alarmMessage = {
        type: 'emergency-alert',
        message: `EMERGENCY: A ${disasterType} has been reported nearby!`,
        latitude: location.latitude,
        longitude: location.longitude
    };

    let alertsSent = 0;
    const radius = 500; // 500m

    clients.forEach((client) => {
        if (client.location) {
            const distance = getDistance(
                location.latitude,
                location.longitude,
                client.location.latitude,
                client.location.longitude
            );

            if (distance <= radius && client.ws.readyState === WebSocket.OPEN) {
                client.ws.send(JSON.stringify(alarmMessage));
                alertsSent++;
            }
        }
    });

    res.json({ success: true, message: 'Alarm triggered.', alertsSent });
});

// =====================
// USER PROGRESS ROUTES
// =====================

app.get('/api/user/:userId/progress', (req, res) => {
    const { userId } = req.params;
    const progress = userData[userId] || {
        id: userId,
        preparednessScore: 0,
        modulesCompleted: [],
        badges: [],
        region: 'Delhi'
    };
    res.json(progress);
});

app.post('/api/user/:userId/progress', (req, res) => {
    const { userId } = req.params;
    const progressData = req.body;

    userData[userId] = {
        ...userData[userId],
        ...progressData,
        lastUpdated: new Date().toISOString()
    };

    console.log(`Progress updated for user ${userId}:`, progressData);
    res.json({ success: true, data: userData[userId] });
});

// =====================
// FALLBACK ROUTE
// =====================

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Modules: Earthquake, Fire, Flood, Cyclone safety`);
    console.log(`🎯 Features: Drills, progress tracking, alerts`);
});
