/**
* Функция добавляет анимацию для элемента с использованием CSS-стилей.
* @param {HTMLElement} element - Элемент, к которому применяется анимация.
*/
function addAnimationStyle(element) {
    element.style.transition = 'transform 0.1s ease-in-out'; // Добавляем transition для плавного изменения transform
    element.style.transform = 'translateY(50%)'; // Устанавливаем начальное положение смещения по вертикали

    // Устанавливаем новое положение смещения через таймаут для создания эффекта анимации при обновлении страницы
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
    }, 100);
}

const element = document.querySelector('.page-container');
addAnimationStyle(element); // Вызываем функцию для применения анимации к элементу
