const gallery = document.querySelector('.gallery-grid');

// Mockup: Replace this with a real API or file fetch
const media = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg'
];

media.forEach(media => {
    const img = document.createElement('img');
    img.src = media;
    gallery.appendChild(img);
});