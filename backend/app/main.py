from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="ForgeMind AI",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Welcome to ForgeMind AI 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }