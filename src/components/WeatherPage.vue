<template>
  <div class="weather-container">
    <h2>Погода в Москве</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p>Температура: {{ weather.temp }}°C</p>
      <p>Погодные условия: {{ weather.description }}</p>
      <p>Скорость ветра: {{ weather.wind }} м/с</p>
      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
// Компонент страницы прогноза погоды. Получает данные из OpenWeatherMap.
export default {
  name: "WeatherPage",
  data() {
    return {
      weather: {},
      loading: true,
      error: "",
    };
  },
  async created() {
    // Проверка авторизации
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
      return;
    }
    // Получение погоды
    try {
      // Замените YOUR_API_KEY на ваш ключ OpenWeatherMap
      const apiKey = "0502db31f80b281c7c82ac20c3816ecc";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric&lang=ru`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        this.weather = {
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          wind: data.wind.speed,
        };
      } else {
        this.error = data.message || "Ошибка получения данных о погоде.";
      }
    } catch (e) {
      this.error = "Ошибка сети. Попробуйте позже.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
