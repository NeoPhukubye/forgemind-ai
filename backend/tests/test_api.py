"""Tests for ForgeMind AI API including authentication."""

from unittest.mock import AsyncMock, patch

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest_asyncio.fixture
async def client():
    """Basic test client without authentication."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest_asyncio.fixture
async def auth_token(client):
    """Get an authentication token for the default admin user."""
    resp = await client.post(
        "/api/auth/login",
        data={"username": "admin@forgemind.ai", "password": "admin123"},
    )
    assert resp.status_code == 200
    return resp.json()["access_token"]


@pytest_asyncio.fixture
async def auth_client(client, auth_token):
    """Test client with authentication headers set."""
    client.headers["Authorization"] = f"Bearer {auth_token}"
    return client


# --- Public endpoint tests ---


@pytest.mark.asyncio
async def test_root(client):
    resp = await client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"] == "ForgeMind AI"
    assert "version" in data


@pytest.mark.asyncio
async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert data["provider"] == "gemini"


# --- Authentication tests ---


@pytest.mark.asyncio
async def test_login_success(client):
    resp = await client.post(
        "/api/auth/login",
        data={"username": "admin@forgemind.ai", "password": "admin123"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "Bearer"


@pytest.mark.asyncio
async def test_login_invalid_credentials(client):
    resp = await client.post(
        "/api/auth/login",
        data={"username": "admin@forgemind.ai", "password": "wrongpassword"},
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_register_success(client):
    resp = await client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@test.com",
            "password": "password123",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["username"] == "newuser"
    assert data["email"] == "newuser@test.com"


@pytest.mark.asyncio
async def test_register_duplicate_email(client):
    resp = await client.post(
        "/api/auth/register",
        json={
            "username": "admin",
            "email": "admin@forgemind.ai",
            "password": "password123",
        },
    )
    assert resp.status_code == 400


@pytest.mark.asyncio
async def test_register_invalid_password(client):
    resp = await client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "test@test.com",
            "password": "short",
        },
    )
    assert resp.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_get_user_profile(auth_client):
    resp = await auth_client.get("/api/auth/me")
    assert resp.status_code == 200
    data = resp.json()
    assert data["username"] == "admin"
    assert data["role"] == "admin"


@pytest.mark.asyncio
async def test_refresh_token(client):
    # Login first
    login_resp = await client.post(
        "/api/auth/login",
        data={"username": "admin@forgemind.ai", "password": "admin123"},
    )
    refresh_token = login_resp.json()["refresh_token"]

    resp = await client.post(
        "/api/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data


# --- Protected route tests ---


@pytest.mark.asyncio
async def test_protected_route_requires_auth(client):
    """Routes should require authentication."""
    resp = await client.get("/dashboard")
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_dashboard(auth_client):
    resp = await auth_client.get("/dashboard")
    assert resp.status_code == 200
    data = resp.json()
    assert "agents" in data
    assert len(data["agents"]) == 6


@pytest.mark.asyncio
@patch("app.agents.architect.get_llm_service")
async def test_architect_post(mock_llm, auth_client):
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

    resp = await auth_client.post("/architect", json={
        "project_name": "TestProject",
        "description": "A test app",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "TestProject"
    assert data["summary"] == "A test project"


@pytest.mark.asyncio
@patch("app.agents.planner.get_llm_service")
async def test_planner_post(mock_llm, auth_client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "# Sprint 1\n- Task A"
    mock_llm.return_value = mock_service

    resp = await auth_client.post("/planner", json={
        "project_name": "TestProject",
        "description": "Plan a todo app",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "TestProject"
    assert "Sprint 1" in data["plan"]


@pytest.mark.asyncio
@patch("app.agents.generator.get_llm_service")
async def test_coder_post(mock_llm, auth_client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "def hello():\n    return 'world'"
    mock_llm.return_value = mock_service

    resp = await auth_client.post("/coder", json={
        "project_name": "TestProject",
        "description": "Hello world function",
        "language": "python",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "code" in data


@pytest.mark.asyncio
@patch("app.agents.reviewer.get_llm_service")
async def test_debugger_post(mock_llm, auth_client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "Bug: off-by-one error on line 3"
    mock_llm.return_value = mock_service

    resp = await auth_client.post("/debugger", json={
        "code": "for i in range(10): print(i)",
        "description": "loop issue",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "debug_report" in data


@pytest.mark.asyncio
@patch("app.agents.tester.get_llm_service")
async def test_tests_post(mock_llm, auth_client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "def test_add(): assert add(1,2) == 3"
    mock_llm.return_value = mock_service

    resp = await auth_client.post("/tests", json={
        "code": "def add(a,b): return a+b",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "tests" in data


@pytest.mark.asyncio
@patch("app.agents.documentation.get_llm_service")
async def test_documentation_post(mock_llm, auth_client):
    mock_service = AsyncMock()
    mock_service.complete.return_value = "# MyProject\nSetup instructions..."
    mock_llm.return_value = mock_service

    resp = await auth_client.post("/documentation", json={
        "project_name": "MyProject",
        "description": "A web app",
        "code": "app = Flask(__name__)",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["project"] == "MyProject"
    assert "documentation" in data


# --- Validation tests ---


@pytest.mark.asyncio
async def test_analyze_empty_code(auth_client):
    resp = await auth_client.post("/api/analyze", json={"code": "   "})
    assert resp.status_code == 400


@pytest.mark.asyncio
async def test_architect_invalid_project_name(auth_client):
    """Test that too-short project names are rejected."""
    resp = await auth_client.post("/architect", json={
        "project_name": "",
        "description": "test",
    })
    assert resp.status_code == 422  # Validation error


# --- Rate limit test (must run last to avoid interfering with other tests) ---


@pytest.mark.asyncio
async def test_rate_limit():
    """Test rate limiting (unauthenticated requests)."""
    from httpx import ASGITransport, AsyncClient

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as fresh_client:
        for _ in range(10):
            resp = await fresh_client.post("/architect", json={"project_name": "X"})
            # Should get 401 (unauthorized) not 429 (rate limit) for first 10 requests
            assert resp.status_code == 401
        resp = await fresh_client.post("/architect", json={"project_name": "X"})
        assert resp.status_code == 429