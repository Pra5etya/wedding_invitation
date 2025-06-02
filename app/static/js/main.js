import { initOrientationCheck } from './orientation.js';
import { initCover } from './cover.js';
import { initCountdown } from './counting.js';

console.log('Run Orientation Scripts...')
initOrientationCheck();

console.log('Run Cover Scripts...')
// initCover();

console.log('Run Countdown Scripts...');
initCountdown();