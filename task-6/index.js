// Функция для сортировки массива объектов по возрастанию возраста и по имени при равных возрастах
function sortObjectsByAgeAndName(objectsArray) {
    // Проверка на корректный тип аргумента
    if (!Array.isArray(objectsArray)) {
        return new Error('Аргументом должен быть массив');
    }

    return objectsArray.sort((a, b) => {
    // Если возраст отличается, сортируем по возрасту
    if (a.age !== b.age) {
        return a.age - b.age;
    }

    // Если возраст одинаковый, сортируем по имени (регистронезависимо)
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
}

// Пример использования функции
const usersArray = [
    { name: 'John', age: 25 },
    { name: 'Johny', age: 26 },
    { name: 'Johnatan', age: 27 },
    { name: 'Jenna', age: 24 },
    { name: 'Jimmy', age: 5 }
];

console.log(sortObjectsByAgeAndName(usersArray));
