import api from "./api";

export async function generateArchitecture(projectName, description = "") {
    const response = await api.post("/architect", {
        project_name: projectName,
        description,
    });
    return response.data;
}
