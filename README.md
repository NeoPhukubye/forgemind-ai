WTC-BAQWWYFA

# 🚀 ForgeMind AI

**ForgeMind AI** is an intelligent multi-agent software engineering assistant designed to help developers plan, design, build, test, and document software projects using Artificial Intelligence.

Built for the **AMD Developer Hackathon: ACT II**, ForgeMind AI leverages a modern full-stack architecture with **FastAPI**, **React**, and AI-powered agents capable of generating software architectures, development plans, documentation, and code.

---

## 🌟 Features

- 🏗️ AI Architect Agent
    - Generates software architectures
    - Recommends technology stacks
    - Suggests project folder structures
    - Designs API layouts
    - Creates database recommendations

- 💻 AI Coding Assistant *(Coming Soon)*
    - Generate production-ready code
    - Explain code
    - Refactor existing code

- 🧪 AI Test Generator
    - Unit Tests
    - Integration Tests
    - API Testing

- 🐞 AI Debugger
    - Detect bugs
    - Suggest fixes
    - Improve performance

- 📚 AI Documentation Agent
    - README generation
    - API documentation
    - Project documentation

- 📋 AI Project Planner
    - Sprint planning
    - User stories
    - Task generation
    - Development roadmap

- 🔐 **OAuth2 JWT Authentication**
    - Secure password hashing with bcrypt
    - JWT access & refresh tokens
    - Role-based access control (RBAC)
    - Protected API routes

- 🛡️ **Input Validation & Security**
    - Pydantic request validation
    - Control character sanitization
    - Rate limiting (10 req/min unauthenticated, 100 req/min authenticated)
    - CORS hardening

---

# 🏛️ Architecture

```
                React Frontend
                      │
                      ▼
              FastAPI Backend
                      │
          ┌───────────┴───────────┐
          │                       │
    Architect Agent         Future Agents
          │
          ▼
      LLM Service
          │
          ▼
 AMD Accelerated AI Models
```

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript

### Backend

- FastAPI
- Python
- Uvicorn
- Pydantic (input validation)
- Passlib + Bcrypt (password hashing)
- Python-Jose (JWT tokens)

### Security

- OAuth2 JWT Authentication
- Role-Based Access Control (RBAC)
- Pydantic Input Validation
- Rate Limiting Middleware
- CORS Hardening

### AI

- Large Language Models (LLMs)
- Modular Agent Architecture
- Prompt Engineering

### DevOps

- Git
- GitHub
- Docker *(Planned)*

---

# 📂 Project Structure

```
forgemind-ai/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── prompts/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   └── src/
│
├── docker/
│
├── docs/
│
├── USER_GUIDE.md
│
└── README.md
```

---

# 🚀 Getting Started

For complete setup, run, API, and troubleshooting instructions, see [USER_GUIDE.md](USER_GUIDE.md).

## Clone the repository

```bash
git clone https://github.com/NeoPhukubye/forgemind-ai.git

cd forgemind-ai
```

---

## Backend Setup

Create a virtual environment

```bash
cd backend
python3 -m venv venv
```

Activate it

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create `backend/.env` from the project root or `.env` from inside `backend/`:

```env
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
SECRET_KEY=your-super-secret-key-change-in-production
ENVIRONMENT=development
```

Run the server

```bash
uvicorn app.main:app --reload
```

Open

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Open

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Root

```
GET /
```

Returns a welcome message.

---

## Health Check

```
GET /health
```

Returns the application status.

---

## Architect Agent

```
POST /architect
GET /architect/{project_name}
```

*Requires authentication*

Example

```
POST /architect
Authorization: Bearer <token>
```

Example Response

```json
{
  "project": "FoodDeliveryApp",
  "architecture": [
    "Frontend (React)",
    "Backend (FastAPI)",
    "Database (PostgreSQL)",
    "AI Layer",
    "Docker Deployment"
  ],
  "message": "Architecture generated successfully"
}
```

---

## 🔐 Authentication

### Login

```
POST /api/auth/login
```

Returns JWT access token and refresh token.

Example

```
POST /api/auth/login
Content-Type: application/x-www-form-urlencoded

username=admin@forgemind.ai&password=admin123
```

Example Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 1800
}
```

### Register

```
POST /api/auth/register
```

Create a new user account.

### Refresh Token

```
POST /api/auth/refresh
```

Get a new access token using a valid refresh token.

### Get Profile

```
GET /api/auth/me
```

Get the current authenticated user's profile.

*All agent endpoints require authentication via `Authorization: Bearer <token>` header.*

---

# 🎯 Roadmap

- [x] FastAPI backend
- [x] React frontend
- [x] Architect Agent
- [x] Swagger API documentation
- [x] AI model integration
- [x] Coder Agent
- [x] Debugger Agent
- [x] Test Generator
- [x] Documentation Agent
- [x] Planner Agent
- [x] Docker deployment
- [x] OAuth2 JWT Authentication
- [x] Input Validation (Pydantic)
- [x] Rate Limiting
- [ ] AMD GPU optimization notes and benchmarks
- [ ] Persistent project dashboard

---

# 🏆 Hackathon

This project is being developed for the **AMD Developer Hackathon: ACT II**, focusing on building AI agents and high-performance AI applications optimized for AMD GPU infrastructure.

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👩‍💻 Author

**Neo Phukubye**

Software Engineering Student at **WeThinkCode_**

Passionate about Artificial Intelligence, Software Engineering, Cloud Computing, and Building AI-Powered Developer Tools.

GitHub:
https://github.com/NeoPhukubye

---

# 📄 License

This project is released under the MIT License.
