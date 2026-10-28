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
let isAnimating = false; // Защита от быстрых нажатий

const comicImage = document.getElementById('comicImage');
const comicTitle = document.getElementById('comicTitle');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');

function updateImage(direction = 'next') {
  if (isAnimating) return; // Если анимация идет, игнорируем клики
  isAnimating = true;

  // 1. Очищаем все старые классы
  comicImage.className = '';

  // 2. Запускаем анимацию УХОДА
  if (direction === 'next') {
    comicImage.classList.add('slide-out-left');
  } else {
    comicImage.classList.add('slide-out-right');
  }

  // 3. Ждем 200 мс (пока картинка уезжает)
  setTimeout(() => {
    // Меняем картинку и текст
    comicImage.src = comicData[currentIndex].file;
    comicTitle.textContent = comicData[currentIndex].title;
    counter.textContent = (currentIndex + 1) + ' / ' + comicData.length;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === comicData.length - 1;
    resetZoom();

    // Убираем класс ухода
    comicImage.classList.remove('slide-out-left', 'slide-out-right');
    
    // МАЛЕНЬКАЯ ПАУЗА (10 мс), чтобы телефон "увидел", что картинка новая
    setTimeout(() => {
      // 4. Запускаем анимацию ПРИХОДА
      if (direction === 'next') {
        comicImage.classList.add('slide-in-right');
      } else {
        comicImage.classList.add('slide-in-left');
      }

      // 5. Ждем окончания прихода (200 мс) и снимаем блокировку
      setTimeout(() => {
        comicImage.classList.remove('slide-in-left', 'slide-in-right');
        isAnimating = false;
      }, 200);

    }, 10);

  }, 200);
}

// --- ЗУМ ---
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

// --- КНОПКИ НАВИГАЦИИ ---
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { 
    currentIndex--; 
    updateImage('prev'); 
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < comicData.length - 1) { 
    currentIndex++; 
    updateImage('next'); 
  }
});

// --- КЛАВИАТУРА ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage('prev'); }
  if (e.key === 'ArrowRight' && currentIndex < comicData.length - 1) { currentIndex++; updateImage('next'); }
});

// Запуск
comicImage.src = comicData[currentIndex].file;
comicTitle.textContent = comicData[currentIndex].title;
counter.textContent = (currentIndex + 1) + ' / ' + comicData.length;
updateZoom();