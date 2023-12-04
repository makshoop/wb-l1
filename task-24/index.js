// Глобальные переменные для хранения данных и параметров пагинации
let allTableData = [];
let activeTableData = [];
let rowsPerPage = 50;
let currentPage = 1;
let pagesAmount = 0;

// Ссылки на HTML-элементы
const nextBtn = document.querySelector('.paginator-btn-next');
const prevBtn = document.querySelector('.paginator-btn-prev');
const input = document.querySelector('.paginator-number');
const pagesLengthElement = document.querySelector('.page-pagiantor-length');
const container = document.querySelector('.table-body');
const tableHeaders = document.querySelectorAll('.table-header');

// Функция для получения данных таблицы через API
async function fetchData() {
    try {
        const response = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true');

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Возникла ошибка при запросе');
        }
    } catch (err) {
        return { err };
    }
}

// Функция для отрисовки данных таблицы
async function renderTable() {
    const data = await fetchData();

    if (data.err) {
        console.log(data.err);
    } else {
        allTableData = data;
        const tableSlice = data.slice(0, rowsPerPage);

        tableSlice.forEach((i, index) => {
            const tableRow = generateTableData(i, index + 1);
            container.append(tableRow);
        });

        pagesAmount = Math.ceil(allTableData.length / rowsPerPage);
        pagesLengthElement.textContent = 'of ' + pagesAmount;
        activeTableData = tableSlice;
    }
}

// Функция для заполнения строки таблицы данными
function fillTable(rowElement, data, index) {
    const number = rowElement.querySelector('.table-data-number');
    const fname = rowElement.querySelector('.table-data-fname');
    const lname = rowElement.querySelector('.table-data-lname');
    const tel = rowElement.querySelector('.table-data-tel');
    const address = rowElement.querySelector('.table-data-address');
    const city = rowElement.querySelector('.table-data-city');
    const state = rowElement.querySelector('.table-data-state');
    const zip = rowElement.querySelector('.table-data-zip');

    number.textContent = index;
    fname.textContent = data.fname;
    lname.textContent = data.lname;
    tel.textContent = data.tel;
    address.textContent = data.address;
    city.textContent = data.city;
    state.textContent = data.state;
    zip.textContent = data.zip;
}

// Функция для генерации данных строки таблицы
function generateTableData(data, index) {
    const rowElement = getTemplate('#table-row');
    fillTable(rowElement, data, index);
    return rowElement;
}

// Функция для получения HTML-шаблона
function getTemplate(template) {
    return document
    .querySelector(template)
    .content
    .cloneNode(true);
}

// Функция для переключения страниц
function switchPage(direction, newValue) {
    let nextPage;

    if (direction === 'next' && currentPage < pagesAmount) {
        nextPage = !newValue ? currentPage + 1 : newValue;
    } else if (direction === 'prev' && currentPage > 1) {
        nextPage = !newValue ? currentPage - 1 : newValue;
    } else {
        return;
    }

    const nextPageStart = (nextPage - 1) * rowsPerPage;
    const nextPageEnd = nextPageStart + rowsPerPage;
    const tableSlice = allTableData.slice(nextPageStart, nextPageEnd);

    const tableRows = document.querySelectorAll('.table-row');

    tableSlice.forEach((data, index) => {
        if (tableRows[index]) {
            fillTable(tableRows[index], data, index + 1 + nextPageStart);
        }
    });

    if (nextPageEnd > allTableData.length) {
            for (let i = (allTableData.length % rowsPerPage); i < rowsPerPage; i++) {
            tableRows[i].remove();
        }
    } else if (Array.from(tableRows).length < rowsPerPage) {
        for (let i = Array.from(tableRows).length; i < rowsPerPage; i++) {
            const row = generateTableData(tableSlice[i], i + 1 + nextPageStart);
            container.append(row);
        }
    }

    currentPage = nextPage;
    input.value = currentPage;
    activeTableData = tableSlice;

    if (currentPage === 1) {
        prevBtn.classList.add('paginator-btn_inactive');
    } else {
        prevBtn.classList.remove('paginator-btn_inactive');
    }

    if (currentPage === pagesAmount) {
        nextBtn.classList.add('paginator-btn_inactive');
    } else {
        nextBtn.classList.remove('paginator-btn_inactive');
    }

    tableHeaders.forEach(h => h.classList.remove('asc', 'desc'));
}

nextBtn.addEventListener('click', () => {
    switchPage('next');
});

prevBtn.addEventListener('click', () => {
    switchPage('prev');
});

input.addEventListener('change', () => {
    let newPage = parseInt(input.value, 10);

    if (newPage === currentPage) {
        return;
    }

    if (newPage < 1) {
        newPage = 1;
        input.value = 1;
    }

    if (newPage > pagesAmount) {
        newPage = pagesAmount;
        input.value = pagesAmount;
    }

    if (newPage > currentPage) {
        switchPage('next', newPage);
    }

    if (newPage < currentPage) {
        switchPage('prev', newPage);
    }
});

const sortInfo = {};

function compareByField(field, order) {
    return function(a, b) {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    };
}

tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const fieldName = header.textContent;
        if (fieldName === '#') return;

        if (!sortInfo[fieldName]) {
            sortInfo[fieldName] = 'asc';
        } else {
            sortInfo[fieldName] = sortInfo[fieldName] === 'asc' ? 'desc' : 'asc';
        }

        tableHeaders.forEach(h => h.classList.remove('asc', 'desc'));
        header.classList.add(sortInfo[fieldName]);

        const sortedArr = activeTableData.sort(compareByField(fieldName, sortInfo[fieldName]));

        const tableRows = document.querySelectorAll('.table-row');

        sortedArr.forEach((data, index) => {
            if (tableRows[index]) {
                fillTable(tableRows[index], data, index + 1);
            }
        });
    });
});

renderTable();
