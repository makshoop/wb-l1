// Объявление основных переменных и элементов страницы
const token = 'e337da2ce337da2ce337da2ca3e0215f0dee337e337da2c865a18c2b28feff22f2749e8';
const spinnerElement = document.querySelector('.page-spinner');
const containerElement = document.querySelector('.page-posts');
const inputElement = document.querySelector('.page-input');
const formElement = document.querySelector('.page-form');
const errorElement = document.querySelector('.error');
const closeBtn = document.querySelector('.error-close-btn');

// Счетчик постов и количество постов в запросе
let offset = 0;
let count = 5;

// Максимальный размер localStorage и информация о текущей группе
let maxStorageSize;
const groupStorage = JSON.parse(localStorage.getItem('group'));
let groupName = !groupStorage ? '4ch' : groupStorage.response[0].screen_name;
let newGroupName = '';

// Функция для запроса постов из VK API
async function fetchPosts(groupName) {
    return new Promise((resolve, reject) => {
        const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;

        // Определение функции обратного вызова для JSONP
        window[callbackName] = (data) => {
            const script = document.querySelector(`script[data-callback="${callbackName}"]`);
            if (script) {
                script.parentElement.removeChild(script);
            }
            if (window[callbackName]) {
                delete window[callbackName];
            }
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data?.response?.items);
            }
        };

        // Создание скрипта для запроса
        const script = document.createElement('script');
        script.src = `https://api.vk.com/method/wall.get?domain=${groupName}&count=${count}&offset=${offset}&v=5.131&callback=${callbackName}&access_token=${token}`;
        script.setAttribute('data-callback', callbackName);
        document.body.appendChild(script);
    });
}

// Функция для запроса данных о группе из VK API
async function fetchGroupData(groupName) {
    return new Promise((resolve, reject) => {
        const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;

        window[callbackName] = (data) => {
            const script = document.querySelector(`script[data-callback="${callbackName}"]`);
            if (script) {
                script.parentElement.removeChild(script);
            }
            if (window[callbackName]) {
                delete window[callbackName];
            }
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data);
            }
        };

        const script = document.createElement('script');
        script.src = `https://api.vk.com/method/groups.getById?group_id=${groupName}&v=5.131&callback=${callbackName}&access_token=${token}`;
        script.setAttribute('data-callback', callbackName);
        document.body.appendChild(script);
    });
}

// Функция для генерации HTML-разметки поста
function generatePost(post) {
    const postElement = getTemplate('#post');

    // Получение элементов поста
    let postDate = postElement.querySelector('.post-date');
    let postText = postElement.querySelector('.post-text');
    let postImg = postElement.querySelector('.post-img');
    let likeAmount = postElement.querySelector('.post-like-amount');
    let commentAmount = postElement.querySelector('.post-comment-amount');
    let repostAmount = postElement.querySelector('.post-repost-amount');
    let viewAmount = postElement.querySelector('.post-view-amount');

    // Форматирование даты
    const date = new Date(post.date * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

    // Заполнение данных поста
    postDate.textContent = formattedDate;
    postText.textContent = post.text;
    const photoData = post.attachments[0].photo.sizes;
    postImg.src = photoData[photoData.length - 1].url;
    likeAmount.textContent = post?.likes?.count || 0;
    commentAmount.textContent = post?.comments?.count || 0;
    repostAmount.textContent = post?.reposts?.count || 0;
    viewAmount.textContent = post?.views?.count || 0;

    return postElement;
}

// Функция для получения HTML-шаблона
function getTemplate(template) {
    const cardElement = document
    .querySelector(template)
    .content
    .cloneNode(true);
    return cardElement;
}

// Функция для отображения данных о группе
async function renderGroup(groupName) {
    let groupData;

    const groupStorage = JSON.parse(localStorage.getItem('group'));

    // Проверка, сохранены ли данные о группе в localStorage
    if (groupStorage?.response[0]?.screen_name === groupName) {
        groupData = groupStorage;
    } else {
        try {
            // Вызов функции для получения данных группы через API VK
            groupData = await fetchGroupData(groupName);
        } catch (error) {
            return error;
        }
    }

    // Отображение данных группы
    if (groupData?.response.length > 0) {
        localStorage.setItem('group', JSON.stringify(groupData));
        let imgElement = document.querySelector('.group-img');
        let titleElement = document.querySelector('.group-title');
        imgElement.src = groupData.response[0].photo_200;
        titleElement.textContent = groupData.response[0].name;
    }

    return groupData;
}

// Функция для отображения полученных постов
async function renderPosts(groupName) {
    if (groupName !== '') {
        let posts;
        const postsStorage = JSON.parse(localStorage.getItem('posts'));

        // Если данные сохранены в localStorage, используем их
        if (postsStorage?.length >= (offset + count)) {
            posts = postsStorage.slice(offset, offset + count);
        } else {
            try {
                // В противном случае загружаем новые данные
                posts = await fetchPosts(groupName);
                updateLocalStorage(postsStorage, posts);
            } catch (error) {
                console.error(error);
            }
        }

        // Отображение постов
        if (posts.length > 0) {
            offset += posts.length; // Обновление номера первого поста для следующего запроса

            // Отображение постов, фильтруя только те, где есть фото
            posts.filter(el => el.attachments[0]?.photo).forEach((i) => {
                const newPost = generatePost(i);
                containerElement.append(newPost);
            });
        }
    }
    dataIsLoading = false;
}

// Функция для обновления данных в localStorage
function updateLocalStorage(postsStorage, posts) {
    if (postsStorage) {
        let currentStorage = postsStorage;
        const currentStorageSize = JSON.stringify(postsStorage) * 2;

        // Удаление первых 10 записей, если хранилище заполнено более чем на 95%
        if (currentStorageSize > (maxStorageSize * 0.95)) {
            currentStorage = postsStorage.slice(10);
        }

        // Добавление новых записей в хранилище
        localStorage.setItem('posts', JSON.stringify([...currentStorage, ...posts]));
    } else {
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

// Функция для создания "затухающей" версии функции (throttle)
function throttle(func, delay) {
    let lastExecutionTime = 0;  // Время последнего выполнения функции
    let timeoutId;

    return function (...args) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastExecutionTime;  // Время с момента последнего выполнения функции

        // Если прошедшее время больше или равно задержке (delay), вызываем функцию.
        if (elapsedTime >= delay) {
            func(...args);
            lastExecutionTime = currentTime;
        } else {
            // Иначе отменяем предыдущий таймаут
            clearTimeout(timeoutId);

            // Устанавливаем новый таймаут для вызова функции
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecutionTime = Date.now();
            }, delay - elapsedTime);
        }
    };
}

// Получение максимального размера localStorage
function getMaxLocalStorageSize() {
    const initialSize = JSON.stringify(localStorage).length;

    const testData = 'a'.repeat(1024);
    let totalSize = initialSize;

    try {
        while (true) {
            const key = `testKey_${totalSize}`;
            localStorage.setItem(key, testData);
            totalSize += testData.length;
        }
    } catch (e) {
        // Очистка тестовых данных из localStorage
        for (let i = initialSize; i < totalSize; i += testData.length) {
            const key = `testKey_${i}`;
            localStorage.removeItem(key);
        }
    }

    return totalSize;  // Возвращаем максимальный размер localStorage в байтах
}

// Переменная для отслеживания состояния загрузки данных
let dataIsLoading = false;

// Функция для обновления постов при скролле
function updatePosts() {
    const lastPost = document.querySelector('.post:last-child');
    if (!dataIsLoading && lastPost.scrollHeight + window.scrollY > lastPost.offsetTop) {
        dataIsLoading = true;
        renderPosts(groupName);
    }
}

// Функция с "затухающим" эффектом для обновления постов с задержкой
const updatePostsTrottled = throttle(updatePosts, 300);

// Обработчик события скролла для обновления постов
document.addEventListener('scroll', () => {
    updatePostsTrottled();
});

// Обработчик события DOMContentLoaded для загрузки данных при старте страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем максимальный размер localStorage
    maxStorageSize = getMaxLocalStorageSize();
    // Рендерим данные о группе и посты
    renderGroup(groupName);
    renderPosts(groupName);
});

// Обработчик события ввода новой группы в input
inputElement.addEventListener('input', (e) => newGroupName = e.target.value);

// Обработчик события submit формы для поиска постов по новой группе
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (newGroupName !== groupName) {
            const groupResponse = await renderGroup(newGroupName);
            if (groupResponse.error_code) {
            errorElement.classList.add('error_active');
        } else {
            const postElement = document.querySelectorAll('.post');
            // Удаляем посты по предыдущей группе со страницы и из хранилища
            Array.from(postElement).forEach((i) => {
                i.remove();
            });
            localStorage.removeItem('posts');
            groupName = newGroupName;
            offset = 0;
            renderPosts(newGroupName);
        }
    }
});

// Обработчик события клика по всплывающему окну с ошибкой для его закрытия
errorElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('error')) {
        errorElement.classList.remove('error_active');
    }
});

// Обработчик события клика по кнопке закрытия всплывающего окна
closeBtn.addEventListener('click', () => {
    errorElement.classList.remove('error_active');
});
