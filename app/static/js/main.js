// import file
import './audio.js';
import './lock.js';
import { initOrientationCheck, checkOrientation } from './orientation.js';

console.log("Main.js loaded");

console.log('Running orientation scripts')
initOrientationCheck();
checkOrientation();