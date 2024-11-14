const menuLinks = document.querySelectorAll('.nav__list-item a');

// Определяем текущий путь страницы
const currentPath = document.location.pathname.split("/").pop();

// Перебираем ссылки и сравниваем путь
menuLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
        // Добавляем класс 'active' к родительскому элементу <li>
        link.parentElement.classList.add('active');
    }
});