// Импорт функций из модуля
import { formatDateTime, addToDate } from './index.js';

// Получение текущей даты и форматирование с использованием импортированной функции
const formattedDate = formatDateTime(new Date(), 'YYYY/MM/DD');
console.log(formattedDate); // --> Текущая дата в формате YYYY/MM/DD

// Получение текущей даты, добавление 2 месяцев и вывод результата
const modifiedDate = addToDate(new Date(), 2, 'months');
console.log(modifiedDate); // --> Текущая дата + 2 месяца
