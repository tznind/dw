// Bonds card initialization
window.CardInitializers = window.CardInitializers || {};
window.CardInitializers.bonds = function() {
  console.log('Bonds card initializing...');

  const bondsListEl = document.querySelector('.bonds-list');
  const addBondBtn = document.querySelector('.add-bond-btn');

  let bondCounter = 0;

  function createBondItem(text = '') {
    const bondItem = document.createElement('div');
    bondItem.className = 'bond-item';
    bondItem.dataset.bondId = bondCounter++;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `bond_${bondItem.dataset.bondId}`;
    input.id = `bond_${bondItem.dataset.bondId}`;
    input.value = text;
    input.placeholder = 'Enter a bond (use X for other character\'s name)';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-bond-btn';
    removeBtn.textContent = '−';
    removeBtn.onclick = () => removeBond(bondItem);

    bondItem.appendChild(input);
    bondItem.appendChild(removeBtn);

    return bondItem;
  }

  function addBond(text = '') {
    const bondItem = createBondItem(text);
    bondsListEl.appendChild(bondItem);

    // Save state after adding
    if (window.Utils && window.Utils.saveFormState) {
      window.Utils.saveFormState();
    }
  }

  function removeBond(bondItem) {
    bondItem.remove();

    // Save state after removing
    if (window.Utils && window.Utils.saveFormState) {
      window.Utils.saveFormState();
    }
  }

  function loadDefaultBonds() {
    console.log('Loading default bonds...');

    // Get current roles using Utils
    const roles = window.Utils ? window.Utils.getCurrentRoles() : [];
    const selectedRole = roles.length > 0 ? roles[0] : null;

    console.log('Selected role:', selectedRole);

    if (!selectedRole) {
      console.log('No role selected');
      return;
    }

    // Get availability data
    if (!window.availableMap) {
      console.log('No availableMap found');
      return;
    }

    const roleData = window.availableMap[selectedRole];
    if (!roleData || !roleData['default-bonds']) {
      console.log('No default bonds for role:', selectedRole);
      return;
    }

    // Clear existing bonds
    bondsListEl.innerHTML = '';
    bondCounter = 0;

    // Add default bonds
    const defaultBonds = roleData['default-bonds'];
    console.log('Default bonds:', defaultBonds);

    defaultBonds.forEach(bond => {
      addBond(bond);
    });

    // Mark that we've initialized bonds for the first time
    let bftInput = document.getElementById('bft');
    if (!bftInput) {
      bftInput = document.createElement('input');
      bftInput.type = 'hidden';
      bftInput.id = 'bft';
      bftInput.name = 'bft';
      document.querySelector('form').appendChild(bftInput);
    }
    bftInput.value = '1';

    // Save state
    if (window.Utils && window.Utils.saveFormState) {
      window.Utils.saveFormState();
    }
  }

  // Add bond button click handler
  if (addBondBtn) {
    addBondBtn.addEventListener('click', () => addBond());
  }

  // Check if this is the first time (bft = bonds first time)
  const bftInput = document.getElementById('bft');
  const isFirstTime = !bftInput || bftInput.value !== '1';

  // Find highest bond counter from existing bonds
  const savedBonds = document.querySelectorAll('[name^="bond_"]');
  savedBonds.forEach(input => {
    const bondId = parseInt(input.name.replace('bond_', ''));
    if (bondId >= bondCounter) {
      bondCounter = bondId + 1;
    }
  });

  // Only load defaults if it's the first time
  if (isFirstTime && savedBonds.length === 0) {
    console.log('First time - loading default bonds');
    loadDefaultBonds();
  } else {
    console.log('Not first time or bonds already exist, skipping default load');
  }

  // Listen for role changes
  const roleSelect = document.getElementById('role');
  if (roleSelect && !roleSelect.hasAttribute('data-bonds-listener')) {
    roleSelect.addEventListener('change', () => {
      // Reset bft on role change so defaults load again
      const bftInput = document.getElementById('bft');
      if (bftInput) {
        bftInput.value = '';
      }

      // Ask user if they want to reset bonds
      if (confirm('Load default bonds for this class? This will replace your current bonds.')) {
        loadDefaultBonds();
      }
    });
    roleSelect.setAttribute('data-bonds-listener', 'true');
    console.log('Added role change listener');
  }

  console.log('Bonds card initialization complete');
};
