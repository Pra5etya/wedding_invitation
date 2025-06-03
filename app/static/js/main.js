import { initOrientationCheck } from './orientation.js';
import { initCover } from './cover.js';
import { initCountdown } from './counting.js';
import { initGalleryCarousel, initImageModal } from './galery.js';

console.log('Run Orientation Scripts...')
initOrientationCheck();

console.log('Run Cover Scripts...')
// initCover();

console.log('Run Countdown Scripts...');
initCountdown();

console.log('Run Galery Scripts...')
document.addEventListener("DOMContentLoaded", () => {
  initGalleryCarousel();
  initImageModal();
});