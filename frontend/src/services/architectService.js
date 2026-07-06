import api from "./api";

export async function generateArchitecture(projectName) {
    const response = await api.get(`/architect/${projectName}`);
    return response.data;
}