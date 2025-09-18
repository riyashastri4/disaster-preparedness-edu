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
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- User Schema ---
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
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// In-memory data stores (for non-user data)
const clients = new Map();
const loginLogs = [];

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ... (Keep your existing WebSocket and Haversine formula code here) ...

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
        res.status(500).json({ success: false, message: 'Signup failed.' });
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
app.get('/api/user', async (req, res) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId).select('-password');
        if (user) {
            return res.json({ success: true, user: { id: user._id, username: user.username, email: user.email } });
        }
    }
    res.json({ success: false, message: 'Not authenticated' });
});


// ... (Keep your emergency alert routes as they are) ...

// ... (Update the user progress routes) ...
app.get('/api/users/progress', async (req, res) => {
    try {
        const users = await User.find().select('username email preparednessScore modulesCompleted');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user progress' });
    }
});


// ... (Keep your fallback route and server.listen) ...

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Modules: Earthquake, Fire, Flood, Cyclone safety`);
    console.log(`🎯 Features: Drills, progress tracking, alerts`);
});
