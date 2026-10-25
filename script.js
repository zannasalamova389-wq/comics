// Список картинок
const comicPages = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg",
  "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"
];

let currentIndex = 0;
let currentZoom = 1; // 1 = 100%
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;

// Элементы
const comicImage = document.getElementById('comicImage');
const viewport = document.getElementById('viewport');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');

// 1. Смена картинок
function updateImage() {
  comicImage.style.opacity = 0;
  
  setTimeout(() => {
    comicImage.src = 'images/' + comicPages[currentIndex];
    counter.textContent = (currentIndex + 1) + ' / ' + comicPages.length;
    
    // Сбрасываем зум при смене картинки
    resetZoom();

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === comicPages.length - 1;
    
    comicImage.style.opacity = 1;
  }, 150);
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < comicPages.length - 1) {
    currentIndex++;
    updateImage();
  }
});

// 2. Логика увеличения (Зум)
function applyTransform() {
  comicImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
}

function zoomIn() {
  if (currentZoom < 3) { // Максимальное увеличение 300%
    currentZoom += 0.5;
    applyTransform();
  }
}

function zoomOut() {
  if (currentZoom > 1) { // Минимальный зум 100% (не меньше)
    currentZoom -= 0.5;
    if (currentZoom === 1) {
      translateX = 0;
      translateY = 0;
    }
    applyTransform();
  }
}

function resetZoom() {
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);

// 3. Логика перетаскивания (Drag) для увеличенной картинки
viewport.addEventListener('mousedown', (e) => {
  if (currentZoom > 1) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
});

viewport.addEventListener('mousemove', (e) => {
  if (isDragging) {
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
  }
});

viewport.addEventListener('mouseup', () => { isDragging = false; });
viewport.addEventListener('mouseleave', () => { isDragging = false; });

// Для сенсорных экранов (телефоны)
viewport.addEventListener('touchstart', (e) => {
  if (currentZoom > 1) {
    isDragging = true;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  }
}, { passive: true });

viewport.addEventListener('touchmove', (e) => {
  if (isDragging) {
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    applyTransform();
  }
}, { passive: true });

viewport.addEventListener('touchend', () => { isDragging = false; });

// Запуск
updateImage();