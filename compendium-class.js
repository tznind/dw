/**
 * Compendium Class Visibility
 *
 * Hides secondary role selectors (role2, role3, ...) when no matching roles
 * are available in the loaded data. Selectors become visible automatically
 * when a module that defines matching compendium class roles is enabled.
 *
 * No hardcoded module IDs — extensible by adding new modules that contribute
 * roles listed in a selector's data-roles attribute.
 */
(function() {
    'use strict';

    function updateCompendiumVisibility() {
        let index = 2;
        while (true) {
            const select = document.getElementById(`role${index}`);
            if (!select) break;

            const label = document.querySelector(`label[for="role${index}"]`);
            const visible = select.options.length > 1;

            select.style.display = visible ? '' : 'none';
            if (label) label.style.display = visible ? '' : 'none';

            index++;
        }
    }

    window.AppEvents.on('initializationComplete', updateCompendiumVisibility);

})();
