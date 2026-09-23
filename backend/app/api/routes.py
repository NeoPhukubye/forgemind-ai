from fastapi import APIRouter, Depends, HTTPException, status

from app.agents.architect import ArchitectAgent
from app.agents.documentation import DocumentationAgent
from app.agents.generator import CoderAgent
from app.agents.planner import PlannerAgent
from app.agents.reviewer import DebuggerAgent
from app.agents.tester import TestGeneratorAgent
from app.models import UserStore, get_user_store
from app.schemas import (
    ArchitectRequest,
    CodeRequest,
    CodePayload,
    ProjectRequest,
    UserProfile,
)
from app.security import get_current_active_user

router = APIRouter()

architect = ArchitectAgent()
planner = PlannerAgent()
coder = CoderAgent()
debugger = DebuggerAgent()
test_generator = TestGeneratorAgent()
documentation = DocumentationAgent()


@router.post("/architect")
async def architect_plan_post(
    payload: ArchitectRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await architect.generate_architecture(payload.project_name, payload.description)


@router.get("/architect/{project_name}")
async def architect_plan_get(
    project_name: str,
    current_user: dict = Depends(get_current_active_user),
):
    return await architect.generate_architecture(project_name)


@router.post("/planner")
async def planner_post(
    payload: ProjectRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await planner.generate_plan(payload.project_name, payload.description)


@router.post("/coder")
async def coder_post(
    payload: ProjectRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await coder.generate_code(payload.project_name, payload.description, payload.language or "python")


@router.post("/debugger")
async def debugger_post(
    payload: CodeRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await debugger.debug_code(payload.code, payload.description, payload.language)


@router.post("/tests")
async def tests_post(
    payload: CodeRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await test_generator.generate_tests(payload.code, payload.description, payload.language)


@router.post("/documentation")
async def documentation_post(
    payload: CodeRequest,
    current_user: dict = Depends(get_current_active_user),
):
    return await documentation.generate_docs(payload.project_name, payload.description, payload.code)


@router.get("/dashboard")
async def dashboard_get(
    current_user: dict = Depends(get_current_active_user),
):
    return {
        "project": "ForgeMind AI",
        "agents": [
            {"name": "Architect", "endpoint": "/architect", "status": "active"},
            {"name": "Planner", "endpoint": "/planner", "status": "active"},
            {"name": "Coder", "endpoint": "/coder", "status": "active"},
            {"name": "Debugger", "endpoint": "/debugger", "status": "active"},
            {"name": "Test Generator", "endpoint": "/tests", "status": "active"},
            {"name": "Documentation", "endpoint": "/documentation", "status": "active"},
        ],
        "completed": [
            "FastAPI backend",
            "React frontend",
            "Architect Agent",
            "Planner Agent",
            "Coder Agent",
            "Debugger Agent",
            "Test Generator Agent",
            "Documentation Agent",
            "Docker Compose deployment",
            "Async LLM integration",
        ],
        "next": [
            "Authentication",
            "Persistent project dashboard",
            "AMD GPU deployment benchmarks",
        ],
    }
