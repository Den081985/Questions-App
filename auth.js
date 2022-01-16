//фнкция,генерирующая HTML для окна авторизации

export function getAuthHtml() {
  return `
    <form class="mui-form" id="auth-form">
    <d class="mui-textfield mui-textfield--float-label">
      <input
        type="email"
        id="email"
        required
        />
      <label for="email">Email:</label>
    </d>
    <d class="mui-textfield mui-textfield--float-label">
      <input
        type="password"
        id="password"
        required
        />
      <label for="password">Пароль:</label>
    </d>
    <button
      id="submit-btn"
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--primary"
      >
      Войти
    </button>
  </form>
    
    `;
}
//функция для авторизации пользователя с email и паролем
//запрос на auth REST API firebase с API_KEY
export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyD4yWr-5pKa1zc8sM_GaQEyz4UpkqnD57g";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken); //idToken получаем с ответом от сервера
}
