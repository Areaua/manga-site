import sys
import os
import logging
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.backend.routes.auth import router as auth_router
from datetime import datetime

app = FastAPI()

# Настройка логов
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Обновляем CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://13.53.132.93", "http://172.31.39.182"],  # Виключили http://localhost:8000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Монтируем папку avatars для статических файлов
app.mount("/avatars", StaticFiles(directory="avatars"), name="avatars")

app.include_router(auth_router)

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the Manga API"}