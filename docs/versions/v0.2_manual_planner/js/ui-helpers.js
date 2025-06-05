/* ==================================================
   UI HELPERS - TOAST, ANIMATIONS, FORMS
   ================================================== */

/* ==================================================
   TOAST NOTIFICATIONS
   ================================================== */

let toastCounter = 0;

function showToast(message, type = 'success', duration = 3000) {
    toastCounter++;
    const toastId = `toast_${toastCounter}`;
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
}

/* ==================================================
   STATISTICS & UI UPDATES
   ================================================== */

function updateStatistics() {
    const pathPoints = document.querySelectorAll('#pathPointsList .item-card').length;
    const hotels = document.querySelectorAll('.hotel-item').length;
    
    // Count activities from all possible containers
    let activities = 0;
    activities += document.querySelectorAll('#activitiesList_activity .item-card').length;
    activities += document.querySelectorAll('#activitiesList_food .item-card').length;
    activities += document.querySelectorAll('#activitiesList_cafe .item-card').length;
    
    // Also count from legacy container if it exists
    const legacyContainer = document.getElementById('activitiesList');
    if (legacyContainer) {
        activities += legacyContainer.querySelectorAll('.item-card').length;
    }
    
    console.log('📊 Statistics:', { pathPoints, activities, hotels });
    
    updateCounter('pathPointCount', pathPoints);
    updateCounter('activityCount', activities);
    updateCounter('hotelCount', hotels);
}

function updateCounter(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.fontWeight = '800';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.fontWeight = '700';
        }, 150);
    }
}

/* ==================================================
   ANIMATIONS
   ================================================== */

function animateItemAddition(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    element.offsetHeight; // Force reflow
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    setTimeout(() => { element.style.transition = ''; }, 300);
}

/* ==================================================
   ITEM EXPAND/COLLAPSE
   ================================================== */

function toggleItemExpand(itemId) {
    const item = document.getElementById(itemId);
    if (!item) return;
    
    const details = item.querySelector('.item-details');
    const toggle = item.querySelector('.expand-toggle');
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        toggle.textContent = '⌄';
    } else {
        details.classList.add('expanded');
        toggle.textContent = '⌃';
        // Focus first empty field
        const firstEmpty = details.querySelector('input[required]:not([value]), input[data-field="name"]:not([value])');
        if (firstEmpty) setTimeout(() => firstEmpty.focus(), 100);
    }
}

/* ==================================================
   ITEM HEADER UPDATES
   ================================================== */

function updateItemHeader(inputElement) {
    const card = inputElement.closest('.item-card, .hotel-item');
    if (!card) return;
    
    const titleElement = card.querySelector('.item-title, .hotel-title');
    const subtitleElement = card.querySelector('.item-subtitle');
    
    const getVal = (selector) => {
        const el = card.querySelector(selector);
        return el ? el.value.trim() : '';
    };
    
    const name = getVal('[data-field="name"]') || 'Untitled';
    const lat = getVal('[data-field="lat"]');
    const lng = getVal('[data-field="lng"]');
    const category = getVal('[data-field="category"]');
    
    if (titleElement) {
        if (card.classList.contains('hotel-item')) {
            titleElement.textContent = `🏨 ${name}`;
        } else {
            titleElement.textContent = name;
        }
    }
    
    if (subtitleElement) {
        const coords = lat && lng ? `${lat}, ${lng}` : '';
        if (category && coords) {
            subtitleElement.textContent = `${category} • ${coords}`;
        } else if (category) {
            subtitleElement.textContent = category;
        } else if (coords) {
            subtitleElement.textContent = coords;
        } else {
            subtitleElement.textContent = 'Add coordinates and details';
        }
    }
}

/* ==================================================
   ITEM REMOVAL
   ================================================== */

function removeItemWithConfirmation(itemId, itemType) {
    const item = document.getElementById(itemId);
    if (!item) return;
    
    const titleElement = item.querySelector('.item-title');
    const itemName = titleElement ? titleElement.textContent : 'this item';
    
    if (confirm(`Remove "${itemName}"? This cannot be undone.`)) {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            item.remove();
            updateStatistics();
            autoSave();
            showToast(`${itemType} removed`, 'success');
            showEmptyStatesIfNeeded();
        }, 300);
    }
}

/* ==================================================
   PHOTO MANAGEMENT
   ================================================== */

function addPhotoInput(containerId, photoType = 'photos') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const photosSection = container.querySelector(`[data-field="${photoType}"]`);
    if (!photosSection) return;
    
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.innerHTML = `
        <input type="url" placeholder="https://example.com/photo.jpg" oninput="autoSave()">
        <button type="button" class="photo-remove" onclick="removePhotoInput(this)">Remove</button>
    `;
    
    photosSection.appendChild(photoItem);
    const newInput = photoItem.querySelector('input');
    if (newInput) newInput.focus();
}

function removePhotoInput(button) {
    const photoItem = button.closest('.photo-item');
    const photosSection = photoItem.closest('[data-field]');
    
    if (photosSection.querySelectorAll('.photo-item').length > 1) {
        photoItem.remove();
        autoSave();
    } else {
        const input = photoItem.querySelector('input');
        if (input) {
            input.value = '';
            autoSave();
        }
    }
}

/* ==================================================
   EMPTY STATES - FIXED
   ================================================== */

function showEmptyStatesIfNeeded() {
    setTimeout(() => {
        // Path points
        checkAndShowEmptyState('pathPointsList', '📍', 'No path points yet', 'Create your first path point to get started', () => addNewPathPoint());
        
        // Activities by type
        checkAndShowEmptyState('activitiesList_activity', '⭐', 'No activities yet', 'Add interesting places to visit', () => addNewActivity('activity'));
        checkAndShowEmptyState('activitiesList_food', '🍕', 'No restaurants yet', 'Add great places to eat', () => addNewActivity('food'));
        checkAndShowEmptyState('activitiesList_cafe', '☕', 'No cafes yet', 'Add cozy coffee spots', () => addNewActivity('cafe'));
        
        // Legacy container if it exists
        const legacyContainer = document.getElementById('activitiesList');
        if (legacyContainer && legacyContainer.children.length === 0) {
            checkAndShowEmptyState('activitiesList', '⭐', 'No activities yet', 'Add activities, restaurants, and must-dos', () => addNewActivity('activity'));
        }
    }, 500);
}

function checkAndShowEmptyState(containerId, icon, title, subtitle, actionCallback) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ Container not found: ${containerId}`);
        return;
    }
    
    // Only show empty state if container has no items
    const itemCards = container.querySelectorAll('.item-card');
    if (itemCards.length === 0) {
        showEmptyState(containerId, icon, title, subtitle, actionCallback);
    }
}

function showEmptyState(containerId, icon, title, subtitle, actionCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Don't add if already exists
    if (container.querySelector('.empty-state')) return;
    
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <div class="icon">${icon}</div>
        <h3>${title}</h3>
        <p>${subtitle}</p>
        <button class="add-button primary" style="margin-top: 16px;">
            Get Started
        </button>
    `;
    
    const button = emptyState.querySelector('button');
    button.onclick = () => {
        emptyState.remove();
        actionCallback();
    };
    
    container.appendChild(emptyState);
}

function removeEmptyState(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
}

function toggleMustDo(button) {
    const isLoved = button.textContent === '❤️';
    button.textContent = isLoved ? '♡' : '❤️';
    button.classList.toggle('loved', !isLoved);
    
    // Update the activity type in the hidden field
    const card = button.closest('.item-card');
    if (card) {
        const typeField = card.querySelector('[data-field="type"]');
        if (typeField) {
            const currentType = typeField.value;
            if (isLoved) {
                // Convert from mustdo back to original type
                if (currentType === 'mustdo') {
                    // Try to determine original type from container or default to activity
                    const container = card.closest('[id]');
                    if (container) {
                        const containerId = container.id;
                        if (containerId.includes('food')) {
                            typeField.value = 'food';
                        } else if (containerId.includes('cafe')) {
                            typeField.value = 'cafe';
                        } else {
                            typeField.value = 'activity';
                        }
                    } else {
                        typeField.value = 'activity';
                    }
                }
            } else {
                // Convert to mustdo
                typeField.value = 'mustdo';
            }
        }
    }
    
    autoSave();
}