// Объект, представляющий книгу
const book = {
    title: '1984',
    author: 'Джордж Оруэлл',
    published: 1949,

    // Получить значение свойства объекта
    getProperty(propertyName) {
        return this[propertyName];
    },

    // Изменить значение свойства объекта
    setProperty(propertyName, newValue) {
        this[propertyName] = newValue;
    },
};

// Выводим начальные значения свойств книги
console.log('title:', book.getProperty('title')); // 1984
console.log('author:', book.getProperty('author')); // Джордж Оруэлл
console.log('published:', book.getProperty('published')); // 1949

// Меняем значение свойства "title" на новое
book.setProperty('title', '1985');

// Выводим новое значение свойства "title"
console.log('new title:', book.getProperty('title')); // 1985