/*
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("enableScrollBtn");
  const overlay = document.getElementById("overlay");

  btn.addEventListener("click", () => {
    document.body.style.overflow = "auto"; // Aktifkan scroll
    overlay.style.display = "none";        // Sembunyikan overlay
  });
});
*/

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("enableScrollBtn");

  btn.addEventListener("click", () => {
    // Aktifkan scroll
    document.body.style.overflow = "auto";

    // Sembunyikan tombol
    btn.style.display = "none";
  });
});
