<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Войти</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
// Компонент страницы входа. Использует публичный API ReqRes.in для авторизации.
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      // Простая валидация
      if (!this.email || !this.password) {
        this.error = "Пожалуйста, заполните все поля.";
        return;
      }
      try {
        // Запрос к ReqRes.in с добавленным заголовком x-api-key
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });
        const data = await response.json();
        if (response.ok && data.token) {
          // Сохраняем токен в localStorage
          localStorage.setItem("token", data.token);
          // Переход на страницу погоды
          this.$router.push("/weather");
        } else {
          this.error = data.error || "Ошибка авторизации.";
        }
      } catch (e) {
        this.error = "Ошибка сети. Попробуйте позже.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
