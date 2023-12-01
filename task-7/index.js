// Асинхронная функция для вызова массива функций
async function callAsyncFunctions(arrayOfFunctions) {
    // Проверка на корректный тип аргумента
    if (!Array.isArray(arrayOfFunctions)) {
        return new Error('Аргументом должен быть массив');
    }

    const completedFunctionIndexes = [];

    for (const asyncFunc of arrayOfFunctions) {
        // Проверяем, является ли элемент массива функцией
        if (typeof asyncFunc === 'function') {
            // Вызываем функцию после завершения предыдущей
            await asyncFunc();
            // Сохраняем индекс вызванной функции
            completedFunctionIndexes.push(arrayOfFunctions.indexOf(asyncFunc));
        } else {
            throw new Error('Массив должен состоять из функций');
        }
    }

    // Выводим в консоль данные по номерам вызванных функций
    console.log(`Все функции, которые были выполнены: ${completedFunctionIndexes.join(',')}`);
}

// Пример использования функции
const functionsArray = [
    function firstFunc() {
        console.log('Функция 0 завершена');
    },

    async function secondFunc() {
        return new Promise(resolve => {
            setTimeout(() => {
            console.log('Функция 1 завершена');
            resolve();
            }, 500);
        });
    },

    function thirdFunc() {
        console.log('Функция 2 завершена');
    },

    function fourthFunc() {
        console.log('Функция 3 завершена');
    }
]

callAsyncFunctions(functionsArray); // -> Allзавершена functions: 0,1,2,3