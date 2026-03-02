export default function initMenu() {
    const button = document.querySelector('.header__mobile-button');
    const container = document.querySelector('.header__container');
    const nav = document.querySelector('.header__nav');
    const mediaQuery = window.matchMedia('(min-width:768px)');

    if (!button || !nav) return;

    // 1. CORREÇÃO: Pegar apenas elementos DENTRO do nav
    const getFocusableElements = () => {
        return nav.querySelectorAll('a, button, input');
    };

    const updateInterface = (isOpen) => {
        button.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            nav.classList.add('header__nav-open');
            container.classList.add('header__container-resize');
            button.setAttribute('aria-label', 'Fechar menu');
            // Foco no botão após abrir para garantir que o teclado está no lugar certo
            setTimeout(() => button.focus(), 100);
        } else {
            nav.classList.remove('header__nav-open');
            container.classList.remove('header__container-resize');
            button.setAttribute('aria-label', 'Abrir menu');
        }
    };

    const handleFocusTrap = (e) => {
        // 2. CORREÇÃO: Usar getAttribute para checar o estado
        const isCurrentlyOpen = button.getAttribute('aria-expanded') === 'true';
        if (!isCurrentlyOpen || e.key !== 'Tab') return;

        const focusables = getFocusableElements();
        const firstFocusable = button; 
        const lastFocusable = focusables[focusables.length - 1];
        if (focusables.length === 0) return;

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };

    const handleButtonClick = () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        updateInterface(!isOpen);
    };

    button.addEventListener('click', handleButtonClick);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') updateInterface(false);
        if (e.key === 'Tab') handleFocusTrap(e);
    });

    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) updateInterface(false);
    });
}
