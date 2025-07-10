// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del menú y el botón de alternar
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Verificar que los elementos existan antes de añadir los event listeners
    if (menuToggle && mobileMenu) {
        // Añadir un event listener al botón de alternar el menú
        menuToggle.addEventListener('click', function() {
            // Alternar la clase 'open' en el menú móvil
            mobileMenu.classList.toggle('open');
        });

        // Opcional: Cerrar el menú móvil cuando se hace clic en un enlace del menú
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
            });
        });
    } else {
        console.error('Error: No se encontraron los elementos del menú o el botón de alternar. Asegúrate de que los IDs "menu-toggle" y "mobile-menu" sean correctos en tu HTML.');
    }

    // Funcionalidad para las animaciones de aparición al hacer scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // El elemento es visible en un 10%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
                observer.unobserve(entry.target); // Dejar de observar una vez que la animación se ha activado
            }
        });
    }, options);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});

