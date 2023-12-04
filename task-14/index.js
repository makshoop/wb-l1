import fetch from 'node-fetch';

// Функция для загрузки изображения по указанному URL
function loadImage(url) {
    // Используем fetch для отправки HTTP-запроса
    fetch(url)
    .then((response) => {
        // Проверяем успешность запроса и выкидываем ошибку при неудаче
        if (!response.ok) {
            throw new Error('Возникла ошибка при загрузке изображения. Проверьте корректность URL');
        } else {
            // Выводим сообщение, если промис успешно выполнен
            console.log('Изображение загружено');
        }
    })
    .catch((err) => {
        // Ловим ошибки, выводим их в консоль и возвращаем ошибку
        console.log(err);
        return err;
    });
}

// Вызываем функцию загрузки изображения с указанным URL
loadImage('https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif'); // -> Изображение загружено
