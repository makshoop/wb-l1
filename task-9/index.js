function parseJson(jsonString) {
    // Проверяем на пустую строку
    if (jsonString === '') {
        return null;
    }

    // Возвращаем число в формате number, если строка это число
    if (!isNaN(jsonString)) {
        return parseFloat(jsonString);
    }

    // Запускаем функцию для парсинга объекта, если json содержит объект
    if (jsonString[0] === '{' && jsonString[jsonString.length - 1] === '}') {
        return parseJsonObject(jsonString);
    }

    // Запускаем функцию для парсинга массива, если json содержит массив
    if (jsonString[0] === '[' && jsonString[jsonString.length - 1] === ']') {
        return parseJsonArray(jsonString);
    }

    // Возвращаем строку без двойных кавычек
    if (jsonString[0] === '"' && jsonString[jsonString.length - 1] === '"') {
        return jsonString.slice(1, jsonString.length - 1);
    }

    return null;
}

function parseJsonObject(jsonString) {
    const object = {};

    // Удаляем скобки
    const content = jsonString.slice(1, jsonString.length - 1);

    const keyValuePairs = content.split(',');

    keyValuePairs.forEach(pair => {
        const [key, value] = pair.split(':');
        // Удаляем кавычки из ключа
        const cleanedKey = key.replace(/"/g, '');
        // Записываем ключ и значение в объект
        object[cleanedKey] = parseJson(value);
    });

    return object;
}

function parseJsonArray(jsonString) {
    const array = [];
    const content = jsonString.slice(1, jsonString.length - 1);

    const elements = content.split(',');

    elements.forEach(element => {
        array.push(parseJson(element));
    });

    return array;
}

const json = `{"product":"test","amount":1337}`;

const result = parseJson(json);
console.log(result); // { product: 'test', amount: 1337 }
