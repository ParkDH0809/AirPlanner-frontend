import { createApp } from "vue";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps/@utils";
import { createPersistedState } from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
useKakao(VITE_KAKAO_MAP_API_KEY);
const app = createApp(App);
const pinia = createPinia();

pinia.use(
  createPersistedState({
    storage: localStorage,
    auto: true,
  })
);

app.use(pinia);
app.use(router);
app.mount("#app");
