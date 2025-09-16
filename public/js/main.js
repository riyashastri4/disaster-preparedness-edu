// ==================================================================
// == START: COMPLETE AND CORRECTED public/js/main.js FILE ==
// ==================================================================

// Global State Management
const AppState = {
    currentUser: {
        id: 1,
        name: 'Student',
        preparednessScore: 0,
        modulesCompleted: [],
        badges: [],
        region: 'Delhi',
        city: 'Delhi'
    },
    modules: {},
    drills: {},
    emergencyContacts: []
};

// --- All of your ModulesData, QuizData, etc. remains the same ---
const ModulesData = {
    earthquake: {
        title: 'Earthquake Safety',
        icon: 'fas fa-mountain',
        description: 'Learn Drop, Cover, and Hold techniques',
        lessons: [
            { id: 1, title: 'Understanding Earthquakes', videoUrl: 'https://www.youtube.com/embed/G_NUzYmY3ww', content: `<h3>What is an Earthquake?</h3><p>An earthquake is the sudden release of energy stored in the Earth's crust, creating seismic waves. India experiences frequent earthquakes due to its location at the collision zone of tectonic plates.</p><h4>High-Risk Zones in India:</h4><ul><li>Zone V (Very High): Kashmir, Gujarat, North-East states</li><li>Zone IV (High): Delhi, Bihar, Uttarakhand</li><li>Zone III (Moderate): Kerala, Goa, Coastal areas</li></ul>`, duration: 5 },
            { id: 2, title: 'Drop, Cover, and Hold Technique', content: `<h3>The Life-Saving Technique</h3><div class="technique-steps"><div class="step"><h4>1. DROP</h4><p>Drop to your hands and knees immediately when you feel shaking.</p></div><div class="step"><h4>2. COVER</h4><p>Take cover under a sturdy desk or table. If unavailable, cover your head and neck with your arms.</p></div><div class="step"><h4>3. HOLD</h4><p>Hold onto your shelter and be prepared to move with it until shaking stops.</p></div></div>`, duration: 8 },
            { id: 3, title: 'School Earthquake Preparedness', content: `<h3>School-Specific Safety Measures</h3><h4>Before an Earthquake:</h4><ul><li>Know your school's evacuation plan</li><li>Identify safe spots in each classroom</li></ul><h4>During an Earthquake:</h4><ul><li>Follow Drop, Cover, and Hold immediately</li><li>Stay calm and help others</li></ul><h4>After an Earthquake:</h4><ul><li>Wait for the all-clear signal</li><li>Evacuate using designated routes</li></ul>`, duration: 10 }
        ]
    },
    flood: {
        title: 'Flood Preparedness',
        icon: 'fas fa-water',
        description: 'Emergency evacuation and water safety',
        lessons: [
            { id: 1, title: 'Understanding Flood Risks', videoUrl: 'https://www.youtube.com/embed/4-67v_M2js4', content: `<h3>Types of Floods in India</h3><div class="flood-types"><div class="flood-type"><h4>River Floods</h4><p>Caused by excessive rainfall, most common during monsoon season.</p></div><div class="flood-type"><h4>Flash Floods</h4><p>Sudden flooding due to intense rainfall, common in hilly areas.</p></div><div class="flood-type"><h4>Urban Floods</h4><p>Waterlogging in cities due to poor drainage.</p></div></div>`, duration: 6 },
            { id: 2, title: 'Flood Safety Procedures', content: `<h3>Before a Flood</h3><ul><li>Keep emergency supplies ready (food, water, medicines)</li><li>Know evacuation routes</li></ul><h3>During a Flood</h3><div class="safety-rules"><div class="rule important"><h4>🚫 NEVER Enter Flood Water</h4><p>Even 6 inches of moving water can knock you down.</p></div><div class="rule"><h4>✅ Move to Higher Ground</h4><p>Go to the highest floor of your building.</p></div></div>`, duration: 8 },
            { id: 3, title: 'Post-Flood Health and Safety', content: `<h3>Health Precautions After Floods</h3><div class="health-warning"><h4>⚠️ Disease Prevention</h4><p>Flood water can carry diseases. Take precautions.</p></div><div class="precautions"><h4>Water Safety:</h4><ul><li>Drink only boiled or bottled water.</li></ul><h4>Food Safety:</h4><ul><li>Don't eat food that came in contact with flood water.</li></ul></div>`, duration: 7 }
        ]
    },
    fire: {
        title: 'Fire Safety',
        icon: 'fas fa-fire',
        description: 'Fire extinguisher use and escape routes',
        lessons: [
            { id: 1, title: 'Fire Prevention and Awareness', videoUrl: 'https://www.youtube.com/embed/A-B_02E-hVs', content: `<h3>Common Causes of School Fires</h3><div class="fire-causes"><div class="cause"><h4>🔌 Electrical Issues</h4><p>Overloaded circuits, faulty wiring.</p></div><div class="cause"><h4>🧪 Laboratory Accidents</h4><p>Chemical reactions, gas leaks.</p></div></div><div class="fire-triangle"><h4>The Fire Triangle</h4><p>Fire needs Heat, Fuel, and Oxygen. Remove one to extinguish it.</p></div>`, duration: 7 },
            { id: 2, title: 'Fire Escape Procedures', content: `<h3>School Fire Evacuation Plan</h3><div class="escape-steps"><div class="step urgent"><h4>1. ALERT</h4><p>Sound the alarm. Shout "FIRE!"</p></div><div class="step urgent"><h4>2. EVACUATE</h4><p>Leave immediately via the nearest safe exit.</p></div><div class="step urgent"><h4>3. ASSEMBLE</h4><p>Meet at the designated assembly point.</p></div></div>`, duration: 9 },
            { id: 3, title: 'Fire Extinguisher Training', content: `<h3>PASS Method</h3><div class="pass-method"><div class="pass-steps"><div class="pass-step"><h4>P - PULL</h4><p>Pull the pin.</p></div><div class="pass-step"><h4>A - AIM</h4><p>Aim at the base of the fire.</p></div><div class="pass-step"><h4>S - SQUEEZE</h4><p>Squeeze the handle.</p></div><div class="pass-step"><h4>S - SWEEP</h4><p>Sweep side to side.</p></div></div></div>`, duration: 10 }
        ]
    },
    cyclone: {
        title: 'Cyclone Preparedness',
        icon: 'fas fa-wind',
        description: 'Understanding cyclone warnings and safe shelters',
        lessons: [
            { id: 1, title: 'Understanding Cyclones', videoUrl: 'https://www.youtube.com/embed/GlzY_t4GLhM', content: `<h3>Cyclones in India</h3><p>India faces tropical cyclones in the Bay of Bengal and Arabian Sea, with peak activity from October to December.</p>`, duration: 8 },
            { id: 2, title: 'Cyclone Safety Measures', content: `<h3>During a Cyclone</h3><div class="safety-actions"><div class="action"><h4>🏢 Stay Indoors</h4><p>Remain inside the strongest part of the building, away from windows.</p></div><div class="action"><h4>📻 Stay Informed</h4><p>Listen to updates on a battery-powered radio.</p></div></div>`, duration: 9 },
            { id: 3, title: 'Post-Cyclone Recovery', content: `<h3>After the Cyclone</h3><p>Wait for the "all-clear" from authorities before going outside and beware of hazards like fallen power lines.</p>`, duration: 8 }
        ]
    },
    'first-aid': {
        title: 'First Aid Basics',
        icon: 'fas fa-medkit',
        description: 'Learn to respond to common injuries.',
        lessons: [
            { id: 1, title: 'The "Three P\'s" of First Aid', videoUrl: 'https://www.youtube.com/embed/viz95n2G52Y', content: `<h3>The Main Goals of First Aid</h3><ol><li><strong>Preserve Life:</strong> Your first priority.</li><li><strong>Prevent Worsening:</strong> Stop the condition from getting worse.</li><li><strong>Promote Recovery:</strong> Help the person get better.</li></ol>`, duration: 7 },
            { id: 2, title: 'Handling Cuts and Bleeding', content: `<h3>Controlling Severe Bleeding</h3><ol><li>Apply firm, direct pressure with a clean cloth.</li><li>Elevate the limb above the heart.</li><li>Call for professional medical help (e.g., dial 108).</li></ol>`, duration: 9 },
            { id: 3, title: 'Sprains and Burns', content: `<h3>Common Injuries</h3><h4>Sprains (R.I.C.E. method):</h4><ul><li>Rest, Ice, Compression, Elevation.</li></ul><h4>Minor Burns:</h4><ul><li>Cool the burn under cool running water for 10-20 minutes.</li></ul>`, duration: 10 }
        ]
    }
};

const QuizData = {
    earthquake: {
        title: 'Earthquake Safety Quiz',
        questions: [
            { question: 'What is the first step in the Drop, Cover, and Hold technique?', options: ['Run outside', 'Drop to your hands and knees', 'Call for help', 'Look for an exit'], correct: 1, explanation: 'Drop to your hands and knees immediately to protect yourself from falling.' },
            { question: 'Which earthquake zone is Delhi in?', options: ['Zone III (Moderate)', 'Zone IV (High)', 'Zone V (Very High)', 'Zone II (Low)'], correct: 1, explanation: 'Delhi is in Zone IV (High Risk) for earthquakes.' },
            { question: 'During an earthquake, you should:', options: ['Run to the nearest exit', 'Stand in a doorway', 'Stay under a sturdy desk', 'Go to the top floor'], correct: 2, explanation: 'Take cover under a sturdy desk and hold on until shaking stops.' }
        ]
    },
    fire: {
        title: 'Fire Safety Quiz',
        questions: [
            { question: 'What does P.A.S.S. stand for?', options: ['Push, Aim, Squeeze, Sweep', 'Pull, Aim, Squeeze, Sweep', 'Pull, Alert, Squeeze, Stop', 'Push, Alert, Spray, Sweep'], correct: 1, explanation: 'P.A.S.S. stands for Pull the pin, Aim at the base, Squeeze the handle, Sweep side to side.' },
            { question: 'If you encounter smoke while evacuating, you should:', options: ['Stand upright', 'Stay low and crawl', 'Hold your breath and run', 'Find another route'], correct: 1, explanation: 'Stay low where air is clearer. Smoke rises.' }
        ]
    },
    flood: {
        title: 'Flood Preparedness Quiz',
        questions: [
            { question: 'How much moving water can knock a person down?', options: ['2 inches', '6 inches', '1 foot', '2 feet'], correct: 1, explanation: 'Just 6 inches of moving water can knock you down.' },
            { question: 'During a flood, the safest place is:', options: ['Basement', 'Ground floor', 'Highest floor available', 'Near windows'], correct: 2, explanation: 'Move to the highest floor available to stay above rising water levels.' }
        ]
    },
    cyclone: {
        title: 'Cyclone Preparedness Quiz',
        questions: [
            { question: 'What should you do if you are in the eye of a cyclone?', options: ['Go outside to check damage', 'Stay indoors', 'Start cleaning', 'Open windows'], correct: 1, explanation: 'DO NOT go outside. The other side of the cyclone is coming.' },
            { question: 'The best shelter during a cyclone is:', options: ['Upper floors', 'Interior rooms on lower floors', 'Basement', 'Rooms with glass doors'], correct: 1, explanation: 'Interior rooms without windows provide the best protection.' }
        ]
    },
    'first-aid': {
        title: 'First Aid Basics Quiz',
        questions: [
            { question: 'What is the first step when treating a minor cut?', options: ['Apply a bandage', 'Apply pressure', 'Wash your hands', 'Apply cream'], correct: 2, explanation: 'Always wash your hands first to prevent infection.' },
            { question: 'What does "I" stand for in the R.I.C.E. method?', options: ['Immobilize', 'Ice', 'Inspect', 'Ignore'], correct: 1, explanation: 'R.I.C.E. stands for Rest, Ice, Compression, and Elevation.' }
        ]
    }
};


// DOM Elements & State
let currentModal = null;
let currentModule = null;
let currentLesson = 0;
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizAnswers = [];
let quizScore = 0;

// ==================================================================
// == CORE APPLICATION LOGIC ==
// ==================================================================

// Runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Main initialization function.
 */
function initializeApp() {
    setupEventListeners();
    loadUserProgress();
    initializeWebSocket();
}

/**
 * Sets up all master event listeners for the application.
 * Uses event delegation for dynamically created elements.
 */
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Master click listener for the whole document
    document.body.addEventListener('click', (event) => {
        const target = event.target;

        // Logic for closing modals
        if (target.matches('.close') || target.matches('.modal')) {
            closeAllModals();
        }
    });
}


// ==================================================================
// == MODAL AND MODULE LOGIC ==
// ==================================================================

/**
 * Closes any open modal.
 */
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Opens and populates a learning module.
 * @param {string} moduleType - The type of module to start (e.g., 'earthquake').
 */
function startModule(moduleType) {
    currentModule = moduleType;
    currentLesson = 0;
    const modal = document.getElementById('module-modal');
    const content = document.getElementById('module-content');
    content.innerHTML = generateModuleContent(moduleType, 0);
    modal.style.display = 'block';
}

function generateModuleContent(moduleType, lessonIndex) {
    const module = ModulesData[moduleType];
    const lesson = module.lessons[lessonIndex];
    const videoPlayer = lesson.videoUrl ? `
        <div class="video-container">
            <iframe src="${lesson.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>` : '';

    return `
        <div class="module-header"><h2><i class="${module.icon}"></i> ${module.title}</h2></div>
        <div class="lesson-content">
            <h3>${lesson.title}</h3>
            ${videoPlayer}
            <div class="lesson-body">${lesson.content}</div>
        </div>
        <div class="lesson-navigation">
            ${lessonIndex > 0 ? `<button class="btn btn-secondary" onclick="previousLesson()">Previous</button>` : '<div></div>'}
            ${lessonIndex < module.lessons.length - 1 ? `<button class="btn btn-primary" onclick="nextLesson()">Next</button>` : `<button class="btn btn-primary" onclick="startQuiz()">Take Quiz</button>`}
        </div>
    `;
}

function nextLesson() {
    if (currentLesson < ModulesData[currentModule].lessons.length - 1) {
        currentLesson++;
        document.getElementById('module-content').innerHTML = generateModuleContent(currentModule, currentLesson);
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        currentLesson--;
        document.getElementById('module-content').innerHTML = generateModuleContent(currentModule, currentLesson);
    }
}

// ==================================================================
// == QUIZ LOGIC ==
// ==================================================================

function startQuiz() {
    currentQuiz = QuizData[currentModule];
    currentQuestionIndex = 0;
    quizAnswers = [];
    quizScore = 0;
    document.getElementById('module-content').innerHTML = generateQuizContent();
}

function generateQuizContent() {
    const question = currentQuiz.questions[currentQuestionIndex];
    return `
        <div class="quiz-header"><h2>${currentQuiz.title}</h2></div>
        <div class="quiz-question"><h3>${question.question}</h3></div>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button class="quiz-option" onclick="selectAnswer(${index})">${option}</button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz.questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
        document.getElementById('module-content').innerHTML = generateQuizContent();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const percentage = Math.round((quizScore / currentQuiz.questions.length) * 100);
    document.getElementById('module-content').innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <p>You scored ${quizScore} out of ${currentQuiz.questions.length}</p>
            <h3>${percentage}%</h3>
            <button class="btn btn-primary" onclick="completeModuleWithQuiz()">Complete Module</button>
        </div>
    `;
}

function completeModuleWithQuiz() {
    if (!AppState.currentUser.modulesCompleted.includes(currentModule)) {
        AppState.currentUser.modulesCompleted.push(currentModule);
        AppState.currentUser.preparednessScore += 25;
        saveProgress();
        updateUI();
    }
    closeAllModals();
}

// ==================================================================
// == USER PROGRESS & UI UPDATES ==
// ==================================================================

function saveProgress() {
    localStorage.setItem('disasterEduProgress', JSON.stringify(AppState.currentUser));
}

function loadUserProgress() {
    const savedProgress = localStorage.getItem('disasterEduProgress');
    if (savedProgress) {
        Object.assign(AppState.currentUser, JSON.parse(savedProgress));
    }
    updateUI();
}

function updateUI() {
    // Update module progress bars
    document.querySelectorAll('.module-card').forEach(card => {
        const moduleType = card.dataset.module;
        const progressText = card.querySelector('.progress-text');
        const progressBar = card.querySelector('.progress');
        if (AppState.currentUser.modulesCompleted.includes(moduleType)) {
            progressBar.style.width = '100%';
            progressText.textContent = '100% Complete';
        } else {
            progressBar.style.width = '0%';
            progressText.textContent = '0% Complete';
        }
    });

    // Update preparedness score
    const scoreElement = document.querySelector('.score-number');
    if (scoreElement) {
        scoreElement.textContent = AppState.currentUser.preparednessScore;
    }
}

// ==================================================================
// == CITY AND EMERGENCY CONTACTS ==
// ==================================================================

function openCityModal() {
    const modal = document.getElementById('city-modal');
    modal.style.display = 'block';
}

function selectCity(cityName) {
    AppState.currentUser.city = cityName;
    document.getElementById('current-city-nav').textContent = cityName;
    saveProgress();
    closeAllModals();
}

function selectCustomCity() {
    const customInput = document.getElementById('custom-city-input');
    if (customInput.value) {
        selectCity(customInput.value);
    }
}

function addLocalContact() {
    const name = prompt('Enter contact name:');
    const number = prompt('Enter contact number:');
    if (name && number) {
        alert('Contact added (demo)!');
    }
}

// ==================================================================
// == REAL-TIME ALARM & WEBSOCKET LOGIC ==
// ==================================================================

function initializeWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);
    let keepAliveInterval;

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'location-update', location }));
                }
            }, () => console.error('Error getting location.'));
        }
        keepAliveInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 25000);
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'emergency-alert') {
                triggerEmergencyAlarm(data.message);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server. Reconnecting...');
        clearInterval(keepAliveInterval);
        setTimeout(initializeWebSocket, 5000);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        clearInterval(keepAliveInterval);
    };
}

function triggerEmergencyAlarm(message) {
    const alarmOverlay = document.getElementById('emergency-alarm-overlay');
    const alarmMessage = document.getElementById('alarm-message');
    const alarmAudio = document.getElementById('emergency-alarm-audio');
    if (alarmOverlay && alarmMessage && alarmAudio) {
        alarmMessage.textContent = message || 'Emergency Alert!';
        alarmOverlay.style.display = 'flex';
        alarmAudio.play().catch(e => console.error("Audio play failed:", e));
    }
}

function stopEmergencyAlarm() {
    const alarmOverlay = document.getElementById('emergency-alarm-overlay');
    const alarmAudio = document.getElementById('emergency-alarm-audio');
    if (alarmOverlay && alarmAudio) {
        alarmOverlay.style.display = 'none';
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }
}

function sendTestAlarm() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            fetch('/api/trigger-alarm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: AppState.currentUser.id,
                    disasterType: 'Test Disaster',
                    location: location
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) alert(`Alarm triggered! ${data.alertsSent} user(s) notified.`);
                else alert('Failed to trigger alarm.');
            })
            .catch(err => console.error('Error triggering alarm:', err));
        }, () => alert('Could not get your location. Please allow location access.'));
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// ==================================================================
// == END: COMPLETE AND CORRECTED public/js/main.js FILE ==
// ==================================================================
