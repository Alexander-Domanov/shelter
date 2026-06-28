import { initHamburger } from './modules/hamburger.js';
import { initResizeAnimationStopper } from './modules/utils.js';
import { initPopup } from './modules/popup.js';
import { renderPets } from './modules/renderPets.js';
import { initSlider } from './modules/slider.js';

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
        const sliderGrid = document.querySelector('.pets__grid');
        const catalogGrid = document.querySelector('.page-pets__grid');

        if (sliderGrid) {
            initSlider(petsData, sliderGrid);
            initPopup(petsData);
            
        } else if (catalogGrid) {
            renderPets(petsData, catalogGrid);
            initPopup(petsData);
        }
    }
}

initApp().catch(err => console.error("Critical init error:", err));
