// public/js/admin.js
document.addEventListener('DOMContentLoaded', function() {
    fetchUserProgress();
    fetchLoginLogs();
});

async function fetchUserProgress() {
    try {
        const response = await fetch('/api/users/progress');
        if (!response.ok) throw new Error('Failed to fetch user progress');
        
        const users = await response.json();
        const tbody = document.getElementById('progress-tbody');
        tbody.innerHTML = ''; 

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No user data available yet.</td></tr>';
            return;
        }

        // Sort by score, descending
        users.sort((a, b) => (b.preparednessScore || 0) - (a.preparednessScore || 0));

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><strong>${user.preparednessScore || 0}</strong></td>
                <td>${user.modulesCompleted ? user.modulesCompleted.length : 0}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching user progress:', error);
        const tbody = document.getElementById('progress-tbody');
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Error loading user progress data.</td></tr>';
    }
}

async function fetchLoginLogs() {
    try {
        const response = await fetch('/api/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');

        const logs = await response.json();
        const tbody = document.getElementById('logs-tbody');
        tbody.innerHTML = '';

        if (logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No logins recorded yet.</td></tr>';
            return;
        }

        logs.forEach(log => {
            const row = document.createElement('tr');
            const time = new Date(log.timestamp).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });

            row.innerHTML = `
                <td>${log.username}</td>
                <td>${log.email}</td>
                <td>${time}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching login logs:', error);
        const tbody = document.getElementById('logs-tbody');
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Error loading logs.</td></tr>';
    }
}
