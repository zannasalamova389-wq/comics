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

et currentIndex = 0;
let currentZoom = 100;

const comicImage = document.getElementById('comicImage');
const comicTitle = document.getElementById('comicTitle');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');

// 1. Перелистывание
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

// 2. Зум
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
  if (currentZoom < 250) { currentZoom += 25; updateZoom(); }
});

zoomOutBtn.addEventListener('click', () => {
  if (currentZoom > 100) { currentZoom -= 25; updateZoom(); }
});

window.toggleZoom = function(img) {
  currentZoom = (currentZoom === 100) ? 200 : 100;
  updateZoom();
};

// 3. Кнопки
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateImage(); }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 4. Клавиатура
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
  if (e.key === 'ArrowRight' && currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
});

// 5. УЛУЧШЕННЫЕ СВАЙПЫ (Работают везде, включая зум)
let startX = 0;
let startY = 0;

// Слушаем начало касания на всем экране
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: false }); // passive: false позволяет нам блокировать стандартные жесты

// Слушаем конец касания на всем экране
document.addEventListener('touchend', (e) => {
  if (!startX || !startY) return;

  let endX = e.changedTouches[0].clientX;
  let endY = e.changedTouches[0].clientY;

  let diffX = endX - startX;
  let diffY = endY - startY;

  // Если свайп был четко горизонтальным (больше 50px) и коротким по вертикали
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50 && Math.abs(diffY) < 80) {
    
    // Если картинка увеличена, свайп не перелистывает, а просто сбрасывает зум (по желанию можно убрать)
    if (currentZoom > 100) {
      resetZoom(); 
      return;
    }

    if (diffX < 0) {
      // Влево -> Вперед
      if (currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
    } else {
      // Вправо -> Назад
      if (currentIndex > 0) { currentIndex--; updateImage(); }
    }
  }

  // Сбрасываем координаты
  startX = 0;
  startY = 0;
}, { passive: true });

// Запуск
updateImage();