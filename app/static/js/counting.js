// counting.js
const weddingDate = new Date("2025-06-19T00:00:00+07:00").getTime();

function countdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const countdownEl = document.getElementById("countdown");

  if (distance < 0) {
    if (countdownEl) countdownEl.innerHTML = "<p>🎉 Acara sudah dimulai! 🎉</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (countdownEl) {
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
  }
}

function simpanKeKalender() {
  const title = encodeURIComponent("Undangan Raka & Nurul");
  const location = encodeURIComponent("Museum Wayang Kekayon, Bantul");
  const mapsLink = "https://maps.app.goo.gl/FGvqu6ANUmMzYw7P9";
  const details = encodeURIComponent(
    "Yuk datang ke acara pernikahan kami!\n📍 Lokasi: " + mapsLink + "\n\nSampai jumpa!"
  );

  const startDateUTC = "20250619T050000Z";
  const endDateUTC = "20250619T070000Z";

  const url = `https://www.google.com/calendar/render?action=TEMPLATE`
            + `&text=${title}`
            + `&dates=${startDateUTC}/${endDateUTC}`
            + `&location=${location}`
            + `&details=${details}`
            + `&sf=true&output=xml`;

  window.open(url, "_blank");
}

// Auto-start countdown
export function initCountdown() {
  setInterval(countdown, 1000);
  countdown();
  window.simpanKeKalender = simpanKeKalender; // expose to inline onclick
}