let hasInteracted = false;

// Unlock SCroll
function unlockScroll() {
  document.body.classList.remove('lock-scroll');
}

// Smooth Scrolling
function smoothScrollToElement(targetId, duration) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;

  const distance = targetPosition - startPosition;

  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;

    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

function playMusic() {
  const audio = document.getElementById('lagu');

  if (audio) {
    audio.play().catch(error => {
      console.error('Gagal memutar audio:', error);
    });
  }
}

function handleInvitation() {
  if (hasInteracted) return;
  hasInteracted = true;

  unlockScroll();
  smoothScrollToElement('opening_section', 2000);

  // Play Music
  playMusic()
}

export function initCover() {
  document.addEventListener('DOMContentLoaded', () => {
    const tombol = document.getElementById('play-button');

    if (tombol) {
      tombol.addEventListener('click', handleInvitation);  
    } 
    
    else {
      console.warn('Elemen #play-button tidak ditemukan.');
    }
  });
}
