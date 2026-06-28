export function initSlider(petsData, gridElement) {
    if (!gridElement) return;

    const buttons = document.querySelectorAll('.arrow-btn');
    let isAnimating = false;
    let currentPets = [];

    const getVisibleCount = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 3;
        if (width >= 768) return 2;
        return 1;
    };

    const getNextPets = () => {
        const count = getVisibleCount();
        let available = petsData.filter(p => !currentPets.some(cp => cp.name === p.name));
        if (available.length < count) available = [...petsData];
        return [...available].sort(() => 0.5 - Math.random()).slice(0, count);
    };

    const render = () => {
        const nextPets = getNextPets();

        gridElement.style.transition = 'opacity 0.3s ease-in-out';
        gridElement.style.opacity = 0;

        setTimeout(() => {
            gridElement.innerHTML = nextPets.map(pet => `
                <article class="pet-card" data-name="${pet.name}">
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
                </article>
            `).join('');

            gridElement.style.opacity = 1;
            currentPets = nextPets;
            isAnimating = false;
        }, 300);
    };

    currentPets = getNextPets();
    render();

    buttons.forEach(btn => btn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        render();
    }));
}
