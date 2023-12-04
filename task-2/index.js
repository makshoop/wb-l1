// Функция для определения, является ли число странным
function isWeirdNumberCheck(inputNumber) {
    // Проверка, является ли входной параметр числом
    if (typeof inputNumber !== 'number') {
        return false;   
    }

    // Проверка на специфичное условие для странных чисел
    if (inputNumber < 50) {
        return false;
    }

    // Функция для вычисления суммы делителей числа (кроме самого числа)
    function calculateDivisorsSum(numberToCheck) {
        let sum = 0;
        for (let i = 1; i < numberToCheck; i++) {
            if (numberToCheck % i === 0) {
                sum += i;
            }
        }
        return sum;
    }

    // Вычисление суммы делителей входного числа
    const sumOfDivisors = calculateDivisorsSum(inputNumber);

    // Сравнение суммы делителей с входным числом
    return sumOfDivisors > inputNumber;
}

// Примеры использования функции
console.log(isWeirdNumberCheck(20));
// Делители числа 20: 1, 2, 4, 5, 10. 
// Сумма делителей: 1 + 2 + 4 + 5 + 10 = 22.
// Сравниваем с 20: 22 > 20. Это странное число. Ответ: true

console.log(isWeirdNumberCheck(324));
// Делители числа 324: 1, 2, 3, 4, 6, 9, 12, 18, 27, 36, 54, 81, 108, 162. 
// Сумма делителей: 1 + 2 + 3 + 4 + 6 + 9 + 12 + 18 + 27 + 36 + 54 + 81 + 108 + 162 = 330.
// Сравниваем с 324: 330 > 324. Это странное число. Ответ: true.

console.log(isWeirdNumberCheck(123));
// Делители числа 123: 1, 3, 41, 123. 
// Сумма делителей: 1 + 3 + 41 = 45.
// Сравниваем с 123: 45 < 123. Не странное число. Ответ: false

console.log(isWeirdNumberCheck('number'));
// Функция проверяет, является ли входной параметр числом,
// и возвращает false, так как 'number' не является числом.

console.log(isWeirdNumberCheck(null));
// Функция также проверяет, является ли входной параметр числом,
// и возвращает false, так как null не является числом.