"""OAuth2 JWT authentication and security utilities."""

from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.config import get_settings

# --- Security configuration ---
settings = get_settings()
SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 7 * 24 * 60  # 7 days

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login", auto_error=True)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its bcrypt hash."""
    # bcrypt truncates passwords to 72 bytes
    return bcrypt.checkpw(
        plain_password[:72].encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt (truncated to 72 bytes for bcrypt compatibility)."""
    return bcrypt.hashpw(password[:72].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict) -> str:
    """Create a JWT refresh token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc), "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Dependency to get the current authenticated user from a JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_token(token)
    if payload is None:
        raise credentials_exception

    # Check token type
    if payload.get("type") == "refresh":
        raise credentials_exception

    user_id = payload.get("user_id")
    username = payload.get("username")
    email = payload.get("email")
    role = payload.get("role")

    if user_id is None or username is None:
        raise credentials_exception

    return {
        "user_id": user_id,
        "username": username,
        "email": email,
        "role": role,
    }


async def get_current_active_user(
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Dependency to get the current active user."""
    if not current_user.get("is_active", True):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user")
    return current_user


def require_role(required_role: str):
    """Dependency factory to require a specific user role."""

    async def role_checker(
        current_user: dict = Depends(get_current_active_user),
    ) -> dict:
        if current_user.get("role") != required_role and current_user.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user

    return role_checker


def require_admin():
    """Dependency to require admin role."""
    return require_role("admin")