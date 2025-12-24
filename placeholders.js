/**
 * Placeholder Management - Updates input placeholders based on selected class
 */

(function() {
    'use strict';

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

    // Update on initial load (after data is loaded)
    window.addEventListener('load', updatePlaceholders);

})();
