// Добавлен примитивный вариант регистрации по нажатию на кнопку. Открывается модальное окно (SweetAlert2).
// Пользователь водит данные. В случае пропуска поля (все поля являются обязательными) появляется окно с предупреждением (Notyf https://github.com/caroso1222/notyf) и ошибкой.
// При успешном заполнении полей регистрация завершается сообщением об успехе.

document.querySelector('.register-btn').addEventListener('click', () => {
  const notyf = new Notyf({
      duration: 5000,
      position: { x: 'right', y: 'top' } 
  });

  Swal.fire({
      title: 'Регистрация',
      html: `
          <div style="text-align: center; margin-bottom: 10px;">
              <label for="name" style="display: block; font-weight: bold; margin-bottom: 5px;">Имя:</label>
              <input type="text" id="name" class="swal2-input" placeholder="Введите имя" 
                     style="width: 80%; padding: 10px; margin: 0 auto; text-align: center;">
          </div>
          <div style="text-align: center; margin-bottom: 10px;">
              <label for="surname" style="display: block; font-weight: bold; margin-bottom: 5px;">Фамилия:</label>
              <input type="text" id="surname" class="swal2-input" placeholder="Введите фамилию" 
                     style="width: 80%; padding: 10px; margin: 0 auto; text-align: center;">
          </div>
          <div style="text-align: center; margin-bottom: 10px;">
              <label for="email" style="display: block; font-weight: bold; margin-bottom: 5px;">Email:</label>
              <input type="email" id="email" class="swal2-input" placeholder="Введите email" 
                     style="width: 80%; padding: 10px; margin: 0 auto; text-align: center;">
          </div>
          <div style="text-align: center;">
              <label for="status" style="display: block; font-weight: bold; margin-bottom: 5px;">Статус:</label>
              <select id="status" class="swal2-input" 
                      style="width: 80%; padding: 10px; margin: 0 auto; text-align: center;">
                  <option value="" disabled selected>Выберите статус</option>
                  <option value="Гость">Гость</option>
                  <option value="Член сборной">Член сборной</option>
                  <option value="Тренер">Тренер</option>
                  <option value="Администратор">Администратор</option>
                  <option value="Менеджер">Менеджер</option>
              </select>
          </div>
      `,
      width: '30%',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: () => {
          const name = document.getElementById('name').value.trim();
          const surname = document.getElementById('surname').value.trim();
          const email = document.getElementById('email').value.trim();
          const status = document.getElementById('status').value;

          if (!name || !surname || !email || !status) {
              notyf.error('Пожалуйста, заполните все поля!');
              return null;
          }

          return { name, surname, email, status };
      }
  }).then((result) => {
      if (result.isConfirmed && result.value) {
          // const { name, surname, email, status } = result.value;
          notyf.success(`Регистрация завершена!`);
      }
  });
});