// Browser Scripts
// import './polyfill.js';

// Web Scripts
import { initOrientationCheck } from './orientation.js';
import { initCover } from './cover.js';
import { initLazyBackgrounds } from './loading.js';
import { initScrollObserver } from './scroll.js';
import { initCountdown } from './counting.js';
import { initGalleryCarousel, initImageModal } from './galery.js';

console.log('Run Orientation Scripts...')
initOrientationCheck();

console.log('Run Cover Scripts...')
initCover();

console.log('Run Bg Scripts...')
initLazyBackgrounds();

console.log('Run Scroll Observer Script...');
initScrollObserver();

console.log('Run Countdown Scripts...');
initCountdown();

console.log('Run Galery Scripts...')
// document.addEventListener("DOMContentLoaded", () => {
initGalleryCarousel();
initImageModal();
// });