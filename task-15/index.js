import fetch from 'node-fetch';

// Функция для выполнения API-запроса и возврата данных
async function fetchDataFromApi(url) {
    try {
        // Выполняем API-запрос
        const response = await fetch(url);

        // Проверяем успешность запроса
        if (response.ok) {
            // Парсим результат, если запрос успешен
            const result = await response.json();

            // Возвращаем результат
            return result;
        } else {
            // Выбрасываем ошибку, если запрос не успешен
            throw new Error('Возникла ошибка при запросе');
        }
    } catch (err) {
        return err; // Возвращаем ошибку в случае любых проблем
    }
}

// Функция для вызова fetchDataFromApi и обработки результатов
async function handleApiData(url) {
    try {
        // Получаем данные из API
        const apiData = await fetchDataFromApi(url);

        // Выводим результат в консоль
        console.log(apiData);
    } catch (error) {
        // Выводим ошибку в случае проблем
        console.error(error);
    }
}

// Вызываем функцию и передаем URL API
handleApiData('https://jsonplaceholder.typicode.com/todos/1'); 
// {
// userId: 1,
// id: 1,
// title: 'delectus aut autem',
// completed: false
// }
