/* ==================================================
   SIMPLE MAP READER - live-reader.js
   Place this file in your /map/ folder
   Include it BEFORE your main map script and tripData.js
   ================================================== */

// Check if we have live trip data from the planner
function loadLiveTripData() {
    const liveCode = localStorage.getItem('currentTripCode');
    
    if (liveCode && liveCode.trim()) {
        console.log('📍 Loading live trip data from planner...');
        
        try {
            // Execute the live trip code
            eval(liveCode);
            
            console.log('✅ Live trip data loaded successfully!');
            return true;
            
        } catch (error) {
            console.error('❌ Error loading live trip:', error);
            console.log('📁 Falling back to static tripData.js...');
            return false;
        }
    } else {
        console.log('📁 No live data found, using static tripData.js');
        return false;
    }
}

// Load live data when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🗺️ Map Reader - Checking for live data...');
    
    // Try to load live data first
    const hasLiveData = loadLiveTripData();
    
    if (!hasLiveData) {
        console.log('📁 Using static tripData.js file');
        // Your static tripData.js will load normally
    }
});

// Also try to load immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadLiveTripData();
    });
} else {
    setTimeout(loadLiveTripData, 100);
}