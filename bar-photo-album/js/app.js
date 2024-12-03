const gallery = document.querySelector('.gallery-grid');

// Mockup: Replace this with a real API or file fetch
const photos = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg'
];

photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo;
    gallery.appendChild(img);
});