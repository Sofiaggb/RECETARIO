import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:2800';

const instance = axios.create({
    baseURL: url + '/api',
    withCredentials: true
});

export default instance