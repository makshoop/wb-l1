/**
* Функция рендерит элемент на основе указанного template и добавляет его в указанный контейнер.
* @param {string} template - Селектор template, из которого будет клонирован элемент.
* @param {HTMLElement} container - Контейнер, в который будет добавлен клонированный элемент.
*/
function renderElement(template, container) {
    // Находим и клонируем template
    const elementTemplate = document.querySelector(template).content.cloneNode(true);

    // Находим элемент для текста внутри клонированного шаблона
    const textElement = elementTemplate.querySelector('.page-text');

    // Добавляем текст или другие данные элементу
    textElement.textContent = 'Some element';

    // Добавляем элемент внутрь container
    container.append(elementTemplate);
}

const container = document.querySelector('.page');
renderElement('#new-element', container); // Вызываем функцию для рендера элемента в указанный контейнер
