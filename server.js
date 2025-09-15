// Disaster Preparedness Education System - Express Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory data store (in production, use a real database)
let userData = {};
let drillSessions = {};
let emergencyAlerts = [
    {
        id: 1,
        type: 'info',
        region: 'Delhi',
        message: 'Weather department predicts light rain in Delhi NCR region. No immediate threats.',
        timestamp: new Date().toISOString(),
        severity: 'low'
    }
];

// Routes

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// User Progress API
app.get('/api/user/:userId/progress', (req, res) => {
    const { userId } = req.params;
    const userProgress = userData[userId] || {
        id: userId,
        preparednessScore: 0,
        modulesCompleted: [],
        drillsCompleted: [],
        badges: [],
        region: 'Delhi'
    };
    res.json(userProgress);
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

// Module Completion API
app.post('/api/user/:userId/complete-module', (req, res) => {
    const { userId } = req.params;
    const { moduleType, score } = req.body;
    
    if (!userData[userId]) {
        userData[userId] = {
            id: userId,
            preparednessScore: 0,
            modulesCompleted: [],
            drillsCompleted: [],
            badges: [],
            region: 'Delhi'
        };
    }
    
    if (!userData[userId].modulesCompleted.includes(moduleType)) {
        userData[userId].modulesCompleted.push(moduleType);
        userData[userId].preparednessScore += (score || 20);
        
        // Award badges based on progress
        if (userData[userId].modulesCompleted.length === 1 && !userData[userId].badges.includes('first-steps')) {
            userData[userId].badges.push('first-steps');
        }
        if (userData[userId].preparednessScore >= 80 && !userData[userId].badges.includes('safety-expert')) {
            userData[userId].badges.push('safety-expert');
        }
    }
    
    res.json({ success: true, data: userData[userId] });
});

// Drill Completion API
app.post('/api/user/:userId/complete-drill', (req, res) => {
    const { userId } = req.params;
    const { drillType, responseTime, accuracy } = req.body;
    
    if (!userData[userId]) {
        userData[userId] = {
            id: userId,
            preparednessScore: 0,
            modulesCompleted: [],
            drillsCompleted: [],
            badges: [],
            region: 'Delhi'
        };
    }
    
    const drillSession = {
        drillType,
        completedAt: new Date().toISOString(),
        responseTime,
        accuracy,
        score: accuracy >= 80 ? 15 : 10
    };
    
    if (!drillSessions[userId]) {
        drillSessions[userId] = [];
    }
    drillSessions[userId].push(drillSession);
    
    if (!userData[userId].drillsCompleted.includes(drillType)) {
        userData[userId].drillsCompleted.push(drillType);
        userData[userId].preparednessScore += drillSession.score;
        
        // Award team leader badge if completed 3+ drills
        if (userData[userId].drillsCompleted.length >= 3 && !userData[userId].badges.includes('team-leader')) {
            userData[userId].badges.push('team-leader');
        }
    }
    
    res.json({ success: true, data: userData[userId], drillSession });
});

// Emergency Alerts API
app.get('/api/alerts/:region?', (req, res) => {
    const { region } = req.params;
    
    let filteredAlerts = emergencyAlerts;
    if (region) {
        filteredAlerts = emergencyAlerts.filter(alert => 
            alert.region.toLowerCase() === region.toLowerCase() || alert.region === 'National'
        );
    }
    
    res.json(filteredAlerts);
});

app.post('/api/alerts', (req, res) => {
    const { type, region, message, severity } = req.body;
    
    const newAlert = {
        id: emergencyAlerts.length + 1,
        type: type || 'info',
        region: region || 'National',
        message,
        severity: severity || 'medium',
        timestamp: new Date().toISOString()
    };
    
    emergencyAlerts.unshift(newAlert);
    
    // Keep only last 10 alerts
    if (emergencyAlerts.length > 10) {
        emergencyAlerts = emergencyAlerts.slice(0, 10);
    }
    
    console.log('New alert created:', newAlert);
    res.json({ success: true, alert: newAlert });
});

// Statistics API for Admin Dashboard
app.get('/api/admin/stats', (req, res) => {
    const totalUsers = Object.keys(userData).length;
    const totalDrillSessions = Object.values(drillSessions).flat().length;
    
    // Calculate module completion rates
    const moduleTypes = ['earthquake', 'fire', 'flood', 'cyclone'];
    const moduleStats = moduleTypes.map(moduleType => {
        const completions = Object.values(userData).filter(user => 
            user.modulesCompleted && user.modulesCompleted.includes(moduleType)
        ).length;
        return {
            module: moduleType,
            completions,
            rate: totalUsers > 0 ? Math.round((completions / totalUsers) * 100) : 0
        };
    });
    
    // Calculate drill performance
    const allDrillSessions = Object.values(drillSessions).flat();
    const avgResponseTime = allDrillSessions.length > 0 ? 
        allDrillSessions.reduce((sum, session) => sum + (session.responseTime || 240), 0) / allDrillSessions.length : 240;
    const avgAccuracy = allDrillSessions.length > 0 ?
        allDrillSessions.reduce((sum, session) => sum + (session.accuracy || 85), 0) / allDrillSessions.length : 85;
    
    const stats = {
        totalUsers,
        totalDrillSessions,
        averagePreparednessScore: totalUsers > 0 ? 
            Object.values(userData).reduce((sum, user) => sum + (user.preparednessScore || 0), 0) / totalUsers : 0,
        moduleCompletionRates: moduleStats,
        drillPerformance: {
            averageResponseTime: Math.round(avgResponseTime),
            averageAccuracy: Math.round(avgAccuracy),
            totalSessions: totalDrillSessions
        },
        recentActivity: allDrillSessions.slice(-10).map(session => ({
            action: `Completed ${session.drillType} drill`,
            timestamp: session.completedAt,
            score: session.score
        }))
    };
    
    res.json(stats);
});

// Emergency Contact Management
app.get('/api/contacts/:region?', (req, res) => {
    const { region } = req.params;
    
    // Mock emergency contacts data
    const nationalContacts = [
        { name: 'National Disaster Response Force', number: '1078', type: 'disaster' },
        { name: 'Fire Brigade', number: '101', type: 'fire' },
        { name: 'Police Emergency', number: '100', type: 'police' },
        { name: 'Medical Emergency', number: '108', type: 'medical' }
    ];
    
    const regionalContacts = {
        delhi: [
            { name: 'Delhi Police Control Room', number: '011-23490000', type: 'police' },
            { name: 'Delhi Fire Service', number: '011-23221122', type: 'fire' },
            { name: 'Delhi Disaster Management', number: '011-23978350', type: 'disaster' },
            { name: 'AIIMS Emergency', number: '011-26588500', type: 'medical' }
        ],
        mumbai: [
            { name: 'Mumbai Police', number: '022-22621855', type: 'police' },
            { name: 'Mumbai Fire Brigade', number: '022-22622111', type: 'fire' },
            { name: 'BMC Disaster Cell', number: '022-22694725', type: 'disaster' },
            { name: 'KEM Hospital Emergency', number: '022-24129884', type: 'medical' }
        ],
        bangalore: [
            { name: 'Bangalore City Police', number: '080-22943225', type: 'police' },
            { name: 'Bangalore Fire & Emergency', number: '080-25588888', type: 'fire' },
            { name: 'BBMP Emergency', number: '080-22660000', type: 'disaster' },
            { name: 'Victoria Hospital', number: '080-26700001', type: 'medical' }
        ],
        chennai: [
            { name: 'Chennai City Police', number: '044-23452301', type: 'police' },
            { name: 'Chennai Fire Service', number: '044-25360131', type: 'fire' },
            { name: 'Chennai Corporation Emergency', number: '044-25619892', type: 'disaster' },
            { name: 'General Hospital Chennai', number: '044-25281314', type: 'medical' }
        ],
        kolkata: [
            { name: 'Kolkata Police', number: '033-22143526', type: 'police' },
            { name: 'Kolkata Fire Brigade', number: '033-22526781', type: 'fire' },
            { name: 'KMC Emergency', number: '033-22861221', type: 'disaster' },
            { name: 'Medical College Emergency', number: '033-22041188', type: 'medical' }
        ],
        hyderabad: [
            { name: 'Hyderabad City Police', number: '040-27853508', type: 'police' },
            { name: 'Hyderabad Fire Service', number: '040-23318181', type: 'fire' },
            { name: 'GHMC Emergency', number: '040-21111111', type: 'disaster' },
            { name: 'Gandhi Hospital', number: '040-27809021', type: 'medical' }
        ],
        pune: [
            { name: 'Pune City Police', number: '020-26128296', type: 'police' },
            { name: 'Pune Fire Brigade', number: '020-25506845', type: 'fire' },
            { name: 'PMC Emergency', number: '020-26123296', type: 'disaster' },
            { name: 'Sassoon Hospital', number: '020-26127046', type: 'medical' }
        ],
        ahmedabad: [
            { name: 'Ahmedabad Police', number: '079-25506444', type: 'police' },
            { name: 'Ahmedabad Fire Service', number: '079-25468911', type: 'fire' },
            { name: 'AMC Emergency', number: '079-26586507', type: 'disaster' },
            { name: 'Civil Hospital Emergency', number: '079-22680074', type: 'medical' }
        ],
        jaipur: [
            { name: 'Jaipur Police', number: '0141-2200100', type: 'police' },
            { name: 'Jaipur Fire Service', number: '0141-2565333', type: 'fire' },
            { name: 'JMC Emergency', number: '0141-2651071', type: 'disaster' },
            { name: 'SMS Hospital', number: '0141-2518121', type: 'medical' }
        ]
    };
    
    let contacts = nationalContacts;
    if (region && regionalContacts[region.toLowerCase()]) {
        contacts = contacts.concat(regionalContacts[region.toLowerCase()]);
    } else if (region && !regionalContacts[region.toLowerCase()]) {
        // For cities not in our database, provide generic local contacts
        const genericContacts = [
            { name: `${region} Police Station`, number: '100', type: 'police' },
            { name: `${region} Fire Station`, number: '101', type: 'fire' },
            { name: `${region} Emergency Services`, number: '108', type: 'medical' },
            { name: 'National Disaster Response', number: '1078', type: 'disaster' }
        ];
        contacts = contacts.concat(genericContacts);
    }
    
    res.json(contacts);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        users: Object.keys(userData).length,
        alerts: emergencyAlerts.length
    });
});

// Simulation endpoints for testing
app.post('/api/simulate/emergency', (req, res) => {
    const { type, severity, region } = req.body;
    
    const simulatedAlert = {
        id: emergencyAlerts.length + 1,
        type: type || 'emergency',
        region: region || 'Delhi',
        message: `SIMULATION: ${type.toUpperCase()} emergency drill activated. This is a test scenario.`,
        severity: severity || 'high',
        timestamp: new Date().toISOString(),
        simulation: true
    };
    
    emergencyAlerts.unshift(simulatedAlert);
    
    console.log('Emergency simulation started:', simulatedAlert);
    
    // Remove simulation after 5 minutes
    setTimeout(() => {
        emergencyAlerts = emergencyAlerts.filter(alert => alert.id !== simulatedAlert.id);
        console.log('Emergency simulation ended');
    }, 5 * 60 * 1000);
    
    res.json({ success: true, alert: simulatedAlert });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error', 
        message: err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Disaster Preparedness Education System running on http://localhost:${PORT}`);
    console.log(`📚 Educational modules: Earthquake, Fire, Flood, Cyclone safety`);
    console.log(`🎯 Features: Interactive drills, progress tracking, emergency alerts`);
    console.log(`📱 Mobile-responsive design for emergency accessibility`);
    
    // Create sample data for demonstration
    userData['demo-student'] = {
        id: 'demo-student',
        name: 'Demo Student',
        preparednessScore: 35,
        modulesCompleted: ['earthquake'],
        drillsCompleted: ['earthquake'],
        badges: ['first-steps'],
        region: 'Delhi',
        lastUpdated: new Date().toISOString()
    };
    
    drillSessions['demo-student'] = [
        {
            drillType: 'earthquake',
            completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            responseTime: 285,
            accuracy: 92,
            score: 15
        }
    ];
    
    console.log(`💾 Sample data loaded for demonstration`);
});