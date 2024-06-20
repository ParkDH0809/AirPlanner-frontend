import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_VUE_API_URL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

export default instance;
