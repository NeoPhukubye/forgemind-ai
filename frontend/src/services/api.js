import axios from "axios";

// Render cloud backend URL - GitHub Pages calls this
const BACKEND_URL = "https://forgemind-ai-gmcg.onrender.com";

const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 30000,
});

console.log("✅ API Service initialized with baseURL:", BACKEND_URL);

export default api;
