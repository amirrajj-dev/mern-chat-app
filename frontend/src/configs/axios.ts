import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_FRONTEND_URL || "http://localhost:5000",
    withCredentials : true
})