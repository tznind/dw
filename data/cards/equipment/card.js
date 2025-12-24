// Equipment card - Starting gear and equipment tracking using dynamic tables
window.CardInitializers = window.CardInitializers || {};
window.CardInitializers.equipment = function(container, suffix) {
  const helpers = window.CardHelpers.createScopedHelpers(container, suffix);

  // Initialize dynamic tables
  if (window.DynamicTable) {
    window.DynamicTable.initializeInContainer(container, suffix);
  }

  // Function to calculate and update total weight
  function updateTotalWeight() {
    const tableData = helpers.getTableData('equipment');
    let total = 0;

    if (tableData && Array.isArray(tableData)) {
      tableData.forEach(row => {
        const weight = parseFloat(row.weight);
        if (!isNaN(weight)) {
          total += weight;
        }
      });
    }

    const totalElement = helpers.getElement('total-weight');
    if (totalElement) {
      totalElement.textContent = total.toFixed(1);
    }
  }

  // Update total weight on table changes
  const equipmentTable = helpers.getElement('equipment');
  if (equipmentTable) {
    // Listen for input and change events (user typing/changing values)
    equipmentTable.addEventListener('input', updateTotalWeight);
    equipmentTable.addEventListener('change', updateTotalWeight);

    // Listen for click events (add/delete row buttons)
    equipmentTable.addEventListener('click', () => {
      setTimeout(updateTotalWeight, 50);
    });
  }

  // Listen for data persistence events
  document.addEventListener('dataLoaded', updateTotalWeight);

  // Initial calculation
  setTimeout(updateTotalWeight, 200);

  // Get the button elements
  const loadDefaultsBtn = helpers.getElement('load-default-gear-btn');
  const helpBtn = helpers.getElement('gear-help-btn');

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

  // Handle Help button
  if (helpBtn) {
    helpers.addEventListener('gear-help-btn', 'click', () => {
      alert('Delete items as required for starting gear');
    });
  }

  // Handle Load Defaults button
  helpers.addEventListener('load-default-gear-btn', 'click', () => {
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
    if (!roleData || !roleData['default-gear']) {
      alert('No default gear available for this class');
      return;
    }

    const defaultGear = roleData['default-gear'];

    // Confirm replacement if equipment already exists
    const currentData = helpers.getTableData('equipment');
    if (currentData && currentData.length > 0) {
      if (!confirm('This will replace your current equipment. Continue?')) {
        return;
      }
    }

    // Clear and add default gear
    helpers.clearTable('equipment');
    defaultGear.forEach(gearItem => {
      // Handle both object format {item, weight} and legacy string format
      if (typeof gearItem === 'object' && gearItem.item !== undefined) {
        helpers.addTableRow('equipment', {
          item: gearItem.item,
          weight: gearItem.weight || 0
        });
      } else {
        // Legacy string format
        helpers.addTableRow('equipment', { item: gearItem });
      }
    });

    // Update total weight after loading defaults
    setTimeout(updateTotalWeight, 100);
  });
};
