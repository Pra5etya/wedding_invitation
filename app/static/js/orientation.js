// Check Orientation
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

// Inititalize Orientation
export function initOrientationCheck() {
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("load", checkOrientation);
}
