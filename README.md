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
FIREWORKS_API_KEY=your_real_fireworks_api_key
FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
FIREWORKS_MODEL=accounts/fireworks/models/gemma-3-12b-it
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
GET /architect/{project_name}
```

Example

```
GET /architect/FoodDeliveryApp
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
- [ ] AMD GPU optimization notes and benchmarks
- [ ] Authentication
- [ ] Project dashboard

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
