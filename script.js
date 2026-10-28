const baseNames = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", 
  "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", 
  "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg", 
  "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg"
];

let currentIndex = 0;
let currentZoom = 1;

const comicImage = document.getElementById('comicImage');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const comicPage = document.getElementById('comicPage');

// Функция загрузки картинки с проверкой путей
function updateImage() {
  comicImage.style.opacity = 0;
  currentZoom = 1;
  applyZoom();

  setTimeout(() => {
    const fileName = baseNames[currentIndex];
    // Пробуем сначала загрузить из папки images, если нет - из корня
    // Если ваши файлы лежат в корне, можно сразу написать: comicImage.src = fileName;
    comicImage.src = "images/" + fileName; 
    
    comicImage.onerror = function() {
      // Если не нашлось в папке images, пробуем в корне
      comicImage.src = fileName;
      comicImage.onerror = function() {
        // Если и в корне нет, показываем заглушку
        comicImage.src = "https://via.placeholder.com/400x300/333/fff?text=Картинка+не+найдена";
      };
    };

    counter.textContent = (currentIndex + 1) + ' / ' + baseNames.length;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === baseNames.length - 1;

    comicImage.style.opacity = 1;
  }, 150);
}

function applyZoom() {
  comicImage.style.transform = `scale(${currentZoom})`;
  zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
}

zoomInBtn.addEventListener('click', () => {
  if (currentZoom < 3) { currentZoom += 0.25; applyZoom(); }
});

zoomOutBtn.addEventListener('click', () => {
  if (currentZoom > 0.5) { currentZoom -= 0.25; applyZoom(); }
});

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    comicPage.requestFullscreen().catch(err => alert("Ошибка: " + err.message));
  } else {
    document.exitFullscreen();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateImage(); }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < baseNames.length - 1) { currentIndex++; updateImage(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
  else if (e.key === 'ArrowRight' && currentIndex < baseNames.length - 1) { currentIndex++; updateImage(); }
});

// Запуск
updateImage();