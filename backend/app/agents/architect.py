import logging

from app.prompts.architect_prompts import ARCHITECT_SYSTEM_PROMPT, build_architect_user_prompt
from app.services.llm_service import LLMServiceError, get_llm_service

logger = logging.getLogger(__name__)


class ArchitectAgent:
    """
    Generates a software architecture recommendation for a described project
    by prompting an LLM (served via Fireworks AI on AMD hardware) and
    returning structured, validated JSON.
    """

    def generate_architecture(self, project_name: str, description: str = "") -> dict:
        llm = get_llm_service()

        try:
            result = llm.complete_json(
                system_prompt=ARCHITECT_SYSTEM_PROMPT,
                user_prompt=build_architect_user_prompt(project_name, description),
            )
        except LLMServiceError as exc:
            logger.error("ArchitectAgent LLM call failed: %s", exc)
            return {
                "project": project_name,
                "error": str(exc),
                "message": (
                    f"Could not generate architecture for {project_name}. "
                    "Check that GEMINI_API_KEY is set in backend/.env."
                ),
            }

        return {
            "project": project_name,
            "summary": result.get("summary", ""),
            "tech_stack": result.get("tech_stack", {}),
            "folder_structure": result.get("folder_structure", []),
            "architecture": result,
            "api_endpoints": result.get("api_endpoints", []),
            "database_schema": result.get("database_schema", []),
            "development_roadmap": result.get("development_roadmap", []),
            "deployment": result.get("deployment", {}),
            "security_considerations": result.get("security_considerations", []),
            "risks": result.get("risks", []),
            "message": f"Architecture generated successfully for {project_name}",
        }
