"""User model with in-memory storage for ForgeMind AI."""

from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.schemas import UserRole
from app.security import get_password_hash


class User(BaseModel):
    """User model representing an authenticated user."""

    id: int
    username: str
    email: str
    hashed_password: str
    role: UserRole = UserRole.STANDARD
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {"from_attributes": True}


class UserStore:
    """In-memory user store with thread-safe operations."""

    def __init__(self):
        self._users: dict[str, User] = {}  # email -> User
        self._users_by_id: dict[int, User] = {}
        self._next_id = 1
        self._seed_default_users()

    def _seed_default_users(self):
        """Seed default users for testing and development."""
        self._add_user(
            username="admin",
            email="admin@forgemind.ai",
            password="admin123",
            role=UserRole.ADMIN,
        )
        self._add_user(
            username="standarduser",
            email="user@forgemind.ai",
            password="user123",
            role=UserRole.STANDARD,
        )

    def _add_user(
        self,
        username: str,
        email: str,
        password: str,
        role: UserRole = UserRole.STANDARD,
    ) -> User:
        user = User(
            id=self._next_id,
            username=username,
            email=email.lower(),
            hashed_password=get_password_hash(password),
            role=role,
        )
        self._users[email.lower()] = user
        self._users_by_id[self._next_id] = user
        self._next_id += 1
        return user

    def get_by_email(self, email: str) -> Optional[User]:
        """Get a user by email address."""
        return self._users.get(email.lower())

    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get a user by ID."""
        return self._users_by_id.get(user_id)

    def register(
        self,
        username: str,
        email: str,
        password: str,
        role: UserRole = UserRole.STANDARD,
    ) -> Optional[User]:
        """Register a new user. Returns None if email already exists."""
        if self._users.get(email.lower()):
            return None
        return self._add_user(username, email, password, role)

    def verify_password(self, user: User, password: str) -> bool:
        """Verify a password against a user's stored hash."""
        from app.security import verify_password

        return verify_password(password, user.hashed_password)


# Singleton user store instance
user_store = UserStore()


def get_user_store() -> UserStore:
    """Dependency injection for the user store."""
    return user_store