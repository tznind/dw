// Bonds card - Relationship tracking functionality using dynamic tables
window.CardInitializers = window.CardInitializers || {};
window.CardInitializers.bonds = function(container, suffix) {
  const helpers = window.CardHelpers.createScopedHelpers(container, suffix);

  // Initialize dynamic tables
  if (window.DynamicTable) {
    window.DynamicTable.initializeInContainer(container, suffix);
  }

  // Get the button element
  const loadDefaultsBtn = helpers.getElement('load-default-bonds-btn');

  // Disable button until data is ready
  if (loadDefaultsBtn) {
    loadDefaultsBtn.disabled = !window.availableMap;

    // Enable button when data is ready (if not already loaded)
    if (!window.availableMap) {
      window.addEventListener('movesDataReady', () => {
        loadDefaultsBtn.disabled = false;
      }, { once: true });
    }
  }

  // Handle Load Defaults button
  helpers.addEventListener('load-default-bonds-btn', 'click', () => {
    // Get current roles using Utils
    const roles = window.Utils ? window.Utils.getCurrentRoles() : [];
    const selectedRole = roles.length > 0 ? roles[0] : null;

    if (!selectedRole) {
      alert('Please select a class first');
      return;
    }

    // Get availability data
    if (!window.availableMap) {
      alert('Role data not available');
      return;
    }

    const roleData = window.availableMap[selectedRole];
    if (!roleData || !roleData['default-bonds']) {
      alert('No default bonds available for this class');
      return;
    }

    const defaultBonds = roleData['default-bonds'];

    // Confirm replacement if bonds already exist
    const currentData = helpers.getTableData('bonds');
    if (currentData && currentData.length > 0) {
      if (!confirm('This will replace your current bonds. Continue?')) {
        return;
      }
    }

    // Clear and add default bonds
    helpers.clearTable('bonds');
    defaultBonds.forEach(bondText => {
      helpers.addTableRow('bonds', { bond: bondText });
    });
  });
};
