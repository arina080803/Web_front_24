document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const commentsContainer = document.getElementById("comments-container");

    // Выполнение запроса
    const fetchComments = async (filterType = "high") => {
        try {
            // Показать preloader
            preloader.style.display = "block";
            commentsContainer.innerHTML = ""; // Очистить контейнер

            // Генерация URL для фильтрации
            const url = filterType === "high"
                ? "https://jsonplaceholder.typicode.com/comments?id_gte=100"
                : "https://jsonplaceholder.typicode.com/comments?id_lte=200";

            const response = await fetch(url);

            // Проверка
            if (!response.ok) throw new Error("Ошибка сети");

            // Преобразование данных в JSON
            const data = await response.json();

            // Скрыть preloader
            preloader.style.display = "none";

            // Отображение комментариев
            renderComments(data);
        } catch (error) {
            preloader.style.display = "none";
            commentsContainer.innerHTML = `<p class="error">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    };

    // Рендеринг комментариев
    const renderComments = (comments) => {
        console.log("Рендеринг комментариев...");
    
        // до 5 комментариев
        const limitedComments = comments.slice(0, 5);
    
        commentsContainer.innerHTML = "";
        limitedComments.forEach(comment => {
            const commentHTML = `
                <div class="comment">
                    <h4>${comment.name}</h4>
                    <p><strong>Email:</strong> ${comment.email}</p>
                    <p>${comment.body}</p>
                </div>
            `;
            commentsContainer.innerHTML += commentHTML;
        });
    };

    // Первичная загрузка
    fetchComments();

    // Случайная фильтрация при повторной загрузке
    setInterval(() => {
        const filterType = Math.random() > 0.5 ? "high" : "low"; /* "high": id > 100, "low": id <= 100*/
        fetchComments(filterType);
    }, 60000); // Обновление каждые 60 секунд
});
