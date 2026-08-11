import axios from "axios";

// Central axios instance so base URL and headers are configured once
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;