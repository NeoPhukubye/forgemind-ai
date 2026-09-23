"""Pydantic schemas for input validation and request models."""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class UserRole(str, Enum):
    """User roles for RBAC."""

    ADMIN = "admin"
    STANDARD = "standard"


class TokenType(str, Enum):
    """Token type for refresh tokens."""

    ACCESS = "access"
    REFRESH = "refresh"


class UserRegister(BaseModel):
    """Schema for user registration."""

    username: str = Field(..., min_length=3, max_length=50, description="Username")
    email: str = Field(..., description="Email address")
    password: str = Field(..., min_length=8, max_length=128, description="Password")
    role: UserRole = UserRole.STANDARD

    @field_validator("username")
    @classmethod
    def sanitize_username(cls, v: str) -> str:
        """Strip control characters and whitespace."""
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("email")
    @classmethod
    def sanitize_email(cls, v: str) -> str:
        """Basic email sanitization."""
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip().lower()


class UserLogin(BaseModel):
    """Schema for user login."""

    email: str = Field(..., description="Email address")
    password: str = Field(..., min_length=1, description="Password")

    @field_validator("email")
    @classmethod
    def sanitize_email(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip().lower()


class TokenResponse(BaseModel):
    """Schema for token response."""

    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    expires_in: int


class RefreshTokenRequest(BaseModel):
    """Schema for refresh token request."""

    refresh_token: str = Field(..., description="Refresh token")


class ArchitectRequest(BaseModel):
    """Validated request for architect endpoint."""

    project_name: str = Field(..., min_length=1, max_length=200, description="Project name")
    description: str = Field(default="", max_length=2000, description="Project description")

    @field_validator("project_name")
    @classmethod
    def sanitize_project_name(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("description")
    @classmethod
    def sanitize_description(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()


class ProjectRequest(BaseModel):
    """Validated request for project endpoints."""

    project_name: str = Field(..., min_length=1, max_length=200, description="Project name")
    description: str = Field(default="", max_length=2000, description="Project description")
    language: str = Field(default="", max_length=50, description="Programming language")

    @field_validator("project_name")
    @classmethod
    def sanitize_project_name(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("description")
    @classmethod
    def sanitize_description(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("language")
    @classmethod
    def sanitize_language(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()


class CodeRequest(BaseModel):
    """Validated request for code endpoints."""

    code: str = Field(..., min_length=1, max_length=50000, description="Code content")
    description: str = Field(default="", max_length=2000, description="Code description")
    language: str = Field(default="", max_length=50, description="Programming language")
    project_name: str = Field(default="Untitled Project", max_length=200, description="Project name")

    @field_validator("code")
    @classmethod
    def sanitize_code(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("description")
    @classmethod
    def sanitize_description(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("language")
    @classmethod
    def sanitize_language(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()

    @field_validator("project_name")
    @classmethod
    def sanitize_project_name(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()


class CodePayload(BaseModel):
    """Validated request for code analysis endpoint."""

    code: str = Field(..., min_length=1, max_length=50000, description="Code content")

    @field_validator("code")
    @classmethod
    def sanitize_code(cls, v: str) -> str:
        import re

        cleaned = re.sub(r"[\x00-\x1f\x7f-\x9f]", "", v)
        return cleaned.strip()


class UserProfile(BaseModel):
    """User profile response schema."""

    id: int
    username: str
    email: str
    role: UserRole
    is_active: bool = True
    created_at: Optional[str] = None

    model_config = {"from_attributes": True}


class UserResponse(BaseModel):
    """User creation response schema."""

    id: int
    username: str
    email: str
    role: UserRole

    model_config = {"from_attributes": True}