// Выбираем элементы DOM для отображения занятой и максимальной памяти localStorage
const takenValueElement = document.querySelector('.page-value-taken');
const totalValueElement = document.querySelector('.page-value-total');

// Функция для получения размера занятой и максимальной памяти localStorage
function getLocalStorageSize() {
    // Размер текущих данных в localStorage до добавления тестовых данных
    const initialSize = JSON.stringify(localStorage).length;

    // Создаем строку из 1024 символов 'a' для тестовых данных
    const testData = 'a'.repeat(1024);
    let totalSize = initialSize;

    try {
        // Бесконечный цикл для добавления тестовых данных до тех пор, пока не произойдет ошибка
        while (true) {
            const key = `testKey_${totalSize}`;
            localStorage.setItem(key, testData);
            totalSize += testData.length;
        }
    } catch (e) {
        // Очищаем тестовые данные из localStorage после возникновения ошибки
        for (let i = initialSize; i < totalSize; i += testData.length) {
            const key = `testKey_${i}`;
            localStorage.removeItem(key);
        }
    }

    // Возвращаем объект с размерами
    return { totalSize, initialSize };
}

// Событие DOMContentLoaded гарантирует, что код выполняется после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Получаем размеры занятой и максимальной памяти localStorage
    const { totalSize, initialSize } = getLocalStorageSize();

    // Пересчитываем размеры из байт в килобайты
    const currentLocalStorageSize = Math.floor(initialSize / 1024);
    const maxLocalStorageSize = Math.floor(totalSize / 1024);

    // Обновляем текстовое содержимое элементов DOM
    takenValueElement.textContent = currentLocalStorageSize + ' KB';
    totalValueElement.textContent = maxLocalStorageSize + ' KB';

    // Выводим информацию в консоль для отладки
    console.log('Объем занятой памяти localStorage:', currentLocalStorageSize);
    console.log('Максимальный размер localStorage:', maxLocalStorageSize);
});
