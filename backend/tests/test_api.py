from unittest.mock import AsyncMock, patch

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest_asyncio.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest.mark.asyncio
async def test_root(client):
    resp = await client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"] == "ForgeMind AI"
    assert "version" in data


@pytest.mark.anyio
async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert data["provider"] == "gemini"


@pytest.mark.anyio
async def test_dashboard(client):
    resp = await client.get("/dashboard")
    assert resp.status_code == 200
    data = resp.json()
    assert "agents" in data
    assert len(data["agents"]) == 6


@pytest.mark.anyio
@patch("app.agents.architect.get_llm_service")
async def test_architect_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete_json.return_value = {
        "summary": "A test project",
        "tech_stack": {"frontend": "React"},
        "folder_structure": ["src/"],
        "api_endpoints": [],
        "database_schema": [],
        "development_roadmap": [],
        "deployment": {},
        "security_considerations": [],
        "risks": [],
    }
    mock_llm.return_value = mock_service

    resp = await client.post("/architect", json={
        "project_name": "TestProject",
        "description": "A test app",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "TestProject"
    assert data["summary"] == "A test project"


@pytest.mark.anyio
@patch("app.agents.planner.get_llm_service")
async def test_planner_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "# Sprint 1\n- Task A"
    mock_llm.return_value = mock_service

    resp = await client.post("/planner", json={
        "project_name": "TestProject",
        "description": "Plan a todo app",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "TestProject"
    assert "Sprint 1" in data["plan"]


@pytest.mark.anyio
@patch("app.agents.generator.get_llm_service")
async def test_coder_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "def hello():\n    return 'world'"
    mock_llm.return_value = mock_service

    resp = await client.post("/coder", json={
        "project_name": "TestProject",
        "description": "Hello world function",
        "language": "python",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "code" in data


@pytest.mark.anyio
@patch("app.agents.reviewer.get_llm_service")
async def test_debugger_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "Bug: off-by-one error on line 3"
    mock_llm.return_value = mock_service

    resp = await client.post("/debugger", json={
        "code": "for i in range(10): print(i)",
        "description": "loop issue",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "debug_report" in data


@pytest.mark.anyio
@patch("app.agents.tester.get_llm_service")
async def test_tests_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "def test_add(): assert add(1,2) == 3"
    mock_llm.return_value = mock_service

    resp = await client.post("/tests", json={
        "code": "def add(a,b): return a+b",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "tests" in data


@pytest.mark.anyio
@patch("app.agents.documentation.get_llm_service")
async def test_documentation_post(mock_llm, client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "# MyProject\nSetup instructions..."
    mock_llm.return_value = mock_service

    resp = await client.post("/documentation", json={
        "project_name": "MyProject",
        "description": "A web app",
        "code": "app = Flask(__name__)",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "MyProject"
    assert "documentation" in data


@pytest.mark.anyio
async def test_analyze_empty_code(client):
    resp = await client.post("/api/analyze", json={"code": "   "})
    assert resp.status_code == 400


@pytest.mark.anyio
async def test_rate_limit(client):
    for _ in range(10):
        await client.post("/architect", json={"project_name": "X"})
    resp = await client.post("/architect", json={"project_name": "X"})
    assert resp.status_code == 429
