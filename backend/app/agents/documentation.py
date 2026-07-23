from app.services.llm_service import LLMServiceError, get_llm_service


class DocumentationAgent:
    async def generate_docs(self, project_name: str, description: str = "", code: str = "") -> dict:
        try:
            llm = get_llm_service()
            content = await llm.complete(
                system_prompt=(
                    "You are ForgeMind AI's Documentation Agent. Create clear developer-facing documentation. "
                    "Use Markdown. Include overview, setup, usage, API notes, and operational caveats where relevant."
                ),
                user_prompt=(
                    f"Project name: {project_name}\n"
                    f"Description: {description or 'No additional description provided.'}\n\n"
                    f"Code or context:\n{code or 'No code provided.'}\n\n"
                    "Generate documentation."
                ),
            )
        except LLMServiceError as exc:
            return {"project": project_name, "error": str(exc)}

        return {
            "project": project_name,
            "documentation": content,
            "message": f"Documentation Agent generated docs for {project_name}.",
        }
