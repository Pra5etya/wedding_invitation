// loading.js
export function initLazyBackgrounds() {
  const lazySections = document.querySelectorAll(".lazy-bg");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const bgUrl = section.getAttribute("data-bg");
        section.style.backgroundImage = `url('${bgUrl}')`;
        observer.unobserve(section);
      }
    });
  });

  lazySections.forEach(section => observer.observe(section));
}
