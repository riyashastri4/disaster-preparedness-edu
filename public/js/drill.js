// public/js/drill.js
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('drill-start-screen');
    const scenarioScreen = document.getElementById('drill-scenario-screen');
    const endScreen = document.getElementById('drill-end-screen');
    const startBtn = document.getElementById('start-drill-btn');

    startBtn.addEventListener('click', startDrill);

    let currentStep = 0;
    let score = 100;
    let timerInterval;
    let seconds = 0;

    const drillScenarios = [
        {
            title: "The Alarm Sounds!",
            description: "You hear the fire alarm. Smoke is visible down the hallway. What is your immediate first action?",
            options: [
                { text: "Grab your valuables.", correct: false, feedback: "Wasting time can be fatal. Evacuate immediately." },
                { text: "Stay low and head to the nearest exit.", correct: true, feedback: "Correct! Staying low helps you avoid smoke inhalation." },
                { text: "Call the fire department.", correct: false, feedback: "Alerting is important, but your first priority is to evacuate." }
            ]
        },
        {
            title: "A Closed Door",
            description: "You reach a closed door on your escape route. What should you do?",
            options: [
                { text: "Open it immediately.", correct: false, feedback: "Never open a door without checking for fire on the other side." },
                { text: "Check the door temperature with the back of your hand.", correct: true, feedback: "Excellent. If it's hot, find another way." },
                { text: "Break it down.", correct: false, feedback: "This is dangerous and wastes time. Find an alternative route." }
            ]
        },
        // ... Add more scenarios here
    ];

    document.getElementById('total-steps').textContent = drillScenarios.length;

    function startDrill() {
        startScreen.style.display = 'none';
        scenarioScreen.style.display = 'block';
        startTimer();
        loadScenario(currentStep);
    }

    function loadScenario(step) {
        const scenario = drillScenarios[step];
        document.getElementById('current-step').textContent = step + 1;
        document.getElementById('scenario-title').textContent = scenario.title;
        document.getElementById('scenario-description').textContent = scenario.description;
        
        const optionsContainer = document.getElementById('scenario-options');
        optionsContainer.innerHTML = '';
        scenario.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.onclick = () => selectOption(option);
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(option) {
        if (!option.correct) {
            score -= 20; // Penalty for wrong answer
            alert(`Incorrect: ${option.feedback}`);
        } else {
             alert(`Correct: ${option.feedback}`);
        }

        currentStep++;
        if (currentStep < drillScenarios.length) {
            loadScenario(currentStep);
        } else {
            endDrill();
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            document.getElementById('timer-display').textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function endDrill() {
        clearInterval(timerInterval);
        scenarioScreen.style.display = 'none';
        endScreen.style.display = 'block';

        // Final score calculation
        score = Math.max(0, score - Math.floor(seconds / 10)); // Time penalty

        document.getElementById('final-time').textContent = document.getElementById('timer-display').textContent;
        document.getElementById('final-score').textContent = score;

        if (score < 50) {
            document.getElementById('drill-result-title').textContent = "Needs Improvement";
            document.getElementById('drill-result-message').textContent = "You made some critical errors. Review the fire safety module and try again.";
        }
    }
});
