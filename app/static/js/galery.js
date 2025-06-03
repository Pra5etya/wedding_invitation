// Caorusel Sections
// =================
let currentIndex = 1; // Start from the first real image
let startX = 0;
let intervalId;

function moveToIndex(index, useTransition = true) {
  const carousel = document.getElementById("carouselImages");
  if (useTransition) {
    carousel.style.transition = "transform 3s ease-in-out";
  } else {
    carousel.style.transition = "none";
  }
  carousel.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

function moveSlide(direction) {
  moveToIndex(currentIndex + direction);
}

export function initGalleryCarousel() {
  const carousel = document.getElementById("carouselImages");
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");

  // Duplicate first and last slides
  const slides = [...carousel.children];
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, slides[0]);

  const totalSlides = carousel.children.length;

  // Set initial position
  requestAnimationFrame(() => {
    moveToIndex(1, false);
  });

  prevBtn?.addEventListener("click", () => {
    moveSlide(-1);
    resetAutoSlide();
  });

  nextBtn?.addEventListener("click", () => {
    moveSlide(1);
    resetAutoSlide();
  });

  carousel.addEventListener("transitionend", () => {
    if (currentIndex === totalSlides - 1) {
      // Reached the duplicate of first slide
      moveToIndex(1, false);
    } else if (currentIndex === 0) {
      // Reached the duplicate of last slide
      moveToIndex(totalSlides - 2, false);
    }
  });

  // Auto slide
  function startAutoSlide() {
    intervalId = setInterval(() => {
      moveSlide(1);
    }, 6000);
  }

  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }

  startAutoSlide();

  // Touch gestures
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50) {
      moveSlide(-1);
      resetAutoSlide();
    } else if (diff < -50) {
      moveSlide(1);
      resetAutoSlide();
    }
  });
}



// Full Image
// ===========
function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

export function initImageModal() {
  const allImages = document.querySelectorAll(".carousel-images img, .gallery-container img");
  allImages.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openModal(img.src));
  });

  // Close when clicking outside the image
  const modal = document.getElementById("imageModal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close when clicking the × icon
  const closeBtn = modal.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);
}
