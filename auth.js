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
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--primary"
      >
      Войти
    </button>
  </form>
    
    `;
}
