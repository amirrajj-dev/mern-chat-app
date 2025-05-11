import axios from 'axios'
// import.meta.env.VITE_FRONTEND_URL || "http://localhost:5000"
export const axiosInstance = axios.create({
    baseURL : 'https://mern-chat-app-pvv3.onrender.com',
    withCredentials : true
})