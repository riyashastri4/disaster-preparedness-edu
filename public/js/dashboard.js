// public/js/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // This function runs specifically on the dashboard page
    initializeDashboard();
});

function initializeDashboard() {
    // First, check if the user is authenticated from the main script
    if (!AppState.currentUser || !AppState.currentUser.id) {
        // If not logged in after checking session, redirect to login
        fetch('/api/user').then(res => res.json()).then(data => {
            if (!data.success) {
                window.location.href = 'login.html';
            } else {
                // User is logged in, proceed to populate dashboard
                populateDashboard(data.user);
            }
        });
    } else {
        // User data is already in AppState, populate dashboard
        populateDashboard(AppState.currentUser);
    }
}

function populateDashboard(user) {
    // Set user names
    document.getElementById('user-name-header').textContent = user.username;
    document.getElementById('user-name-nav').textContent = user.username;

    // Populate Preparedness Score
    const score = AppState.currentUser.preparednessScore || 0;
    document.getElementById('score-number-dash').textContent = score;
    const degrees = (score / 100) * 360;
    document.getElementById('score-progress-circle').style.background = `conic-gradient(#3498db ${degrees}deg, #ecf0f1 ${degrees}deg)`;
    
    // Populate Badges
    const badgesContainer = document.getElementById('badges-container-dash');
    const allBadges = [
        { id: 'first-steps', name: 'First Steps', icon: 'fa-medal' },
        { id: 'safety-expert', name: 'Safety Expert', icon: 'fa-shield-alt' },
        { id: 'team-leader', name: 'Team Leader', icon: 'fa-users' }
    ];

    badgesContainer.innerHTML = allBadges.map(badge => {
        const isEarned = AppState.currentUser.badges.includes(badge.id);
        return `
            <div class="badge ${isEarned ? 'earned' : 'locked'}">
                <i class="fas ${badge.icon}"></i>
                <span>${badge.name}</span>
            </div>
        `;
    }).join('');

    // Populate Module Progress
    const moduleProgressContainer = document.getElementById('module-progress-container');
    const modules = Object.keys(ModulesData);
    
    moduleProgressContainer.innerHTML = modules.map(moduleKey => {
        const module = ModulesData[moduleKey];
        const isCompleted = AppState.currentUser.modulesCompleted.includes(moduleKey);
        return `
            <div class="module-item ${isCompleted ? 'completed' : ''}">
                <i class="fas ${module.icon}"></i>
                <span>${module.title}</span>
            </div>
        `;
    }).join('');
}
