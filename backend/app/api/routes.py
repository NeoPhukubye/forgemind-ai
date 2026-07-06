from fastapi import APIRouter
from app.agents.architect import ArchitectAgent

router = APIRouter()

architect = ArchitectAgent()


@router.get("/architect/{project_name}")
def architect_plan(project_name: str):
    return architect.generate_architecture(project_name)