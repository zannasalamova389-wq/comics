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

// 5. «ЯДЕРНЫЕ» СВАЙПЫ
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

// Создаем визуальный индикатор для отладки (маленький кружок)
const debugDot = document.createElement('div');
debugDot.style.cssText = 'position:fixed; width:10px; height:10px; background:red; border-radius:50%; pointer-events:none; z-index:9999; display:none;';
document.body.appendChild(debugDot);

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved = false;
  
  // Показываем красную точку там, где коснулись
  debugDot.style.left = touchStartX + 'px';
  debugDot.style.top = touchStartY + 'px';
  debugDot.style.display = 'block';
}

function handleTouchMove(e) {
  touchMoved = true;
}

function handleTouchEnd(e) {
  debugDot.style.display = 'none';
  
  // Если палец не двигался (это был клик), выходим
  if (!touchMoved) return;

  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;

  let diffX = touchEndX - touchStartX;
  let diffY = touchEndY - touchStartY;

  // Если свайп был четко горизонтальным (больше 40px) и не слишком вертикальным
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40 && Math.abs(diffY) < 100) {
    
    // Если картинка увеличена, свайп просто сбрасывает зум
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
}

// Вешаем события на весь документ
document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchmove', handleTouchMove, { passive: true });
document.addEventListener('touchend', handleTouchEnd, { passive: true });

// Запуск
updateImage();