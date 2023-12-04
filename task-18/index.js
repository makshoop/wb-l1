// Получаем элемент DOM для отображения максимального размера localStorage.
const valueElement = document.querySelector('.page-value');

/**
* Функция для определения максимального размера localStorage.
* @returns {number} Максимальный размер localStorage в байтах.
*/
function getMaxLocalStorageSize() {
    // Размер текущих данных в localStorage.
    const initialSize = JSON.stringify(localStorage).length;

    // Создаем строку из символов 'a' длиной 1024 байта.
    const testData = 'a'.repeat(1024);
    let totalSize = initialSize;

    try {
        // Пытаемся добавлять тестовые данные в localStorage до тех пор, пока не произойдет ошибка.
        while (true) {
            const key = `testKey_${totalSize}`;
            localStorage.setItem(key, testData);
            totalSize += testData.length;
        }
    } catch (e) {
        // В случае ошибки очищаем тестовые данные из localStorage.
        for (let i = initialSize; i < totalSize; i += testData.length) {
            const key = `testKey_${i}`;
            localStorage.removeItem(key);
        }
    }

    return totalSize;  // Возвращаем максимальный размер localStorage.
}

// Событие DOMContentLoaded гарантирует, что код будет выполнен после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Вычисляем максимальный размер localStorage и конвертируем его в килобайты.
    const maxLocalStorageSize = Math.floor(getMaxLocalStorageSize() / 1024);

    // Отображаем максимальный размер localStorage на странице.
    valueElement.textContent = maxLocalStorageSize + ' KB';

    // Выводим информацию в консоль для отладки.
    console.log('Максимальный размер localStorage:', maxLocalStorageSize);
});
