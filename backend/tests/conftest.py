"""Test fixtures and helpers for authenticated API tests."""

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


@pytest_asyncio.fixture
async def user_token(client):
    """Get an authentication token for the standard user."""
    resp = await client.post(
        "/api/auth/login",
        data={"username": "user@forgemind.ai", "password": "user123"},
    )
    assert resp.status_code == 200
    return resp.json()["access_token"]