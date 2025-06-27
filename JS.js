// JavaScript para el menú hamburguesa
// Selecciona el botón de alternar el menú (hamburguesa)
document.getElementById('menu-toggle').addEventListener('click', function() {
    // Selecciona el elemento del menú móvil
    const mobileMenu = document.getElementById('mobile-menu');
    // Alterna la clase 'mobile-menu-open' para mostrar/ocultar el menú
    mobileMenu.classList.toggle('mobile-menu-open');
});

// Cerrar el menú móvil al hacer clic en un enlace
// Selecciona todos los enlaces dentro del menú móvil
document.querySelectorAll('#mobile-menu a').forEach(item => {
    // Añade un 'event listener' a cada enlace
    item.addEventListener('click', () => {
        // Cuando se hace clic en un enlace, elimina la clase 'mobile-menu-open' para cerrar el menú
        document.getElementById('mobile-menu').classList.remove('mobile-menu-open');
    });
});

// JavaScript para animaciones de entrada (fade-in)
// Define las opciones para el Intersection Observer
const observerOptions = {
    // El 'threshold' define cuánto del elemento debe ser visible para que el callback se ejecute.
    // 0.1 significa que el 10% del elemento debe estar visible.
    threshold: 0.1
};

// Crea una nueva instancia de Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    // Itera sobre cada 'entry' (elemento observado)
    entries.forEach(entry => {
        // Si el elemento está intersectando (visible en el viewport)
        if (entry.isIntersecting) {
            // Solo añade la clase de activación si no la tiene ya
            if (!entry.target.classList.contains('fade-in-active')) {
                entry.target.classList.add('fade-in-active');
            }
        } else {
            // Si el elemento sale de la vista, quita la clase de activación
            // Esto permite que la animación se re-ejecute la próxima vez que entre en la vista
            entry.target.classList.remove('fade-in-active');
        }
    });
}, observerOptions);

// Observar todas las secciones y elementos con la clase 'fade-in'
// Itera sobre todos los elementos que tienen la clase 'fade-in'
document.querySelectorAll('.fade-in').forEach(element => {
    // Pide al observer que observe este elemento
    observer.observe(element);
});

// JavaScript para scroll suave
// Selecciona todos los enlaces de anclaje (que comienzan con #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Añade un 'event listener' a cada enlace
    anchor.addEventListener('click', function (e) {
        // Evita el comportamiento predeterminado del enlace (salto instantáneo)
        e.preventDefault();

        // Obtiene el elemento al que se debe desplazar
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Si el elemento existe, desplázate suavemente hacia él
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // Habilita el scroll suave
            });
        }
    });
});