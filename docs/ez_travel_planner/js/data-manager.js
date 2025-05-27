/* ==================================================
   FIXED DATA MANAGER - SIMPLE AUTO-SAVE
   ================================================== */

/* ==================================================
   UTILITY FUNCTIONS
   ================================================== */

function escapeString(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}

function safeValue(obj, prop) {
    return obj && obj[prop] ? obj[prop].toString().trim() : '';
}

/* ==================================================
   FIXED DATA EXTRACTION
   ================================================== */

function extractItemData(element) {
    const data = {};
    
    // Get ONLY direct data fields, not nested ones from hotels
    element.querySelectorAll(':scope > .item-details [data-field], :scope > .item-details .form-group > [data-field], :scope > .item-details .form-group > textarea[data-field]').forEach(field => {
        // Skip if this field is inside a hotel item
        if (field.closest('.hotel-item')) return;
        
        const fieldName = field.getAttribute('data-field');
        
        if (fieldName === 'photos' || fieldName === 'roomPhotos') {
            // Handle photo arrays
            data[fieldName] = Array.from(field.querySelectorAll('input'))
                .map(input => safeValue(input, 'value'))
                .filter(url => url);
        } else {
            data[fieldName] = safeValue(field, 'value');
        }
    });
    
    return data;
}

function collectAllTripData() {  
    const pathPoints = collectPathPointsData();
    const activities = collectActivitiesData();
    
    console.log('🔍 Collected Data:', { pathPoints, activities });
    
    return {
        tripTitle: document.getElementById('tripTitle').value || 'My Amazing Trip',
        pathPoints: pathPoints,
        activities: activities,
        lastModified: Date.now(),
        version: '2.0.0'
    };
}

function collectPathPointsData() {
    const pathPoints = [];
    
    document.querySelectorAll('#pathPointsList .item-card').forEach(item => {
        const data = extractItemData(item);
        
        // Extract hotels separately to avoid conflicts
        data.hotels = [];
        item.querySelectorAll('.hotel-item').forEach(hotelItem => {
            const hotelData = {};
            
            // Extract hotel data directly from hotel element
            hotelItem.querySelectorAll('[data-field]').forEach(field => {
                const fieldName = field.getAttribute('data-field');
                
                if (fieldName === 'photos' || fieldName === 'roomPhotos') {
                    hotelData[fieldName] = Array.from(field.querySelectorAll('input'))
                        .map(input => safeValue(input, 'value'))
                        .filter(url => url);
                } else {
                    hotelData[fieldName] = safeValue(field, 'value');
                }
            });
            
            if (hotelData.name) {
                data.hotels.push(hotelData);
            }
        });
        
        if (data.name && data.lat && data.lng) {
            pathPoints.push(data);
        }
    });
    
    console.log('📍 Path Points collected:', pathPoints);
    return pathPoints;
}

function collectActivitiesData() {
    const activities = [];
    
    // Collect from ALL activity containers
    const containers = [
        '#activitiesList_activity',
        '#activitiesList_food', 
        '#activitiesList_cafe',
        '#activitiesList_mustdo', // Add mustdo container
        '#activitiesList' // Legacy container
    ];
    
    containers.forEach(containerSelector => {
        const container = document.getElementById(containerSelector.replace('#', ''));
        if (!container) return;
        
        container.querySelectorAll('.item-card').forEach(item => {
            const data = extractItemData(item);
            
            // Ensure we have required fields
            if (data.name && data.lat && data.lng && data.type) {
                // Avoid duplicates
                const exists = activities.some(existing => 
                    existing.name === data.name && 
                    existing.lat === data.lat && 
                    existing.lng === data.lng
                );
                
                if (!exists) {
                    activities.push(data);
                }
            }
        });
    });
    
    console.log('⭐ Activities collected:', activities);
    return activities;
}

/* ==================================================
   SIMPLE AUTO-SAVE SYSTEM
   ================================================== */

let saveTimeout;
function autoSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        const data = collectAllTripData();
        localStorage.setItem('travelPlannerData', JSON.stringify(data));
        console.log('💾 Auto-saved');
    }, 1000);
}

// Save before page closes  
window.addEventListener('beforeunload', () => {
    const data = collectAllTripData();
    localStorage.setItem('travelPlannerData', JSON.stringify(data));
});

// Load data when page opens
document.addEventListener('DOMContentLoaded', () => {
    // Don't load if first visit check is happening
    setTimeout(() => {
        if (window.TravelPlanner && window.TravelPlanner.isFirstVisit) {
            return; // Skip loading if example data was loaded
        }
        
        const saved = localStorage.getItem('travelPlannerData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                restoreTripData(data);
                console.log('📖 Restored previous work');
            } catch (e) {
                console.log('❌ Saved data corrupted, starting fresh');
                localStorage.removeItem('travelPlannerData');
            }
        }
    }, 100);
});

/* ==================================================
   CLEAR FUNCTIONS
   ================================================== */

function clearAllTrip() {
    // Clear containers safely
    const pathPointsList = document.getElementById('pathPointsList');
    if (pathPointsList) pathPointsList.innerHTML = '';
    
    // Clear all marker tabs
    document.querySelectorAll('.marker-tab').forEach(tab => {
        if (tab) tab.innerHTML = '';
    });
    
    // Clear legacy container
    const legacyContainer = document.getElementById('activitiesList');
    if (legacyContainer) legacyContainer.innerHTML = '';
    
    const tripTitle = document.getElementById('tripTitle');
    if (tripTitle) tripTitle.value = '';
    
    // Reset counters
    window.TravelPlanner.pathPointCounter = 0;
    window.TravelPlanner.activityCounter = 0;
    window.TravelPlanner.hotelCounter = 0;
    
    updateStatistics();
    showEmptyStatesIfNeeded();
}

function clearAllData() {
    clearAllTrip();
    localStorage.removeItem('travelPlannerData');
    console.log('🧹 All data cleared');
}

/* ==================================================
   RESTORE DATA FUNCTIONS  
   ================================================== */

function restoreTripData(data) {
    console.log('🔄 Restoring data:', data);
    
    // Clear existing data first
    clearAllTrip();
    
    // Restore trip title
    if (data.tripTitle) {
        const tripTitleElement = document.getElementById('tripTitle');
        if (tripTitleElement) {
            tripTitleElement.value = data.tripTitle;
        }
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

/* ==================================================
   IMPORT/EXPORT (KEEP EXISTING)
   ================================================== */

function saveTrip() {
    const data = collectAllTripData();
    localStorage.setItem('travelPlannerData', JSON.stringify(data));
    showToast('Trip saved successfully!', 'success');
}

function importTripFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.tripTitle || data.pathPoints || data.activities) {
                    if (confirm('Import will replace your current trip. Continue?')) {
                        restoreTripData(data);
                        showToast(`Trip imported successfully!`, 'success');
                    }
                } else {
                    showToast('Invalid trip file format', 'error');
                }
            } catch (error) {
                console.error('❌ Import failed:', error);
                showToast('Failed to import file', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}