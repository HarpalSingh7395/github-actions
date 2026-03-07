# github-actions

![Frontend CI/CD](https://github.com/HarpalSingh7395/github-actions/actions/workflows/github-actions-frontend.yml/badge.svg)
![Backend CI/CD](https://github.com/HarpalSingh7395/github-actions/actions/workflows/github-actions-backend.yml/badge.svg)

A full-stack demo project showcasing GitHub Actions CI/CD pipelines.

## 🚀 Live

- **Frontend** → [HarpalSingh7395.github.io/github-actions](https://HarpalSingh7395.github.io/github-actions/)
- **Backend API** → Deployed on Render

## 📁 Structure

```
├── frontend/   # Vite + React + TypeScript
└── backend/    # Node.js + Express + TypeScript
```

## ⚙️ CI/CD

| Project | Trigger | Pipeline |
|---------|---------|----------|
| Frontend | Push/PR to `main` on `frontend/**` | Install → Test → Build → Deploy (GitHub Pages) |
| Backend | Push/PR to `main` on `backend/**` | Install → Test → Build → Deploy (Render) |
