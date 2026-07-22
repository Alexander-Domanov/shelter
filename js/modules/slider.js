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
        let next = [...available].sort(() => 0.5 - Math.random()).slice(0, count);

        while (next.length < count) {
            let randomPet = petsData[Math.floor(Math.random() * petsData.length)];
            if (!next.some(p => p.name === randomPet.name) && !currentPets.some(p => p.name === randomPet.name)) {
                next.push(randomPet);
            }
        }
        return next;
    };

    const render = () => {
        isAnimating = true;
        
        gridElement.style.opacity = '0';
        gridElement.style.transform = 'translateY(10px)';

        setTimeout(() => {
            const nextPets = getNextPets();
            
            gridElement.innerHTML = nextPets.map(pet => `
                <article class="pet-card" data-name="${pet.name}">
                    <figure class="pet-card__figure">
                        <img src="${pet.img}" alt="${pet.name}" class="pet-card__image" loading="lazy">
                        <figcaption class="pet-card__name">${pet.name}</figcaption>
                    </figure>
                    <button class="pet-card__button" type="button">Learn more</button>
                </article>
            `).join('');
            
            gridElement.style.opacity = '1';
            gridElement.style.transform = 'translateY(0)';

            currentPets = nextPets;
            isAnimating = false;
        }, 300);
    };
    
    currentPets = getNextPets();
    render();

    buttons.forEach(btn => btn.addEventListener('click', () => {
        if (isAnimating) return;
        render();
    }));
}
