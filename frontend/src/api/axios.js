// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
    }
});

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;