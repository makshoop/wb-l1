const MathX = {
    // Получение N-го числа в ряду Фибоначчи
    getNthFibonacciNumber(n) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(n)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    // Генерация ряда Фибоначчи
    const fibonacciArray = this.generateFibonacciSequence(n);
    // Возвращение N-го числа из ряда
    return fibonacciArray[n - 1];
    },

    // Генерация ряда Фибоначчи до числа N
    generateFibonacciSequence(n) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(n)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    // Первые три числа в ряду
    const fibonacciArray = [0, 1, 1];

    // Заполнение ряда до N
    for (let i = 3; i <= n; i++) {
        const nextNumber = fibonacciArray[i - 1] + fibonacciArray[i - 2];
        fibonacciArray.push(nextNumber);
    }

    return fibonacciArray;
    },

    // Проверка на положительное целое число
    isPositiveInteger(num) {
    return typeof num === 'number' && num > 0 && Number.isInteger(num);
    },

    // Проверка на простое число
    isPrimeNumber(num) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(num)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    // 1 и числа меньше 1 не являются простыми
    if (num <= 1) return false;

    // Проверка делителей до числа N
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
        return false;
        }
    }

    return true;
    },

    // Получение N-го простого числа
    getNthPrimeNumber(n) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(n)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    // Генерация ряда простых чисел
    const primesArray = this.generatePrimesSequence(n);
    // Возвращение N-го числа из ряда
    return primesArray[n - 1];
    },

    // Получение всех простых чисел до числа N
    getPrimesUpToNumber(n) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(n)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    const primes = [];

    // Поиск простых чисел от 2 до N
    for (let i = 2; i <= n; i++) {
        // Проверка, является ли число простым
        if (this.isPrimeNumber(i)) {
        primes.push(i);
        }
    }

    return primes;
    },

    // Генерация ряда простых чисел длины N
    generatePrimesSequence(n) {
    // Проверка на положительное целое число
    if (!this.isPositiveInteger(n)) {
        return new Error('Аргумент должен быть положительным целым числом');
    }

    let primesArray = [];
    let num = 2;

    // Поиск простых чисел до N
    while (primesArray.length < n) {
        // Проверка, является ли число простым
        if (this.isPrimeNumber(num)) {
        primesArray.push(num);
        }
        num++;
    }

    return primesArray;
    },
};

// Примеры использования функций
console.log(MathX.getNthFibonacciNumber(4)); // 2
console.log(MathX.generateFibonacciSequence(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
console.log(MathX.getNthPrimeNumber(5)); // 11
console.log(MathX.getPrimesUpToNumber(33)); // [2,  3,  5,  7, 11, 13, 17, 19, 23, 29, 31]
console.log(MathX.isPrimeNumber(7)); // true

