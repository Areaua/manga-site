# 📚 AniAria — Manga & Anime Reading Platform

> A full-stack web platform for browsing manga and anime with user accounts, personalised libraries, and a clean adaptive UI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-coming%20soon-lightgrey?style=for-the-badge)](#)

---

## About

AniAria is a full-stack manga and anime catalogue platform built as a diploma project and later modernised from legacy production code. Users can browse titles by genre, manage a favourites list, customise their profile, and switch between light and dark themes — all backed by a secure JWT-authenticated REST API.

The project was refactored from a working but unmaintained EC2 deployment: secrets were extracted to environment variables, the venv was purged from git history, the backend was restructured for local development, and security gaps were addressed throughout.

---

## ✨ Features

- **Authentication** — register, log in, JWT-based sessions with bcrypt password hashing
- **Manga & Anime catalogue** — genre filtering with emoji indicators, year filters, multi-item carousels
- **Favourites** — save and manage titles across sessions
- **User profiles** — avatar upload, username editing, premium badge
- **Adult content toggle** — 18+ filter in user settings
- **Dark / Light theme** — persisted per user account
- **Adaptive UI** — desktop navigation + mobile hamburger menu
- **Genre wheel** — random genre picker with spin animation

---

## 🛠 Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 18.3.1 |
| React Router DOM | 6.30.0 |
| Tailwind CSS | 3.4.14 |
| Framer Motion | 12.12.1 |
| Axios | 1.9.0 |

### Backend
| Technology | Version |
|---|---|
| FastAPI | 0.115.6 |
| Uvicorn | 0.34.0 |
| PyMongo | 4.10.1 |
| python-jose | 3.3.0 |
| passlib (bcrypt) | 1.7.4 |
| Pydantic | 2.10.4 |
| python-dotenv | 1.0.1 |

### Database
- **MongoDB Atlas** — cloud-hosted MongoDB cluster

### DevOps
- GitHub Actions CI/CD
- Environment-based config via `.env` files

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/Areaua/manga-site.git
cd manga-site
```

### 2. Backend setup

```bash
# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Open .env and fill in MONGODB_URL, MONGODB_DB_NAME, SECRET_KEY
```

Generate a secure `SECRET_KEY`:
```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

### 3. Frontend setup

```bash
npm install
# .env.development already points to http://localhost:8000 — no changes needed for local dev
```

### 4. Run

```bash
# Backend (from project root)
start_backend.bat           # Windows
# or:
python -m uvicorn src.backend.main:app --reload --port 8000 --reload-dir src/backend

# Frontend (separate terminal)
npm start
```

Open **http://localhost:3000**

---

## 📸 Screenshots

> _Screenshots coming soon_

| Home | Profile | Auth |
|---|---|---|
| ![home](docs/screenshots/home.png) | ![profile](docs/screenshots/profile.png) | ![auth](docs/screenshots/auth.png) |

---

## 🏗 Project Structure

```
manga-site/
├── src/
│   ├── backend/              # FastAPI application
│   │   ├── main.py           # App entry point, CORS, middleware
│   │   ├── database.py       # MongoDB connection
│   │   ├── models/           # Pydantic models
│   │   ├── routes/           # API route handlers
│   │   └── utils/            # Security helpers, config
│   ├── components/           # React components
│   └── config.js             # Frontend API base URL config
├── .env.example              # Environment variable template
├── requirements.txt          # Python dependencies
├── start_backend.bat         # Dev server launcher (Windows)
└── package.json
```

---

## 🔒 Security

- All secrets and configuration loaded from environment variables (`.env`) — no hardcoded credentials
- Passwords hashed with **bcrypt** via passlib
- Sessions protected with **JWT** (HS256, configurable expiry)
- **CORS** restricted to whitelisted frontend origins
- Avatar uploads saved with UUID filenames
- Generic error responses — internal exception details not exposed to clients
- `SECRET_KEY` required at startup; app refuses to start if missing

---

## 📝 Recent Refactoring Highlights

This project was restored and modernised from a legacy EC2 deployment. Key changes made during the refactor:

- **Migrated database** from self-hosted MongoDB on EC2 to MongoDB Atlas
- **Removed hardcoded secrets** — DB password, JWT key, and server IPs were all in source code
- **Moved all config to environment variables** — `MONGODB_URL`, `SECRET_KEY`, `AVATARS_DIR`, `FRONTEND_URL`, `REACT_APP_API_BASE_URL`
- **Purged 3 200+ committed venv files** from git and updated `.gitignore`
- **Added `/api` prefix** to the REST router for consistent URL structure
- **Centralised frontend config** via `src/config.js` — single source for `API_BASE_URL`
- **Tightened CORS** — restricted `allow_headers` from `*` to an explicit list
- **Improved startup reliability** — `serverSelectionTimeoutMS=5000` for fast DB failure detection; `RuntimeError` on missing required env vars
- **Removed 14 debug `console.log` statements** from production frontend code

---

## 🤝 Contributing

Issues and pull requests are welcome — feel free to open one if you spot a bug or have a suggestion.

---

## 📄 License

© 2026 Pavlo Zhelikhovskyi. All Rights Reserved. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Pavlo Zhelikhovskyi**

- GitHub: [@Areaua](https://github.com/Areaua)
- LinkedIn: [pavlo-zhelikhovskyi](https://www.linkedin.com/in/pavlo-zhelikhovskyi-b71a6029a/)
