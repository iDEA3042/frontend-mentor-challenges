const unitsSelectContainer = document.getElementsByClassName('units-select-container')[0];
const unitsSelectHoverContainer = document.getElementsByClassName('units-select-hover-container')[0];

let unitsHoverTimeout = null;

function showUnitsHover() {
    if (unitsHoverTimeout) {
        clearTimeout(unitsHoverTimeout);
        unitsHoverTimeout = null;
    }
    unitsSelectHoverContainer.style.display = 'flex';
}

function scheduleHideUnitsHover(delay = 500) {
    if (unitsHoverTimeout) clearTimeout(unitsHoverTimeout);
    unitsHoverTimeout = setTimeout(() => {
        unitsSelectHoverContainer.style.display = 'none';
        unitsHoverTimeout = null;
    }, delay);
}

// keep visible while pointer is over either the trigger or the hover panel
unitsSelectContainer.addEventListener('mouseenter', showUnitsHover);
unitsSelectHoverContainer.addEventListener('mouseenter', showUnitsHover);

// start hide timer when pointer leaves either element
unitsSelectContainer.addEventListener('mouseleave', () => scheduleHideUnitsHover(500));
unitsSelectHoverContainer.addEventListener('mouseleave', () => scheduleHideUnitsHover(500));

const inputContainer = document.getElementsByClassName('input-container')[0];

inputContainer.addEventListener('click', () => {

    searchInput.focus();    // declared in dynamic.js
    inputContainer.style.border = '1px solid white';
})

document.body.addEventListener('click', () => {

    if (document.activeElement === searchInput) {
        inputContainer.style.border = '1px solid white';
    } else {
        inputContainer.style.border = 'none';
    }
})