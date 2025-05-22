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
const cycleStages = ["Full Trip", "Florence", "Val d'Orcia", "Coast", "Florence Return"];
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
        const starElement = markerElement.querySelector('.star-marker');
        
        if (showAll) {
            markerElement.classList.remove('hidden');
            starElement.className = 'star-marker size-medium';
        } else if (currentPathPoint) {
            markerElement.classList.remove('hidden');
            const size = getActivitySize(activity, currentPathPoint);
            starElement.className = `star-marker ${size}`;
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
    if (type.includes('Food')) keywords.push('Local Cuisine', 'Market');
    if (type.includes('Nature')) keywords.push('Wildlife', 'Outdoor');
    if (type.includes('Island')) keywords.push('Ferry', 'Day Trip');
    if (type.includes('Hotel') || type.includes('Stop')) keywords.push('Accommodation', 'Rest Stop');
    
    // Extract keywords from description
    if (description.includes('Renaissance')) keywords.push('Renaissance');
    if (description.includes('medieval') || description.includes('Medieval')) keywords.push('Medieval');
    if (description.includes('thermal') || description.includes('Thermal')) keywords.push('Spa');
    if (description.includes('UNESCO')) keywords.push('UNESCO');
    if (description.includes('wine') || description.includes('Wine')) keywords.push('Wine');
    if (description.includes('beach') || description.includes('Beach')) keywords.push('Beach');
    if (description.includes('hiking') || description.includes('Hiking')) keywords.push('Hiking');
    if (description.includes('panoramic') || description.includes('views')) keywords.push('Scenic Views');
    
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

// Function to create image carousel - FIXED VERSION
function createImageCarousel(photos) {
    carouselImages.innerHTML = '';
    carouselDots.innerHTML = '';
    currentImageIndex = 0;
    
    if (!photos || photos.length === 0) {
        carouselImages.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #999; font-size: 1.2em;">No images available</div>';
        // Hide carousel buttons when no photos
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }
    
    // Create images
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.alt = currentActivity ? currentActivity.name : '';
        img.onerror = function() {
            this.style.display = 'none';
        };
        carouselImages.appendChild(img);
    });
    
    // Create dots if more than one image
    if (photos.length > 1) {
        photos.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToImage(index, photos));
            carouselDots.appendChild(dot);
        });
    }
    
    updateCarouselButtons(photos);
}

// Function to go to specific image - FIXED VERSION
function goToImage(index, photos) {
    // Use the photos parameter if provided, otherwise try to get from current context
    const photosArray = photos || getCurrentPhotos();
    
    if (!photosArray || photosArray.length === 0) return;
    
    // Ensure index is within bounds
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

// Function to update carousel buttons - FIXED VERSION
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

// Previous image - FIXED VERSION
function prevImage() {
    const photosArray = getCurrentPhotos();
    if (!photosArray || photosArray.length === 0) return;
    
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : photosArray.length - 1;
    goToImage(newIndex, photosArray);
}

// Next image - FIXED VERSION
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
        // Show area options for areas
        areaOptions.style.display = 'block';
        createAreaOptions(item.options || []);
        
        // Never show hotel controls on area view
        hotelControls.style.display = 'none';

        // Show hotels section if available
        if (item.hotels && item.hotels.length > 0) {
            showHotelsSection(item.hotels);
        }

    } else {
        hotelControls.style.display = 'none';
        areaOptions.style.display = 'none';
        // Clear hotels section for activities
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
    
    // Create image carousel - always start with area photos
    let photosToShow = item.photos || [];
    
    createImageCarousel(photosToShow);
    clickOverlay.classList.add('show');
    
    // Adjust map layout
    document.getElementById('map').classList.add('overlay-open');
}

// Function to show hotels section in the side panel
function showHotelsSection(hotels) {
    // Remove existing hotels section
    const existingHotelsSection = document.querySelector('.hotels-section');
    if (existingHotelsSection) {
        existingHotelsSection.remove();
    }
    
    // Create hotels section
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
    
    // Insert before the visit link
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
        
        // Special handling for hotel options
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
    
    // Switch to hotel detail view
    clickTitle.textContent = selectedHotel.name;
    clickType.textContent = selectedHotel.type;
    clickDescription.textContent = selectedHotel.description;
    
    // Show hotel controls for room photos
    hotelControls.style.display = 'block';
    toggleHotelBtn.classList.add('active');
    toggleRoomBtn.classList.remove('active');
    
    // Hide area options and hotels list when viewing specific hotel
    areaOptions.style.display = 'none';
    const hotelsSection = document.querySelector('.hotels-section');
    if (hotelsSection) {
        hotelsSection.style.display = 'none';
    }
    
    // Set up hotel link
    if (selectedHotel.link) {
        clickLink.href = selectedHotel.link;
        clickLink.style.display = 'inline-block';
    }
    
    // Show hotel photos
    createImageCarousel(selectedHotel.photos);
    
    // Store current hotel for room toggle
    currentArea.currentHotel = selectedHotel;
    
    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '← Back to Area Options';
    backBtn.onclick = () => backToAreaView();
    
    // Insert back button before the visit link
    const visitLink = clickLink.parentElement;
    visitLink.insertBefore(backBtn, clickLink);
}

// Global functions for hotel selection (called from HTML)
window.selectHotel = selectHotel;

window.backToAreaView = function() {
    if (!currentArea) return;
    
    // Remove back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    // Show the area view again
    showClickOverlay(currentArea, true);
};

// Function to toggle area options
function toggleAreaOption(option, buttonElement) {
    const isActive = activeOptions.has(option.id);
    
    if (isActive) {
        activeOptions.delete(option.id);
        buttonElement.classList.remove('active');
        // Hide this option's markers
        hideOptionMarkers(option.id);
    } else {
        activeOptions.add(option.id);
        buttonElement.classList.add('active');
        // Show this option's markers
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
        if (activity.optionId) {
            activity.marker.getElement().classList.add('hidden');
        }
    });
}

// Function to toggle between hotel exterior and room photos - FIXED VERSION
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
    hideAllOptionMarkers();
    
    // Clean up any temporary elements
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    const hotelsSection = document.querySelector('.hotels-section');
    if (hotelsSection) {
        hotelsSection.remove();
    }
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
        // Show everything - path points and activities
        updatePathPointDisplay(true);
        updateActivityDisplay(true);
        updatePathDisplay(true);
        hideClickOverlay();
        fitMapToLocations();
    } else {
        // Show specific area (opens large popup automatically)
        const stageIndex = currentCycleIndex - 1; // Subtract 1 because "Full Trip" is index 0
        
        if (stageIndex >= 0 && stageIndex < pathPoints.length) {
            const currentPoint = pathPoints[stageIndex];
            
            // Update visual state
            updatePathPointDisplay(false, stageIndex);
            updateActivityDisplay(false, currentPoint);
            updatePathDisplay(false);
            
            // Hide all option markers initially
            hideAllOptionMarkers();
            
            // Focus map on current area
            map.setView([currentPoint.lat, currentPoint.lng], 11);
            
            // Open area in large popup
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
    
    // Add click event to open large popup
    marker.on('click', function() {
        showClickOverlay(pathPoint, true);
    });
    
    pathPoints.push(pathPoint);
    
    // Draw path if we have more than one point
    if (pathPoints.length > 1) {
        drawPath();
    }
}

// Function to add an activity (star marker with optional grouping)
function addActivity(lat, lng, name, type, photos, link, description, optionId = null) {
    const marker = L.marker([lat, lng], {
        icon: createStarMarker()
    }).addTo(map);
    
    // Ensure photos is always an array
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
        marker: marker
    };
    
    // Hide option-based activities initially
    if (optionId) {
        marker.getElement().classList.add('hidden');
    }
    
    // Add click event to open large popup
    marker.on('click', function() {
        showClickOverlay(activity, false);
    });
    
    // Add hover events for size increase
    marker.on('mouseover', function() {
        const markerElement = marker.getElement();
        const starElement = markerElement.querySelector('.star-marker');
        if (!starElement.classList.contains('size-large')) {
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
        
        // Calculate arrow rotation
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

// =================================================================
// 🗺️ ITALIAN VACATION: FLORENCE → VAL D'ORCIA → COAST → FLORENCE
// =================================================================

// ✈️ PATH POINTS (Your main travel route with numbered stops and detailed info)
addPathPoint(43.8100, 11.2051, "Florence Airport Arrival", 
    "Land at Florence Airport (Peretola) and transfer to the Renaissance capital. Your Italian adventure begins here with convenient airport transfers to the historic center.", 
    ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600", // Airport exterior
     "https://media.cnn.com/api/v1/images/stellar/prod/240229150808-vineyard-airport-body.jpg?c=original", // Airport hall
     "https://api.airportir.com/assets/Uploads/mod-Florence-Airport-rooftop-vineyard__FocusFillWyIwLjAwIiwiMC4wMCIsMTI4MCw3MjBd.jpg"], // Arrival hall
    "https://www.abroadwithash.com/florence-travel-guide-essentials-for-your-visit-to-florence/");

// Tuscany Travel Path Points with Current Hotels – Expanded with All Confirmed Options

addPathPoint(43.0642, 11.6094, "Val d'Orcia", 
    "Arrive in Florence and transfer to your countryside hotel in the UNESCO World Heritage Val d'Orcia region. Your primary stay is Agriturismo Bonello, but you also have confirmed options at Cantagrillo Boutique Resort (Vinci) and Tenuta di Montecucco (Cinigiano). Use this base to explore cypress-lined drives, sunflower and lavender fields, and hill towns like Pienza and Bagno Vignoni.", 
    [
        "https://www.italia.it/content/dam/tdh/en/interests/toscana/val-dorcia/media/20210408155505-val-d-orcia-toscana-gettyimages-177395107.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbrLNqtNsMw1VPtscrWhevB1lfqwPtYngEQ&s",
        "https://historyinhighheels.com/wp-content/uploads/2017/07/Sunflowers_Tuscany_9.jpg"
    ],
    "https://www.italia.it/en/tuscany/things-to-do/val-orcia", 
    [
        {
            name: "Agriturismo Bonello",
            type: "🏡 Agriturismo",
            description: "Rustic Tuscan farmhouse near Pienza surrounded by fields and cypress trees. Pool, traditional meals, and sunrise views over Val d'Orcia.",
            link: "https://bonello.eu/en/",
            photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTflST2RPFzBkoP0NxlYApMAnc9Xpy6oUyiSQ&s",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/114669274.jpg?k=f18788ebcb89bd5097c82d3d260807be8154cfda8e054a1c904be8f656b15932&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/550355826.webp?k=baf684b4c375e4c8375a16b300b5553ea7e8bdb7d93176c8b3c2a8eaae349712&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/550355841.webp?k=02cff73eb00030635c2b361105c4fc31a9fdbf4b1520727b5bcba8fccb926ef9&o="
            ]
        },
        {
            name: "Cantagrillo Boutique Resort",
            type: "🌿 Villa Resort",
            description: "Boutique resort in Vinci offering a countryside retreat with pool, olive groves, and a blend of modern comfort and rural calm.",
            link: "https://www.cantagrilloresort.com/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/560466108.jpg?k=07f1ef6a599ad64f66da7495b70211e1b246e859ded944d0f4c391ee49b7fc84&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/560466810.jpg?k=b1cd617688ce53b5b5c9505c73d3e01bd1a5c199ed17a4da0139dfda63192dc6&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/677730326.jpg?k=fe049ffc224681d91ccaef4b2096a1deba3904af90ea80329693c2e47bb06833&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/678143577.webp?k=7c655a5ae68013011f63ce486cc15e634d2e7162063ce7586c1414a0edc1d5e8&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/677732181.webp?k=cbe37b439deee0aa8ff08fa66e374b7b4994b4db9c0a17dad784a21207f959aa&o="
            ]
        },
        {
            name: "Tenuta di Montecucco – ColleMassari Hospitality",
            type: "🍷 Wine Estate",
            description: "Stay at a working vineyard estate in the Montecucco region. Ideal for wine tastings, sunsets over vines, and relaxing in quiet hills.",
            link: "https://www.collemassarihospitality.it/wine-relais-montecucco/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/572264392.jpg?k=6b99616e3b1ee4d62aa193ddf2e22a60dc96a0fca627d2c4b0e9a07ecefcf303&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/549836014.jpg?k=359640f6a1f4e1f578685cb2f8de5896b5713a266248df0857ab960c1750f17b&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/293895054.jpg?k=8e7ada6c97ab66b7bffca367da7a944ca8ef0070ce0f9a9b1ec1056fb58843fd&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/495355637.webp?k=a31a9a3f9d43781872af6bbb8487501b7935e333290382dfb6641bcbff21ef1e&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/441284519.webp?k=9d863e0ccd7de28bae51e1d5cd1e1690dd81f15716131240933d3fbeea22fd00&o="
            ]
        }
    ]);

addPathPoint(44.3301, 9.1556, "Camogli", 
    "Transfer to your colorful seaside stay in Camogli, a pastel Ligurian fishing village. Your confirmed hotel is A due passi dal cielo e dal mare, a beautiful apartment with balcony views. Also consider Le Dimore di Terrarossa in Porto Ercole if you pivot back to the Argentario coast.", 
    [
        "https://www.campingvilladoria.it/wp/wp-content/uploads/2018/11/portofino-e-camogli-lezione-di-cucina-ed-aperituffo-770x531.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/472626287.jpg?k=7ee7d0fc150af85c5127005220423f89d05c048c09dd705d358281fd02021ed2&o=&hp=1",
        "https://www.shoreexcursionsgroup.com/img/tour/EULSPVTPORTOCIN-2.jpg"
    ],
    "https://ourlittlelifestyle.com/visiting-camogli-italy/",
    [
        {
            name: "A due passi dal cielo e dal mare",
            type: "🌈 Boutique Apartment",
            description: "Sea-view apartment with private balcony overlooking the Ligurian coast and Camogli's colorful houses.",
            link: "https://www.camoglimare.it/it/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/324216870.jpg?k=8c0d594bf5657d7d369e0351a9ac180dcc37ab5c5ba08b53c04bd8dc768954e9&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/139052568.jpg?k=699ea89e53a89824d4345162f82920c653ab8a288f1ec55fe1febcac6757b3cb&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/336480810.jpg?k=7caba4d19b3f737e06f3e34b47ea7b82f9f4dd72e3c25bb9d99456c94e41b29a&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/469771389.jpg?k=8e1800acbe08e358c357b8d94b0a5c33e13fe8328e6235c5e423887b57167304&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/139053301.jpg?k=b87f275266bb3e5f35899da8359cb4c5ad751f81ba270c221210cb74ffc051ee&o=&hp=1"
            ]
        },
        {
            name: "Albergo Stella Maris Camogli",
            type: "🏖️ Boutique Coastal Hotel",
            description: "Seafront hotel just steps from Camogli beach and the harbor promenade. Enjoy panoramic views, walkable access to cafés and shops, and charming rooms in the heart of the Ligurian Riviera.",
            link: "https://www.stellamaris.cc/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/455746275.jpg?k=0eb1b5f0b831d906881c5e037466b1227fd1a40c02ee4f917902da0182783396&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/456087706.jpg?k=df42d229c901b3316b8a1fb0c1602f5af3e919e040e67c0f7cff11a53183b134&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/455644909.webp?k=7841475f2e8ac8de366a5b391acf96133a48f5914a92fd947dfebc4bbcb7e86c&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455644881.webp?k=41cb85314a23a18f06a865016eff7f64f5a71a94f67dda07ab449f3db0ff6c98&o="
            ]
        }
    ]);

addPathPoint(43.7763, 11.2486, "Florence City Center", 
    "Return to Florence for your final 2 nights. Choose from your confirmed bookings: Florentia Art Apartments, Residenza Della Signoria, or Sette Angeli Rooms — all walking distance to the Duomo and major sights.", 
    [
        "https://www.italia.it/content/dam/tdh/en/interests/toscana/firenze/firenze/media/20210401173629-firenze-toscana-gettyimages-1145040590.jpg",
        "https://media.istockphoto.com/id/1437261135/photo/florence.jpg?s=612x612&w=0&k=20&c=svTdhgAO26b4ZVcoUcL_a5eowSjCqmkcjMf_lh-tit0=",
        "https://www.firenzemadeintuscany.com/assets/w=1500&h=740&fit=fill&f=center___images.ctfassets.net_7dc7gq8ix1ml_6XckIYSX6C9IR4iDkpRBA4_efbbe35520743e21854baaa458ecbc78_cover-bucaLapi.jpg"
    ],
    "https://thattravelista.com/top-attractions-things-to-do-florence-italy/",
    [
        {
            name: "Florentia Art Apartments",
            type: "🎨 Modern Apartment",
            description: "Stylish design apartment near the Duomo with walkable access to art, food, and fashion.",
            link: "https://florentia-art-apartments.florenceapartments.org/en/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/374079049.jpg?k=da51d8e922c3aee02331b04bc4a17aed7bf13c814cb7368f0108d901362397f8&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/374079013.jpg?k=c28d5601e72601186bd286a32b627ffe75048a4a6fc28291db096e0e7a769354&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/374078928.jpg?k=1134788a42199a853da3ed1cf5da1635195f91a2d74f50ab9b684f30ad037242&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/374079093.jpg?k=fb8169933b21cea867a04bbb3ac5566c59cc199c89cc0d19e4bc280d0dfae80b&o=&hp=1"
            ]
        },
        {
            name: "Residenza Della Signoria",
            type: "🏛️ Boutique Guesthouse",
            description: "Classic and cozy rooms in the city center. Perfect base for sightseeing and strolling along Via Calzaiuoli.",
            link: "https://www.residenzadellasignoria.com/en/index.php",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/34529910.jpg?k=38ad2174d6e9388ed6533d5b3bb1920811629302cdfc8f1861b0e388216b70f8&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/34529942.jpg?k=46cd7d4aac540b09136a7886b77c78e1d3ef9cbd99fb2ef54a82a56453d7016c&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/539935046.webp?k=0697e3dea5550f51319b32081cd8d2c4a4de203d9a891bb13719dfa85fb2e8d6&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/539935043.webp?k=e81c2e9f3d476502a8364415fa1c8887be5b31a29aa9e2abd02162c258a87766&o="
            ]
        },
        {
            name: "Sette Angeli Rooms",
            type: "🛏️ Budget Boutique",
            description: "Affordable guesthouse with charming, well-located rooms just minutes from Mercato Centrale and Santa Maria Novella.",
            link: "https://www.setteangelirooms.com/",
            photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/512429096.jpg?k=22c9d7e843c3adea43dbd37090514ad0b0c2c39f2983534246bfe466194cd0be&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/246978928.jpg?k=0dabe6270de89714d10b4df55e3d58a25dbd6e36f8037405b136a60070db892f&o=&hp=1"
            ],
            roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/439092734.webp?k=82957c6f62d574e6887d657abaaf11ff109111c0e46c4ba42ce21e707a53348d&o=",
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439092685.webp?k=53c713f5379192a34ff7c6f33517c9502769b3df5379d85881de2195fbea322b&o="
            ]
        }
    ]);


// ⭐ FLORENCE ACTIVITIES & SIGHTS
addActivity(43.7677, 11.2540, "Florence Cathedral (Duomo)", "⛪ Historic Site", 
           ["https://cdn-imgix.headout.com/media/images/1300daf8e72cbe5623b8a4d84a398f1f-Duomo%20Florence%20golden%20hour.jpg", 
            "https://i0.wp.com/www.touristitaly.com/wp-content/uploads/2023/11/florence-duomo-dome-mural-scaled.jpg?fit=3072%2C2048&ssl=1"], 
           "https://duomo.firenze.it/it/scopri/cattedrale-di-santa-maria-del-fiore", 
           "Iconic Renaissance cathedral with Brunelleschi's dome and stunning frescoes. Climb to the top for breathtaking views of Florence.");

addActivity(43.7687, 11.2569, "Ponte Vecchio", "🏛️ Historic Site", 
           ["https://www.italiandualcitizenship.net/wp-content/uploads/2019/02/History-and-resources-of-the-Ponte-Vecchio.jpg", 
            "https://touritalynow.com/wp-content/uploads/2014/09/ponte-vecchio-walking.jpg"], 
           "", 
           "Medieval stone bridge lined with jewelry shops over the Arno River. The only bridge in Florence that survived WWII bombing.");

addActivity(43.7761, 11.2494, "Accademia Gallery", "🎨 Museum", 
           ["https://cdn-imgix.headout.com/media/images/dda1ee03b3e9d67718bbc80741c11a10-Visiting%20Accademia%20Gallery.jpg",
            "https://florencetips.com/images/accademia-florence.jpg"], 
           "https://www.galleriaaccademiafirenze.it/en/", 
           "Home to Michelangelo's original 17-foot tall David statue and other Renaissance masterpieces.");

addActivity(43.7651, 11.2648, "Pitti Palace & Boboli Gardens", "🏰 Palace", 
           ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_VyM26RarhlJVO4uh2rbBj1ggUDNApBQZQ&s",
            "https://www.planetware.com/photos-large/I/palazzo-pitti-and-gardens-1.jpg"], 
           "https://www.uffizi.it/en/pitti-palace", 
           "Magnificent Renaissance palace with beautiful Boboli Gardens offering panoramic city views.");

// ⭐ VAL D'ORCIA ACTIVITIES & SIGHTS
addActivity(43.0766, 11.6789, "Pienza", "🏘️ Historic Town", 
           ["https://tourismmedia.italia.it/is/image/mitur/20210310170416-shutterstock-1779793667-2",
            "https://tourismmedia.italia.it/is/image/mitur/20210310171853-shutterstock-1395921662-2?wid=800&hei=500&fit=constrain,1&fmt=webp"], 
           "https://thetuscanmom.com/one-day-in-pienza-italy/", 
           "Perfect Renaissance town and UNESCO World Heritage site, famous for pecorino cheese.");

addActivity(43.1544, 11.5613, "Montalcino", "🍷 Wine Town", 
           ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rZNrghrGTJxd6sWew9_8yrq2E1XJcl8duQ&s",
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/7b/b4/0c.jpg"], 
           "https://aneleganttraveler.com/montalcino-italy/", 
           "Hilltop town famous for Brunello di Montalcino wine and medieval fortress.");

// ⭐ MONTE ARGENTARIO COAST ACTIVITIES & SIGHTS
addActivity(42.4268, 11.1586, "Porto Ercole", "🌊 Coastal Town", 
           ["https://media.cntraveller.com/photos/66ec0df1f60e98fc9c59f2bf/4:3/w_5780,h_4335,c_limit/Porto%20Ercole%20-GettyImages-909908570.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2g5g_VsIjCYStUfgTs_jDp60Qy_La73uKA&s"], 
           "https://www.laroqqa.com/destination", 
           "Picturesque fishing village with Spanish fortress, luxury marina, and crystal-clear waters.");

addActivity(42.4147, 11.1650, "Feniglia Beach", "🏖️ Beach", 
           ["https://feniglia57.it/images/nicepage-images/ae561befe01e11a834b1070cb9de4819.jpg"], 
           "", 
           "Long sandy beach connecting Monte Argentario to mainland through protected pine forest.");

// Fit the map to show all locations once everything is loaded
setTimeout(() => {
    fitMapToLocations();
    console.log('Map initialized with', pathPoints.length, 'path points and', activities.length, 'activities');
}, 100);