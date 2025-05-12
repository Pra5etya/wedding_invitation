document.addEventListener('DOMContentLoaded', function() {
    const tombol = document.getElementById('play-button');
    const audio = document.getElementById('lagu');

    tombol.addEventListener('click', () => {
        audio.play().catch(error => {
            console.error('Gagal memutar audio:', error);
        });
    });
});
