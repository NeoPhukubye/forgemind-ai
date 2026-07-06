class ArchitectAgent:
    def generate_architecture(self, project_name: str):
        return {
            "project": project_name,
            "architecture": [
                "Frontend (React)",
                "Backend (FastAPI)",
                "Database (PostgreSQL)",
                "AI Layer",
                "Docker Deployment"
            ],
            "message": f"Architecture generated for {project_name}"
        }