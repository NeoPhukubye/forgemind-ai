import axios from "axios";

// Use your cloud backend URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://forgemind-ai-gmcg.onrender.com",
});

export default api;
