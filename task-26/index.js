/**
* Функция для рекурсивного обхода DOM-дерева, вывода тега каждого узла и сохранения всех узлов в массив.
* @param {HTMLElement} node - Текущий узел, который нужно обойти
*/
function loopingDOM(node) {
    console.log(node.tagName); // Выводим тег текущего узла
    allNodes.push(node); // Добавляем текущий узел в массив

    // Обходим в цикле все дочерние узлы
    for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        // Запускаем рекурсивно функцию для дочерних узлов
        loopingDOM(childNode);
    }
}

const allNodes = [];
loopingDOM(document); // Начинаем обход DOM-дерева с корневого узла (document)
console.log(allNodes); // Выводим массив всех узлов