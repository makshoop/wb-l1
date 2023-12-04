/**
* Функция для создания и добавления нового HTML-элемента в контейнер
* @param {string} tag - Тип создаваемого HTML-элемента
* @param {string} className - Классы, которые добавляются новому элементу
* @param {HTMLElement} container - Родительский HTML-элемент, куда добавляется новый элемент
* @param {string} content - Текстовое содержимое нового элемента
*/
function addElement(tag, className, container, content) {
    const element = document.createElement(tag); // Создаем новый HTML-элемент
    element.classList.add(className); // Добавляем указанные классы

    element.textContent = content; // Задаем текстовое содержимое

    container.appendChild(element); // Добавляем элемент в указанный контейнер
}

const containerElement = document.querySelector('.page'); // Находим контейнер, куда будем добавлять элемент
const newElement = addElement('div', 'page-container', containerElement, 'New element'); // Создаем и добавляем новый элемент
