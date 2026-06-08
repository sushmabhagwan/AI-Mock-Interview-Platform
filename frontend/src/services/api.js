import axios from "axios";

const api = axios.create({
    baseURL:"https://ai-mock-interview-platform-7b9k.onrender.com"

});


api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;