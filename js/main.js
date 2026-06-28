import { initHamburger } from './modules/hamburger.js';
import { initResizeAnimationStopper } from './modules/utils.js';
import { renderPets } from './modules/renderPets.js';
import { initPopup } from './modules/popup.js';

async function loadPets() {
    try {
        const response = await fetch('./data/pets.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Loading error:", error);
        return null;
    }
}

async function initApp() {
    initHamburger();
    initResizeAnimationStopper();

    const petsData = await loadPets();
    
    if (petsData) {
        const grid = document.querySelector('.pets__grid') || document.querySelector('.page-pets__grid');

        if (grid) {
            renderPets(petsData, grid);
            
            initPopup(petsData);
        }
    }
}

initApp().catch(err => console.error("Critical init error:", err));
