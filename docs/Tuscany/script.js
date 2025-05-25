// Check if Leaflet is loaded
if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded!');
    alert('Error: Leaflet library not loaded. Please check your internet connection.');
} else {
    console.log('Leaflet loaded successfully');
}

// Initialize the map
const map = L.map('map').setView([43.2, 11.0], 8); // Centered on Tuscany, Italy

// Add the map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Arrays to store our locations
let pathPoints = [];
let activities = [];
let pathPolylines = [];
let arrows = [];

// Cycle navigation
let currentCycleIndex = 0;
let cycleStages = ["Full Trip"];

function generateCycleStages() {
    cycleStages = ["Full Trip", ...pathPoints.map(p => p.name)];
}
const cycleBtn = document.getElementById('cycle-btn');
const cycleStage = document.getElementById('cycle-stage');

// Click overlay elements
const clickOverlay = document.getElementById('click-overlay');
const clickTitle = document.getElementById('click-title');
const clickType = document.getElementById('click-type');
const clickKeywords = document.getElementById('click-keywords');
const clickDescription = document.getElementById('click-description');
const clickLink = document.getElementById('click-link');
const closeOverlay = document.getElementById('close-overlay');
const carouselImages = document.getElementById('carousel-images');
const carouselDots = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Hotel-specific controls
const hotelControls = document.getElementById('hotel-controls');
const toggleRoomBtn = document.getElementById('toggle-room-btn');
const toggleHotelBtn = document.getElementById('toggle-hotel-btn');

// Area options
const areaOptions = document.getElementById('area-options');
const optionToggles = document.getElementById('option-toggles');

let currentImageIndex = 0;
let currentActivity = null;
let currentHotel = null;
let currentArea = null;
let showingRooms = false;
let activeOptions = new Set();

// Function to calculate distance between two points
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Function to get activity size based on proximity to current path point
function getActivitySize(activity, currentPathPoint) {
    if (!currentPathPoint) return 'size-medium';
    
    const distance = getDistance(
        activity.lat, activity.lng,
        currentPathPoint.lat, currentPathPoint.lng
    );
    
    if (distance < 5) return 'size-large';
    if (distance < 15) return 'size-medium';
    if (distance < 30) return 'size-small';
    return 'size-tiny';
}

// Function to update activity visibility and size based on current hotel
function updateActivityDisplay(showAll = true, currentPathPoint = null) {
    activities.forEach(activity => {
        const marker = activity.marker;
        const markerElement = marker.getElement();
        const markerIcon = markerElement.querySelector('.star-marker, .heart-marker, .food-marker');
        
        if (showAll) {
            markerElement.classList.remove('hidden');
            // Reset to original size based on marker type
            markerIcon.className = `${activity.markerType}-marker size-medium`;
        } else if (currentPathPoint) {
            markerElement.classList.remove('hidden');
            const size = getActivitySize(activity, currentPathPoint);
            markerIcon.className = `${activity.markerType}-marker ${size}`;
        } else {
            markerElement.classList.add('hidden');
        }
    });
}

// Function to create keywords from description and type
function createKeywords(activity) {
    const keywords = [];
    const description = activity.description || '';
    const type = activity.type || '';
    
    // Extract keywords from type
    if (type.includes('Wine')) keywords.push('Wine Tasting');
    if (type.includes('Beach')) keywords.push('Swimming', 'Sunbathing');
    if (type.includes('Museum')) keywords.push('Art', 'Culture');
    if (type.includes('Historic')) keywords.push('History', 'Architecture');
    if (type.includes('Food') || type.includes('Restaurant')) keywords.push('Local Cuisine', 'Dining');
    if (type.includes('Nature')) keywords.push('Wildlife', 'Outdoor');
    if (type.includes('Island')) keywords.push('Ferry', 'Day Trip');
    if (type.includes('Hotel') || type.includes('Stop')) keywords.push('Accommodation', 'Rest Stop');
    if (type.includes('Must Do')) keywords.push('Priority', 'Essential');
    
    // Extract keywords from description
    if (description.includes('Renaissance')) keywords.push('Renaissance');
    if (description.includes('medieval') || description.includes('Medieval')) keywords.push('Medieval');
    if (description.includes('thermal') || description.includes('Thermal')) keywords.push('Spa');
    if (description.includes('UNESCO')) keywords.push('UNESCO');
    if (description.includes('wine') || description.includes('Wine')) keywords.push('Wine');
    if (description.includes('beach') || description.includes('Beach')) keywords.push('Beach');
    if (description.includes('hiking') || description.includes('Hiking')) keywords.push('Hiking');
    if (description.includes('panoramic') || description.includes('views')) keywords.push('Scenic Views');
    if (description.includes('pasta') || description.includes('pizza')) keywords.push('Italian Cuisine');
    if (description.includes('gelato')) keywords.push('Dessert');
    
    return [...new Set(keywords)]; // Remove duplicates
}

// Helper function to get current photos from the right context
function getCurrentPhotos() {
    if (currentArea && currentArea.currentHotel) {
        return showingRooms ? 
            (currentArea.currentHotel.roomPhotos || []) : 
            (currentArea.currentHotel.photos || []);
    } else if (currentActivity) {
        return currentActivity.photos || [];
    } else if (currentArea) {
        return currentArea.photos || [];
    }
    return [];
}

function createImageCarousel(photos) {
carouselImages.innerHTML = '';
carouselDots.innerHTML = '';
currentImageIndex = 0;

const validPhotos = photos.filter(photo => typeof photo === 'string' && photo.trim() !== '');

if (validPhotos.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.textContent = 'No photos available';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.height = '100%';
    carouselImages.appendChild(placeholder);
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    carouselDots.style.display = 'none';
    return;
}

validPhotos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = currentActivity ? currentActivity.name : '';
    img.onerror = function () {
    this.remove();
    };
    carouselImages.appendChild(img);
});

// Hide navigation if only 1 photo
if (validPhotos.length === 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    carouselDots.style.display = 'none';
} else {
    prevBtn.style.display = '';
    nextBtn.style.display = '';
    carouselDots.style.display = 'flex';

    validPhotos.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToImage(index));
    carouselDots.appendChild(dot);
    });
}

carouselImages.style.transform = `translateX(0%)`;
}
  

// Function to go to specific image
function goToImage(index, photos) {
    const photosArray = photos || getCurrentPhotos();
    
    if (!photosArray || photosArray.length === 0) return;
    if (index < 0 || index >= photosArray.length) return;
    
    currentImageIndex = index;
    const translateX = -index * 100;
    carouselImages.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    updateCarouselButtons(photosArray);
}

// Function to update carousel buttons
function updateCarouselButtons(photos) {
    const photosArray = photos || getCurrentPhotos();
    
    if (!photosArray || photosArray.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

// Previous image
function prevImage() {
    const photosArray = getCurrentPhotos();
    if (!photosArray || photosArray.length === 0) return;
    
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : photosArray.length - 1;
    goToImage(newIndex, photosArray);
}

// Next image
function nextImage() {
    const photosArray = getCurrentPhotos();
    if (!photosArray || photosArray.length === 0) return;
    
    const newIndex = currentImageIndex < photosArray.length - 1 ? currentImageIndex + 1 : 0;
    goToImage(newIndex, photosArray);
}

// Function to show click overlay (unified for areas and activities)
function showClickOverlay(item, isArea = false) {
    currentActivity = item;
    currentArea = isArea ? item : null;
    showingRooms = false;
    
    clickTitle.textContent = item.name;
    clickType.textContent = item.type;
    clickDescription.textContent = item.description || '';
    
    // Show/hide controls based on item type
    if (isArea) {
        areaOptions.style.display = 'block';
        createAreaOptions(item.options || []);
        hotelControls.style.display = 'none';

        if (item.hotels && item.hotels.length > 0) {
            showHotelsSection(item.hotels);
        }
    } else {
        hotelControls.style.display = 'none';
        areaOptions.style.display = 'none';
        const existingHotelsSection = document.querySelector('.hotels-section');
        if (existingHotelsSection) {
            existingHotelsSection.remove();
        }
    }
    
    // Create keywords
    const keywords = createKeywords(item);
    clickKeywords.innerHTML = '';
    keywords.forEach(keyword => {
        const tag = document.createElement('span');
        tag.className = 'keyword-tag';
        tag.textContent = keyword;
        clickKeywords.appendChild(tag);
    });
    
    // Set up link
    if (item.link) {
        clickLink.href = item.link;
        clickLink.style.display = 'inline-block';
    } else {
        clickLink.style.display = 'none';
    }
    
    // Create image carousel
    let photosToShow = item.photos || [];
    createImageCarousel(photosToShow);
    clickOverlay.classList.add('show');
    
    // Adjust map layout
    document.getElementById('map').classList.add('overlay-open');

    const activityNav = document.querySelector('.activity-nav');

    if (!isArea && item.markerType) {
        updateActivityNav(item);
        
        // Only show navigation if there are multiple nearby activities of the same type
        if (filteredSameType.length > 1) {
            activityNav.style.display = 'flex';
            
            // Update navigation button text to show context
            const prevBtn = document.getElementById('prev-activity');
            const nextBtn = document.getElementById('next-activity');
            
            if (currentCycleIndex > 0 && currentCycleIndex <= pathPoints.length) {
                const currentPathPoint = pathPoints[currentCycleIndex - 1];
                prevBtn.title = `Previous ${item.markerType} near ${currentPathPoint.name}`;
                nextBtn.title = `Next ${item.markerType} near ${currentPathPoint.name}`;
            } else {
                prevBtn.title = `Previous ${item.markerType}`;
                nextBtn.title = `Next ${item.markerType}`;
            }
        } else {
            activityNav.style.display = 'none';
        }
    } else {
        filteredSameType = [];
        currentActivityIndex = -1;
        activityNav.style.display = 'none';
    }    

    // Center the map on the selected item
    if (item.lat && item.lng) {
        map.setView([item.lat, item.lng], 14);
    }

    // SIMPLIFIED: Just make the selected marker bigger, don't touch visibility or highlighting
    if (!isArea && item.markerType) {
        activities.forEach(activity => {
            const markerElement = activity.marker.getElement();
            const icon = markerElement?.querySelector(`.${activity.markerType}-marker`);
            
            if (!icon) return;
            
            if (activity === item) {
                // Selected marker: just make it large (NO highlighting, NO visibility changes)
                icon.classList.remove('size-small', 'size-medium', 'size-tiny');
                icon.classList.add('size-large');
                console.log('Made marker large:', activity.name, markerElement); // Debug log
            } else if (activity.markerType === item.markerType) {
                // Same type markers: make them smaller
                icon.classList.remove('size-large', 'size-medium', 'size-tiny');
                icon.classList.add('size-small');
            }
        });
    }
    
    // Debug: Log the current marker state and filtered activities
    if (!isArea && item.markerType) {
        const selectedMarkerElement = item.marker.getElement();
        console.log('Selected marker element:', selectedMarkerElement);
        console.log('Selected marker classes:', selectedMarkerElement?.className);
        console.log('Selected marker visible:', !selectedMarkerElement?.classList.contains('hidden'));
        console.log('Filtered same type activities:', filteredSameType.length);
    }
}

let currentActivityIndex = -1;
let filteredSameType = [];

function updateActivityNav(current) {
    if (!current || !current.markerType) return;
    
    // Get the current path point context (if we're in cycle mode)
    let currentPathPoint = null;
    if (currentCycleIndex > 0 && currentCycleIndex <= pathPoints.length) {
        currentPathPoint = pathPoints[currentCycleIndex - 1];
    }
    
    // Filter activities by type
    let sameTypeActivities = activities.filter(a => a.markerType === current.markerType);
    
    // If we're in a specific location context, filter by geographic proximity
    if (currentPathPoint) {
        const maxDistance = 25; // kilometers - adjust this value as needed
        
        sameTypeActivities = sameTypeActivities.filter(activity => {
            const distance = getDistance(
                activity.lat, activity.lng,
                currentPathPoint.lat, currentPathPoint.lng
            );
            return distance <= maxDistance;
        });
        
        // Sort by distance from current path point
        sameTypeActivities.sort((a, b) => {
            const distanceA = getDistance(a.lat, a.lng, currentPathPoint.lat, currentPathPoint.lng);
            const distanceB = getDistance(b.lat, b.lng, currentPathPoint.lat, currentPathPoint.lng);
            return distanceA - distanceB;
        });
        
        console.log(`Filtered ${current.markerType} activities near ${currentPathPoint.name}:`, 
                   sameTypeActivities.map(a => `${a.name} (${getDistance(a.lat, a.lng, currentPathPoint.lat, currentPathPoint.lng).toFixed(1)}km)`));
    }
    
    filteredSameType = sameTypeActivities;
    currentActivityIndex = filteredSameType.findIndex(a => a === current);
}

document.getElementById('prev-activity').onclick = () => {
    if (filteredSameType.length > 0) {
        currentActivityIndex = (currentActivityIndex - 1 + filteredSameType.length) % filteredSameType.length;
        showClickOverlay(filteredSameType[currentActivityIndex], false);
    }
};

document.getElementById('next-activity').onclick = () => {
    if (filteredSameType.length > 0) {
        currentActivityIndex = (currentActivityIndex + 1) % filteredSameType.length;
        showClickOverlay(filteredSameType[currentActivityIndex], false);
    }
};

// Function to show hotels section in the side panel
function showHotelsSection(hotels) {
    const existingHotelsSection = document.querySelector('.hotels-section');
    if (existingHotelsSection) {
        existingHotelsSection.remove();
    }
    
    const hotelsSection = document.createElement('div');
    hotelsSection.className = 'hotels-section';
    
    hotelsSection.innerHTML = `
        <h3>🏨 Available Hotels</h3>
        <div class="hotel-list">
            ${hotels.map((hotel, index) => `
                <div class="hotel-option" onclick="selectHotel(${index})">
                    <img src="${hotel.photos[0]}" alt="${hotel.name}" class="hotel-thumb" onerror="this.style.display='none'">
                    <div class="hotel-info">
                        <h4>${hotel.name}</h4>
                        <p>${hotel.description}</p>
                        <span class="hotel-type">${hotel.type}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    const visitLink = clickLink.parentElement;
    visitLink.insertBefore(hotelsSection, clickLink);
}

// Function to create area option toggles
function createAreaOptions(options) {
    optionToggles.innerHTML = '';
    activeOptions.clear();
    
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-toggle';
        btn.innerHTML = `${option.icon || '📍'} ${option.name}`;
        
        if (option.type === 'hotels') {
            btn.addEventListener('click', () => showHotelOptions(option));
        } else {
            btn.addEventListener('click', () => toggleAreaOption(option, btn));
        }
        
        optionToggles.appendChild(btn);
    });
}

// Function to select a specific hotel
function selectHotel(hotelIndex) {
    if (!currentArea || !currentArea.hotels) return;
    
    const selectedHotel = currentArea.hotels[hotelIndex];
    
    clickTitle.textContent = selectedHotel.name;
    clickType.textContent = selectedHotel.type;
    clickDescription.textContent = selectedHotel.description;
    
    hotelControls.style.display = 'block';
    toggleHotelBtn.classList.add('active');
    toggleRoomBtn.classList.remove('active');
    
    areaOptions.style.display = 'none';
    const hotelsSection = document.querySelector('.hotels-section');
    if (hotelsSection) {
        hotelsSection.style.display = 'none';
    }
    
    if (selectedHotel.link) {
        clickLink.href = selectedHotel.link;
        clickLink.style.display = 'inline-block';
    }
    
    createImageCarousel(selectedHotel.photos);
    currentArea.currentHotel = selectedHotel;
    
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '← Back to Area Options';
    backBtn.onclick = () => backToAreaView();
    
    const visitLink = clickLink.parentElement;
    visitLink.insertBefore(backBtn, clickLink);
}

// Global functions for hotel selection
window.selectHotel = selectHotel;

window.backToAreaView = function() {
    if (!currentArea) return;
    
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    showClickOverlay(currentArea, true);
};

// Function to toggle area options
function toggleAreaOption(option, buttonElement) {
    const isActive = activeOptions.has(option.id);
    
    if (isActive) {
        activeOptions.delete(option.id);
        buttonElement.classList.remove('active');
        hideOptionMarkers(option.id);
    } else {
        activeOptions.add(option.id);
        buttonElement.classList.add('active');
        showOptionMarkers(option.id);
    }
}

// Function to show/hide option markers
function showOptionMarkers(optionId) {
    activities.forEach(activity => {
        if (activity.optionId === optionId) {
            activity.marker.getElement().classList.remove('hidden');
        }
    });
}

function hideOptionMarkers(optionId) {
    activities.forEach(activity => {
        if (activity.optionId === optionId) {
            activity.marker.getElement().classList.add('hidden');
        }
    });
}

// Function to hide all area option markers
function hideAllOptionMarkers() {
    activities.forEach(activity => {
        if (activity.optionId && activity !== currentActivity) {
            activity.marker.getElement().classList.add('hidden');
        }
    });
}

// Function to toggle between hotel exterior and room photos
function toggleRoomPhotos() {
    if (!currentArea || !currentArea.currentHotel) return;
    
    const hotel = currentArea.currentHotel;
    showingRooms = !showingRooms;
    
    if (showingRooms) {
        toggleRoomBtn.classList.add('active');
        toggleHotelBtn.classList.remove('active');
        const roomPhotos = hotel.roomPhotos || [];
        createImageCarousel(roomPhotos);
    } else {
        toggleRoomBtn.classList.remove('active');
        toggleHotelBtn.classList.add('active');
        const hotelPhotos = hotel.photos || [];
        createImageCarousel(hotelPhotos);
    }
}

// Function to hide click overlay
function hideClickOverlay() {
    clickOverlay.classList.remove('show');
    document.getElementById('map').classList.remove('overlay-open');
    
    currentActivity = null;
    currentArea = null;
    showingRooms = false;
    activeOptions.clear();
    
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    const hotelsSection = document.querySelector('.hotels-section');
    if (hotelsSection) {
        hotelsSection.remove();
    }

    // Clear highlights
    document.querySelectorAll('.highlighted-marker').forEach(el => el.classList.remove('highlighted-marker'));

    // Reset ALL activity markers to medium size and ensure they're visible
    activities.forEach(activity => {
        const markerElement = activity.marker.getElement();
        const icon = markerElement?.querySelector(`.${activity.markerType}-marker`);
        
        if (icon) {
            // Remove all size classes and hidden state
            icon.classList.remove('size-large', 'size-small', 'size-tiny', 'hidden');
            icon.classList.add('size-medium');
        }
        
        // Remove highlight from marker element
        markerElement?.classList.remove('highlighted-marker');
    });
    
    // Reset path point markers
    pathPoints.forEach(point => {
        const markerElement = point.marker.getElement();
        markerElement?.classList.remove('highlighted-marker');
    });
}

// Function to update path point display and activity for cycling
function updatePathPointDisplay(showAll = true, activeIndex = null) {
    pathPoints.forEach((point, index) => {
        const markerElement = point.marker.getElement();
        const numberElement = markerElement.querySelector('.number-marker');
        
        if (showAll) {
            markerElement.classList.remove('hidden');
            numberElement.classList.remove('active');
        } else if (index === activeIndex) {
            markerElement.classList.remove('hidden');
            numberElement.classList.add('active');
        } else {
            markerElement.classList.add('hidden');
            numberElement.classList.remove('active');
        }
    });
}

// Function to update path lines visibility
function updatePathDisplay(showAll = true) {
    pathPolylines.forEach(polyline => {
        if (showAll) {
            polyline.setStyle({ opacity: 0.8 });
        } else {
            polyline.setStyle({ opacity: 0.2 });
        }
    });
    
    arrows.forEach(arrow => {
        const arrowElement = arrow.getElement();
        if (showAll) {
            arrowElement.style.opacity = '1';
        } else {
            arrowElement.style.opacity = '0.2';
        }
    });
}

// Function to cycle through stages
function cycleToNextStage() {
    currentCycleIndex = (currentCycleIndex + 1) % cycleStages.length;
    const stage = cycleStages[currentCycleIndex];
    cycleStage.textContent = stage;
    
    if (stage === "Full Trip") {
        updatePathPointDisplay(true);
        updateActivityDisplay(true);
        updatePathDisplay(true);
        hideClickOverlay();
        fitMapToLocations();
    } else {
        const stageIndex = currentCycleIndex - 1;
        
        if (stageIndex >= 0 && stageIndex < pathPoints.length) {
            const currentPoint = pathPoints[stageIndex];
            
            updatePathPointDisplay(false, stageIndex);
            updateActivityDisplay(false, currentPoint);
            updatePathDisplay(false);
            
            // Only NOW hide option markers since we're switching to a path point context
            hideAllOptionMarkers();
            
            map.setView([currentPoint.lat, currentPoint.lng], 11);
            showClickOverlay(currentPoint, true);
        }
    }
}

// Function to create numbered markers
function createNumberMarker(number) {
    return L.divIcon({
        html: `<div class="number-marker">${number}</div>`,
        className: 'custom-marker',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
}

// Function to create star markers
function createStarMarker() {
    return L.divIcon({
        html: '<div class="star-marker size-medium">⭐</div>',
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Function to create heart markers (must-do activities)
function createHeartMarker() {
    return L.divIcon({
        html: '<div class="heart-marker size-medium">❤️</div>',
        className: 'custom-marker',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
}

// Function to create food markers
function createFoodMarker() {
    return L.divIcon({
        html: '<div class="food-marker size-medium">🍕</div>',
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Function to add a path point (area-based POI markers with options)
function addPathPoint(lat, lng, name, description, photos, link, hotels = [], options = []) {
    const number = pathPoints.length + 1;
    const marker = L.marker([lat, lng], {
        icon: createNumberMarker(number)
    }).addTo(map);
    
    const pathPoint = {
        number: number,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        type: `📍 POI ${number}`,
        photos: photos || [],
        hotels: hotels || [],
        options: options || [],
        link: link || '',
        marker: marker
    };
    
    marker.on('click', function() {
        showClickOverlay(pathPoint, true);
    });
    
    pathPoints.push(pathPoint);
    
    if (pathPoints.length > 1) {
        drawPath();
    }

    generateCycleStages();
}

// Function to add an activity (star marker)
function addActivity(lat, lng, name, type, photos, link, description, optionId = null) {
    const marker = L.marker([lat, lng], {
        icon: createStarMarker()
    }).addTo(map);
    
    if (typeof photos === 'string') {
        photos = photos ? [photos] : [];
    } else if (!Array.isArray(photos)) {
        photos = [];
    }
    
    const activity = {
        name: name,
        type: type,
        photos: photos,
        link: link,
        description: description,
        lat: lat,
        lng: lng,
        optionId: optionId,
        marker: marker,
        markerType: 'star'
    };
    
    // Only hide if it has an optionId (area-specific activities)
    if (optionId) {
        setTimeout(() => {
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.add('hidden'); // Hide the entire marker element, not just the icon
            }
        }, 0);
    }    
    
    marker.on('click', function() {
        showClickOverlay(activity, false);
    });
    
    marker.on('mouseover', function() {
        const markerElement = marker.getElement();
        const starElement = markerElement.querySelector('.star-marker');
        if (!starElement.classList.contains('size-large') && !markerElement.classList.contains('hidden')) {
            starElement.style.transform = 'scale(1.4)';
            starElement.style.zIndex = '1000';
        }
    });
    
    marker.on('mouseout', function() {
        const markerElement = marker.getElement();
        const starElement = markerElement.querySelector('.star-marker');
        starElement.style.transform = '';
        starElement.style.zIndex = '';
    });
    
    activities.push(activity);
}

// NEW FUNCTION: Add a must-do activity (heart marker)
function addMustDo(lat, lng, name, type, photos, link, description, optionId = null) {
    const marker = L.marker([lat, lng], {
        icon: createHeartMarker()
    }).addTo(map);
    
    if (typeof photos === 'string') {
        photos = photos ? [photos] : [];
    } else if (!Array.isArray(photos)) {
        photos = [];
    }
    
    const activity = {
        name: name,
        type: `❤️ Must Do: ${type}`,
        photos: photos,
        link: link,
        description: description,
        lat: lat,
        lng: lng,
        optionId: optionId,
        marker: marker,
        markerType: 'heart'
    };
    
    if (optionId) {
        setTimeout(() => {
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.add('hidden'); // Hide entire marker, not just icon
            }
        }, 0);
    } 
    
    marker.on('click', function() {
        showClickOverlay(activity, false);
    });
    
    marker.on('mouseover', function() {
        const markerElement = marker.getElement();
        const heartElement = markerElement.querySelector('.heart-marker');
        if (!heartElement.classList.contains('size-large')) {
            heartElement.style.transform = 'scale(1.4)';
            heartElement.style.zIndex = '1000';
        }
    });
    
    marker.on('mouseout', function() {
        const markerElement = marker.getElement();
        const heartElement = markerElement.querySelector('.heart-marker');
        heartElement.style.transform = '';
        heartElement.style.zIndex = '';
    });
    
    activities.push(activity);
}

// NEW FUNCTION: Add a food/restaurant activity (fork marker)
function addFood(lat, lng, name, type, photos, link, description, optionId = null) {
    const marker = L.marker([lat, lng], {
        icon: createFoodMarker()
    }).addTo(map);
    
    if (typeof photos === 'string') {
        photos = photos ? [photos] : [];
    } else if (!Array.isArray(photos)) {
        photos = [];
    }
    
    const activity = {
        name: name,
        type: `🍕 ${type}`,
        photos: photos,
        link: link,
        description: description,
        lat: lat,
        lng: lng,
        optionId: optionId,
        marker: marker,
        markerType: 'food'
    };
    
    if (optionId) {
        setTimeout(() => {
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.add('hidden'); // Hide entire marker, not just icon
            }
        }, 0);
    }     
    
    marker.on('click', function() {
        showClickOverlay(activity, false);
    });
    
    marker.on('mouseover', function() {
        const markerElement = marker.getElement();
        const foodElement = markerElement.querySelector('.food-marker');
        if (!foodElement.classList.contains('size-large')) {
            foodElement.style.transform = 'scale(1.4)';
            foodElement.style.zIndex = '1000';
        }
    });
    
    marker.on('mouseout', function() {
        const markerElement = marker.getElement();
        const foodElement = markerElement.querySelector('.food-marker');
        foodElement.style.transform = '';
        foodElement.style.zIndex = '';
    });
    
    activities.push(activity);
}

// Function to draw the path between points
function drawPath() {
    const coordinates = pathPoints.map(point => [point.lat, point.lng]);
    const polyline = L.polyline(coordinates, {
        color: '#ff6b6b',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);
    
    pathPolylines.push(polyline);
    
    // Add arrows to show direction
    for (let i = 0; i < coordinates.length - 1; i++) {
        const start = coordinates[i];
        const end = coordinates[i + 1];
        const midLat = (start[0] + end[0]) / 2;
        const midLng = (start[1] + end[1]) / 2;
        
        const angle = Math.atan2(end[0] - start[0], end[1] - start[1]) * 180 / Math.PI;
        
        const arrow = L.marker([midLat, midLng], {
            icon: L.divIcon({
                html: `<div style="transform: rotate(${angle}deg); font-size: 20px;">➤</div>`,
                className: 'arrow-marker',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(map);
        
        arrows.push(arrow);
    }
}

// Function to fit the map to show all locations
function fitMapToLocations() {
    const allMarkers = [...pathPoints.map(p => p.marker), ...activities.map(a => a.marker)];
    if (allMarkers.length > 0) {
        const group = new L.featureGroup(allMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Event listeners
map.on('click', hideClickOverlay);
closeOverlay.addEventListener('click', hideClickOverlay);
toggleRoomBtn.addEventListener('click', toggleRoomPhotos);
toggleHotelBtn.addEventListener('click', () => {
    if (showingRooms) toggleRoomPhotos();
});
cycleBtn.addEventListener('click', cycleToNextStage);

// Carousel navigation
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!clickOverlay.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
        hideClickOverlay();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

let currentLegendFilter = null;

document.querySelectorAll('.legend-item').forEach(item => {
    item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        const wasActive = item.classList.contains('active');

        // Clear all filters
        document.querySelectorAll('.legend-item').forEach(i => i.classList.remove('active'));
        currentLegendFilter = null;

        if (!wasActive) {
            // Apply new filter
            item.classList.add('active');
            currentLegendFilter = type;
        }

        // Toggle marker visibility
        activities.forEach(activity => {
            const markerElement = activity.marker.getElement();
            const icon = markerElement?.querySelector(`.${activity.markerType}-marker`);
            
            if (!currentLegendFilter || activity.markerType === currentLegendFilter) {
                markerElement.classList.remove('hidden');
                if (icon) {
                    icon.classList.remove('hidden');
                }
            } else {
                markerElement.classList.add('hidden');
            }
        });

        updatePathPointDisplay(!currentLegendFilter);
    });
});

// Fit the map to show all locations once everything is loaded
setTimeout(() => {
    fitMapToLocations();
    console.log('Map initialized with', pathPoints.length, 'path points and', activities.length, 'activities');
}, 100);

// 🔧 Set the page <title> and visible heading based on the user's trip title defined in tripData.js
document.addEventListener("DOMContentLoaded", function () {
    if (typeof tripTitle === 'string') {
        document.title = tripTitle;
        const titleElement = document.getElementById('page-title');
        if (titleElement) titleElement.textContent = tripTitle;
    }
});

// Add a function to adjust the distance threshold based on the area
function getProximityThreshold(pathPoint) {
    // You can customize this based on different locations
    // For example, cities might have smaller thresholds than rural areas
    
    if (pathPoint.name.toLowerCase().includes('city') || 
        pathPoint.name.toLowerCase().includes('downtown')) {
        return 15; // 15km for city areas
    } else if (pathPoint.name.toLowerCase().includes('national park') || 
               pathPoint.name.toLowerCase().includes('countryside')) {
        return 50; // 50km for rural/park areas
    }
    
    return 25; // Default 25km
}