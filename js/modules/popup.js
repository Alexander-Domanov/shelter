export function initPopup(petsData) {
    const dialog = document.querySelector('#pet-popup');
    const container = dialog.querySelector('.popup__container');
    const closeBtn = dialog.querySelector('.popup__close');
    const grid = document.querySelector('.pets__grid') || document.querySelector('.page-pets__grid');

    if (!grid || !dialog) return;

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.pet-card');
        if (!card) return;

        const pet = petsData.find(p => p.name === card.dataset.name);
        if (pet) {
            const formatList = (arr) => arr.length === 1 && arr[0] === 'none' ? 'None' : arr.join(', ');

           container.innerHTML = `
                <img src="${pet.img}" alt="${pet.name}" class="popup__img" fetchpriority="high" loading="eager">
                <div class="popup__info">
                    <h3 class="popup__title">${pet.name}</h3>
                    <h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
                    <p class="popup__description">${pet.description}</p>
                    <ul class="popup__details">
                        <li><b>Age:</b> ${pet.age}</li>
                        <li><b>Inoculations:</b> ${formatList(pet.inoculations)}</li>
                        <li><b>Diseases:</b> ${formatList(pet.diseases)}</li>
                        <li><b>Parasites:</b> ${formatList(pet.parasites)}</li>
                    </ul>
                </div>
            `;
            
            dialog.showModal();
        }
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
}
