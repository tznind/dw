// Bonds card - Relationship tracking functionality
(function() {
  'use strict';

  console.log('Bonds script loading...');

  let bondCount = 0;

  function initializeBonds() {
    console.log('Initializing bonds...');

    const addBondBtn = document.getElementById('add-bond-btn');
    const loadDefaultsBtn = document.getElementById('load-default-bonds-btn');
    const bondsContainer = document.getElementById('bonds-list');

    if (!addBondBtn || !bondsContainer) {
      console.log('Bonds elements not found');
      return;
    }

    // Get initial values from URL
    const urlParams = new URLSearchParams(window.location.search);
    bondCount = parseInt(urlParams.get('bond_cnt')) || 0;

    console.log('Initial bond count:', bondCount);

    function updateURL() {
      const params = new URLSearchParams(window.location.search);

      // Update bond count
      if (bondCount > 0) {
        params.set('bond_cnt', bondCount.toString());
      } else {
        params.delete('bond_cnt');
      }

      // Update bond data
      for (let i = 0; i < bondCount; i++) {
        const bondInput = document.getElementById(`bond_${i}`);

        if (bondInput && bondInput.value) {
          params.set(`bond_${i}`, bondInput.value);
        } else {
          params.delete(`bond_${i}`);
        }
      }

      const newUrl = params.toString() ? '?' + params.toString() : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    function createBondRow(index) {
      const row = document.createElement('div');
      row.className = 'bond-item';
      row.innerHTML = `
        <input type="text" class="bond-input" id="bond_${index}" placeholder="Enter a bond (use X for other character's name)">
        <button type="button" class="remove-bond-btn" onclick="removeBond(${index})">−</button>
      `;

      // Add event listener for URL updates
      const input = row.querySelector('input');
      input.addEventListener('input', updateURL);

      return row;
    }

    function addBond() {
      console.log('Adding bond, current count:', bondCount);

      const row = createBondRow(bondCount);
      bondsContainer.appendChild(row);

      bondCount++;
      console.log('Bond added, new count:', bondCount);
      updateURL();
    }

    function removeBond(index) {
      console.log('Removing bond at index:', index);

      // Collect all remaining bond data before re-indexing
      const remainingBonds = [];
      for (let i = 0; i < bondCount; i++) {
        if (i === index) continue; // Skip the deleted bond

        const bondInput = document.getElementById(`bond_${i}`);

        // Only include if the row still exists in DOM
        if (bondInput) {
          remainingBonds.push(bondInput.value || '');
        }
      }

      // Clean up all old bond URL params
      const params = new URLSearchParams(window.location.search);
      for (let i = 0; i < bondCount; i++) {
        params.delete(`bond_${i}`);
      }

      // Update bond count
      bondCount = remainingBonds.length;

      // Clear the container
      bondsContainer.innerHTML = '';

      // If no bonds left, just remove from URL
      if (bondCount === 0) {
        params.delete('bond_cnt');
      } else {
        // Re-add bonds with sequential indices
        params.set('bond_cnt', bondCount.toString());
        remainingBonds.forEach((bondText, newIndex) => {
          // Add to URL
          if (bondText) params.set(`bond_${newIndex}`, bondText);

          // Create the row in DOM
          const row = createBondRow(newIndex);
          bondsContainer.appendChild(row);

          // Populate value
          const bondInput = document.getElementById(`bond_${newIndex}`);
          if (bondInput) bondInput.value = bondText;
        });
      }

      const newUrl = params.toString() ? '?' + params.toString() : window.location.pathname;
      window.history.replaceState({}, '', newUrl);

      console.log('Bond removed, new count:', bondCount);
    }

    function loadDefaultBonds() {
      console.log('Loading default bonds...');

      // Get current roles using Utils
      const roles = window.Utils ? window.Utils.getCurrentRoles() : [];
      const selectedRole = roles.length > 0 ? roles[0] : null;

      console.log('Selected role:', selectedRole);

      if (!selectedRole) {
        alert('Please select a class first');
        return;
      }

      // Get availability data
      if (!window.availableMap) {
        console.log('No availableMap found');
        alert('Role data not available');
        return;
      }

      const roleData = window.availableMap[selectedRole];
      if (!roleData || !roleData['default-bonds']) {
        console.log('No default bonds for role:', selectedRole);
        alert('No default bonds available for this class');
        return;
      }

      const defaultBonds = roleData['default-bonds'];
      console.log('Default bonds:', defaultBonds);

      // Confirm replacement if bonds already exist
      if (bondCount > 0) {
        if (!confirm('This will replace your current bonds. Continue?')) {
          return;
        }
      }

      // Clear existing bonds
      bondsContainer.innerHTML = '';
      const params = new URLSearchParams(window.location.search);
      for (let i = 0; i < bondCount; i++) {
        params.delete(`bond_${i}`);
      }

      // Add default bonds
      bondCount = defaultBonds.length;
      params.set('bond_cnt', bondCount.toString());

      defaultBonds.forEach((bondText, index) => {
        // Add to URL
        params.set(`bond_${index}`, bondText);

        // Create the row in DOM
        const row = createBondRow(index);
        bondsContainer.appendChild(row);

        // Populate value
        const bondInput = document.getElementById(`bond_${index}`);
        if (bondInput) bondInput.value = bondText;
      });

      const newUrl = params.toString() ? '?' + params.toString() : window.location.pathname;
      window.history.replaceState({}, '', newUrl);

      console.log('Default bonds loaded, count:', bondCount);
    }

    // Make removeBond globally accessible
    window.removeBond = removeBond;

    // Add event listeners (only if not already added)
    if (!addBondBtn.hasAttribute('data-listener-added')) {
      addBondBtn.addEventListener('click', addBond);
      addBondBtn.setAttribute('data-listener-added', 'true');
      console.log('Add bond event listener added');
    }

    if (loadDefaultsBtn && !loadDefaultsBtn.hasAttribute('data-listener-added')) {
      loadDefaultsBtn.addEventListener('click', loadDefaultBonds);
      loadDefaultsBtn.setAttribute('data-listener-added', 'true');
      console.log('Load defaults event listener added');
    }

    // Load existing bonds from URL
    // Clear container first to prevent doubling if initialized multiple times
    bondsContainer.innerHTML = '';

    for (let i = 0; i < bondCount; i++) {
      const row = createBondRow(i);
      bondsContainer.appendChild(row);

      // Populate value from URL
      const bondVal = urlParams.get(`bond_${i}`);
      if (bondVal) {
        document.getElementById(`bond_${i}`).value = bondVal;
      }
    }

    console.log('Bonds initialization complete');
  }

  // Export initialization function for the card system
  window.CardInitializers = window.CardInitializers || {};
  window.CardInitializers.bonds = initializeBonds;
})();
