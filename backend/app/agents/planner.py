from app.services.llm_service import LLMServiceError, get_llm_service


class PlannerAgent:
    def generate_plan(self, project_name: str, description: str = "") -> dict:
        try:
            llm = get_llm_service()
            content = llm.complete(
                system_prompt=(
                    "You are ForgeMind AI's Planner Agent. Create a practical software delivery plan. "
                    "Use Markdown headings. Include milestones, user stories, tasks, acceptance criteria, "
                    "risks, and a realistic MVP scope."
                ),
                user_prompt=(
                    f"Project name: {project_name}\n"
                    f"Description: {description or 'No additional description provided.'}\n\n"
                    "Generate the project plan."
                ),
            )
        except LLMServiceError as exc:
            return {"project": project_name, "error": str(exc)}

        return {
            "project": project_name,
            "plan": content,
            "message": f"Planner Agent generated a delivery plan for {project_name}.",
        }
