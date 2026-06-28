export function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('#primary-navigation');

   if (!hamburger || !navigation) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    document.addEventListener('click', (e) => {
        const isMenuOpen = hamburger.getAttribute('aria-expanded') === 'true';

        if (isMenuOpen && !navigation.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}
