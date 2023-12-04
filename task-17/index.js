// API-ключ для доступа к геокодеру (в реальном проекте следует хранить на сервере)
const apiKey = '44a18405-acd9-4638-ad9e-0d4d165b6dc5';

// Элементы DOM
const inputElement = document.querySelector('.page-input');
const spinnerElement = document.querySelector('.page-spinner');
const addressContainer = document.querySelector('.page-address-box');

// Идентификатор для отложенного вызова функции при вводе
let timeoutId;

// Функция для получения геокодинга через API Яндекс Геокодер
async function fetchData(address) {
  try {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Возникла ошибка при запросе');
    }
  } catch (err) {
    return err;
  }
}

// Функция для рендера полученных адресов
async function renderAddresses(string) {
  // Запускаем функцию только, если строка не пустая
  if (string.length > 0) {
    try {
      // Вызываем функцию получения адресов через API
      const data = await fetchData(string);
      const addressArray = data?.response?.GeoObjectCollection?.featureMember;

      // Рендерим адреса
      addressArray.forEach((i) => {
        const city = i?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components.find(el => el.kind === 'locality')?.name;
        const element = generateAddress(i.GeoObject.name, !city ? '' : city);
        addressContainer.append(element);
      });
    } catch (error) {
      console.error(error);
    } finally {
      // Скрываем спиннер после выполнения запроса
      spinnerElement.classList.remove('page-spinner_active');
    }
  } else {
    // Скрываем спиннер, если строка пустая
    spinnerElement.classList.remove('page-spinner_active');
  }
}

// Генерация данных для нового адреса
function generateAddress(addressData, cityData) {
  const addressElement = getTemplate('#address');
  const liElement = addressElement.querySelector('.page-address');
  let fullAddress = addressElement.querySelector('.page-address-value');
  let city = addressElement.querySelector('.page-address-city');

  fullAddress.textContent = addressData;
  city.textContent = cityData;

  const selectedAddress = `${addressData}${cityData && `, ${cityData}`}`;
  setEventListener(liElement, selectedAddress);

  return addressElement;
}

// Получение HTML-шаблона из тега <template>
function getTemplate(template) {
  const cardElement = document
    .querySelector(template)
    .content
    .cloneNode(true);
  return cardElement;
}

// Функция для удаления списка адресов
function removeList() {
  const liElements = document.querySelectorAll('.page-address');
  liElements.forEach((li) => addressContainer.removeChild(li));
}

// Установка слушателя клика по адресу
function setEventListener(element, address) {
  element.addEventListener('click', () => {
    // Добавляем выбранный адрес в строку поиска
    inputElement.value = address;
    // Удаляем все адреса из списка
    removeList();
  });
}

// Функция для реализации троттлинга (ограничение частоты вызова функции)
function throttle(func, delay) {
  let lastExecutionTime = 0;  // Время последнего выполнения функции
  let timeoutId;

  return function (...args) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecutionTime;  // Время с момента последнего выполнения функции

    // Если прошедшее время больше или равно задержке (delay),
    // вызываем функцию.
    if (elapsedTime >= delay) {
      func(...args);
      lastExecutionTime = currentTime;
    } else {
      // Иначе отменяем предыдущий таймаут
      clearTimeout(timeoutId);
      // Устанавливаем новый таймаут для вызова функции
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecutionTime = Date.now();
      }, delay - elapsedTime);
    }
  };
}

// Функция, обертывающая renderAddresses для применения троттлинга
const renderAddressesThrottled = throttle(renderAddresses, 100);

// Обработка события ввода адреса
inputElement.addEventListener('input', (e) => {
  // Удаляем предыдущий список адресов
  removeList();
  // Запускаем спиннер
  spinnerElement.classList.add('page-spinner_active');
  // Сбрасываем таймер, чтобы предотвратить предыдущий запланированный вызов
  clearTimeout(timeoutId);
  // Устанавливаем новый таймер
  timeoutId = setTimeout(() => renderAddressesThrottled(e.target.value), 300);
});
