import moment from 'moment';

// Форматирование даты с использованием библиотеки Moment.js
export function formatDateTime(date, format) {
    // Используем Moment.js для форматирования даты
    return moment(date).format(format);
}

// Добавление указанного значения (value) к дате (date) с указанным типом (type)
export function addToDate(date, value, type) {
    // Используем Moment.js для добавления значения к дате
    return moment(date).add(value, type).toDate();
}
