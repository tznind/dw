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
  const selectGearBtn = helpers.getElement('select-starting-gear-btn');
  const helpBtn = helpers.getElement('gear-help-btn');

  // Disable button until data is ready
  if (selectGearBtn) {
    selectGearBtn.disabled = !window.availableMap;

    // Enable button when data is ready (if not already loaded)
    if (!window.availableMap) {
      window.addEventListener('movesDataReady', () => {
        selectGearBtn.disabled = false;
      }, { once: true });
    }
  }

  // Handle Help button
  if (helpBtn) {
    helpers.addEventListener('gear-help-btn', 'click', () => {
      alert('Delete items as required for starting gear');
    });
  }

  // Handle Select Starting Gear button
  helpers.addEventListener('select-starting-gear-btn', 'click', async () => {
    // Get current selected role
    const roles = window.Utils ? window.Utils.getCurrentRoles() : [];
    const selectedRole = roles.length > 0 ? roles[0] : null;

    if (!selectedRole) {
      alert('Please select a class first');
      return;
    }

    if (!window.availableMap) {
      alert('Role data not available');
      return;
    }

    const roleData = window.availableMap[selectedRole];
    if (!roleData || !roleData['default-gear'] || roleData['default-gear'].length === 0) {
      alert('No default gear available for this class');
      return;
    }

    // Confirm replacement if equipment already exists
    const currentData = helpers.getTableData('equipment');
    if (currentData && currentData.length > 0) {
      if (!confirm('This will replace your current equipment. Continue?')) {
        return;
      }
    }

    const gearData = roleData['default-gear'];

    // Transform gear data for wizard (extract strings and build weight map)
    const wizardData = [];
    const weightMap = {}; // Map item name -> weight

    gearData.forEach(entry => {
      const wizardEntry = {
        type: entry.type,
        title: entry.title
      };

      // Extract item names and build weight map
      wizardEntry.options = entry.options.map(opt => {
        const itemName = opt.item;
        weightMap[itemName] = opt.weight || 0;
        return itemName;
      });

      wizardData.push(wizardEntry);
    });

    // Show wizard and get selections
    const selectedItems = await window.Wizard.show(wizardData, {
      title: `Select Starting Gear - ${selectedRole}`
    });

    // If user didn't cancel, add items to table
    if (selectedItems) {
      helpers.clearTable('equipment');
      selectedItems.forEach(itemName => {
        helpers.addTableRow('equipment', {
          item: itemName,
          weight: weightMap[itemName] || 0
        });
      });
      setTimeout(updateTotalWeight, 100);
    }
  });
};
