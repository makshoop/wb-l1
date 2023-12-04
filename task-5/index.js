// Функция для создания узла связанного списка
function createLinkedListNode(value) {
    return { value, next: null }; // Создаем новый узел с переданным значением и указателем на следующий узел (изначально null)
}

// Функция для добавления узла в конец связанного списка
function appendToLinkedList(linkedList, value) {
    const newNode = createLinkedListNode(value);

    // Если список пустой, новый узел становится головой списка
    if (!linkedList.head) {
        linkedList.head = newNode;
    return;
    }

    let current = linkedList.head;

    // Находим последний узел в списке
    while (current.next) {
        current = current.next;
    }

    // Добавляем новый узел в конец списка
    current.next = newNode;
}

// Функция для создания связанного списка из JSON
function convertJsonToLinkedList(json) {
    // try/catch - для проверки ошибок парсинга JSON
    try {
        const jsonData = JSON.parse(json);
        const linkedList = { head: null };

        // Добавляем каждый объект из JSON в список
        if (Array.isArray(jsonData)) {
            jsonData.forEach(item => {
                appendToLinkedList(linkedList, item);
            });
        } else {
            appendToLinkedList(linkedList, jsonData);
        }

        return linkedList.head;

    // Обработка ошибки парсинга
    } catch (error) {
        return new Error('Некорректный формат данных JSON');
    }
}

// Имитируем JSON
const jsonDataExample = JSON.stringify([
    { product: 'Product-1', amount: 777 },
    { product: 'Product-2', amount: 322 }
]);

// Создаем связанный список из JSON
const linkedListExample = convertJsonToLinkedList(jsonDataExample);

console.log(linkedListExample); 
// {
//  value: { product: 'Product-1', amount: 777 },
//  next: { 
//      value: { product: 'Product-2', amount: 322 },
//  next: null 
//  }
//}
