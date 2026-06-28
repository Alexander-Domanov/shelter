function generatePetsSequence(pets) {
    let fullList = [];
    for (let i = 0; i < 6; i++) {
        let block = [...pets].sort(() => Math.random() - 0.5);
        if (fullList.length > 0 && fullList[fullList.length - 1].name === block[0].name) {
            block.push(block.shift());
        }
        fullList.push(...block);
    }
    return fullList;
}

export function initPagination(petsData, gridElement) {
    const fullSequence = generatePetsSequence(petsData);
    let currentPage = 1;

    const getItemsPerPage = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 8;
        if (width >= 768) return 6;
        return 3;
    };

    const maxPages = () => Math.ceil(48 / getItemsPerPage());

    const render = (items) => {
        gridElement.classList.add('page-pets__grid--fading');

        setTimeout(() => {
            gridElement.innerHTML = items.map(pet => `
            <article class="pet-card" data-name="${pet.name}">
                <h2 class="visually-hidden">${pet.name}</h2>
                <figure class="pet-card__figure">
                    <img src="${pet.img}" 
                         alt="${pet.name}" 
                         width="270" height="270" 
                         loading="lazy" decoding="async" 
                         class="pet-card__image"
                         >
                    <figcaption class="pet-card__name">${pet.name}</figcaption>
                </figure>
                <button class="pet-card__button" type="button">Learn more</button>
            </article>
        `).join('');
            
            gridElement.classList.remove('page-pets__grid--fading');
        }, 300);
    };

    const updateUI = () => {
        const perPage = getItemsPerPage();
        const total = maxPages();
        const start = (currentPage - 1) * perPage;
        const pageItems = fullSequence.slice(start, start + perPage);

        render(pageItems);
        
        document.querySelector('.pets__pagination--text').textContent = currentPage;
        
        const btnFirst = document.querySelector('[aria-label="First page"]');
        const btnPrev = document.querySelector('[aria-label="Previous page"]');
        const btnNext = document.querySelector('[aria-label="Next page"]');
        const btnLast = document.querySelector('[aria-label="Last page"]');

        btnFirst.disabled = currentPage === 1;
        btnPrev.disabled = currentPage === 1;
        btnNext.disabled = currentPage >= total;
        btnLast.disabled = currentPage >= total;
    };
    
    document.querySelector('[aria-label="First page"]').addEventListener('click', () => {
        currentPage = 1;
        updateUI();
    });

    document.querySelector('[aria-label="Previous page"]').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateUI();
        }
    });

    document.querySelector('[aria-label="Next page"]').addEventListener('click', () => {
        if (currentPage < maxPages()) {
            currentPage++;
            updateUI();
        }
    });

    document.querySelector('[aria-label="Last page"]').addEventListener('click', () => {
        currentPage = maxPages();
        updateUI();
    });
    
    updateUI();
    
    window.addEventListener('resize', () => {
        currentPage = 1;
        updateUI();
    });
}
