 import axios from 'axios';

const api = axios.create({
     baseURL: '', 
});

  api.interceptors.request.use(
    (config) => {
        const userInfoString = localStorage.getItem('userInfo');

        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            
            if (userInfo && userInfo.token) {
                config.headers.Authorization = `Bearer ${userInfo.token}`;
            }
        }
        
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

export default api;