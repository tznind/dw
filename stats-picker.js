/**
 * Stats Picker - Drag-and-drop interface for assigning starting stats
 * Only shows once, then hides permanently via URL parameter
 */

window.StatsPicker = (function() {
    'use strict';

    const STARTING_STATS = [16, 15, 13, 12, 9, 8];
    const STAT_FIELDS = [
        { id: 'strength_str', name: 'Strength' },
        { id: 'dexterity_dex', name: 'Dexterity' },
        { id: 'constitution_con', name: 'Constitution' },
        { id: 'intelligence_int', name: 'Intelligence' },
        { id: 'wisdom_wis', name: 'Wisdom' },
        { id: 'charisma_cha', name: 'Charisma' }
    ];

    /**
     * Check if user has dismissed the picker
     */
    function isPickerDismissed() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has('ssd') && urlParams.get('ssd') === '1';
    }

    /**
     * Dismiss the picker (set ssd=1 flag)
     */
    function dismissPicker() {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('ssd', '1');
        const newUrl = urlParams.toString() ? '?' + urlParams.toString() : location.pathname;
        history.replaceState({}, '', newUrl);

        // Hide the picker immediately
        const container = document.querySelector('.stats-help');
        if (container) {
            container.innerHTML = '';
            container.classList.remove('stats-picker-active');
        }

        console.log('StatsPicker: Dismissed by user');
    }

    /**
     * Get which stat values are already assigned
     * Returns array of values that are currently in stat fields
     */
    function getAssignedStats() {
        const assigned = [];
        STAT_FIELDS.forEach(field => {
            const input = document.getElementById(field.id);
            if (input && input.value && input.value.trim() !== '') {
                const value = parseInt(input.value.trim(), 10);
                if (!isNaN(value)) {
                    assigned.push(value);
                }
            }
        });
        return assigned;
    }

    /**
     * Get which stat values are still available (not yet assigned)
     */
    function getAvailableStats() {
        const assigned = getAssignedStats();
        return STARTING_STATS.filter(stat => !assigned.includes(stat));
    }

    /**
     * Sync the stats picker UI with current state
     * Only shows chips for stats that haven't been assigned yet
     */
    function syncStatsPicker() {
        const container = document.querySelector('.stats-help');
        if (!container) {
            console.warn('StatsPicker: .stats-help container not found');
            return null;
        }

        // If user dismissed the picker, don't show it
        if (isPickerDismissed()) {
            container.innerHTML = '';
            container.classList.remove('stats-picker-active');
            return null;
        }

        const availableStats = getAvailableStats();

        // If no stats available (all assigned), hide the picker
        if (availableStats.length === 0) {
            container.innerHTML = '';
            container.classList.remove('stats-picker-active');
            return null;
        }

        // Show picker with only available stats
        container.classList.add('stats-picker-active');
        container.innerHTML = `
            <div class="stats-picker-header">Drag these scores to your stats:</div>
            <div class="stats-picker-values" id="stats-picker-values">
                ${availableStats.map(stat => `
                    <div class="stat-value-chip" draggable="true" data-stat-value="${stat}">
                        ${stat}
                    </div>
                `).join('')}
                <button type="button" id="stats-picker-close-btn">Close</button>
            </div>
        `;

        // Wire up close button
        const closeButton = container.querySelector('#stats-picker-close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', dismissPicker);
        }

        return container;
    }

    /**
     * Initialize drag-and-drop functionality (desktop + mobile)
     */
    function initializeDragDrop() {
        let draggedElement = null;
        let dropSuccessful = false;

        // === DESKTOP: Mouse drag-and-drop ===
        document.addEventListener('dragstart', function(e) {
            if (e.target.classList.contains('stat-value-chip')) {
                draggedElement = e.target;
                dropSuccessful = false; // Reset flag
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', e.target.dataset.statValue);
            }
        });

        document.addEventListener('dragend', function(e) {
            if (e.target.classList.contains('stat-value-chip')) {
                e.target.classList.remove('dragging');

                // If drop wasn't successful, reset the element
                if (!dropSuccessful) {
                    draggedElement = null;
                }
            }
        });

        // === MOBILE: Touch drag-and-drop ===
        setupTouchDragForChips();

        // Make stat clocks droppable (entire clock area, not just text input)
        STAT_FIELDS.forEach(field => {
            const statInput = document.getElementById(field.id);
            if (!statInput) return;

            // Find the parent clock element (the visual clock div)
            const clockWrapper = statInput.closest('.clock-wrapper');
            const clockElement = clockWrapper ? clockWrapper.querySelector('.stat-clock') : null;

            if (!clockElement && !clockWrapper) return;

            // Use the clock wrapper as the drop zone (larger target)
            const dropZone = clockWrapper || statInput;

            // Highlight drop zones (only if stat is empty)
            dropZone.addEventListener('dragover', function(e) {
                // Don't allow drop if stat already has a value
                if (statInput.value && statInput.value.trim() !== '') {
                    e.dataTransfer.dropEffect = 'none';
                    return;
                }

                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (clockElement) {
                    clockElement.classList.add('stat-drop-target');
                }
            });

            dropZone.addEventListener('dragleave', function(e) {
                if (clockElement) {
                    clockElement.classList.remove('stat-drop-target');
                }
            });

            // Handle drop
            dropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                if (clockElement) {
                    clockElement.classList.remove('stat-drop-target');
                }

                // Don't allow drop if stat already has a value
                if (statInput.value && statInput.value.trim() !== '') {
                    console.log('StatsPicker: Cannot drop on occupied stat');
                    return;
                }

                if (!draggedElement) return;

                const statValue = draggedElement.dataset.statValue;

                // Set the input value
                statInput.value = statValue;

                // Trigger input event to update placeholders and persistence
                const event = new Event('input', { bubbles: true });
                statInput.dispatchEvent(event);

                // Mark drop as successful
                dropSuccessful = true;

                draggedElement = null;

                console.log(`StatsPicker: Assigned ${statValue} to ${field.name}`);

                // Re-sync the picker to remove this chip and show remaining ones
                syncStatsPicker();
            });
        });
    }

    /**
     * Set up touch drag-and-drop for stat chips (mobile)
     */
    function setupTouchDragForChips() {
        const DRAG_THRESHOLD = 8; // pixels to move before starting drag
        let currentlyDraggingChip = null; // Track which chip is being dragged

        document.addEventListener('touchstart', function(e) {
            if (!e.target.classList.contains('stat-value-chip')) return;

            const chip = e.target;
            const touch = e.touches[0];

            chip.touchData = {
                started: true,
                isDragging: false,
                startX: touch.clientX,
                startY: touch.clientY,
                dropSuccessful: false
            };

            // Set as currently active chip immediately
            currentlyDraggingChip = chip;
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            // If we don't have an active chip, allow normal scrolling
            if (!currentlyDraggingChip || !currentlyDraggingChip.touchData?.started) return;

            const chip = currentlyDraggingChip;
            const touch = e.touches[0];
            const deltaX = touch.clientX - chip.touchData.startX;
            const deltaY = touch.clientY - chip.touchData.startY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Only start dragging if we've moved far enough
            if (!chip.touchData.isDragging && distance > DRAG_THRESHOLD) {
                chip.touchData.isDragging = true;
                chip.classList.add('dragging');
            }

            // Only prevent scrolling and do drag behavior if we're actually dragging
            if (chip.touchData.isDragging) {
                e.preventDefault(); // Prevent scrolling only when dragging

                // Move the chip visually
                chip.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                chip.style.zIndex = '1000';

                // Find what we're hovering over
                const originalDisplay = chip.style.display;
                chip.style.display = 'none';
                const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                chip.style.display = originalDisplay;

                // Find drop zone (clock wrapper)
                let dropZone = null;
                if (elementBelow) {
                    dropZone = elementBelow.closest('.clock-wrapper') ||
                              (elementBelow.classList.contains('clock-wrapper') ? elementBelow : null);
                }

                // Highlight drop zones (only if stat is empty)
                document.querySelectorAll('.stat-clock').forEach(clock => {
                    clock.classList.remove('stat-drop-target');
                });
                if (dropZone) {
                    // Check if this stat is already filled
                    const statInput = dropZone.querySelector('.clock-floating-input[id$="_str"], .clock-floating-input[id$="_dex"], .clock-floating-input[id$="_con"], .clock-floating-input[id$="_int"], .clock-floating-input[id$="_wis"], .clock-floating-input[id$="_cha"]');
                    const isEmpty = !statInput || !statInput.value || statInput.value.trim() === '';

                    if (isEmpty) {
                        const clockElement = dropZone.querySelector('.stat-clock');
                        if (clockElement) {
                            clockElement.classList.add('stat-drop-target');
                        }
                    } else {
                        // Don't highlight occupied stats
                        dropZone = null;
                    }
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', function(e) {
            // Use the globally tracked chip, not e.target (which might not be the chip)
            if (!currentlyDraggingChip || !currentlyDraggingChip.touchData?.started) return;

            const chip = currentlyDraggingChip;
            let dropZone = null;

            // Only try to find drop zone if we were actually dragging
            if (chip.touchData.isDragging) {
                const touch = e.changedTouches[0];

                // Hide chip to get accurate drop zone detection
                const originalDisplay = chip.style.display;
                chip.style.display = 'none';
                const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                chip.style.display = originalDisplay;

                if (elementBelow) {
                    dropZone = elementBelow.closest('.clock-wrapper') ||
                              (elementBelow.classList.contains('clock-wrapper') ? elementBelow : null);

                    // If no zone found, check vicinity with buffer
                    if (!dropZone) {
                        const wrappers = document.querySelectorAll('.clock-wrapper');
                        const touchRect = { x: touch.clientX, y: touch.clientY };

                        wrappers.forEach(wrapper => {
                            const rect = wrapper.getBoundingClientRect();
                            const buffer = 20; // 20px buffer around zones

                            if (touchRect.x >= rect.left - buffer &&
                                touchRect.x <= rect.right + buffer &&
                                touchRect.y >= rect.top - buffer &&
                                touchRect.y <= rect.bottom + buffer) {
                                dropZone = wrapper;
                            }
                        });
                    }
                }
            }

            // Reset visual state
            chip.style.transform = '';
            chip.style.zIndex = '';
            chip.classList.remove('dragging');
            document.querySelectorAll('.stat-clock').forEach(clock => {
                clock.classList.remove('stat-drop-target');
            });

            // Handle drop if we found a valid zone and were dragging
            if (chip.touchData.isDragging && dropZone) {
                handleTouchDrop(chip, dropZone);
            }

            // Reset state
            delete chip.touchData;
            currentlyDraggingChip = null; // Clear global tracking
        }, { passive: false });
    }

    /**
     * Handle touch drop on a stat clock
     */
    function handleTouchDrop(chip, clockWrapper) {
        // Find the stat input for this clock
        const statInput = clockWrapper.querySelector('.clock-floating-input[id$="_str"], .clock-floating-input[id$="_dex"], .clock-floating-input[id$="_con"], .clock-floating-input[id$="_int"], .clock-floating-input[id$="_wis"], .clock-floating-input[id$="_cha"]');

        if (!statInput) {
            console.warn('StatsPicker: Could not find stat input in clock wrapper');
            return;
        }

        // Don't allow drop if stat already has a value
        if (statInput.value && statInput.value.trim() !== '') {
            console.log('StatsPicker: Cannot drop on occupied stat');
            return;
        }

        const statValue = chip.dataset.statValue;

        // Set the input value
        statInput.value = statValue;

        // Trigger input event to update placeholders and persistence
        const event = new Event('input', { bubbles: true });
        statInput.dispatchEvent(event);

        // Find field name for logging
        const fieldName = STAT_FIELDS.find(f => f.id === statInput.id)?.name || 'Unknown';
        console.log(`StatsPicker: Assigned ${statValue} to ${fieldName}`);

        // Re-sync the picker to remove this chip and show remaining ones
        syncStatsPicker();
    }

    /**
     * Initialize the stats picker system
     */
    function initialize() {
        console.log('StatsPicker: Initializing...');

        // Sync the UI with current state
        syncStatsPicker();

        // Set up drag-and-drop (always, since we might add chips dynamically)
        initializeDragDrop();
        console.log('StatsPicker: Drag-and-drop enabled');

        // Watch for input changes to re-sync (when user manually clears/edits stats)
        STAT_FIELDS.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                input.addEventListener('input', () => syncStatsPicker());
            }
        });

        // Watch for Clear button to re-sync picker
        const clearButton = document.getElementById('clear-button');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                // Delay to let clear complete
                setTimeout(() => {
                    console.log('StatsPicker: Clear button clicked, re-syncing');
                    syncStatsPicker();
                }, 100);
            });
        }
    }

    // Listen for initialization complete event
    if (window.AppEvents) {
        window.AppEvents.on('initializationComplete', function() {
            // Small delay to ensure stat inputs are rendered
            setTimeout(initialize, 150);
        });
    } else {
        // Fallback if events.js isn't loaded
        window.addEventListener('load', function() {
            setTimeout(initialize, 200);
        });
    }

    // Public API
    return {
        initialize,
        syncStatsPicker,
        getAvailableStats,
        getAssignedStats
    };

})();
