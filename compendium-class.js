/**
 * Compendium Class Visibility
 *
 * Hides secondary role selectors (role2, role3, ...) when no modules are active.
 * Selectors become visible automatically when any module is enabled.
 */
(function() {
    'use strict';

    function anyModuleEnabled() {
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of params.entries()) {
            if (key.startsWith('module_') && value === '1') return true;
        }
        return false;
    }

    function updateCompendiumVisibility() {
        const visible = anyModuleEnabled();
        let index = 2;
        while (true) {
            const select = document.getElementById(`role${index}`);
            if (!select) break;

            const label = document.querySelector(`label[for="role${index}"]`);
            const helpButton = document.getElementById(`role${index}-help-button`);

            select.style.display = visible ? '' : 'none';
            if (label) label.style.display = visible ? '' : 'none';
            if (helpButton) helpButton.style.display = visible ? '' : 'none';

            index++;
        }
    }

    window.AppEvents.on('initializationComplete', updateCompendiumVisibility);

})();
