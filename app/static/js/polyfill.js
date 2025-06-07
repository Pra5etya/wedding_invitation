// Cek apakah objek `browser` tidak tersedia (misalnya di Chrome)
if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
  // Buat alias `browser` dari `chrome`, dan tambahkan Promise wrapper untuk metode callback-style
  window.browser = (() => {
    const api = {};

    // Bungkus semua metode `chrome` dengan Promise jika perlu
    const wrapAsync = (func, context) => (...args) =>
      new Promise((resolve, reject) => {
        try {
          func.call(context, ...args, (result) => {
            const err = chrome.runtime.lastError;
            if (err) reject(err);
            else resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      });

    for (const key in chrome) {
      if (typeof chrome[key] === 'object' && chrome[key] !== null) {
        api[key] = {};

        for (const method in chrome[key]) {
          const fn = chrome[key][method];

          if (typeof fn === 'function') {
            api[key][method] = wrapAsync(fn, chrome[key]);
          } else {
            api[key][method] = fn;
          }
        }
      } else {
        api[key] = chrome[key];
      }
    }

    return api;
  })();
}