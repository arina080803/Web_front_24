document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheduleForm');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const saveSettingsButton = document.getElementById('saveSettings');
    const loadSettingsButton = document.getElementById('loadSettings');
    const appendScheduleButton = document.getElementById('appendSchedule');
    const clearScheduleButton = document.getElementById('clearScheduleButton');

    const dateInput = document.getElementById('sessionDate');
    const today = new Date();
    const currentYear = today.getFullYear();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = `${currentYear}-12-31`;
    dateInput.setAttribute('min', minDate);
    dateInput.setAttribute('max', maxDate);

    function loadTableFromLocalStorage() {
        const savedSchedule = localStorage.getItem('scheduleTable');
        if (savedSchedule) {
            scheduleContainer.innerHTML = savedSchedule;
            addDeleteButtonsEventListeners();
        }
    }

    function saveTableToLocalStorage() {
        localStorage.setItem('scheduleTable', scheduleContainer.innerHTML);
    }

    function createTable() {
        if (!scheduleContainer.querySelector('.table')) {
            const tableDiv = document.createElement('div');
            tableDiv.classList.add('table');
            
            const headers = ['Дата', 'Время', 'Тренер', 'Тип тренировки', 'Изменить'];
            
            headers.forEach(headerText => {
                const headerDiv = document.createElement('div');
                headerDiv.classList.add('table__header');
                headerDiv.textContent = headerText;
                tableDiv.appendChild(headerDiv);
            });
            
            scheduleContainer.appendChild(tableDiv);
        }
    }

    // Функция добавления строки в таблицу
    function addScheduleRow() {
        const sessionTime = document.getElementById('sessionTime').value;
        const sessionDate = document.getElementById('sessionDate').value;
        const coach = document.getElementById('coach').value;
        const trainingType = document.getElementById('trainingType').value;

        // Создаем таблицу, если ее еще нет
        createTable();

        // Создаем новую строку с кнопкой "Удалить"
        const rowHTML = `
            <div class="table__row">${sessionDate}</div>
            <div class="table__row">${sessionTime}</div>
            <div class="table__row">${coach}</div>
            <div class="table__row">${trainingType}</div>
            <div class="table__row">
                <button class="delete-row-btn">Удалить</button>
            </div>`;
        
        scheduleContainer.querySelector('.table').innerHTML += rowHTML;

        saveTableToLocalStorage();

        // Обработчики для кнопок удаления
        addDeleteButtonsEventListeners();
    }

    function generateNewSchedule() {
        scheduleContainer.innerHTML = '';
        addScheduleRow(); 
    }

    // Обработчик для кнопки "Сгенерировать расписание"
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        generateNewSchedule();
    });

    // Обработчик для кнопки "Дополнить расписание"
    appendScheduleButton.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение кнопки
        addScheduleRow();
    });

    // Добавляем обработчики событий на кнопки удаления
    function addDeleteButtonsEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-row-btn');
        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', () => deleteRow(index));
        });
    }

    // Удаление строки по индексу
    function deleteRow(index) {
        const rows = Array.from(scheduleContainer.querySelectorAll('.table__row'));
        const startIdx = index * 5;
        rows.slice(startIdx - 5, startIdx).forEach(row => row.remove());
        saveTableToLocalStorage();
    }

    // Обработчик для кнопки "Очистить расписание"
    //clearScheduleButton.addEventListener('click', () => {
        // Очищаем содержимое контейнера расписания
        //scheduleContainer.innerHTML = '';

        // Удаляем сохраненные данные расписания из localStorage
        //localStorage.removeItem('scheduleTable');

        //alert('Расписание очищено!');
    //});

    // Сохранение настроек формы в localStorage
    saveSettingsButton.addEventListener('click', () => {
        const settings = {
            sessionTime: document.getElementById('sessionTime').value,
            sessionDate: document.getElementById('sessionDate').value,
            coach: document.getElementById('coach').value,
            trainingType: document.getElementById('trainingType').value
        };
        localStorage.setItem('scheduleSettings', JSON.stringify(settings));
        alert('Настройки сохранены!');
    });

    // Загрузка настроек формы из localStorage
    loadSettingsButton.addEventListener('click', () => {
        const savedSettings = localStorage.getItem('scheduleSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            document.getElementById('sessionTime').value = settings.sessionTime;
            document.getElementById('sessionDate').value = settings.sessionDate;
            document.getElementById('coach').value = settings.coach;
            document.getElementById('trainingType').value = settings.trainingType;
            alert('Настройки загружены!');
        } else {
            alert('Нет сохраненных настроек.');
        }
    });

    // Загрузка таблицы из localStorage при загрузке страницы
    loadTableFromLocalStorage();
});
