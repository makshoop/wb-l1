// Функция для проверки, является ли заданная строка палиндромом
function isPalindrome(string) {
    // Проверяем, если строка является null или undefined
    if (string == null || string == undefined) {
        return false; // Если да, возвращаем false, так как палиндром не может быть
    }

    // Удаляем из строки все символы, кроме букв и цифр, и приводим к нижнему регистру
    const cleanedStr = string.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase();

    // Переворачиваем очищенную строку
    const reversedStr = cleanedStr.split('').reverse().join('');

    // Сравниваем очищенную строку с её перевёрнутой версией
    return cleanedStr === reversedStr;
}

// Примеры использования функции
console.log(isPalindrome('Аргентина манит негра')); // true
console.log(isPalindrome('Громилы мыли морг')); // true
console.log(isPalindrome('Аргентина магнит для негра')); // false
console.log(isPalindrome('Гориллы мыли морг')); // false
console.log(isPalindrome(null)); // false
