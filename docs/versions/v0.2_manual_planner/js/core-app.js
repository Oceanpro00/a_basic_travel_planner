/* ==================================================
   CORE APP - MAIN CONTROLLER & INITIALIZATION  
   ================================================== */

// Global App State
window.TravelPlanner = {
    currentTab: 'path-points',
    isMapView: false,
    pathPointCounter: 0,
    activityCounter: 0,
    hotelCounter: 0,
    currentMarkerFilter: 'activity',
    isFirstVisit: false
};

// Activity Types
window.ACTIVITY_TYPES = {
    'activity': { icon: '⭐', title: 'Activity', placeholder: 'e.g., Historic Site, Museum, Beach' },
    'mustdo': { icon: '❤️', title: 'Must-Do', placeholder: 'e.g., Art Museum, Scenic Viewpoint' },
    'food': { icon: '🍕', title: 'Restaurant', placeholder: 'e.g., Italian, Seafood, Local Cuisine' },
    'cafe': { icon: '☕', title: 'Cafe', placeholder: 'e.g., Coffee Shop, Bakery, Gelato' }
};

/* ==================================================
   EXAMPLE DATA SYSTEM
   ================================================== */

function getExampleTripData() {
    return {
        tripTitle: 'Florence Adventure',
        pathPoints: [
            {
                name: 'Historic Florence Center',
                lat: 43.7696,
                lng: 11.2558,
                description: 'Explore the heart of Renaissance Florence with its stunning architecture and rich history.',
                photos: [
                    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
                    'https://images.unsplash.com/photo-1543832923-44667a44c151?w=800'
                ],
                link: 'https://www.firenzeturismo.it',
                hotels: [
                    {
                        name: 'Hotel Davanzati',
                        type: 'Boutique Historic Hotel',
                        description: 'Charming boutique hotel in a 14th-century palace, steps from Ponte Vecchio.',
                        photos: [
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                        ],
                        roomPhotos: [
                            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
                        ],
                        link: 'https://hoteldavanzati.it'
                    }
                ]
            },
            {
                name: 'Oltrarno District',
                lat: 43.7649,
                lng: 11.2494,
                description: 'The authentic artisan quarter across the river, filled with workshops, galleries, and local life.',
                photos: [
                    'https://images.unsplash.com/photo-1589181191264-f2e7aa64d4b4?w=800',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
                ],
                link: 'https://www.oltrarno.net',
                hotels: [
                    {
                        name: 'Palazzo Guadagni',
                        type: 'Historic Palazzo',
                        description: 'Renaissance palace turned boutique hotel with panoramic terraces overlooking Florence.',
                        photos: [
                            'https://images.unsplash.com/photo-1578774230631-9b28cf1de78b?w=800',
                            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                        ],
                        roomPhotos: [
                            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                            'https://images.unsplash.com/photo-1568495248636-6432b98aab90?w=800'
                        ],
                        link: 'https://palazzoguadagni.com'
                    },
                    {
                        name: 'Villa Cora',
                        type: 'Luxury Villa',
                        description: '19th-century villa with beautiful gardens and panoramic city views.',
                        photos: [
                            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
                            'https://images.unsplash.com/photo-1445019980597-93fa8acb0b5e?w=800'
                        ],
                        roomPhotos: [
                            'https://images.unsplash.com/photo-1578898886175-d6c2b820c49c?w=800',
                            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
                        ],
                        link: 'https://villacora.it'
                    }
                ]
            }
        ],
        activities: [
            // Activities
            {
                name: 'Uffizi Gallery',
                type: 'activity',
                category: 'Art Museum',
                lat: 43.7678,
                lng: 11.2553,
                description: 'World-famous museum housing Renaissance masterpieces by Botticelli, Michelangelo, and Leonardo da Vinci.',
                photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
                link: 'https://www.uffizi.it'
            },
            {
                name: 'Ponte Vecchio',
                type: 'activity',
                category: 'Historic Bridge',
                lat: 43.7679,
                lng: 11.2531,
                description: 'Medieval stone bridge lined with jewelry shops, one of Florence\'s most iconic landmarks.',
                photos: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'],
                link: 'https://www.firenzeturismo.it/ponte-vecchio'
            },
            {
                name: 'Palazzo Pitti',
                type: 'activity',
                category: 'Royal Palace',
                lat: 43.7651,
                lng: 11.2499,
                description: 'Vast Renaissance palace complex with multiple museums and beautiful Boboli Gardens.',
                photos: ['https://images.unsplash.com/photo-1578774230631-9b28cf1de78b?w=800'],
                link: 'https://www.uffizi.it/palazzo-pitti'
            },
            // Must-Dos (2 random ones will be converted)
            {
                name: 'Duomo di Firenze',
                type: 'mustdo',
                category: 'Cathedral',
                lat: 43.7731,
                lng: 11.2560,
                description: 'Iconic cathedral with Brunelleschi\'s magnificent dome, the symbol of Florence.',
                photos: ['https://images.unsplash.com/photo-1543832923-44667a44c151?w=800'],
                link: 'https://www.operaduomo.firenze.it'
            },
            {
                name: 'Accademia Gallery',
                type: 'mustdo',
                category: 'Art Museum',
                lat: 43.7761,
                lng: 11.2594,
                description: 'Home to Michelangelo\'s original David sculpture and other Renaissance masterpieces.',
                photos: ['https://images.unsplash.com/photo-1589181191264-f2e7aa64d4b4?w=800'],
                link: 'https://www.galleriaaccademiafirenze.it'
            },
            // Food
            {
                name: 'All\'Antico Vinaio',
                type: 'food',
                category: 'Sandwich Shop',
                lat: 43.7702,
                lng: 11.2540,
                description: 'Famous local sandwich shop with incredible Tuscan specialties and fresh ingredients.',
                photos: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'],
                link: 'https://www.allanticovinaio.com'
            },
            {
                name: 'Trattoria Mario',
                type: 'food',
                category: 'Traditional Trattoria',
                lat: 43.7747,
                lng: 11.2553,
                description: 'Historic family-run trattoria serving authentic Florentine cuisine since 1953.',
                photos: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'],
                link: 'https://trattoriamario.com'
            },
            {
                name: 'Mercato Centrale',
                type: 'food',
                category: 'Food Market',
                lat: 43.7764,
                lng: 11.2541,
                description: 'Vibrant covered market with local vendors, fresh produce, and gourmet food stalls.',
                photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
                link: 'https://www.mercatocentrale.it'
            },
            // Cafes
            {
                name: 'Ditta Artigianale',
                type: 'cafe',
                category: 'Specialty Coffee',
                lat: 43.7712,
                lng: 11.2560,
                description: 'Trendy local coffee roastery known for excellent espresso and modern atmosphere.',
                photos: ['https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'],
                link: 'https://www.dittaartigianale.it'
            },
            {
                name: 'Caffè Gilli',
                type: 'cafe',
                category: 'Historic Cafe',
                lat: 43.7713,
                lng: 11.2538,
                description: 'Elegant historic café on Piazza della Repubblica, serving coffee since 1733.',
                photos: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'],
                link: 'https://www.gilli.it'
            },
            {
                name: 'La Ménagère',
                type: 'cafe',
                category: 'Concept Store Cafe',
                lat: 43.7722,
                lng: 11.2536,
                description: 'Unique concept store combining café, restaurant, flower shop, and home decor.',
                photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'],
                link: 'https://www.lamenagere.it'
            }
        ]
    };
}

function loadExampleData() {
    const exampleData = getExampleTripData();
    
    // Clear existing data
    clearAllTrip();
    
    // Set trip title
    document.getElementById('tripTitle').value = exampleData.tripTitle;
    
    // Load path points
    exampleData.pathPoints.forEach(pathPoint => {
        createPathPointFromData(pathPoint);
    });
    
    // Load activities
    exampleData.activities.forEach(activity => {
        createActivityFromData(activity);
    });
    
    updateStatistics();
    autoSave();
}

function checkFirstVisit() {
    const hasVisited = localStorage.getItem('travelPlannerVisited');
    const hasSavedData = localStorage.getItem('travelPlannerData');
    
    // Only load example data on true first visit (no visited flag AND no saved data)
    if (!hasVisited && !hasSavedData) {
        window.TravelPlanner.isFirstVisit = true;
        localStorage.setItem('travelPlannerVisited', 'true');
        loadExampleData();
        showToast('Welcome! Here\'s an example trip to get you started.', 'info', 5000);
    } else {
        // User has visited before or has saved data - don't load example
        window.TravelPlanner.isFirstVisit = false;
    }
}

/* ==================================================
   NEW TRIP BUTTON FUNCTIONALITY
   ================================================== */

function showNewTripDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3>⚠️ Start New Trip</h3>
                <button class="modal-close" onclick="closeNewTripDialog()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Warning:</strong> This will permanently delete your current trip data.</p>
                <p>Choose how you'd like to start:</p>
                <div class="modal-actions">
                    <button class="modal-btn primary" onclick="startNewTrip('example')">
                        📋 Start with Example
                    </button>
                    <button class="modal-btn secondary" onclick="startNewTrip('empty')">
                        📄 Start Empty
                    </button>
                    <button class="modal-btn cancel" onclick="closeNewTripDialog()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function startNewTrip(type) {
    if (type === 'example') {
        loadExampleData();
        showToast('New example trip loaded!', 'success');
    } else {
        // Use clearAllData to completely clear everything including localStorage
        clearAllData();
        showToast('New empty trip started!', 'success');
    }
    
    closeNewTripDialog();
}

function closeNewTripDialog() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Make functions global for onclick handlers
window.showNewTripDialog = showNewTripDialog;
window.startNewTrip = startNewTrip;
window.closeNewTripDialog = closeNewTripDialog;
window.switchTab = switchTab;
window.switchMarkerSubtab = switchMarkerSubtab;
window.createPathPointFromData = createPathPointFromData;
window.createActivityFromData = createActivityFromData;
window.populateItemFromData = populateItemFromData;
window.populatePhotos = populatePhotos;
window.restoreTripData = restoreTripData;

/* ==================================================
   TAB MANAGEMENT
   ================================================== */

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active class to selected tab
    const targetTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update current tab
    window.TravelPlanner.currentTab = tabName;
    
    // Generate code when switching to code output tab
    if (tabName === 'code-output') {
        generateCode();
    }
}

/* ==================================================
   MAP VIEW TOGGLE
   ================================================== */

function toggleMapView() {
    const mapToggle = document.querySelector('.map-toggle');
    const mapToggleText = document.getElementById('mapToggleText');
    
    if (window.TravelPlanner.isMapView) {
        // Switch back to planner view
        window.TravelPlanner.isMapView = false;
        mapToggleText.textContent = 'View Map';
        mapToggle.style.background = '#1a1a1a';
        
        // Show planner content and header
        document.querySelector('.main-content').style.display = 'flex';
        document.querySelector('.top-bar').style.display = 'flex';
        hideMapFrame();
        
    } else {
        // Generate latest code and save to localStorage
        generateCode();
        
        // Switch to map view
        window.TravelPlanner.isMapView = true;
        mapToggleText.textContent = 'Back to Planner';
        mapToggle.style.background = '#10b981';
        
        // Hide header bar completely for clean map view
        document.querySelector('.top-bar').style.display = 'none';
        
        // Show map
        showMapView();
        showToast('Map updated with latest trip!', 'success');
    }
}

// Make toggleMapView globally accessible
window.toggleMapView = toggleMapView;

function showMapView() {
    // Hide main content
    document.querySelector('.main-content').style.display = 'none';
    
    // Create or update map iframe
    let mapFrame = document.getElementById('mapFrame');
    if (!mapFrame) {
        mapFrame = document.createElement('iframe');
        mapFrame.id = 'mapFrame';
        mapFrame.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            border: none;
            background: white;
            z-index: 50;
        `;
        document.body.appendChild(mapFrame);
    }
    
    // Create floating back button for clean map view
    let backButton = document.getElementById('mapBackButton');
    if (!backButton) {
        backButton = document.createElement('button');
        backButton.id = 'mapBackButton';
        backButton.innerHTML = '← Back to Planner';
        backButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a1a1a;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: background-color 0.2s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        backButton.onmouseover = function() { this.style.background = '#333333'; };
        backButton.onmouseout = function() { this.style.background = '#1a1a1a'; };
        backButton.onclick = toggleMapView;
        document.body.appendChild(backButton);
    }
    
    // Load map with timestamp to force refresh
    mapFrame.src = './map/index.html?t=' + Date.now();
    mapFrame.style.display = 'block';
    backButton.style.display = 'block';
}

function hideMapFrame() {
    const mapFrame = document.getElementById('mapFrame');
    if (mapFrame) {
        mapFrame.style.display = 'none';
    }
    
    const backButton = document.getElementById('mapBackButton');
    if (backButton) {
        backButton.style.display = 'none';
    }
}

/* ==================================================
   MARKER SUBTAB MANAGEMENT
   ================================================== */

function switchMarkerSubtab(type) {
    // Save current selection
    window.TravelPlanner.currentMarkerFilter = type;

    // Activate selected subtab
    document.querySelectorAll('.subtab').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.subtab[data-subtab="${type}"]`).classList.add('active');

    // Show correct marker list
    document.querySelectorAll('.marker-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`activitiesList_${type}`).classList.add('active');
}

function createPathPointFromData(data) {
    window.TravelPlanner.pathPointCounter++;
    const pathPoint = createPathPointElement(window.TravelPlanner.pathPointCounter);
    
    // Populate basic path point data (excluding hotels)
    const pathPointData = { ...data };
    delete pathPointData.hotels; // Remove hotels to avoid conflicts
    populateItemFromData(pathPoint, pathPointData);
    
    // Add hotels separately after path point is created
    if (data.hotels && Array.isArray(data.hotels)) {
        data.hotels.forEach(hotelData => {
            window.TravelPlanner.hotelCounter++;
            const hotelElement = createHotelElement(window.TravelPlanner.hotelCounter);
            populateItemFromData(hotelElement, hotelData);
            
            const hotelsList = pathPoint.querySelector('.hotels-list');
            if (hotelsList) {
                hotelsList.appendChild(hotelElement);
            }
        });
    }
    
    const container = document.getElementById('pathPointsList');
    container.appendChild(pathPoint);
    removeEmptyState('pathPointsList');
}

function createActivityFromData(data) {
    console.log('🎯 Creating activity from data:', data);
    
    if (!data.type || !ACTIVITY_TYPES[data.type]) {
        console.warn('⚠️ Invalid activity type in data:', data.type);
        return;
    }

    window.TravelPlanner.activityCounter++;
    const activity = createActivityElement(data.type, window.TravelPlanner.activityCounter);
    
    populateItemFromData(activity, data);
    
    // Add to correct container based on type
    const container = document.getElementById(`activitiesList_${data.type}`);
    if (container) {
        console.log(`✅ Adding activity to container: activitiesList_${data.type}`);
        container.appendChild(activity);
        removeEmptyState(`activitiesList_${data.type}`);
    } else {
        console.warn(`⚠️ Container not found: activitiesList_${data.type}, using fallback`);
        // Fallback to main activities list
        const fallbackContainer = document.getElementById('activitiesList');
        if (fallbackContainer) {
            fallbackContainer.appendChild(activity);
            removeEmptyState('activitiesList');
        } else {
            console.error('❌ No activity container found!');
        }
    }
}

function populateItemFromData(element, data) {
    Object.keys(data).forEach(key => {
        if (key === 'photos' || key === 'roomPhotos') {
            populatePhotos(element.querySelector(`[data-field="${key}"]`), data[key]);
        } else if (key === 'hotels') {
            // Skip hotels - handled separately in createPathPointFromData
            return;
        } else {
            const field = element.querySelector(`[data-field="${key}"]`);
            if (field && data[key] !== undefined) {
                field.value = data[key];
            }
        }
    });
    
    // Update header after populating data
    if (element.classList.contains('item-card')) {
        const nameInput = element.querySelector('[data-field="name"]');
        if (nameInput) updateItemHeader(nameInput);
    }
}

function populatePhotos(photosSection, photos) {
    if (!photosSection || !photos || !Array.isArray(photos)) return;
    
    // Clear existing photos except first
    const existingPhotos = photosSection.querySelectorAll('.photo-item');
    existingPhotos.forEach((photo, index) => {
        if (index > 0) photo.remove();
    });
    
    // Populate photos
    photos.forEach((photoUrl, index) => {
        if (index === 0) {
            const firstInput = photosSection.querySelector('input');
            if (firstInput) firstInput.value = photoUrl;
        } else {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <input type="url" value="${photoUrl}" oninput="updateItemHeader(this); autoSave()">
                <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
            `;
            photosSection.appendChild(photoItem);
        }
    });
}

function restoreTripData(data) {
    console.log('🔄 Restoring data:', data);
    
    // Clear existing data first
    clearAllTrip();
    
    // Restore trip title
    if (data.tripTitle) {
        document.getElementById('tripTitle').value = data.tripTitle;
    }
    
    // Restore path points
    if (data.pathPoints && Array.isArray(data.pathPoints)) {
        console.log('📍 Restoring path points:', data.pathPoints.length);
        data.pathPoints.forEach(pathPoint => {
            createPathPointFromData(pathPoint);
        });
    }
    
    // Restore activities
    if (data.activities && Array.isArray(data.activities)) {
        console.log('⭐ Restoring activities:', data.activities.length);
        data.activities.forEach(activity => {
            createActivityFromData(activity);
        });
    }
    
    updateStatistics();
}