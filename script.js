// Массив с названиями и путями к картинкам
const comicData = [
  { file: "images/img1.jpg", title: "Дейзи Дак — её портрет" },
  { file: "images/img2.jpg", title: "Микки Маус: Продажа квартиры" },
  { file: "images/img3.jpg", title: "Микки и Минни на рыбалке" },
  { file: "images/img4.jpg", title: "Микки, Минни и Гуфи" },
  { file: "images/img5.jpg", title: "Том и Джерри: Книга о кошках" },
  { file: "images/img6.jpg", title: "Том и Джерри: День рождения" },
  { file: "images/img7.jpg", title: "Том и Джерри: Хэллоуин" },
  { file: "images/img8.jpg", title: "Том и Джерри и тыква" },
  { file: "images/img9.jpg", title: "Том и Джерри: Клубника зимой" },
  { file: "images/img10.jpg", title: "Том и Джерри: Силач" },
  { file: "images/img11.jpg", title: "Том и Джерри: День Вашингтона" },
  { file: "images/img12.jpg", title: "Том и Джерри: Мыши-помощники" },
  { file: "images/img13.jpg", title: "Минни Маус: Пропавшая сумка" },
  { file: "images/img14.jpg", title: "Главный герой: Микки" },
  { file: "images/img15.jpg", title: "Микки и Минни: День святого Валентина" },
  { file: "images/img16.jpg", title: "Микки и Минни: Годовщина" },
  { file: "images/img17.jpg", title: "Минни Маус: Дух странствий" },
  { file: "images/img18.jpg", title: "Дональд Дак и курочки" }
];

let currentIndex = 0;

const comicImage = document.getElementById('comicImage');
const comicTitle = document.getElementById('comicTitle');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 1. Функция перелистывания
function updateImage() {
  comicImage.style.opacity = 0;
  comicTitle.style.opacity = 0;

  setTimeout(() => {
    comicImage.src = comicData[currentIndex].file;
    comicTitle.textContent = comicData[currentIndex].title;
    counter.textContent = (currentIndex + 1) + ' / ' + comicData.length;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === comicData.length - 1;

    comicImage.style.opacity = 1;
    comicTitle.style.opacity = 1;
    
    comicImage.classList.remove('zoomed');
  }, 150); 
}

// 2. Кнопки
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateImage(); }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 3. Клавиатура
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
  if (e.key === 'ArrowRight' && currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 4. УЛУЧШЕННЫЕ СВАЙПЫ (Работают по всему экрану)
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Отслеживаем начало касания на всем документе
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

// Отслеживаем конец касания на всем документе
document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThresholdX = 40; // Минимальная длина свайпа по горизонтали
  const swipeThresholdY = 60; // Максимальная длина свайпа по вертикали (чтобы не мешать скроллу, если он есть)

  // Проверяем, что свайп был горизонтальным (а не вертикальным движением пальца)
  if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY) && Math.abs(touchEndY) < swipeThresholdY) {
    
    // Свайп влево -> Вперед
    if (touchEndX < touchStartX - swipeThresholdX) {
      if (currentIndex < comicData.length - 1) {
        currentIndex++;
        updateImage();
      }
    }
    // Свайп вправо -> Назад
    else if (touchEndX > touchStartX + swipeThresholdX) {
      if (currentIndex > 0) {
        currentIndex--;
        updateImage();
      }
    }
  }
}

// 5. Увеличение по клику
window.toggleZoom = function(img) {
  img.classList.toggle('zoomed');
};

// Запуск
updateImage();