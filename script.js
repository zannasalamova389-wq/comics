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
const comicPage = document.querySelector('.comic-page');

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
    
    // Сбрасываем зум при перелистывании
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

// 4. Свайпы
let touchStartX = 0;
let touchEndX = 0;

comicPage.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

comicPage.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  if (touchEndX < touchStartX - 50) { // Свайп влево
    if (currentIndex < comicData.length - 1) { currentIndex++; updateImage(); }
  }
  if (touchEndX > touchStartX + 50) { // Свайп вправо
    if (currentIndex > 0) { currentIndex--; updateImage(); }
  }
}

// 5. Увеличение по клику (вызывается из HTML)
window.toggleZoom = function(img) {
  img.classList.toggle('zoomed');
};

// Запуск
updateImage();