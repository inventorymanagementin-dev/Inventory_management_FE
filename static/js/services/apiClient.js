import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm';

// Get base URL. For static files served from Django, process.env is not available.
// We can hardcode it or read it from a global variable set in base.html.
const API_BASE_URL = window.API_BASE_URL || 'http://10.227.56.251:5000/api';
window.API_BASE_URL = API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)    
);

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login/';
        }

        const customError = {
            message: 'An unexpected error occurred',
            status: error.response?.status,
            data: error.response?.data,
        };
        if (error.response) {
            customError.message = error.response.data?.error || error.response.data?.message || 'Server Error';
        } else if (error.request) {
            customError.message = 'Network Error: No response received from server';
        } else {
            customError.message = error.message;
        }
        console.error('API Error:', customError);
        return Promise.reject(customError);
    }
);

export default apiClient;
