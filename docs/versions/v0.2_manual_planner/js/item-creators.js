/* ==================================================
   ITEM CREATION & MANAGEMENT - PATH POINTS, MARKERS, HOTELS
   ==================================================
   This module handles:
   - Adding path points (with hotel blocks)
   - Adding markers by type (activity, restaurant, cafe)
   - Must-do toggle support via heart icon
================================================== */

/* ==================================================
   MAIN PUBLIC FUNCTIONS - CALLED BY UI BUTTONS
   ================================================== */

function addNewPathPoint() {
    window.TravelPlanner.pathPointCounter++;
    const pathPoint = createPathPointElement(window.TravelPlanner.pathPointCounter);

    const container = document.getElementById('pathPointsList');
    container.appendChild(pathPoint);

    removeEmptyState('pathPointsList');
    animateItemAddition(pathPoint);
    toggleItemExpand(pathPoint.id);
    updateStatistics();
    autoSave();
    showToast('Path point added!', 'success');
}

function addNewActivity(activityType) {
    if (!ACTIVITY_TYPES[activityType]) {
        showToast('Invalid activity type', 'error');
        return;
    }

    window.TravelPlanner.activityCounter++;
    const activity = createActivityElement(activityType, window.TravelPlanner.activityCounter);

    const container = document.getElementById(`activitiesList_${activityType}`);
    if (container) {
        container.appendChild(activity);
        removeEmptyState(`activitiesList_${activityType}`);
    } else {
        // Fallback to main list if subtab container doesn't exist
        const fallbackContainer = document.getElementById('activitiesList');
        if (fallbackContainer) {
            fallbackContainer.appendChild(activity);
            removeEmptyState('activitiesList');
        }
    }

    animateItemAddition(activity);
    toggleItemExpand(activity.id);
    updateStatistics();
    autoSave();
    showToast(`${ACTIVITY_TYPES[activityType].title} added!`, 'success');
}

function addMarkerOfSelectedType() {
    const type = window.TravelPlanner.currentMarkerFilter || 'activity';
    addNewActivity(type);
}

/* ==================================================
   HOTEL MANAGEMENT
   ================================================== */

function addHotel(pathPointId) {
    const pathPoint = document.getElementById(pathPointId);
    if (!pathPoint) return;

    window.TravelPlanner.hotelCounter++;
    const hotelElement = createHotelElement(window.TravelPlanner.hotelCounter);

    const hotelsList = pathPoint.querySelector('.hotels-list');
    if (hotelsList) {
        hotelsList.appendChild(hotelElement);
        
        const nameInput = hotelElement.querySelector('[data-field="name"]');
        if (nameInput) setTimeout(() => nameInput.focus(), 100);

        updateStatistics();
        autoSave();
        showToast('Hotel added!', 'success');
    }
}

function removeHotel(hotelId) {
    const hotel = document.getElementById(hotelId);
    if (!hotel) return;

    const nameField = hotel.querySelector('[data-field="name"]');
    const hotelName = (nameField && nameField.value) ? nameField.value : 'this hotel';

    if (confirm(`Remove "${hotelName}"? This cannot be undone.`)) {
        hotel.style.transition = 'all 0.3s ease';
        hotel.style.opacity = '0';
        hotel.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            hotel.remove();
            updateStatistics();
            autoSave();
            showToast('Hotel removed', 'success');
        }, 300);
    }
}

/* ==================================================
   ELEMENT CREATION: PATH POINTS & MARKERS
   ================================================== */

function createPathPointElement(number) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.id = `pathpoint_${number}_${Date.now()}`;

    div.innerHTML = `
        <div class="item-header" onclick="toggleItemExpand('${div.id}')">
            <div class="item-icon">📍</div>
            <div class="item-info">
                <div class="item-title">New Path Point</div>
                <div class="item-subtitle">Add coordinates and details</div>
            </div>
            <span class="item-number">${number}</span>
            <div class="item-actions">
                <button class="expand-toggle" onclick="event.stopPropagation(); toggleItemExpand('${div.id}')" title="Expand">⌄</button>
                <button class="remove-btn" onclick="event.stopPropagation(); removeItemWithConfirmation('${div.id}', 'Path point')" title="Remove">×</button>
                <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
            </div>
        </div>
        <div class="item-details">
            <div class="form-row">
                <div class="form-group">
                    <label>Location Name *</label>
                    <input type="text" placeholder="e.g., Florence Airport" data-field="name" oninput="updateItemHeader(this); autoSave()" required>
                </div>
                <div class="form-group">
                    <label>Website URL</label>
                    <input type="url" placeholder="https://example.com" data-field="link" oninput="autoSave()">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Latitude *</label>
                    <input type="number" step="any" placeholder="43.8100" data-field="lat" oninput="updateItemHeader(this); autoSave()" required>
                </div>
                <div class="form-group">
                    <label>Longitude *</label>
                    <input type="number" step="any" placeholder="11.2051" data-field="lng" oninput="updateItemHeader(this); autoSave()" required>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Brief description of this location" data-field="description" oninput="autoSave()"></textarea>
            </div>
            <div class="form-group">
                <label>Photos</label>
                <div class="photos-section" data-field="photos">
                    <div class="photo-item">
                        <input type="url" placeholder="https://example.com/photo.jpg" oninput="autoSave()">
                        <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
                    </div>
                </div>
                <button type="button" class="add-button" onclick="addPhotoInput('${div.id}')">+ Add Photo</button>
            </div>
            <div class="hotels-section">
                <h4>🏨 Hotels at this location</h4>
                <div class="hotels-list"></div>
                <button type="button" class="add-button" onclick="addHotel('${div.id}')">+ Add Hotel</button>
            </div>
        </div>
    `;
    return div;
}

function createActivityElement(activityType, number) {
    const typeInfo = ACTIVITY_TYPES[activityType];
    const div = document.createElement('div');
    div.className = 'item-card';
    div.id = `activity_${activityType}_${number}_${Date.now()}`;
    div.setAttribute('data-type', activityType);

    div.innerHTML = `
        <div class="item-header" onclick="toggleItemExpand('${div.id}')">
            <div class="item-icon">${typeInfo.icon}</div>
            <div class="item-info">
                <div class="item-title">New ${typeInfo.title}</div>
                <div class="item-subtitle">Add coordinates and details</div>
            </div>
            <div class="item-actions">
                <button class="heart-btn" onclick="event.stopPropagation(); toggleMustDo(this)" title="Toggle Must-Do">♡</button>
                <button class="expand-toggle" onclick="event.stopPropagation(); toggleItemExpand('${div.id}')" title="Expand">⌄</button>
                <button class="remove-btn" onclick="event.stopPropagation(); removeItemWithConfirmation('${div.id}', '${typeInfo.title}')" title="Remove">×</button>
                <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
            </div>
        </div>
        <div class="item-details">
            <input type="hidden" data-field="type" value="${activityType}">
            <div class="form-row">
                <div class="form-group">
                    <label>Name *</label>
                    <input type="text" placeholder="e.g., Duomo di Firenze" data-field="name" oninput="updateItemHeader(this); autoSave()" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" placeholder="${typeInfo.placeholder}" data-field="category" oninput="updateItemHeader(this); autoSave()">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Latitude *</label>
                    <input type="number" step="any" placeholder="43.7677" data-field="lat" oninput="updateItemHeader(this); autoSave()" required>
                </div>
                <div class="form-group">
                    <label>Longitude *</label>
                    <input type="number" step="any" placeholder="11.2540" data-field="lng" oninput="updateItemHeader(this); autoSave()" required>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="What makes this special?" data-field="description" oninput="autoSave()"></textarea>
            </div>
            <div class="form-group">
                <label>Website URL</label>
                <input type="url" placeholder="https://example.com" data-field="link" oninput="autoSave()">
            </div>
            <div class="form-group">
                <label>Photos</label>
                <div class="photos-section" data-field="photos">
                    <div class="photo-item">
                        <input type="url" placeholder="https://example.com/photo.jpg" oninput="autoSave()">
                        <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
                    </div>
                </div>
                <button type="button" class="add-button" onclick="addPhotoInput('${div.id}')">+ Add Photo</button>
            </div>
        </div>
    `;
    return div;
}

function createHotelElement(number) {
    const div = document.createElement('div');
    div.className = 'hotel-item';
    div.id = `hotel_${number}_${Date.now()}`;

    div.innerHTML = `
        <div class="hotel-header">
            <div class="hotel-title">🏨 Hotel ${number}</div>
            <button class="remove-btn" onclick="removeHotel('${div.id}')" title="Remove Hotel">×</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Hotel Name *</label>
                <input type="text" placeholder="e.g., Hotel Davanzati" data-field="name" required oninput="updateHotelHeader(this); autoSave()">
            </div>
            <div class="form-group">
                <label>Hotel Type</label>
                <input type="text" placeholder="e.g., Boutique Hotel, Historic Palace" data-field="type" oninput="autoSave()">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea placeholder="Brief hotel description" data-field="description" oninput="autoSave()"></textarea>
        </div>
        <div class="form-group">
            <label>Website URL</label>
            <input type="url" placeholder="https://hotel.com" data-field="link" oninput="autoSave()">
        </div>
        <div class="form-group">
            <label>Hotel Photos</label>
            <div class="photos-section" data-field="photos">
                <div class="photo-item">
                    <input type="url" placeholder="https://example.com/hotel-exterior.jpg" oninput="autoSave()">
                    <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
                </div>
            </div>
            <button type="button" class="add-button" onclick="addPhotoInput('${div.id}', 'photos')">+ Add Hotel Photo</button>
        </div>
        <div class="form-group">
            <label>Room Photos</label>
            <div class="photos-section" data-field="roomPhotos">
                <div class="photo-item">
                    <input type="url" placeholder="https://example.com/room.jpg" oninput="autoSave()">
                    <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
                </div>
            </div>
            <button type="button" class="add-button" onclick="addPhotoInput('${div.id}', 'roomPhotos')">+ Add Room Photo</button>
        </div>
    `;

    return div;
}

/* ==================================================
   PHOTO MANAGEMENT
   ================================================== */

function addPhotoInput(parentId, field = 'photos') {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const photoSection = parent.querySelector(`[data-field="${field}"]`);
    if (!photoSection) return;

    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.innerHTML = `
        <input type="url" placeholder="https://example.com/photo.jpg" oninput="autoSave()">
        <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
    `;
    photoSection.appendChild(photoItem);
    
    const newInput = photoItem.querySelector('input');
    if (newInput) newInput.focus();
}

/* ==================================================
   HOTEL HEADER UPDATE
   ================================================== */

function updateHotelHeader(inputElement) {
    const hotel = inputElement.closest('.hotel-item');
    if (!hotel) return;
    
    const titleElement = hotel.querySelector('.hotel-title');
    const nameInput = hotel.querySelector('[data-field="name"]');
    
    if (titleElement && nameInput) {
        const hotelName = nameInput.value.trim();
        if (hotelName) {
            titleElement.textContent = `🏨 ${hotelName}`;
        } else {
            const hotelNumber = hotel.id.match(/hotel_(\d+)_/)?.[1] || '';
            titleElement.textContent = `🏨 Hotel ${hotelNumber}`;
        }
    }
}

// Make functions globally available
window.addHotel = addHotel;
window.removeHotel = removeHotel;
window.updateHotelHeader = updateHotelHeader;