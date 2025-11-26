import axios from "axios";

const api = axios.create({
    baseURL: "https://cycluno-backend-development-service.onrender.com",
    withCredentials: false,
});

export default api;