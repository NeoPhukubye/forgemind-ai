import api from "./api";

export async function getDashboardStatus() {
    const response = await api.get("/dashboard");
    return response.data;
}

export async function runPlanner(projectName, description) {
    const response = await api.post("/planner", {
        project_name: projectName,
        description,
    });
    return response.data;
}

export async function runCoder(projectName, description, language) {
    const response = await api.post("/coder", {
        project_name: projectName,
        description,
        language,
    });
    return response.data;
}

export async function runDebugger(code, description, language) {
    const response = await api.post("/debugger", {
        code,
        description,
        language,
    });
    return response.data;
}

export async function runTestGenerator(code, description, language) {
    const response = await api.post("/tests", {
        code,
        description,
        language,
    });
    return response.data;
}

export async function runDocumentation(projectName, description, code) {
    const response = await api.post("/documentation", {
        project_name: projectName,
        description,
        code,
    });
    return response.data;
}
