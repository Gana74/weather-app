import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import WeatherPage from "./components/WeatherPage.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/weather", component: WeatherPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
