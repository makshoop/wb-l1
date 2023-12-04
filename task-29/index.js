const form = document.querySelector('.page-form');
const inputs = form.querySelectorAll('.user-input');
const container = document.querySelector('.popup-data');
const closeBtn = document.querySelector('.popup-close-btn');
const popup = document.querySelector('.popup');

let formData = {};

/**
* Рендерит элементы в модальное окно на основе переданного template и данных из formData.
* @param {string} template - Селектор template, из которого будет клонирован элемент.
* @param {HTMLElement} container - Контейнер, в который будут добавлены клонированные элементы.
*/
function renderElements(template, container) {
    // Очищаем контейнер от ранее добавленных элементов
    container.innerHTML = '';

    // Добавляем текст или другие данные элементам
    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
        // Находим и клонируем template
        const elementTemplate = document.querySelector(template).content.cloneNode(true);

        // Находим элементы для отображения поля и значения
        const fieldNameElement = elementTemplate.querySelector('.popup-field-name');
        const fieldValueElement = elementTemplate.querySelector('.popup-field-value');

        // Заполняем элементы данными
        fieldNameElement.textContent = fieldName;
        fieldValueElement.textContent = fieldValue;

        // Добавляем элемент внутрь container
        container.append(elementTemplate);
    });
}

/**
* Очищает форму и модальное окно от ранее введенных данных.
*/
function clearForm() {
    // Очищаем форму
    inputs.forEach((input) => {
        input.value = '';
        input.labels[0].classList.remove('user-label-filled');
    });

    // Очищаем модальное окно от ранее добавленных значений формы
    const savedElements = document.querySelectorAll('.popup-data-saved');
    savedElements.forEach((element) => {
        element.remove();
    });

    formData = {};
}

// Обработка ввода данных в форму
inputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.value !== '') {
            input.labels[0].classList.add('user-label-filled');
            formData[input.name] = input.value;
        }
    });
});

// Отправка формы
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
        // Открыть модальное окно
        popup.classList.add('popup-active');
        // Отрисовать данные формы в модальном окне
        renderElements('#input-data', container);
    }
});

// Закрытие модального окна по клику по оверлею
popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
        popup.classList.remove('popup-active');
        // Очистить форму
        clearForm();
    }
});

// Закрытие модального окна по клику по кнопке
closeBtn.addEventListener('click', () => {
  popup.classList.remove('popup-active');
  // Очистить форму
  clearForm();
});
