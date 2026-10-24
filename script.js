var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var currentScale = 1; // Текущий масштаб
var isDragging = false;
var startX, startY, scrollLeft, scrollTop;
var imgContainer = document.querySelector('.img-container');

// Функция открытия окна
function openModal(element) {
    modal.style.display = "block";
    var imgSrc = element.querySelector('img').src;
    modalImg.src = imgSrc;
    resetZoom(); // Сбрасываем масштаб при открытии новой картинки
}

// Функция закрытия окна
function closeModal() {
    modal.style.display = "none";
    resetZoom();
}

// Функция увеличения
function zoomIn() {
    if (currentScale < 4) { // Максимальное увеличение (4x)
        currentScale += 0.5;
        updateScale();
    }
}

// Функция уменьшения
function zoomOut() {
    if (currentScale > 0.5) { // Минимальное уменьшение
        currentScale -= 0.5;
        updateScale();
    }
}

// Функция сброса масштаба
function resetZoom() {
    currentScale = 1;
    updateScale();
    // Возвращаем прокрутку в центр
    imgContainer.scrollLeft = 0;
    imgContainer.scrollTop = 0;
}

// Применение масштаба к картинке
function updateScale() {
    modalImg.style.transform = `scale(${currentScale})`;
}

// Закрытие по клику вне картинки (на черном фоне)
window.onclick = function(event) {
    if (event.target == modal || event.target == imgContainer) {
        closeModal();
    }
}

// --- Логика перетаскивания (для удобства, когда картинка увеличена) ---
imgContainer.addEventListener('mousedown', (e) => {
    if (currentScale > 1) {
        isDragging = true;
        startX = e.pageX - imgContainer.offsetLeft;
        startY = e.pageY - imgContainer.offsetTop;
        scrollLeft = imgContainer.scrollLeft;
        scrollTop = imgContainer.scrollTop;
    }
});

imgContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

imgContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

imgContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - imgContainer.offsetLeft;
    const y = e.pageY - imgContainer.offsetTop;
    const walkX = (x - startX) * 2; // Скорость прокрутки
    const walkY = (y - startY) * 2;
    imgContainer.scrollLeft = scrollLeft - walkX;
    imgContainer.scrollTop = scrollTop - walkY;
});