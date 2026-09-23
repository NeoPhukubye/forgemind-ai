"""Authentication routes for login, register, and token refresh."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models import UserStore, get_user_store
from app.schemas import (
    TokenResponse,
    RefreshTokenRequest,
    UserRegister,
    UserProfile,
    UserResponse,
)
from app.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_active_user,
)

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    payload: UserRegister,
    store: UserStore = Depends(get_user_store),
):
    """Register a new user account."""
    existing = store.get_by_email(payload.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = store.register(
        username=payload.username,
        email=payload.email,
        password=payload.password,
        role=payload.role,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration failed",
        )

    return UserResponse(
        id=user.id,
        username=user.username,
        email=user.email,
        role=user.role,
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    store: UserStore = Depends(get_user_store),
):
    """Authenticate user and return JWT tokens."""
    user = store.get_by_email(form_data.username)
    if not user or not store.verify_password(user, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "type": "access",
        }
    )
    refresh_token = create_refresh_token(
        data={
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    )

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="Bearer",
        expires_in=30 * 60,  # 30 minutes in seconds
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(payload: RefreshTokenRequest):
    """Refresh the access token using a valid refresh token."""
    decoded = decode_token(payload.refresh_token)
    if not decoded or decoded.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = decoded.get("user_id")
    username = decoded.get("username")
    email = decoded.get("email")
    role = decoded.get("role")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    access_token = create_access_token(
        data={
            "user_id": user_id,
            "username": username,
            "email": email,
            "role": role,
            "type": "access",
        }
    )

    return TokenResponse(
        access_token=access_token,
        refresh_token=payload.refresh_token,
        token_type="Bearer",
        expires_in=30 * 60,
    )


@router.get("/me", response_model=UserProfile)
async def get_current_user_profile(
    current_user: dict = Depends(get_current_active_user),
):
    """Get the current authenticated user's profile."""
    store = get_user_store()
    user = store.get_by_id(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return UserProfile(
        id=user.id,
        username=user.username,
        email=user.email,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at.isoformat(),
    )