import axios from "axios";

const attraction_instance = axios.create({
  baseURL: import.meta.env.VITE_ATTRACTION_API_URL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});
export default attraction_instance;
