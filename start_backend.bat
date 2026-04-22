@echo off
python -m uvicorn src.backend.main:app --reload --port 8000 --reload-dir src/backend
