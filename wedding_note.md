* CP Pria -> 1170 x 1556
* CP Wanita -> 2019 x 3035





# CSS
```css
    height: calc(var(--vh, 1vh) * 100); /* Fallback untuk browser lama */
```

# JS
```js
<script>
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Jalankan saat halaman dimuat & resize
    window.addEventListener('load', setVH);
    window.addEventListener('resize', setVH);
</script>
```