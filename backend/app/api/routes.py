from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.architect import ArchitectAgent
from app.agents.documentation import DocumentationAgent
from app.agents.generator import CoderAgent
from app.agents.planner import PlannerAgent
from app.agents.reviewer import DebuggerAgent
from app.agents.tester import TestGeneratorAgent

router = APIRouter()

architect = ArchitectAgent()
planner = PlannerAgent()
coder = CoderAgent()
debugger = DebuggerAgent()
test_generator = TestGeneratorAgent()
documentation = DocumentationAgent()


class ArchitectRequest(BaseModel):
    project_name: str
    description: str = ""


class ProjectRequest(BaseModel):
    project_name: str
    description: str = ""
    language: str = ""


class CodeRequest(BaseModel):
    code: str
    description: str = ""
    language: str = ""
    project_name: str = "Untitled Project"


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


@router.post("/planner")
def planner_post(payload: ProjectRequest):
    return planner.generate_plan(payload.project_name, payload.description)


@router.post("/coder")
def coder_post(payload: ProjectRequest):
    return coder.generate_code(payload.project_name, payload.description, payload.language or "python")


@router.post("/debugger")
def debugger_post(payload: CodeRequest):
    return debugger.debug_code(payload.code, payload.description, payload.language)


@router.post("/tests")
def tests_post(payload: CodeRequest):
    return test_generator.generate_tests(payload.code, payload.description, payload.language)


@router.post("/documentation")
def documentation_post(payload: CodeRequest):
    return documentation.generate_docs(payload.project_name, payload.description, payload.code)


@router.get("/dashboard")
def dashboard_get():
    return {
        "project": "ForgeMind AI",
        "completed": [
            "FastAPI backend",
            "React frontend",
            "Architect Agent",
            "Swagger API documentation",
            "AI model integration with Gemma via Fireworks AI",
            "Planner Agent",
            "Coder Agent",
            "Debugger Agent",
            "Test Generator Agent",
            "Documentation Agent",
            "Docker Compose deployment files",
        ],
        "next": [
            "Authentication",
            "Persistent project dashboard",
            "AMD GPU deployment proof and benchmark notes",
        ],
    }
