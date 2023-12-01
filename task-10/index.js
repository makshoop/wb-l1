function convertToJson(obj) {
    // Проверяем на undefined или функцию и возвращаем undefined
    if (obj === undefined || typeof obj === 'function') {
        return;
    }

    // Если аргумент - массив, рекурсивно вызываем convertToJson для всех элементов массива
    if (Array.isArray(obj)) {
        const newArr = obj.map(item => convertToJson(item));
        return `[${newArr.join(',')}]`;
    }

    // Если аргумент - строка, возвращаем строку в двойных кавычках
    if (typeof obj === 'string') {
        return `"${obj}"`;
    }

    // Если аргумент не объект и не null, возвращаем результат без кавычек
    if (typeof obj !== 'object' || obj === null) {
        return `${obj}`;
    }

    // Если аргумент - объект, обрабатываем его ключи
    const newObj = [];
    Object.keys(obj).forEach(key => {
        const currentValue = obj[key];
        if (currentValue !== undefined) {
            const newValue = currentValue !== null ? convertToJson(currentValue) : null;
            newObj.push(`"${key}":${newValue}`);
        }
    });

    return `{${newObj.join(',')}}`;
}

const testObject = {
    product: 'test object',
    title: undefined,
    amount: null,
    amountAll: 322,
    sold: true,
    array: ['test object', 'test object one'],
    properties: {
    size: 'xll',
    color: ['yellow', { props: 15 }]
    }
};

const testArray = [
    {
    product: 'test object',
    amount: 3,
    properties: [3, 2, 2]
    },
    {
    product: 'test object 322',
    amount: 2,
    properties: [32, 322, 3222]
    }
];

const jsonResult = convertToJson(testObject);

console.log(jsonResult);
console.log(`Результат равен JSON.stringify: ${jsonResult === JSON.stringify(testObject)}`); // true
