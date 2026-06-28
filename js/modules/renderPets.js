export function renderPets(petsData, container) {
    container.innerHTML = '';
    
    petsData.forEach(pet => {
        const card = document.createElement('article');
        card.classList.add('pet-card');
        card.dataset.name = pet.name;

        card.innerHTML = `
            <h2 class="visually-hidden">${pet.name}</h2>
            <figure class="pet-card__figure">
                <img src="${pet.img}" 
                     alt="${pet.name} - ${pet.breed}" 
                     width="270" height="270" 
                     loading="lazy" decoding="async" 
                     class="pet-card__image">
                <figcaption class="pet-card__name">${pet.name}</figcaption>
            </figure>
            <button class="pet-card__button" type="button">Learn more</button>
        `;

        container.appendChild(card);
    });
}
