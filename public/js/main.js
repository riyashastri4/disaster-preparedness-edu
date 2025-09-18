// Disaster Preparedness Education System - Main JavaScript

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

// Educational Modules Data
const ModulesData = {
    earthquake: {
        title: 'Earthquake Safety',
        icon: 'fas fa-mountain',
        description: 'Learn Drop, Cover, and Hold techniques',
        lessons: [
            {
                id: 1,
                title: 'Understanding Earthquakes',
                videoUrl: 'https://www.youtube.com/embed/MKILThtPxQs?si=bFegjH4mgnk6FwEa',
                content: `
                    <h3>What is an Earthquake?</h3>
                    <p>An earthquake is the sudden release of energy stored in the Earth's crust, creating seismic waves. India experiences frequent earthquakes due to its location at the collision zone of tectonic plates.</p>
                    
                    <h4>High-Risk Zones in India:</h4>
                    <ul>
                        <li>Zone V (Very High): Kashmir, Gujarat, North-East states</li>
                        <li>Zone IV (High): Delhi, Bihar, Uttarakhand</li>
                        <li>Zone III (Moderate): Kerala, Goa, Coastal areas</li>
                    </ul>
                    
                    <div class="lesson-quiz">
                        <h4>Quick Check:</h4>
                        <p>Which zone is Delhi in? <button onclick="showAnswer('earthquake-1', 'Zone IV - High Risk')">Show Answer</button></p>
                        <div id="earthquake-1" class="answer" style="display:none;">
                            <strong>Correct!</strong> Delhi is in Zone IV (High Risk)
                        </div>
                    </div>
                `,
                duration: 5
            },
            {
                id: 2,
                title: 'Drop, Cover, and Hold Technique',
                content: `
                    <h3>The Life-Saving Technique</h3>
                    
                    <div class="technique-steps">
                        <div class="step">
                            <h4>1. DROP</h4>
                            <p>Drop to your hands and knees immediately when you feel shaking.</p>
                        </div>
                        
                        <div class="step">
                            <h4>2. COVER</h4>
                            <p>Take cover under a sturdy desk or table. If unavailable, cover your head and neck with your arms.</p>
                        </div>
                        
                        <div class="step">
                            <h4>3. HOLD</h4>
                            <p>Hold onto your shelter and be prepared to move with it until shaking stops.</p>
                        </div>
                    </div>
                    
                    <div class="safety-tips">
                        <h4>Additional Safety Tips:</h4>
                        <ul>
                            <li>Stay away from glass windows and heavy objects</li>
                            <li>If outdoors, stay in open areas away from buildings</li>
                            <li>If in bed, stay there and cover your head</li>
                            <li>Never run outside during shaking</li>
                        </ul>
                    </div>
                    
                    <button onclick="practiceDropCoverHold()" class="btn btn-primary">Practice This Technique</button>
                `,
                duration: 8
            },
            {
                id: 3,
                title: 'School Earthquake Preparedness',
                content: `
                    <h3>School-Specific Safety Measures</h3>
                    
                    <h4>Before an Earthquake:</h4>
                    <ul>
                        <li>Know your school's evacuation plan</li>
                        <li>Identify safe spots in each classroom</li>
                        <li>Secure heavy items and equipment</li>
                        <li>Practice regular earthquake drills</li>
                    </ul>
                    
                    <h4>During an Earthquake:</h4>
                    <ul>
                        <li>Follow Drop, Cover, and Hold immediately</li>
                        <li>Stay calm and help others do the same</li>
                        <li>Listen to teachers and follow instructions</li>
                        <li>Do not run towards exits during shaking</li>
                    </ul>
                    
                    <h4>After an Earthquake:</h4>
                    <ul>
                        <li>Wait for the all-clear signal</li>
                        <li>Evacuate using designated routes only</li>
                        <li>Assemble at the designated safe area</li>
                        <li>Report any injuries or trapped persons</li>
                    </ul>
                    
                    <div class="regional-info">
                        <h4>Regional Preparedness (Delhi):</h4>
                        <p>Delhi schools must have earthquake emergency plans as per NDMA guidelines. Know your school's specific plan and evacuation routes.</p>
                    </div>
                `,
                duration: 10
            }
        ]
    },
    flood: {
        title: 'Flood Preparedness',
        icon: 'fas fa-water',
        description: 'Emergency evacuation and water safety',
        lessons: [
            {
                id: 1,
                title: 'Understanding Flood Risks',
                videoUrl: 'https://www.youtube.com/embed/43M5mZuzHF8?si=wcIAT5sAbEAATL-g',
                content: `
                    <h3>Types of Floods in India</h3>
                    
                    <div class="flood-types">
                        <div class="flood-type">
                            <h4>River Floods</h4>
                            <p>Caused by excessive rainfall, most common during monsoon season (June-September)</p>
                        </div>
                        
                        <div class="flood-type">
                            <h4>Flash Floods</h4>
                            <p>Sudden flooding due to intense rainfall, common in hilly areas and urban cities</p>
                        </div>
                        
                        <div class="flood-type">
                            <h4>Urban Floods</h4>
                            <p>Waterlogging in cities due to poor drainage, affecting Delhi, Mumbai, Chennai</p>
                        </div>
                    </div>
                    
                    <h4>High-Risk States:</h4>
                    <p>Assam, Bihar, West Bengal, Uttar Pradesh, Delhi (urban flooding)</p>
                    
                    <div class="warning-signs">
                        <h4>Flood Warning Signs:</h4>
                        <ul>
                            <li>Heavy continuous rainfall</li>
                            <li>Rising water levels in nearby rivers/drains</li>
                            <li>Official flood warnings from authorities</li>
                            <li>Water entering ground floors of buildings</li>
                        </ul>
                    </div>
                `,
                duration: 6
            },
            {
                id: 2,
                title: 'Flood Safety Procedures',
                content: `
                    <h3>Before a Flood</h3>
                    <ul>
                        <li>Keep emergency supplies ready (food, water, medicines)</li>
                        <li>Know evacuation routes from school and home</li>
                        <li>Keep important documents in waterproof containers</li>
                        <li>Identify higher ground locations for safety</li>
                    </ul>
                    
                    <h3>During a Flood</h3>
                    
                    <div class="safety-rules">
                        <div class="rule important">
                            <h4>🚫 NEVER Enter Flood Water</h4>
                            <p>Even 6 inches of moving water can knock you down. 2 feet can float a car.</p>
                        </div>
                        
                        <div class="rule">
                            <h4>✅ Move to Higher Ground</h4>
                            <p>Go to the highest floor of your building or elevated areas</p>
                        </div>
                        
                        <div class="rule">
                            <h4>📞 Call for Help</h4>
                            <p>Contact emergency services: 108 (ambulance), 100 (police), 101 (fire)</p>
                        </div>
                    </div>
                    
                    <h3>Water Safety Rules</h3>
                    <ul>
                        <li>Turn around, don't drown - avoid flooded roads</li>
                        <li>Stay away from electrical equipment when wet</li>
                        <li>Don't drive through flooded areas</li>
                        <li>Avoid contact with flood water (contamination risk)</li>
                    </ul>
                `,
                duration: 8
            },
            {
                id: 3,
                title: 'Post-Flood Health and Safety',
                content: `
                    <h3>Health Precautions After Floods</h3>
                    
                    <div class="health-warning">
                        <h4>⚠️ Disease Prevention</h4>
                        <p>Flood water carries sewage, chemicals, and debris. Take these precautions:</p>
                    </div>
                    
                    <div class="precautions">
                        <h4>Water Safety:</h4>
                        <ul>
                            <li>Drink only boiled or bottled water</li>
                            <li>Use water purification tablets if available</li>
                            <li>Avoid ice made from tap water</li>
                            <li>Wash hands frequently with soap and clean water</li>
                        </ul>
                        
                        <h4>Food Safety:</h4>
                        <ul>
                            <li>Don't eat food that came in contact with flood water</li>
                            <li>Eat only freshly cooked hot meals</li>
                            <li>Avoid raw vegetables and fruits</li>
                            <li>Check expiry dates carefully</li>
                        </ul>
                        
                        <h4>Injury Prevention:</h4>
                        <ul>
                            <li>Wear protective footwear in affected areas</li>
                            <li>Watch for sharp objects and debris</li>
                            <li>Get tetanus shot if injured</li>
                            <li>Seek medical help for any wounds</li>
                        </ul>
                    </div>
                    
                    <div class="common-diseases">
                        <h4>Common Post-Flood Diseases:</h4>
                        <p>Diarrhea, Cholera, Typhoid, Malaria, Dengue, Skin infections</p>
                        <p><strong>Seek medical attention immediately if you experience symptoms.</strong></p>
                    </div>
                `,
                duration: 7
            }
        ]
    },
    fire: {
        title: 'Fire Safety',
        icon: 'fas fa-fire',
        description: 'Fire extinguisher use and escape routes',
        lessons: [
            {
                id: 1,
                title: 'Fire Prevention and Awareness',
                videoUrl: 'https://www.youtube.com/embed/GVBamXXVD30?si=FoYR16qNgQtosoDZ',
                content: `
                    <h3>Common Causes of School Fires</h3>
                    
                    <div class="fire-causes">
                        <div class="cause">
                            <h4>🔌 Electrical Issues</h4>
                            <p>Overloaded circuits, faulty wiring, damaged electrical equipment</p>
                        </div>
                        
                        <div class="cause">
                            <h4>🧪 Laboratory Accidents</h4>
                            <p>Chemical reactions, gas leaks, improper handling of equipment</p>
                        </div>
                        
                        <div class="cause">
                            <h4>🍽️ Kitchen Fires</h4>
                            <p>Unattended cooking, grease fires, faulty gas connections</p>
                        </div>
                        
                        <div class="cause">
                            <h4>🚬 Human Error</h4>
                            <p>Smoking, improper disposal of flammable materials</p>
                        </div>
                    </div>
                    
                    <div class="fire-triangle">
                        <h4>The Fire Triangle</h4>
                        <p>Fire needs three elements to survive:</p>
                        <ul>
                            <li><strong>Heat</strong> - Source of ignition</li>
                            <li><strong>Fuel</strong> - Something to burn</li>
                            <li><strong>Oxygen</strong> - From the air</li>
                        </ul>
                        <p>Remove any one element to extinguish fire!</p>
                    </div>
                    
                    <div class="prevention-tips">
                        <h4>Fire Prevention in Schools:</h4>
                        <ul>
                            <li>Keep fire exits clear and unlocked</li>
                            <li>Don't overload electrical outlets</li>
                            <li>Store flammable materials safely</li>
                            <li>Report fire hazards immediately</li>
                            <li>Know locations of fire extinguishers</li>
                        </ul>
                    </div>
                `,
                duration: 7
            },
            {
                id: 2,
                title: 'Fire Escape Procedures',
                content: `
                    <h3>School Fire Evacuation Plan</h3>
                    
                    <div class="escape-steps">
                        <div class="step urgent">
                            <h4>1. ALERT</h4>
                            <p>Sound the alarm immediately. Shout "FIRE!" to alert others.</p>
                        </div>
                        
                        <div class="step urgent">
                            <h4>2. EVACUATE</h4>
                            <p>Leave the building immediately using the nearest safe exit.</p>
                        </div>
                        
                        <div class="step urgent">
                            <h4>3. ASSEMBLE</h4>
                            <p>Meet at the designated assembly point. Take attendance.</p>
                        </div>
                    </div>
                    
                    <div class="escape-rules">
                        <h4>Evacuation Rules:</h4>
                        <ul>
                            <li><strong>Stay Low:</strong> Smoke rises - crawl if necessary</li>
                            <li><strong>Feel Doors:</strong> Check if hot before opening</li>
                            <li><strong>Use Stairs:</strong> NEVER use elevators</li>
                            <li><strong>Don't Return:</strong> Never go back for belongings</li>
                            <li><strong>Help Others:</strong> Assist those who need help</li>
                        </ul>
                    </div>
                    
                    <div class="smoke-safety">
                        <h4>Smoke Inhalation Prevention:</h4>
                        <ul>
                            <li>Cover nose and mouth with cloth</li>
                            <li>Breathe through your nose</li>
                            <li>Stay close to the ground</li>
                            <li>Exit as quickly as possible</li>
                        </ul>
                    </div>
                    
                    <div class="trapped-scenario">
                        <h4>If You're Trapped:</h4>
                        <ul>
                            <li>Close doors between you and the fire</li>
                            <li>Seal cracks around doors with wet cloth</li>
                            <li>Signal for help from windows</li>
                            <li>Call emergency services: 101</li>
                        </ul>
                    </div>
                `,
                duration: 9
            },
            {
                id: 3,
                title: 'Fire Extinguisher Training',
                content: `
                    <h3>Types of Fire Extinguishers</h3>
                    
                    <div class="extinguisher-types">
                        <div class="type">
                            <h4>Class A - Water</h4>
                            <p>For ordinary combustibles (paper, wood, cloth)</p>
                        </div>
                        
                        <div class="type">
                            <h4>Class B - Foam/CO2</h4>
                            <p>For flammable liquids (oil, gasoline, grease)</p>
                        </div>
                        
                        <div class="type">
                            <h4>Class C - CO2/Dry Chemical</h4>
                            <p>For electrical fires (never use water!)</p>
                        </div>
                        
                        <div class="type">
                            <h4>Class ABC - Multi-purpose</h4>
                            <p>For most common fires (most schools have these)</p>
                        </div>
                    </div>
                    
                    <div class="pass-method">
                        <h3>PASS Method for Fire Extinguishers</h3>
                        
                        <div class="pass-steps">
                            <div class="pass-step">
                                <h4>P - PULL</h4>
                                <p>Pull the safety pin from the handle</p>
                            </div>
                            
                            <div class="pass-step">
                                <h4>A - AIM</h4>
                                <p>Aim the nozzle at the base of the fire</p>
                            </div>
                            
                            <div class="pass-step">
                                <h4>S - SQUEEZE</h4>
                                <p>Squeeze the handle to release the agent</p>
                            </div>
                            
                            <div class="pass-step">
                                <h4>S - SWEEP</h4>
                                <p>Sweep from side to side at the base</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="safety-warnings">
                        <h4>⚠️ Important Safety Notes:</h4>
                        <ul>
                            <li>Only attempt to fight small fires</li>
                            <li>Always have an escape route behind you</li>
                            <li>Call fire department even if you extinguish the fire</li>
                            <li>If extinguisher doesn't work, evacuate immediately</li>
                            <li>Students should generally evacuate first, let adults handle fires</li>
                        </ul>
                    </div>
                    
                    <button onclick="simulateExtinguisherUse()" class="btn btn-primary">Practice PASS Method</button>
                `,
                duration: 10
            }
        ]
    },
    cyclone: {
        title: 'Cyclone Preparedness',
        icon: 'fas fa-wind',
        description: 'Understanding cyclone warnings and safe shelters',
        lessons: [
            {
                id: 1,
                title: 'Understanding Cyclones',
                videoUrl: 'https://www.youtube.com/embed/Li1ysRexTY8?si=S9HOEoOFTTOpQOfs',
                content: `
                    <h3>Cyclones in India</h3>
                    
                    <div class="cyclone-info">
                        <p>India faces tropical cyclones primarily in the Bay of Bengal and Arabian Sea. The cyclone season typically runs from April to December, with peak activity from October to December.</p>
                    </div>
                    
                    <div class="affected-areas">
                        <h4>Most Affected States:</h4>
                        <ul>
                            <li><strong>East Coast:</strong> Odisha, Andhra Pradesh, Tamil Nadu, West Bengal</li>
                            <li><strong>West Coast:</strong> Gujarat, Maharashtra, Kerala</li>
                        </ul>
                    </div>
                    
                    <div class="cyclone-warnings">
                        <h4>Warning System:</h4>
                        <div class="warning-level">
                            <h5>Yellow Warning</h5>
                            <p>Be updated - Cyclone may affect the area in 72 hours</p>
                        </div>
                        
                        <div class="warning-level">
                            <h5>Orange Warning</h5>
                            <p>Be prepared - Cyclone likely to affect in 48 hours</p>
                        </div>
                        
                        <div class="warning-level">
                            <h5>Red Warning</h5>
                            <p>Take action - Cyclone very likely to affect in 24 hours</p>
                        </div>
                    </div>
                    
                    <div class="preparation-tips">
                        <h4>School Preparation:</h4>
                        <ul>
                            <li>Monitor weather warnings regularly</li>
                            <li>Secure loose objects around school premises</li>
                            <li>Check and reinforce windows and doors</li>
                            <li>Prepare emergency supplies and first aid kits</li>
                            <li>Identify strongest parts of school building</li>
                        </ul>
                    </div>
                `,
                duration: 8
            },
            {
                id: 2,
                title: 'Cyclone Safety Measures',
                content: `
                    <h3>During a Cyclone</h3>
                    
                    <div class="safety-actions">
                        <div class="action">
                            <h4>🏢 Stay Indoors</h4>
                            <p>Remain inside the strongest part of the building, away from windows</p>
                        </div>
                        
                        <div class="action">
                            <h4>📻 Stay Informed</h4>
                            <p>Listen to weather updates on battery-powered radio</p>
                        </div>
                        
                        <div class="action">
                            <h4>💡 Avoid Electrical Items</h4>
                            <p>Don't use electrical appliances during the storm</p>
                        </div>
                    </div>
                    
                    <div class="shelter-guidelines">
                        <h4>Safe Shelter Areas:</h4>
                        <ul>
                            <li>Interior rooms on lower floors</li>
                            <li>Rooms without windows if possible</li>
                            <li>Stay away from glass doors and windows</li>
                            <li>Avoid upper floors during peak winds</li>
                        </ul>
                    </div>
                    
                    <div class="eye-of-storm">
                        <h4>⚠️ Eye of the Storm</h4>
                        <p>If the wind suddenly stops, you might be in the eye of the cyclone. <strong>DO NOT go outside</strong> - the other side of the storm is coming!</p>
                    </div>
                    
                    <div class="emergency-supplies">
                        <h4>Emergency Kit for Schools:</h4>
                        <ul>
                            <li>First aid supplies and medicines</li>
                            <li>Flashlights and extra batteries</li>
                            <li>Battery-powered or hand-crank radio</li>
                            <li>Non-perishable food and water</li>
                            <li>Emergency contact numbers</li>
                            <li>Plastic sheets and duct tape</li>
                        </ul>
                    </div>
                `,
                duration: 9
            },
            {
                id: 3,
                title: 'Post-Cyclone Recovery',
                content: `
                    <h3>After the Cyclone Passes</h3>
                    
                    <div class="post-cyclone-safety">
                        <div class="safety-step">
                            <h4>1. Wait for All-Clear</h4>
                            <p>Don't go outside until authorities give the all-clear signal</p>
                        </div>
                        
                        <div class="safety-step">
                            <h4>2. Check for Injuries</h4>
                            <p>Provide first aid and seek medical help for serious injuries</p>
                        </div>
                        
                        <div class="safety-step">
                            <h4>3. Assess Damage Safely</h4>
                            <p>Check for structural damage before using the building</p>
                        </div>
                    </div>
                    
                    <div class="hazards-to-avoid">
                        <h4>⚠️ Post-Cyclone Hazards:</h4>
                        
                        <div class="hazard">
                            <h5>Fallen Power Lines</h5>
                            <p>Assume all downed lines are live. Stay at least 10 meters away.</p>
                        </div>
                        
                        <div class="hazard">
                            <h5>Contaminated Water</h5>
                            <p>Avoid flood water - it may contain sewage, chemicals, or debris</p>
                        </div>
                        
                        <div class="hazard">
                            <h5>Damaged Buildings</h5>
                            <p>Don't enter damaged buildings - they may collapse</p>
                        </div>
                        
                        <div class="hazard">
                            <h5>Debris</h5>
                            <p>Watch for broken glass, nails, and sharp objects</p>
                        </div>
                    </div>
                    
                    <div class="recovery-steps">
                        <h4>Recovery Actions:</h4>
                        <ul>
                            <li>Document damage with photos for insurance</li>
                            <li>Contact families to confirm student safety</li>
                            <li>Coordinate with local authorities for assistance</li>
                            <li>Arrange temporary facilities if needed</li>
                            <li>Provide psychological support for traumatized students</li>
                        </ul>
                    </div>
                    
                    <div class="prevention-future">
                        <h4>Building Resilience:</h4>
                        <p>Use this experience to improve disaster preparedness plans and make buildings more cyclone-resistant.</p>
                    </div>
                `,
                duration: 8
            }
        ]
    },
    'first-aid': {
        title: 'First Aid Basics',
        icon: 'fas fa-medkit',
        description: 'Learn to respond to common injuries and medical emergencies before professional help arrives.',
        lessons: [
            {
                id: 1,
                title: 'Introduction to First Aid',
                videoUrl: 'https://www.youtube.com/embed/0JHNvpQ9JW8?si=hTTWPJWdNjOYQmTq',
                content: `
                    <h3>The Basics of First Aid</h3>
                    <p>First aid is the immediate assistance given to a person who is injured or suddenly ill. Its main goals are to preserve life, prevent the condition from worsening, and promote recovery.</p>
                    
                    <h4>The "Three P's" of First Aid:</h4>
                    <ol>
                        <li><strong>Preserve Life:</strong> Your first priority is to save the life of the person in danger.</li>
                        <li><strong>Prevent Worsening:</strong> Take steps to stop the person's condition from getting worse.</li>
                        <li><strong>Promote Recovery:</strong> Help the person to get better by making them comfortable and providing initial care.</li>
                    </ol>
                    
                    <h4>Your First Aid Kit:</h4>
                    <p>A basic first aid kit should contain:</p>
                    <ul>
                        <li>Bandages and adhesive tapes</li>
                        <li>Antiseptic wipes and hand sanitizer</li>
                        <li>Gauze pads and sterile dressings</li>
                        <li>Scissors, tweezers, and safety pins</li>
                        <li>Pain relievers and allergy medication</li>
                        <li>Emergency contact numbers</li>
                    </ul>
                `,
                duration: 7
            },
            {
                id: 2,
                title: 'Cuts, Wounds, and Bleeding',
                content: `
                    <h3>Handling Cuts and Wounds</h3>
                    <p>Properly treating a wound is essential to prevent infection and control bleeding.</p>
                    
                    <h4>Steps to Treat a Minor Cut:</h4>
                    <ol>
                        <li><strong>Wash Your Hands:</strong> Use soap and water to clean your hands before touching the wound.</li>
                        <li><strong>Clean the Wound:</strong> Gently wash the wound with clean water and mild soap.</li>
                        <li><strong>Apply Pressure:</strong> Use a clean cloth or gauze to apply gentle pressure to stop the bleeding.</li>
                        <li><strong>Apply Dressing:</strong> Once the bleeding stops, apply a sterile dressing or bandage.</li>
                    </ol>
                    
                    <h4>Controlling Severe Bleeding:</h4>
                    <ul>
                        <li><strong>Apply Firm Pressure:</strong> Use a clean cloth and press down firmly on the wound.</li>
                        <li><strong>Elevate the Limb:</strong> If the wound is on an arm or leg, raise it above the level of the heart.</li>
                        <li><strong>Maintain Pressure:</strong> Do not remove the cloth. Add more layers if blood soaks through.</li>
                        <li><strong>Call for Help:</strong> Immediately call for professional medical help (e.g., dial 108).</li>
                    </ul>
                `,
                duration: 9
            },
            {
                id: 3,
                title: 'Sprains, Burns, and Broken Bones',
                content: `
                    <h3>Responding to Common Injuries</h3>
                    
                    <h4>Sprains and Strains:</h4>
                    <p>Use the **R.I.C.E.** method for sprains:</p>
                    <ul>
                        <li><strong>R - Rest:</strong> Stop using the injured part.</li>
                        <li><strong>I - Ice:</strong> Apply an ice pack wrapped in a cloth for 20 minutes every 2-3 hours.</li>
                        <li><strong>C - Compression:</strong> Wrap the area with a bandage to reduce swelling.</li>
                        <li><strong>E - Elevation:</strong> Keep the injured area raised above the heart level.</li>
                    </ul>
                    
                    <h4>Burns:</h4>
                    <ul>
                        <li><strong>Cool the Burn:</strong> Hold the burned area under cool running water for 10-20 minutes.</li>
                        <li><strong>Remove Clothing:</strong> Gently remove any clothing or jewelry from the burn area.</li>
                        <li><strong>Cover the Burn:</strong> Use a non-stick sterile bandage to cover the burn.</li>
                        <li><strong>Seek Medical Help:</strong> For severe burns, seek professional medical help immediately.</li>
                    </ul>
                    
                    <h4>Broken Bones:</h4>
                    <ul>
                        <li><strong>Don't Move the Person:</strong> Unless they are in immediate danger, do not move them.</li>
                        <li><strong>Immobilize the Injury:</strong> Use a splint or bandage to keep the bone still.</li>
                        <li><strong>Call for Help:</strong> Call emergency services immediately.</li>
                    </ul>
                `,
                duration: 10
            }
        ]
    }
};

// Quiz Data for each module
const QuizData = {
    earthquake: {
        title: 'Earthquake Safety Quiz',
        questions: [
            {
                question: 'What is the first step in the Drop, Cover, and Hold technique?',
                options: [
                    'Run outside immediately',
                    'Drop to your hands and knees',
                    'Call for help',
                    'Look for the nearest exit'
                ],
                correct: 1,
                explanation: 'Drop to your hands and knees immediately when you feel shaking to protect yourself from falling objects.'
            },
            {
                question: 'Which earthquake zone is Delhi classified under?',
                options: [
                    'Zone III (Moderate)',
                    'Zone IV (High)',
                    'Zone V (Very High)',
                    'Zone II (Low)'
                ],
                correct: 1,
                explanation: 'Delhi is in Zone IV (High Risk) for earthquakes according to seismic zonation of India.'
            },
            {
                question: 'During an earthquake, you should:',
                options: [
                    'Immediately run to the nearest exit',
                    'Stand in a doorway',
                    'Stay under a sturdy desk or table',
                    'Go to the top floor'
                ],
                correct: 2,
                explanation: 'Take cover under a sturdy desk or table and hold on until shaking stops. Do not run during shaking.'
            },
            {
                question: 'After an earthquake stops, you should:',
                options: [
                    'Wait for teacher instructions before evacuating',
                    'Immediately run outside',
                    'Go back to normal activities',
                    'Use the elevator to evacuate quickly'
                ],
                correct: 0,
                explanation: 'Wait for the all-clear signal from teachers and evacuate using designated routes only.'
            },
            {
                question: 'What should you do if you are outdoors during an earthquake?',
                options: [
                    'Run into the nearest building',
                    'Lie down on the ground',
                    'Stay in open areas away from buildings',
                    'Hide under a car'
                ],
                correct: 2,
                explanation: 'If outdoors, stay in open areas away from buildings, trees, and power lines to avoid falling debris.'
            }
        ]
    },
    fire: {
        title: 'Fire Safety Quiz',
        questions: [
            {
                question: 'What does the P.A.S.S. method stand for in fire extinguisher use?',
                options: [
                    'Push, Aim, Squeeze, Sweep',
                    'Pull, Aim, Squeeze, Sweep',
                    'Pull, Alert, Squeeze, Stop',
                    'Push, Alert, Spray, Sweep'
                ],
                correct: 1,
                explanation: 'P.A.S.S. stands for Pull the pin, Aim at the base, Squeeze the handle, Sweep side to side.'
            },
            {
                question: 'If you encounter smoke while evacuating, you should:',
                options: [
                    'Stand upright and walk quickly',
                    'Stay low and crawl if necessary',
                    'Hold your breath and run',
                    'Turn around and find another route immediately'
                ],
                correct: 1,
                explanation: 'Stay low where air is clearer. Smoke and toxic gases rise, so cleaner air is closer to the floor.'
            },
            {
                question: 'Before opening a door during a fire emergency, you should:',
                options: [
                    'Open it immediately',
                    'Knock on it first',
                    'Touch the door handle to check if it\'s hot',
                    'Break it down if locked'
                ],
                correct: 2,
                explanation: 'Touch the door handle. If hot, do not open as fire may be on the other side. Use an alternate route.'
            },
            {
                question: 'During a fire drill, you should:',
                options: [
                    'Take time to collect your belongings',
                    'Use the elevator for quick evacuation',
                    'Move quickly but do not run',
                    'Wait for others to go first'
                ],
                correct: 2,
                explanation: 'Walk quickly but do not run to avoid accidents. Never use elevators during fire emergencies.'
            },
            {
                question: 'What is the most important thing to remember about fire safety?',
                options: [
                    'Always try to fight the fire first',
                    'Prevention is better than reaction',
                    'Elevators are safe during fires',
                    'Smoke is not dangerous'
                ],
                correct: 1,
                explanation: 'Prevention through proper safety measures and awareness is the best way to avoid fire emergencies.'
            }
        ]
    },
    flood: {
        title: 'Flood Preparedness Quiz',
        questions: [
            {
                question: 'How much moving water can knock a person down?',
                options: [
                    '2 inches',
                    '6 inches',
                    '1 foot',
                    '2 feet'
                ],
                correct: 1,
                explanation: 'Just 6 inches of moving water can knock you down. Never attempt to walk through flood water.'
            },
            {
                question: 'During a flood, the safest place in a building is:',
                options: [
                    'Basement',
                    'Ground floor',
                    'Highest floor available',
                    'Near windows'
                ],
                correct: 2,
                explanation: 'Move to the highest floor available to stay above rising water levels.'
            },
            {
                question: 'Which type of flood is most common during monsoon season in India?',
                options: [
                    'Flash floods',
                    'River floods',
                    'Urban floods',
                    'Coastal floods'
                ],
                correct: 1,
                explanation: 'River floods are most common during monsoon season (June-September) due to excessive rainfall.'
            },
            {
                question: 'If evacuation is ordered during a flood, you should:',
                options: [
                    'Wait until water reaches your area',
                    'Move immediately to designated shelter',
                    'Stay at home if it feels safe',
                    'Drive through flooded roads'
                ],
                correct: 1,
                explanation: 'If evacuation is ordered, move immediately to designated shelter areas. Do not wait for conditions to worsen.'
            },
            {
                question: 'What should you avoid after a flood?',
                options: [
                    'Drinking bottled water',
                    'Staying in groups',
                    'Walking through flood water',
                    'Seeking medical help'
                ],
                correct: 2,
                explanation: 'Avoid walking through flood water as it may contain sewage, chemicals, debris, or electrical hazards.'
            }
        ]
    },
    cyclone: {
        title: 'Cyclone Preparedness Quiz',
        questions: [
            {
                question: 'What should you do if you are in the eye of a cyclone?',
                options: [
                    'Go outside to assess damage',
                    'Stay indoors as the other side is coming',
                    'Start cleanup activities',
                    'Open all windows'
                ],
                correct: 1,
                explanation: 'DO NOT go outside during the eye of the storm. The other side of the cyclone is coming with equally strong winds.'
            },
            {
                question: 'The best shelter area during a cyclone is:',
                options: [
                    'Upper floors with large windows',
                    'Interior rooms on lower floors without windows',
                    'Basement areas',
                    'Rooms with glass doors'
                ],
                correct: 1,
                explanation: 'Interior rooms on lower floors without windows provide the best protection from high winds and flying debris.'
            },
            {
                question: 'Cyclone warnings are typically issued:',
                options: [
                    'A few hours before',
                    '24-48 hours in advance',
                    'During the cyclone',
                    'After the cyclone passes'
                ],
                correct: 1,
                explanation: 'Cyclone warnings are typically issued 24-48 hours in advance to allow time for preparation and evacuation.'
            },
            {
                question: 'What is the most dangerous part of a cyclone?',
                options: [
                    'Heavy rainfall',
                    'High winds and flying debris',
                    'Lightning',
                    'Hail'
                ],
                correct: 1,
                explanation: 'High winds and flying debris cause the most damage and pose the greatest danger during cyclones.'
            },
            {
                question: 'Essential emergency supplies for cyclones should include:',
                options: [
                    'Only food and water',
                    'Electronics and games',
                    'First aid kit, flashlight, radio, and batteries',
                    'Heavy furniture'
                ],
                correct: 2,
                explanation: 'Essential supplies include first aid kit, flashlight, battery-powered radio, extra batteries, and emergency contacts.'
            }
        ]
    },
    'first-aid': {
        title: 'First Aid Basics Quiz',
        questions: [
            {
                question: 'What is the first step when treating a minor cut?',
                options: [
                    'Apply a bandage immediately',
                    'Apply pressure to the wound',
                    'Wash your hands with soap and water',
                    'Apply an antiseptic cream'
                ],
                correct: 2,
                explanation: 'The first step is always to wash your hands to prevent infection from spreading to the wound.'
            },
            {
                question: 'What does the "I" stand for in the R.I.C.E. method for sprains?',
                options: [
                    'Immobilize',
                    'Ice',
                    'Inspect',
                    'Ignore'
                ],
                correct: 1,
                explanation: 'R.I.C.E. stands for Rest, Ice, Compression, and Elevation. "I" is for ice.'
            },
            {
                question: 'For a severe burn, what should you do immediately after calling for help?',
                options: [
                    'Apply butter or oil to the burn',
                    'Cover the burn with a non-stick sterile bandage',
                    'Pop any blisters that form',
                    'Hold the burned area under cool running water'
                ],
                correct: 3,
                explanation: 'The most important immediate step for a severe burn is to cool it with running water to stop the burning process and reduce pain.'
            },
            {
                question: 'What is the first goal of first aid?',
                options: [
                    'Promote recovery',
                    'Prevent the condition from worsening',
                    'Preserve life',
                    'Transport the victim to a hospital'
                ],
                correct: 2,
                explanation: 'The primary goal of first aid is always to preserve the victim\'s life.'
            },
            {
                question: 'What should you NOT do when a person has a broken bone?',
                options: [
                    'Immobilize the injured area',
                    'Move the person to a more comfortable position',
                    'Call emergency services',
                    'Keep the person warm'
                ],
                correct: 1,
                explanation: 'You should not move a person with a broken bone unless they are in immediate danger, as this could cause further injury.'
            }
        ]
    }
};

// DOM Elements
let currentModal = null;
let currentModule = null;
let currentLesson = 0;
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizAnswers = [];
let quizScore = 0;


document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeWebSocket();
    loadUserProgress();
    animateStats();
    populateLocalContacts();
    checkAuthStatus();
});

function initializeApp() {
    AppState.modules = ModulesData;
    
    const savedProgress = localStorage.getItem('disasterEduProgress');
    if (savedProgress) {
        Object.assign(AppState.currentUser, JSON.parse(savedProgress));
        updateUI();
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initializeWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);
    let keepAliveInterval;

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'location-update', location }));
                }
            }, error => {
                console.error('Error getting location:', error);
            });
        }

        keepAliveInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 25000);
    };

    ws.onmessage = event => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'emergency-alert') {
                console.log('Emergency alert received:', data.message);
                triggerEmergencyAlarm(data.message);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server. Attempting to reconnect...');
        clearInterval(keepAliveInterval);
        setTimeout(initializeWebSocket, 5000);
    };

    ws.onerror = error => {
        console.error('WebSocket error:', error);
        clearInterval(keepAliveInterval);
    };
}

function triggerEmergencyAlarm(message) {
    const alarmOverlay = document.getElementById('emergency-alarm-overlay');
    const alarmMessage = document.getElementById('alarm-message');
    const alarmAudio = document.getElementById('emergency-alarm-audio');

    if (alarmOverlay && alarmMessage && alarmAudio) {
        alarmMessage.textContent = message || 'Natural Disaster Alert!';
        alarmOverlay.style.display = 'flex';
        alarmAudio.play();
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

// ... (code from the top of the file remains the same) ...

function setupEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Mobile signup link event listener
    const mobileSignupLink = document.getElementById('mobile-signup-link');
    if (mobileSignupLink) {
        mobileSignupLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent page jump
            openSignupModal();
            navMenu.classList.remove('active'); // Close menu after clicking
        });
    }
    
    // --- START: MODAL CLOSE LOGIC ---

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // --- END: MODAL CLOSE LOGIC ---
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.module-card, .contact-card, .progress-card').forEach(card => {
        observer.observe(card);
    });
}

function startLearning() {
    document.querySelector('#modules').scrollIntoView({ behavior: 'smooth' });
}

function startModule(moduleType) {
    currentModule = moduleType;
    currentLesson = 0;
    
    const modal = document.getElementById('module-modal');
    const content = document.getElementById('module-content');
    
    content.innerHTML = generateModuleContent(moduleType, 0);
    modal.style.display = 'block';
    currentModal = modal;
}

function generateModuleContent(moduleType, lessonIndex) {
    const module = AppState.modules[moduleType];
    const lesson = module.lessons[lessonIndex];

    const videoPlayer = lesson.videoUrl ? `
        <div class="video-container">
            <iframe 
                src="${lesson.videoUrl}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    ` : '';

    return `
        <div class="module-header">
            <h2><i class="${module.icon}"></i> ${module.title}</h2>
            <div class="lesson-progress">
                <span>Lesson ${lessonIndex + 1} of ${module.lessons.length}</span>
                <div class="lesson-progress-bar">
                    <div class="lesson-progress-fill" style="width: ${((lessonIndex + 1) / module.lessons.length) * 100}%"></div>
                </div>
            </div>
        </div>
        
        <div class="lesson-content">
            <h3>${lesson.title}</h3>
            ${videoPlayer} <div class="lesson-body">
                ${lesson.content}
            </div>
        </div>
        
        <div class="lesson-navigation">
            ${lessonIndex > 0 ? `<button class="btn btn-secondary" onclick="previousLesson()">Previous</button>` : ''}
            <div class="lesson-timer">
                <i class="fas fa-clock"></i>
                <span>${lesson.duration} min</span>
            </div>
            ${lessonIndex < module.lessons.length - 1 ? 
                `<button class="btn btn-primary" onclick="nextLesson()">Next Lesson</button>` : 
                `<button class="btn btn-primary" onclick="startQuiz()">Take Quiz</button>`
            }
        </div>
    `;
}

function nextLesson() {
    const module = AppState.modules[currentModule];
    if (currentLesson < module.lessons.length - 1) {
        currentLesson++;
        const content = document.getElementById('module-content');
        content.innerHTML = generateModuleContent(currentModule, currentLesson);
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        currentLesson--;
        const content = document.getElementById('module-content');
        content.innerHTML = generateModuleContent(currentModule, currentLesson);
    }
}

function completeModule() {
    if (!AppState.currentUser.modulesCompleted.includes(currentModule)) {
        AppState.currentUser.modulesCompleted.push(currentModule);
        AppState.currentUser.preparednessScore += 20;
        awardBadge('first-steps');
        updateModuleProgress(currentModule, 100);
        updatePreparednessScore();
        saveProgress();
    }
    
    const content = document.getElementById('module-content');
    content.innerHTML = `
        <div class="completion-message">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #2ecc71; margin-bottom: 20px;"></i>
            <h2>Module Complete!</h2>
            <p>Congratulations! You've successfully completed the ${AppState.modules[currentModule].title} module.</p>
            <div class="completion-stats">
                <div class="stat">
                    <strong>+20 Points</strong>
                    <span>Preparedness Score</span>
                </div>
                <div class="stat">
                    <strong>Knowledge Gained</strong>
                    <span>Life-saving skills</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="closeModal()">Continue Learning</button>
        </div>
    `;
}

function startQuiz() {
    currentQuiz = QuizData[currentModule];
    currentQuestionIndex = 0;
    quizAnswers = [];
    quizScore = 0;
    
    const content = document.getElementById('module-content');
    content.innerHTML = generateQuizContent();
}

function generateQuizContent() {
    const quiz = currentQuiz;
    const question = quiz.questions[currentQuestionIndex];
    
    return `
        <div class="quiz-header">
            <h2><i class="fas fa-question-circle"></i> ${quiz.title}</h2>
            <div class="quiz-progress">
                <span>Question ${currentQuestionIndex + 1} of ${quiz.questions.length}</span>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%"></div>
                </div>
            </div>
        </div>
        
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectAnswer(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-navigation">
            <div class="quiz-info">
                <i class="fas fa-lightbulb"></i>
                <span>Choose the best answer</span>
            </div>
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    quizAnswers[currentQuestionIndex] = {
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect,
        explanation: question.explanation
    };
    
    if (isCorrect) {
        quizScore++;
    }
    
    showAnswerFeedback(selectedIndex, question);
}

function showAnswerFeedback(selectedIndex, question) {
    const content = document.getElementById('module-content');
    const isCorrect = selectedIndex === question.correct;
    
    content.innerHTML = `
        <div class="answer-feedback">
            <div class="feedback-header">
                <div class="feedback-icon ${isCorrect ? 'correct' : 'incorrect'}">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                </div>
                <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
            </div>
            
            <div class="feedback-content">
                <p><strong>Question:</strong> ${question.question}</p>
                <p><strong>Your Answer:</strong> ${question.options[selectedIndex]}</p>
                ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${question.options[question.correct]}</p>` : ''}
                
                <div class="explanation">
                    <h4>Explanation:</h4>
                    <p>${question.explanation}</p>
                </div>
            </div>
            
            <div class="feedback-navigation">
                ${currentQuestionIndex < currentQuiz.questions.length - 1 ? 
                    `<button class="btn btn-primary" onclick="nextQuestion()">Next Question</button>` :
                    `<button class="btn btn-primary" onclick="showQuizResults()">See Results</button>`
                }
            </div>
        </div>
    `;
}

function nextQuestion() {
    currentQuestionIndex++;
    const content = document.getElementById('module-content');
    content.innerHTML = generateQuizContent();
}

function showQuizResults() {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const passed = percentage >= 70;
    
    const content = document.getElementById('module-content');
    content.innerHTML = `
        <div class="quiz-results">
            <div class="results-header">
                <div class="results-icon ${passed ? 'passed' : 'failed'}">
                    <i class="fas fa-${passed ? 'trophy' : 'redo'}"></i>
                </div>
                <h2>Quiz ${passed ? 'Complete!' : 'Results'}</h2>
            </div>
            
            <div class="results-summary">
                <div class="score-display">
                    <div class="score-circle ${passed ? 'passed' : 'failed'}">
                        <span class="score-percentage">${percentage}%</span>
                    </div>
                    <p>You scored ${quizScore} out of ${totalQuestions} questions correctly</p>
                </div>
                
                <div class="performance-message">
                    ${passed ? 
                        `<p class="success-message">Excellent! You've demonstrated a good understanding of ${AppState.modules[currentModule].title}.</p>` :
                        `<p class="retry-message">You need 70% or higher to pass. Review the material and try again.</p>`
                    }
                </div>
            </div>
            
            <div class="results-actions">
                ${passed ? 
                    `<button class="btn btn-primary" onclick="completeModuleWithQuiz()">Complete Module</button>` :
                    `<button class="btn btn-secondary" onclick="retakeQuiz()">Retake Quiz</button>
                     <button class="btn btn-primary" onclick="reviewModule()">Review Module</button>`
                }
            </div>
        </div>
    `;
}

function completeModuleWithQuiz() {
    if (!AppState.currentUser.modulesCompleted.includes(currentModule)) {
        AppState.currentUser.modulesCompleted.push(currentModule);
        AppState.currentUser.preparednessScore += 25;
        awardBadge('first-steps');
        updateModuleProgress(currentModule, 100);
        updatePreparednessScore();
        saveProgress();
        addToRecentActivity(`Completed ${AppState.modules[currentModule].title} module with quiz`);
    }
    
    const content = document.getElementById('module-content');
    content.innerHTML = `
        <div class="completion-message">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #2ecc71; margin-bottom: 20px;"></i>
            <h2>Module Complete!</h2>
            <p>Congratulations! You've successfully completed the ${AppState.modules[currentModule].title} module and passed the quiz!</p>
            <div class="completion-stats">
                <div class="stat">
                    <strong>+25 Points</strong>
                    <span>Preparedness Score</span>
                </div>
                <div class="stat">
                    <strong>Quiz Score</strong>
                    <span>${Math.round((quizScore / currentQuiz.questions.length) * 100)}%</span>
                </div>
                <div class="stat">
                    <strong>Knowledge Gained</strong>
                    <span>Life-saving skills</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="closeModal()">Continue Learning</button>
        </div>
    `;
}

function retakeQuiz() {
    startQuiz();
}

function reviewModule() {
    currentLesson = 0;
    const content = document.getElementById('module-content');
    content.innerHTML = generateModuleContent(currentModule, 0);
}

function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('is-visible');
        currentModal = null;
    }
}

function showAnswer(answerId, answer) {
    const answerDiv = document.getElementById(answerId);
    answerDiv.innerHTML = `<strong>Answer:</strong> ${answer}`;
    answerDiv.style.display = 'block';
}

function practiceDropCoverHold() {
    alert('Great! Practice the Drop, Cover, and Hold technique:\n\n1. DROP to hands and knees\n2. COVER under desk/table\n3. HOLD onto shelter\n\nRemember: Stay protected until shaking stops!');
}

function simulateExtinguisherUse() {
    const steps = ['PULL the safety pin', 'AIM at base of fire', 'SQUEEZE the handle', 'SWEEP side to side'];
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            alert(`Step ${currentStep + 1}: ${steps[currentStep]}`);
            currentStep++;
        } else {
            clearInterval(interval);
            alert('Excellent! You\'ve completed the PASS method training.');
        }
    }, 1500);
}

function updateModuleProgress(moduleType, percentage) {
    const moduleCard = document.querySelector(`[data-module="${moduleType}"]`);
    if (moduleCard) {
        const progressBar = moduleCard.querySelector('.progress');
        const progressText = moduleCard.querySelector('.progress-text');
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = percentage + '% Complete';
        
        if (percentage === 100) {
            moduleCard.classList.add('completed');
        }
    }
}

function updatePreparednessScore() {
    const scoreElement = document.querySelector('.score-number');
    const circleProgress = document.querySelector('.circle-progress');
    
    if (scoreElement && circleProgress) {
        scoreElement.textContent = AppState.currentUser.preparednessScore;
        
        const percentage = AppState.currentUser.preparednessScore;
        const degrees = (percentage / 100) * 360;
        circleProgress.style.background = `conic-gradient(#3498db ${degrees}deg, #ecf0f1 ${degrees}deg)`;
    }
}

function awardBadge(badgeType) {
    if (!AppState.currentUser.badges.includes(badgeType)) {
        AppState.currentUser.badges.push(badgeType);
        
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            const badgeText = badge.querySelector('span').textContent.toLowerCase().replace(' ', '-');
            if (badgeText === badgeType) {
                badge.classList.remove('locked');
                badge.classList.add('earned');
            }
        });
        
        showNotification(`Badge Earned: ${badgeType.replace('-', ' ').toUpperCase()}!`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-award"></i><span>${message}</span>`;
    notification.style.cssText = `
        position: fixed; top: 80px; right: 20px; background: linear-gradient(45deg, #f39c12, #e67e22);
        color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000; display: flex; align-items: center; gap: 10px; font-weight: 600;
        animation: slideIn 0.5s ease-out;`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function addToRecentActivity(activity) {
    const activityList = document.getElementById('recent-activity');
    if (activityList) {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `<span>${activity}</span><span class="activity-time">Just now</span>`;
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        const activities = activityList.querySelectorAll('.activity-item');
        if (activities.length > 5) {
            activities[activities.length - 1].remove();
        }
    }
}

function populateLocalContacts() {
    const localContacts = [
        { name: 'Local Police Station', number: '011-XXXXXXX' },
        { name: 'District Collector', number: '011-XXXXXXX' },
        { name: 'Municipal Corporation', number: '1800-XXX-XXXX' },
        { name: 'Red Cross Society', number: '011-XXXXXXX' }
    ];
    
    const container = document.getElementById('local-contacts');
    if (container) {
        container.innerHTML = localContacts.map(contact => `
            <div class="contact-item">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-number">${contact.number}</span>
            </div>
        `).join('');
    }
}

function addLocalContact() {
    const name = prompt('Enter contact name:');
    const number = prompt('Enter contact number:');
    
    if (name && number) {
        AppState.emergencyContacts.push({ name, number });
        populateLocalContacts();
        saveProgress();
        showNotification('Emergency contact added successfully!');
    }
}

function saveProgress() {
    localStorage.setItem('disasterEduProgress', JSON.stringify(AppState.currentUser));
}

function loadUserProgress() {
    const savedProgress = localStorage.getItem('disasterEduProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        Object.assign(AppState.currentUser, progress);
        if (!AppState.currentUser.city) {
            AppState.currentUser.city = AppState.currentUser.region || 'Delhi';
        }
        updateCityDisplays(AppState.currentUser.city);
        updateUI();
        loadEmergencyData();
    } else {
        AppState.currentUser.city = 'Delhi';
        loadEmergencyData();
    }
}

function updateUI() {
    updatePreparednessScore();
}

function animateStats() {
    const stats = [
        { id: 'users-count', target: 1247, duration: 2000 },
        { id: 'drills-count', target: 3892, duration: 2500 },
        { id: 'schools-count', target: 156, duration: 1500 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            let current = 0;
            const increment = stat.target / (stat.duration / 50);
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 50);
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .lesson-body { line-height: 1.8; margin: 20px 0; }
    .lesson-body h3, .lesson-body h4 { color: #2c3e50; margin: 20px 0 10px 0; }
    .lesson-body ul { margin: 10px 0 10px 30px; }
    .lesson-quiz { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3498db; }
    .answer { background: #d5f4e6; padding: 10px; border-radius: 5px; margin-top: 10px; color: #27ae60; }
    .technique-steps, .pass-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .step, .pass-step { background: #fff; border: 2px solid #3498db; border-radius: 10px; padding: 20px; text-align: center; }
    .step h4, .pass-step h4 { color: #3498db; font-size: 1.2rem; margin-bottom: 10px; }
    .safety-tips, .safety-rules, .precautions { background: #fff3cd; border-left: 4px solid #f39c12; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .important { background: #f8d7da; border-left-color: #e74c3c; }
    .completion-message, .drill-completion { text-align: center; padding: 40px; }
    .completion-stats, .drill-feedback { display: flex; justify-content: space-around; margin: 30px 0; flex-wrap: wrap; gap: 20px; }
    .completion-stats .stat, .feedback-item { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 10px; min-width: 150px; }
    .instruction-card { background: #fff; border: 2px solid #e74c3c; border-radius: 10px; padding: 30px; margin: 20px 0; text-align: center; }
    .drill-controls { display: flex; justify-content: center; gap: 15px; align-items: center; flex-wrap: wrap; margin-top: 20px; }
    .drill-progress { background: #f8f9fa; padding: 10px 20px; border-radius: 20px; font-weight: 600; color: #2c3e50; }
    .timer-display { text-align: center; background: #2c3e50; color: white; padding: 15px 30px; border-radius: 10px; font-size: 1.5rem; font-weight: bold; margin: 20px 0; }
    .step-timer { margin-top: 15px; font-size: 0.9rem; color: #7f8c8d; }
    .lesson-navigation { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1; }
    .lesson-timer { display: flex; align-items: center; gap: 8px; color: #7f8c8d; font-size: 0.9rem; }
    .lesson-progress { text-align: center; margin: 20px 0; }
    .lesson-progress-bar { background: #ecf0f1; height: 6px; border-radius: 10px; margin-top: 10px; overflow: hidden; }
    .lesson-progress-fill { background: linear-gradient(45deg, #3498db, #2980b9); height: 100%; transition: width 0.5s ease; }
    .module-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #ecf0f1; }
    .module-header h2 { color: #2c3e50; margin-bottom: 15px; }
    .module-header i { margin-right: 10px; color: #3498db; }
`;
document.head.appendChild(style);

function openCityModal() {
    const modal = document.getElementById('city-modal');
    const currentCityDisplay = document.getElementById('current-city-display');
    
    currentCityDisplay.textContent = AppState.currentUser.city || 'Delhi';
    
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            selectCity(city);
        });
    });
    
    const customInput = document.getElementById('custom-city-input');
    customInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            selectCustomCity();
        }
    });
    
    modal.style.display = 'block';
    currentModal = modal;
}

function selectCity(cityName) {
    if (!cityName || cityName.trim() === '') {
        alert('Please enter a valid city name.');
        return;
    }
    
    AppState.currentUser.city = cityName;
    AppState.currentUser.region = cityName;
    updateCityDisplays(cityName);
    saveProgress();
    loadEmergencyData();
    showCityChangeNotification(cityName);
    closeModal();
}

function selectCustomCity() {
    const customInput = document.getElementById('custom-city-input');
    const cityName = customInput.value.trim();
    
    if (cityName) {
        selectCity(cityName);
        customInput.value = '';
    } else {
        alert('Please enter a city name.');
        customInput.focus();
    }
}

function updateCityDisplays(cityName) {
    const navCity = document.getElementById('current-city-nav');
    if (navCity) navCity.textContent = cityName;
    const contactsCity = document.getElementById('current-city-contacts');
    if (contactsCity) contactsCity.textContent = cityName;
    const alertsCity = document.getElementById('current-city-alerts');
    if (alertsCity) alertsCity.textContent = cityName;
    const modalCity = document.getElementById('current-city-display');
    if (modalCity) modalCity.textContent = cityName;
}

function showCityChangeNotification(cityName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #2ecc71; color: white;
        padding: 15px 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000; font-weight: 600; animation: slideInRight 0.3s ease;`;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> City updated to ${cityName}`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function loadEmergencyData() {
    const currentCity = AppState.currentUser.city || 'Delhi';
    loadLocalContacts(currentCity);
    loadCurrentAlerts(currentCity);
}

function loadLocalContacts(cityName) {
    const contactsList = document.getElementById('local-contacts');
    if (!contactsList) return;
    
    const emergencyContacts = {
        'Delhi': [ { name: 'Delhi Police Control Room', number: '011-23490000', type: 'police' }, { name: 'Delhi Fire Service', number: '011-23221122', type: 'fire' }, { name: 'Delhi Disaster Management', number: '011-23978350', type: 'disaster' }, { name: 'AIIMS Emergency', number: '011-26588500', type: 'medical' } ],
        'Mumbai': [ { name: 'Mumbai Police', number: '022-22621855', type: 'police' }, { name: 'Mumbai Fire Brigade', number: '022-22622111', type: 'fire' }, { name: 'BMC Disaster Cell', number: '022-22694725', type: 'disaster' }, { name: 'KEM Hospital Emergency', number: '022-24129884', type: 'medical' } ],
        'Bangalore': [ { name: 'Bangalore City Police', number: '080-22943225', type: 'police' }, { name: 'Bangalore Fire & Emergency', number: '080-25588888', type: 'fire' }, { name: 'BBMP Emergency', number: '080-22660000', type: 'disaster' }, { name: 'Victoria Hospital', number: '080-26700001', type: 'medical' } ],
        'Chennai': [ { name: 'Chennai City Police', number: '044-23452301', type: 'police' }, { name: 'Chennai Fire Service', number: '044-25360131', type: 'fire' }, { name: 'Chennai Corporation Emergency', number: '044-25619892', type: 'disaster' }, { name: 'General Hospital Chennai', number: '044-25281314', type: 'medical' } ],
        'Kolkata': [ { name: 'Kolkata Police', number: '033-22143526', type: 'police' }, { name: 'Kolkata Fire Brigade', number: '033-22526781', type: 'fire' }, { name: 'KMC Emergency', number: '033-22861221', type: 'disaster' }, { name: 'Medical College Emergency', number: '033-22041188', type: 'medical' } ]
    };
    
    const contacts = emergencyContacts[cityName] || [
        { name: `${cityName} Police Station`, number: '100', type: 'police' },
        { name: `${cityName} Fire Station`, number: '101', type: 'fire' },
        { name: `${cityName} Emergency Services`, number: '108', type: 'medical' },
        { name: 'National Disaster Response', number: '1078', type: 'disaster' }
    ];
    
    contactsList.innerHTML = contacts.map(contact => `
        <div class="contact-item">
            <span class="contact-name"><i class="fas fa-${getContactIcon(contact.type)}"></i> ${contact.name}</span>
            <span class="contact-number">${contact.number}</span>
        </div>
    `).join('');
}

function getContactIcon(type) {
    const icons = { police: 'shield-alt', fire: 'fire', medical: 'plus', disaster: 'exclamation-triangle' };
    return icons[type] || 'phone';
}

function loadCurrentAlerts(cityName) {
    const alertsList = document.getElementById('current-alerts');
    if (!alertsList) return;
    
    const mockAlerts = {
        'Delhi': [ { type: 'info', message: 'Air quality moderate today. Avoid outdoor activities if sensitive.', severity: 'low' }, { type: 'weather', message: 'Light rain expected in evening. Keep umbrellas ready.', severity: 'low' } ],
        'Mumbai': [ { type: 'weather', message: 'Heavy rain alert for next 24 hours. Avoid waterlogged areas.', severity: 'medium' }, { type: 'traffic', message: 'Local train delays due to weather conditions.', severity: 'low' } ],
        'Bangalore': [ { type: 'info', message: 'No major alerts currently. Stay prepared and informed.', severity: 'low' } ]
    };
    
    const alerts = mockAlerts[cityName] || [ { type: 'info', message: `No current alerts for ${cityName}. Stay safe and prepared.`, severity: 'low' } ];
    
    alertsList.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <i class="fas fa-${getAlertIcon(alert.type)}"></i>
            <span>${alert.message}</span>
        </div>
    `).join('');
}

function getAlertIcon(type) {
    const icons = { weather: 'cloud-rain', traffic: 'car', info: 'info-circle', emergency: 'exclamation-triangle' };
    return icons[type] || 'info-circle';
}

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, 'at', url, ':', lineNo, ':', columnNo);
    return false;
};

// --- Authentication Functions ---
function openSignupModal() {
    const modal = document.getElementById('signup-modal');
    if (modal) {
        modal.classList.add('is-visible');
        currentModal = modal;
        showSignupForm();
    }
}

// Toggle between signup and login forms
function showSignupForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
}

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-tab').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
}

// public/js/main.js

// ... (existing code) ...

// Email signup
async function handleEmailSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            showNotification(`✅ Welcome, ${result.user.username}! Redirecting to your dashboard...`);
            // Redirect to the dashboard on successful signup
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Use the notification function for errors as well
            showNotification(`❌ Signup failed: ${result.message}`, 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('⚠️ An error occurred during signup. Please try again.', 'error');
    }
}

// Email login
async function handleEmailLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            showNotification(`✅ Welcome back, ${result.user.username}! Redirecting...`);
            // Redirect to the dashboard on successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showNotification(`❌ Login failed: ${result.message}`, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('⚠️ An error occurred during login. Please try again.', 'error');
    }
}


// A small update to the showNotification function to handle errors
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<span>${message}</span>`;
    
    // Style differently for errors
    if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
    }

    notification.style.cssText += `
        position: fixed; top: 80px; right: 20px;
        color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000; display: flex; align-items: center; gap: 10px; font-weight: 600;
        animation: slideIn 0.5s ease-out;`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Check authentication status
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/user');
        const result = await response.json();
        
        if (result.success) {
            updateUIForLoggedInUser(result.user);
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    const signupBtn = document.getElementById('signup-btn');
    const mobileSignupLink = document.getElementById('mobile-signup-link');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    
    if (signupBtn) signupBtn.style.display = 'none';
    if (mobileSignupLink) mobileSignupLink.style.display = 'none';
    
    if (userMenu && userName) {
        userMenu.style.display = 'flex';
        userName.textContent = user.username;
        
        // Hide avatar since we're not using Google OAuth
        if (userAvatar) {
            userAvatar.style.display = 'none';
        }
    }
}

// Logout function
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            showNotification('Logged out successfully');
            // Reset UI to logged out state
            const signupBtn = document.getElementById('signup-btn');
            const mobileSignupLink = document.getElementById('mobile-signup-link');
            const userMenu = document.getElementById('user-menu');
            
            if (signupBtn) signupBtn.style.display = 'inline-block';
            if (mobileSignupLink) mobileSignupLink.style.display = 'inline-block';
            if (userMenu) userMenu.style.display = 'none';
            
            // Reload page to reset any user-specific data
            setTimeout(() => window.location.reload(), 1000);
        } else {
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout.');
    }
}

function sendTestAlarm() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            fetch('/api/trigger-alarm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: AppState.currentUser.id,
                    disasterType: 'Test Disaster',
                    location: location
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Alarm triggered! ${data.alertsSent} user(s) notified.`);
                } else {
                    alert('Failed to trigger alarm.');
                }
            })
            .catch(error => {
                console.error('Error triggering alarm:', error);
                alert('An error occurred while triggering the alarm.');
            });
        }, error => {
            console.error('Error getting location for alarm:', error);
            alert('Could not get your location to send an alarm. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}
