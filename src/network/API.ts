import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env?.VITE_API || 'https://masterlearning.leedowork.id.vn/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

export default API;
