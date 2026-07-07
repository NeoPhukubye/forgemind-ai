from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.architect import ArchitectAgent

router = APIRouter()

architect = ArchitectAgent()


class ArchitectRequest(BaseModel):
    project_name: str
    description: str = ""


@router.post("/architect")
def architect_plan_post(payload: ArchitectRequest):
    """
    Primary endpoint used by the frontend: takes a project name plus a
    description of what the user wants to build, and returns a real,
    LLM-generated architecture recommendation.
    """
    return architect.generate_architecture(payload.project_name, payload.description)


@router.get("/architect/{project_name}")
def architect_plan_get(project_name: str):
    """
    Kept for backwards compatibility / quick manual testing via /docs.
    Prefer POST /architect with a description for better results.
    """
    return architect.generate_architecture(project_name)
