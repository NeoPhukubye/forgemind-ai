from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from app.api.routes import router as api_router
from app.core.config import get_settings
from app.services.security_service import SecurityOrchestrator

app = FastAPI(title="ForgeMind AI - Hackathon Core Backend")

# Allow requests from GitHub Pages and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://neophukubye.github.io",
        "https://forgemind-ai-gmcg.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = SecurityOrchestrator()
app.include_router(api_router)


class CodePayload(BaseModel):
    code: str



@app.get("/")
def root():
    settings = get_settings()
    return {
        "name": "ForgeMind AI",
        "message": "Backend is running successfully!",
    }


@app.get("/health")
def health():
    settings = get_settings()
    return {
        "status": "ok",
        "environment": settings.environment,
    }


@app.post("/api/analyze")
async def analyze_code(payload: CodePayload):
    if not payload.code.strip():
        raise HTTPException(status_code=400, detail="Code snippet cannot be empty.")

    result = await orchestrator.analyze_and_patch(payload.code)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
