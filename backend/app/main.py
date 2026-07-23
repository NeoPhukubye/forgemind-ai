import time
from collections import defaultdict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from app.api.routes import router as api_router
from app.core.config import get_settings
from app.services.security_service import SecurityOrchestrator

app = FastAPI(
    title="ForgeMind AI",
    description="Multi-agent AI software engineering assistant",
    version="2.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://neophukubye.github.io",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Rate Limiting ---
RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW = 60  # seconds
_request_counts: dict[str, list[float]] = defaultdict(list)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.method == "POST":
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        timestamps = _request_counts[client_ip]
        # Remove old timestamps outside the window
        _request_counts[client_ip] = [t for t in timestamps if now - t < RATE_LIMIT_WINDOW]
        if len(_request_counts[client_ip]) >= RATE_LIMIT_REQUESTS:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Try again later."},
            )
        _request_counts[client_ip].append(now)
    return await call_next(request)


# --- Global Error Handler ---
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred. Please try again.",
            "error_type": type(exc).__name__,
        },
    )


orchestrator = SecurityOrchestrator()

# Register API routes
app.include_router(api_router)


class CodePayload(BaseModel):
    code: str


@app.get("/")
async def root():
    return {
        "name": "ForgeMind AI",
        "version": "2.0.0",
        "message": "Backend is running successfully!",
    }


@app.get("/health")
async def health():
    settings = get_settings()
    return {
        "status": "ok",
        "environment": settings.environment,
        "provider": "gemini",
        "model": settings.gemini_model,
    }


@app.post("/api/analyze")
async def analyze_code(payload: CodePayload):
    if not payload.code.strip():
        raise HTTPException(
            status_code=400,
            detail="Code snippet cannot be empty.",
        )

    result = await orchestrator.analyze_and_patch(payload.code)
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
