# ForgeMind AI User Guide

This guide explains how to set up and run ForgeMind AI locally.

ForgeMind AI has two apps:

- Backend: FastAPI API server in `backend/`
- Frontend: React/Vite web app in `frontend/`

The AI features use Google Gemma through Fireworks AI's OpenAI-compatible API.

## Prerequisites

Install these first:

- Python 3.10 or newer
- Node.js 20 or newer
- npm
- A Fireworks AI API key

## 1. Clone And Open The Project

```bash
git clone https://github.com/NeoPhukubye/forgemind-ai.git
cd forgemind-ai
```

If you already have the project, open the project folder:

```bash
cd /home/neophukubye/IdeaProjects/forgemind-ai
```

## 2. Configure Fireworks AI

Create or update `backend/.env`:

```env
FIREWORKS_API_KEY=your_real_fireworks_api_key
FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
FIREWORKS_MODEL=accounts/fireworks/models/gemma-3-12b-it
ENVIRONMENT=development
```

Do not commit real API keys to Git.

## 3. Run The Backend

From the project root:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

Useful backend URLs:

- API home: `http://127.0.0.1:8000/`
- Health check: `http://127.0.0.1:8000/health`
- Swagger docs: `http://127.0.0.1:8000/docs`

Expected health response:

```json
{
  "status": "ok",
  "environment": "development",
  "provider": "fireworks",
  "model": "accounts/fireworks/models/gemma-3-12b-it",
  "fireworks_configured": true
}
```

If `fireworks_configured` is `false`, check `backend/.env`.

## 4. Run The Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The frontend calls the backend at `http://127.0.0.1:8000` by default.

To use a different backend URL, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Then restart the frontend dev server.

## 5. Use The App

1. Open `http://localhost:5173`.
2. Enter a project name.
3. Add a short description of what you want to build.
4. Click `Generate Architecture`.
5. Review the generated summary, tech stack, folder structure, API endpoints, and risks.

## 6. API Endpoints

### Health

```http
GET /health
```

Checks whether the backend is running and whether Fireworks is configured.

### Architect Agent

```http
POST /architect
```

Request body:

```json
{
  "project_name": "FoodDeliveryApp",
  "description": "A web app for restaurants, drivers, and customers."
}
```

### Backward-Compatible Architect Endpoint

```http
GET /architect/{project_name}
```

Useful for quick testing in Swagger docs.

### Security Analyzer

```http
POST /api/analyze
```

Request body:

```json
{
  "code": "paste vulnerable code here"
}
```

Returns:

- Vulnerability report
- Patched code
- Review verdict

## 7. Run Quality Checks

Backend syntax check:

```bash
backend/venv/bin/python -m py_compile \
  backend/app/main.py \
  backend/app/core/config.py \
  backend/app/services/llm_service.py \
  backend/app/services/security_service.py \
  backend/app/agents/architect.py \
  backend/app/api/routes.py
```

Backend dependency check:

```bash
backend/venv/bin/python -m pip check
```

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend production build:

```bash
cd frontend
npm run build
```

## 8. Troubleshooting

### Backend says `FIREWORKS_API_KEY is not configured`

Check that `backend/.env` exists and contains:

```env
FIREWORKS_API_KEY=your_real_fireworks_api_key
```

Restart the backend after editing `.env`.

### Frontend says `Failed to generate architecture`

Check that the backend is running:

```bash
curl http://127.0.0.1:8000/health
```

If the backend is running on a different URL, set `frontend/.env`:

```env
VITE_API_BASE_URL=http://your-backend-url
```

Restart the frontend dev server.

### `ModuleNotFoundError` In Backend

Activate the backend virtual environment and reinstall dependencies:

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Fireworks Request Fails

Check:

- Your API key is valid.
- Your Fireworks account has credits.
- `FIREWORKS_BASE_URL` is `https://api.fireworks.ai/inference/v1`.
- `FIREWORKS_MODEL` is set to an available Gemma model.

## 9. Docker Option

If Docker is available, run both services from the project root:

```bash
docker compose up --build
```

Backend:

```text
http://127.0.0.1:8000
```

Frontend:

```text
http://localhost:5173
```

## 10. Project Hygiene

Do not commit:

- `backend/.env`
- `backend/venv/`
- `frontend/node_modules/`
- `frontend/dist/`
- `__pycache__/`

If `backend/venv` or Python cache files are already tracked by Git, remove them from Git tracking:

```bash
git rm -r --cached backend/venv
git rm -r --cached backend/app/**/__pycache__
```

Keep the files locally, but do not commit them.
