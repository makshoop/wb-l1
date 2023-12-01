// Функция создания замыкания для выполнения массива функций
function createFunctionExecutor(functions) {
    // Возвращаем анонимную функцию
    return function() {
        const results = [];

        // Выполняем все функции из массива, сохраняя результат
        for (const func of functions) {
            results.push(func());
        }

        return results;
    };
}

// Массив функций, которые будут выполнены в созданном замыкании
const functionsToExecute = [
    function() { return 1; },
    function() { return 2; },
    function() { return 3; },
    function() { return 4; },
    function() { return 5; }
];

// Создаем анонимную функцию-исполнитель для заданных функций
const executeFunctions = createFunctionExecutor(functionsToExecute);

// Вызываем анонимную функцию-исполнитель: функция запоминает переменные (замыкание)
const results = executeFunctions();

// Выводим результат выполнения функций
console.log(results);// [1, 2, 3, 4, 5]   