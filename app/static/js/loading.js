// Utility untuk cek apakah elemen sudah di viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initialize Background Image
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

  // Jalankan observer dan cek langsung jika sudah terlihat
  lazySections.forEach(section => {
    observer.observe(section);

    // ⬇️ Tambahan: Jika elemen sudah terlihat di layar saat load
    if (isElementInViewport(section)) {
      const bgUrl = section.getAttribute("data-bg");
      section.style.backgroundImage = `url('${bgUrl}')`;
      observer.unobserve(section);
    }
  });
}