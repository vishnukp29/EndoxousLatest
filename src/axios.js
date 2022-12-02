import axios from "axios";
import { BASE_URL } from "./constants/constants";

const token = JSON.parse(localStorage.getItem("token"));
console.log(token,"========== token in axios");

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000,
  headers:{Authorization: `Bearer ${token}`},
});

export default instance;

