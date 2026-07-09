from app.services.llm_service import LLMServiceError, get_llm_service


class CoderAgent:
    def generate_code(self, project_name: str, description: str = "", language: str = "python") -> dict:
        try:
            llm = get_llm_service()
            content = llm.complete(
                system_prompt=(
                    "You are ForgeMind AI's Coder Agent. Generate clean, runnable code for the requested feature. "
                    "Prefer small, understandable modules. Include brief setup notes only when required."
                ),
                user_prompt=(
                    f"Project name: {project_name}\n"
                    f"Target language or stack: {language}\n"
                    f"Request: {description or 'Generate an MVP feature for this project.'}\n\n"
                    "Return the code and any essential usage notes."
                ),
                temperature=0.15,
            )
        except LLMServiceError as exc:
            return {"project": project_name, "error": str(exc)}

        return {
            "project": project_name,
            "code": content,
            "message": f"Coder Agent generated code for {project_name}.",
        }
