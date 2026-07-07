from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.services.security_service import SecurityOrchestrator

app = FastAPI(title="SecurityCopilot AI - Hackathon Core Backend")
orchestrator = SecurityOrchestrator()

class CodePayload(BaseModel):
    code: str

@app.post("/api/analyze")
async def analyze_code(payload: CodePayload):
    if not payload.code.strip():
        raise HTTPException(status_code=400, detail="Code snippet cannot be empty.")

    result = await orchestrator.analyze_and_patch(payload.code)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)