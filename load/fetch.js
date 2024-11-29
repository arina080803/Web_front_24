document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const commentsContainer = document.getElementById("comments-container");

    const clearContainer = (container) => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    const fetchComments = async (filterType = "high") => {
        try {
            preloader.style.display = "block";
            clearContainer(commentsContainer);

  
            const url = filterType === "high"
                ? "https://jsonplaceholder.typicode.com/comments?id_gte=100"
                : "https://jsonplaceholder.typicode.com/comments?id_lte=200";

            const response = await fetch(url);

            if (!response.ok) throw new Error("Ошибка сети");

            const data = await response.json();

            preloader.style.display = "none";

            renderComments(data);
        } catch (error) {
            preloader.style.display = "none";
            clearContainer(commentsContainer);
            const errorEl = document.createElement("p");
            errorEl.classList.add("error");
            errorEl.textContent = `⚠ Что-то пошло не так: ${error.message}`;
            commentsContainer.appendChild(errorEl);
        }
    };


    const renderComments = (comments) => {
        console.log("Рендеринг комментариев...");
    
        const limitedComments = comments.slice(0, 5);
    
        clearContainer(commentsContainer);
        limitedComments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            const title = document.createElement("h4");
            title.textContent = comment.name;

            const email = document.createElement("p");
            email.textContent = comment.email;

            const body = document.createElement("p");
            body.textContent = comment.body;

            commentDiv.appendChild(title);
            commentDiv.appendChild(email);
            commentDiv.appendChild(body);

            commentsContainer.appendChild(commentDiv);
        });
    };

    fetchComments();

    setInterval(() => {
        const filterType = Math.random() > 0.5 ? "high" : "low"; /* "high": id > 100, "low": id <= 100*/
        fetchComments(filterType);
    }, 60000);
});
