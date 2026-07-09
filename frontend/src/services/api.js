import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://forgemind-ai-gmcg.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;