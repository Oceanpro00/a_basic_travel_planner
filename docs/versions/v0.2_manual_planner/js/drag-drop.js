/* ==================================================
   SIMPLE DRAG & DROP - USING SORTABLEJS
   ================================================== */

let sortableInstances = new Map();

/* ==================================================
   INITIALIZE DRAG AND DROP
   ================================================== */

function initializeDragAndDrop() {
    initializeSortableContainer('pathPointsList', {
        onSort: onPathPointsReorder
    });
    
    initializeSortableContainer('activitiesList', {
        onSort: onActivitiesReorder
    });

    ['activitiesList_activity', 'activitiesList_food', 'activitiesList_cafe'].forEach(id => {
    initializeSortableContainer(id, { onSort: onActivitiesReorder });
    });
}

function initializeSortableContainer(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sortable = new Sortable(container, {
        animation: 250,
        ghostClass: 'sortable-ghost',
        dragClass: 'dragging',
        handle: '.drag-handle',
        chosenClass: 'sortable-chosen',
        
        onEnd: function(evt) {
            if (options.onSort) {
                options.onSort(evt);
            }
            autoSave();
        }
    });

    sortableInstances.set(containerId, sortable);
}

/* ==================================================
   REORDER HANDLERS
   ================================================== */

function onPathPointsReorder(evt) {
    updatePathPointNumbers();
    updateStatistics();
    showToast('Path points reordered', 'success');
}

function onActivitiesReorder(evt) {
    updateStatistics();
    showToast('Activities reordered', 'success');
}

function updatePathPointNumbers() {
    const pathPoints = document.querySelectorAll('#pathPointsList .item-card');
    pathPoints.forEach((item, index) => {
        const numberElement = item.querySelector('.item-number');
        if (numberElement) {
            numberElement.textContent = index + 1;
        }
    });
}