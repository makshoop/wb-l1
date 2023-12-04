const WordsDecliner = {

    // Функция для склонения слова в зависимости от числа
    declineWordWithNumerals(number, forms) {
    // Проверка на корректные входные данные: число и массив форм
    if (typeof number !== 'number' || !Array.isArray(forms) || forms.length < 3) {
        return new Error('Некорректные входные данные');
    }

    // Получаем последние две цифры числа и последнюю цифру
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = Math.abs(number) % 10;

    // Возвращаем первую форму, если последняя цифра 1
    if (lastDigit === 1) {
        return forms[0];
    }

    // Возвращаем вторую форму, если последняя цифра от 2 до 4
    if (lastDigit >= 2 && lastDigit <= 4) {
        return forms[1];
    }

    // Возвращаем третью форму, если последние две цифры от 11 до 14
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return forms[2];
    }

    // Возвращаем третью форму в остальных случаях
    return forms[2];
    }
};

// Примеры использования функции
console.log(WordsDecliner.declineWordWithNumerals(755, ['сообщение', 'сообщения', 'сообщений'])); // сообщений
console.log(WordsDecliner.declineWordWithNumerals(4, ['пользователь', 'пользователя', 'пользователей'])); // пользователя
console.log(WordsDecliner.declineWordWithNumerals(331, ['пользователь', 'пользователя', 'пользователей'])); // пользователь
console.log(WordsDecliner.declineWordWithNumerals(25, ['пользователь', 'пользователя'])); // -> ошибка
console.log(WordsDecliner.declineWordWithNumerals('1', ['пользователь', 'пользователя', 'пользователей'])); // -> ошибка

