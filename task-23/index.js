// Получаем ссылки на HTML-элементы
const inputElement = document.querySelector('.page-input');
const checkElements = document.querySelectorAll('.page-check');
const progressElement = document.querySelector('.page-progress-done');
const gradeValueElement = document.querySelector('.page-progress-value');

// Регулярные выражения для проверки пароля
const passwordRules = [
  { regex: /.{8,}/ },          // Минимум 8 символов
  { regex: /[a-z]/ },          // Содержит строчные буквы
  { regex: /[A-Z]/ },          // Содержит заглавные буквы
  { regex: /[0-9]/ },          // Содержит цифры
  { regex: /[!,%,&,@,#,$,^,*,?,_,~]/ }  // Содержит специальные символы
];

// Оценки крепости пароля
const passwordGrades = [
  { grade: 5, percent: '100%', value: 'Сильный', color: '#52c26b' },
  { grade: 3, percent: '50%', value: 'Средний', color: '#ffd350' },
  { grade: 1, percent: '15%', value: 'Слабый', color: '#ff9660' },
  { grade: 0, percent: '0%', value: 'Слабый', color: 'transparent' }
];

// Обработчик ввода в поле пароля
inputElement.addEventListener('input', () => {
  let grade = 0;

  // Проверка пароля по каждому правилу
  passwordRules.forEach((rule, index) => {
    const isValid = rule.regex.test(inputElement.value);

    // Обновление стилей подсказок (скрытие/показ)
    checkElements[index].classList.toggle('page-check_checked', isValid);

    // Увеличение оценки, если правило выполнено
    if (isValid) {
      grade++;
    }
  });

  // Скрытие оценки, если поле пустое
  gradeValueElement.style.opacity = inputElement.value ? 1 : 0;

  // Обновление стилей прогресс-бара и значения оценки
  const gradeData = passwordGrades.find(g => grade >= g.grade);
  progressElement.style.width = gradeData.percent;
  progressElement.style.backgroundColor = gradeData.color;
  gradeValueElement.textContent = gradeData.value;
});
