/**
 * Placeholder Management - Updates input placeholders based on selected class and stat values
 */

(function() {
    'use strict';

    /**
     * Calculate stat modifier based on stat value
     * @param {number} statValue - The stat value (1-18+)
     * @returns {string} The modifier string (e.g., "+1", "-2", "0")
     */
    function calculateModifier(statValue) {
        const value = parseInt(statValue, 10);
        if (isNaN(value)) return '';

        if (value <= 3) return '-3';
        if (value <= 5) return '-2';
        if (value <= 8) return '-1';
        if (value <= 12) return '0';
        if (value <= 15) return '+1';
        if (value <= 17) return '+2';
        return '+3';
    }

    /**
     * Update stat modifier placeholders based on stat values
     */
    function updateStatModPlaceholders() {
        const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        const abbrevs = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

        stats.forEach((stat, index) => {
            const statInput = document.getElementById(`${stat}_${abbrevs[index]}`);
            const modInput = document.getElementById(`${stat}_${abbrevs[index]}mod`);

            if (statInput && modInput) {
                const modifier = calculateModifier(statInput.value);
                if (modifier) {
                    modInput.placeholder = modifier;
                }
            }
        });
    }

    /**
     * Update placeholders based on current role selection
     */
    function updatePlaceholders() {
        const roleSelect = document.getElementById('role');
        if (!roleSelect || !roleSelect.value || !window.availableMap) return;

        const roleData = window.availableMap[roleSelect.value];
        if (!roleData || !roleData.placeholders) return;

        const fields = ['damage', 'hp', 'load'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input && roleData.placeholders[field]) {
                input.placeholder = roleData.placeholders[field];
            }
        });
    }

    // Listen for role changes
    document.addEventListener('change', function(e) {
        if (e.target.id === 'role') {
            updatePlaceholders();
        }
    });

    // Listen for stat changes to update modifier placeholders
    document.addEventListener('input', function(e) {
        // Check if the changed input is a stat field (ends with _str, _dex, etc.)
        const statPattern = /_(str|dex|con|int|wis|cha)$/;
        if (e.target.id && statPattern.test(e.target.id)) {
            updateStatModPlaceholders();
        }
    });

    // Also update on change events (for better compatibility)
    document.addEventListener('change', function(e) {
        const statPattern = /_(str|dex|con|int|wis|cha)$/;
        if (e.target.id && statPattern.test(e.target.id)) {
            updateStatModPlaceholders();
        }
    });

    // Listen for app initialization complete event
    // This ensures everything is loaded before we update placeholders
    if (window.AppEvents) {
        window.AppEvents.on('initializationComplete', function() {
            console.log('Placeholders: Initialization complete, updating placeholders');
            updatePlaceholders();
            updateStatModPlaceholders();
        });
    } else {
        // Fallback if events.js isn't loaded
        console.warn('Placeholders: AppEvents not available, falling back to load event');
        window.addEventListener('load', function() {
            updatePlaceholders();
            updateStatModPlaceholders();
        });
    }

})();
