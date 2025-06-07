export function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // hanya animasi sekali
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-scroll').forEach(el => {
        observer.observe(el);
    });
}
