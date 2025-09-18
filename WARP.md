# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Disaster Preparedness Education System** - a real-time web application designed for Indian schools and colleges to teach disaster safety through interactive modules, virtual drills, and location-based emergency alerts.

### Technology Stack
- **Backend**: Node.js with Express
- **Frontend**: Vanilla HTML/CSS/JavaScript 
- **Real-time**: WebSockets for emergency alerts
- **Data**: In-memory storage (no database)
- **Authentication**: Basic bcrypt password hashing

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Server runs on http://localhost:3000
# Default port is 3000, configurable via PORT environment variable
```

### Development Workflow
```bash
# Start server with custom port
PORT=8080 npm start

# Monitor server logs for WebSocket connections and API calls
# Server outputs educational modules, features, and real-time status
```

## Architecture & Code Organization

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Express API   │    │   WebSocket     │
│   (Vanilla JS)  │◄──►│   Server        │◄──►│   Server        │
│                 │    │                 │    │   (Real-time)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Static Files   │    │   In-Memory     │    │   Location      │
│  (HTML/CSS/JS)  │    │   Data Store    │    │   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Core System Components

#### 1. **Real-Time Emergency Alert System** (`server.js:27-59, 107-144`)
- WebSocket server for real-time communication
- Location-based emergency alerts using Haversine formula
- 500-meter radius alert broadcasting
- Client connection management with unique IDs

#### 2. **Educational Module Engine** (`main.js:19-617`)
- Five disaster preparedness modules: Earthquake, Fire, Flood, Cyclone, First Aid  
- Progressive lesson system with video integration
- Interactive quiz system with immediate feedback
- Progress tracking and badge system

#### 3. **Location-Aware Emergency Services** (`main.js:1802-1851`)
- City-specific emergency contact databases
- Dynamic contact loading based on user location
- Regional alert system with severity levels
- Geolocation integration for precise alerts

#### 4. **User Progress & Gamification System** (`main.js:4-17, 1556-1571`)
- Preparedness score calculation
- Module completion tracking
- Badge award system
- Local storage persistence

### Key Data Structures

#### Module Data Architecture (`main.js:20-709`)
```javascript
ModulesData = {
  [moduleType]: {
    title: String,
    icon: FontAwesome class,
    description: String,
    lessons: [
      {
        id: Number,
        title: String,
        videoUrl: YouTube embed URL,
        content: HTML content with interactive elements,
        duration: Number (minutes)
      }
    ]
  }
}
```

#### Quiz System Architecture (`main.js:713-1013`)
```javascript
QuizData = {
  [moduleType]: {
    title: String,
    questions: [
      {
        question: String,
        options: Array[String],
        correct: Number (index),
        explanation: String
      }
    ]
  }
}
```

### Real-Time Features

#### WebSocket Message Protocol
- **Client → Server**: `location-update` with lat/lng coordinates
- **Server → Client**: `emergency-alert` with disaster type and location
- Automatic reconnection with 5-second intervals
- Keep-alive pings every 25 seconds

#### Emergency Alert Broadcasting (`server.js:107-144`)
- Geolocation-based alert targeting
- Distance calculation using Haversine formula
- Alert radius of 500 meters
- Real-time user notification with audio/visual alarms

## File Structure & Components

```
disaster-preparedness-edu/
├── server.js                 # Main Express + WebSocket server
├── package.json              # Dependencies and scripts
├── public/                   # Static frontend assets
│   ├── index.html            # Main UI with 5 educational modules
│   ├── css/style.css         # Responsive styling with modal system
│   └── js/main.js            # Frontend logic (1900+ lines)
└── WARP.md                   # This file
```

### Critical Files to Understand

#### `server.js` - Backend Architecture
- **Lines 17-21**: In-memory data stores (clients, userData, users, emergencyAlerts)
- **Lines 27-59**: WebSocket connection handling and location tracking
- **Lines 77-103**: User signup API with bcrypt hashing
- **Lines 107-144**: Emergency alarm system with geolocation
- **Lines 147-189**: Progress tracking and alerts API

#### `public/js/main.js` - Frontend State Management
- **Lines 4-17**: Global application state (AppState object)
- **Lines 19-709**: Educational modules with embedded YouTube videos
- **Lines 1055-1106**: WebSocket client connection management
- **Lines 1196-1501**: Module navigation and quiz engine
- **Lines 1717-1800**: City selection and emergency contact system

#### `public/index.html` - UI Structure
- **Lines 51-132**: Interactive learning modules grid
- **Lines 134-186**: Emergency contacts and real-time alerts
- **Lines 306-382**: Modal system for modules, city selection, and signup
- **Lines 374-386**: Emergency alarm overlay with audio alerts

## Location-Based Features

### Emergency Contact System
The system maintains city-specific emergency contacts for major Indian cities:
- **Delhi**: Police (011-23490000), Fire (011-23221122), AIIMS (011-26588500)
- **Mumbai**: Police (022-22621855), Fire (022-22622111), KEM Hospital (022-24129884)
- **Bangalore**: Police (080-22943225), Fire (080-25588888), Victoria Hospital (080-26700001)
- **Chennai, Kolkata**: Similar comprehensive emergency contact databases

### Real-Time Alert System
- Location permission required for full functionality
- 500-meter radius for emergency alert broadcasting
- Integration with browser geolocation API
- Visual and audio emergency notifications

## Development Guidelines

### When Adding New Modules
1. Add module data to `ModulesData` object with lessons array
2. Create corresponding quiz in `QuizData` object  
3. Update progress tracking in `updateModuleProgress()` function
4. Test video embedding and interactive content rendering

### When Modifying Emergency Features
1. Verify location permission handling
2. Test WebSocket connection stability
3. Validate alert radius calculations
4. Ensure audio/visual alarm functionality

### When Working with User Data
- All user data stored in browser localStorage
- Server maintains session data in memory only
- No persistent database - data resets on server restart
- User signup stores hashed passwords in memory array

## Testing & Debugging

### Local Development Testing
- WebSocket connections visible in browser Network tab
- Server logs show client connections and location updates
- Emergency alerts can be tested with "Trigger Test Alarm" button
- Module progress persists in browser localStorage

### Common Issues
- **Location Services**: Ensure HTTPS for geolocation in production
- **WebSocket Reconnection**: Client automatically reconnects on connection loss
- **Modal System**: Uses event delegation for dynamic content
- **Video Embedding**: YouTube embeds require iframe permissions

---

*This system is designed for educational use in Indian schools/colleges and includes region-specific emergency contacts and disaster scenarios relevant to India's geography and climate.*