import axios from "axios";

// Use your Render cloud backend URL
const api = axios.create({
    baseURL: "https://forgemind-ai-gmcg.onrender.com",
    timeout: 30000,
});

export default api;
