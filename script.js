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
let currentZoom = 100;

const comicImage = document.getElementById('comicImage');
const comicTitle = document.getElementById('comicTitle');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');
const comicPage = document.querySelector('.comic-page'); // Берем контейнер картинки

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
    
    resetZoom();
  }, 150); 
}

// 2. Логика кнопок масштаба
function updateZoom() {
  if (currentZoom === 100) {
    comicImage.classList.remove('zoomed');
    comicImage.style.transform = 'scale(1)';
  } else {
    comicImage.classList.add('zoomed');
    comicImage.style.transform = `scale(${currentZoom / 100})`;
  }
  zoomLevel.textContent = currentZoom + '%';
}

function resetZoom() {
  currentZoom = 100;
  updateZoom();
}

zoomInBtn.addEventListener('click', () => {
  if (currentZoom < 250) {
    currentZoom += 25;
    updateZoom();
  }
});

zoomOutBtn.addEventListener('click', () => {
  if (currentZoom > 100) {
    currentZoom -= 25;
    updateZoom();
  }
});

// 3. Увеличение по клику
window.toggleZoom = function(img) {
  if (currentZoom === 100) {
    currentZoom = 200;
  } else {
    currentZoom = 100;
  }
  updateZoom();
};

// 4. Кнопки навигации
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateImage(); }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 5. Клавиатура
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
  if (e.key === 'ArrowRight' && currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 6. СВАЙПЫ (Обновленная логика)
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Добавляем обработчики прямо на контейнер с картинкой
comicPage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

comicPage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  
  // Вычисляем разницу
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  // Если свайп сделан при увеличенной картинке, ничего не делаем
  if (currentZoom > 100) return;

  // Проверяем, что движение было больше по горизонтали, чем по вертикали,
  // и что это не был случайный клик (длина больше 40px)
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    
    if (diffX < 0) {
      // Свайп влево (палец двигался справа налево) -> Следующая страница
      if (currentIndex < comicData.length - 1) {
        currentIndex++;
        updateImage();
      }
    } else {
      // Свайп вправо (палец двигался слева направо) -> Предыдущая страница
      if (currentIndex > 0) {
        currentIndex--;
        updateImage();
      }
    }
  }
}, { passive: true });

// Запуск
updateImage();