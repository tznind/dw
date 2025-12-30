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
     * Parse a modifier string to a number
     * @param {string} modString - Modifier string like "+1", "-2", "0"
     * @returns {number} The numeric value
     */
    function parseModifier(modString) {
        if (!modString) return 0;
        const num = parseInt(modString.replace('+', ''), 10);
        return isNaN(num) ? 0 : num;
    }

    /**
     * Format a number as a modifier string
     * @param {number} num - The numeric modifier value
     * @returns {string} Formatted modifier like "+1", "-2", "0"
     */
    function formatModifier(num) {
        if (num > 0) return `+${num}`;
        if (num === 0) return '0';
        return `${num}`;
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
                let modifier = calculateModifier(statInput.value);
                let isDebuffed = false;

                // Check if the stat clock is debuffed (value=1 means -1 modifier)
                // The clock value is stored in a hidden input with id like "constitution-value"
                const clockValueInput = document.getElementById(`${stat}-value`);
                const clockValue = clockValueInput?.value;

                if (clockValue === '1' && modifier) {
                    // Apply -1 penalty for debuff
                    const modValue = parseModifier(modifier);
                    modifier = formatModifier(modValue - 1);
                    isDebuffed = true;
                }

                if (modifier) {
                    modInput.placeholder = modifier;
                }

                // Apply red styling if debuffed
                if (isDebuffed) {
                    modInput.classList.add('debuffed-modifier');
                } else {
                    modInput.classList.remove('debuffed-modifier');
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

    // Listen for clock clicks to update modifiers when debuffs change
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('stat-clock') || e.target.closest('.stat-clock')) {
            // Small delay to let the clock update complete
            setTimeout(updateStatModPlaceholders, 50);
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
