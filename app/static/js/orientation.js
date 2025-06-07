export function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  const content = document.getElementById("main-content");

  if (window.innerWidth > window.innerHeight) {
    warning.style.display = "flex";
    content.style.display = "none";
    
  } else {
    warning.style.display = "none";
    content.style.display = "block";
  }
}

export function initOrientationCheck() {
  window.addEventListener("resize", checkOrientation);

  window.addEventListener("orientationchange", () => {
    const runtime = (typeof browser !== 'undefined' && browser.runtime) ? browser.runtime
                 : (typeof chrome !== 'undefined' && chrome.runtime) ? chrome.runtime
                 : null;

    if (runtime && typeof runtime.sendMessage === 'function') {
      runtime.sendMessage({ event: 'orientation_changed' });
    
    } else {
      console.warn('Orientation Changed');
    }
  });

  window.addEventListener("load", checkOrientation);
}