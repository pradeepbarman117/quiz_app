import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})



// Request Interceptor - Add token to all requests

apiClient.interceptors.request.use(
    (config,) => {
        const token = Cookies.get('session_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    });


// Response Interceptor - Handle token expiration


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized
            Cookies.remove('session_token');
            // window.location.href = '/auth/login';
        }
        if (error.response?.status === 403) {
            // Forbidden access
            window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
    }
)

export default apiClient;



