from fastapi import APIRouter, HTTPException, Depends, Body, File, UploadFile
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
import logging
import uuid
import os
from pydantic import BaseModel
from src.backend.models.user import User, UserInDB
from src.backend.utils.security import get_password_hash, verify_password, create_access_token, decode_access_token
from src.backend.database import users_collection

router = APIRouter()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class UpdateUsernameRequest(BaseModel):
    username: str
    
class UpdateThemeRequest(BaseModel):
    theme: str

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    logger.info("Attempting to get current user")
    try:
        payload = decode_access_token(token)
        if payload is None:
            logger.error("Invalid or expired token")
            raise HTTPException(status_code=401, detail="Невалідний або прострочений токен")
        email = payload.get("sub")
        user = users_collection.find_one({"email": email})
        if user is None:
            logger.error(f"User not found for email: {email}")
            raise HTTPException(status_code=401, detail="Користувача не знайдено")
        logger.info(f"User retrieved: {email}")
        return user
    except Exception as e:
        logger.error(f"Error in get_current_user: {str(e)}")
        raise

@router.post("/register")
async def register(user_data: dict = Body(...)):
    logger.info(f"Received registration request: {user_data}")
    try:
        if not user_data.get("email") or not user_data.get("password") or not user_data.get("username"):
            logger.error("Missing required fields")
            raise HTTPException(status_code=422, detail="Email, пароль та ім'я користувача обов'язкові")
        
        existing_user_by_username = users_collection.find_one({"username": user_data["username"]})
        if existing_user_by_username:
            logger.error(f"Username already taken: {user_data['username']}")
            raise HTTPException(status_code=400, detail="Ім'я користувача вже зайнято")
        
        if user_data["password"] != user_data["confirm_password"]:
            logger.error("Passwords do not match")
            raise HTTPException(status_code=422, detail="Паролі не співпадають")

        existing_user_by_email = users_collection.find_one({"email": user_data["email"]})
        if existing_user_by_email:
            logger.error(f"Email already registered: {user_data['email']}")
            raise HTTPException(status_code=400, detail="Email вже зареєстровано")

        hashed_password = get_password_hash(user_data["password"])
        user_in_db = UserInDB(
            email=user_data["email"],
            username=user_data["username"],
            hashed_password=hashed_password,
            avatar_url=None,
            is_premium=False,
            theme="light",  # По умолчанию светлая тема
            registered_at=datetime.utcnow().isoformat()
        )
        users_collection.insert_one(user_in_db.dict(exclude={"password", "confirm_password"}))
        logger.info(f"User registered successfully: {user_data['email']}")
        return {"message": "Користувача успішно зареєстровано"}
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(credentials: dict = Body(...)):
    logger.info(f"Received login request: {credentials}")
    try:
        identifier = credentials.get("email") or credentials.get("username")
        password = credentials.get("password")
        if not identifier or not password:
            logger.error("Missing email/username or password")
            raise HTTPException(status_code=422, detail="Email/ім'я користувача та пароль обов'язкові")

        db_user = users_collection.find_one({"$or": [{"email": identifier}, {"username": identifier}]})
        if db_user is None:
            logger.error(f"User not found: {identifier}")
            raise HTTPException(status_code=401, detail="Невірний email/ім'я користувача або пароль")
        if not verify_password(password, db_user["hashed_password"]):
            logger.error("Invalid password")
            raise HTTPException(status_code=401, detail="Невірний email/ім'я користувача або пароль")
        access_token = create_access_token(data={"sub": db_user["email"]}, expires_delta=timedelta(minutes=30))
        logger.info(f"Login successful for: {db_user['email']}")
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    logger.info(f"Fetching user data for: {current_user['email']}")
    return {
        "email": current_user["email"],
        "username": current_user.get("username", "Unknown"),
        "avatar_url": current_user.get("avatar_url"),
        "is_premium": current_user.get("is_premium", False),
        "theme": current_user.get("theme", "light"),
        "registered_at": current_user.get("registered_at", datetime.utcnow().isoformat())
    }

@router.put("/me")
async def update_user(update_data: UpdateUsernameRequest, current_user: dict = Depends(get_current_user)):
    logger.info(f"Updating username for: {current_user['email']} to {update_data.username}")
    try:
        if not update_data.username.strip():
            logger.error("Username cannot be empty")
            raise HTTPException(status_code=422, detail="Ім'я користувача не може бути порожнім")
        
        existing_user = users_collection.find_one({"username": update_data.username, "email": {"$ne": current_user["email"]}})
        if existing_user:
            logger.error(f"Username already taken: {update_data.username}")
            raise HTTPException(status_code=400, detail="Ім'я користувача вже зайнято")
        
        users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"username": update_data.username}}
        )
        logger.info(f"Username updated for: {current_user['email']}")
        return {"message": "Ім'я користувача успішно оновлено"}
    except Exception as e:
        logger.error(f"Username update error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update-theme")
async def update_theme(update_data: UpdateThemeRequest, current_user: dict = Depends(get_current_user)):
    logger.info(f"Updating theme for: {current_user['email']} to {update_data.theme}")
    try:
        if update_data.theme not in ["light", "dark"]:
            logger.error(f"Invalid theme: {update_data.theme}")
            raise HTTPException(status_code=422, detail="Тема має бути 'light' або 'dark'")
        
        users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"theme": update_data.theme}}
        )
        logger.info(f"Theme updated for: {current_user['email']}")
        return {"message": "Тему успішно оновлено"}
    except Exception as e:
        logger.error(f"Theme update error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upload-avatar")
async def upload_avatar(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    logger.info(f"Avatar upload request for: {current_user['email']}")
    try:
        os.makedirs("avatars", exist_ok=True)
        
        avatar_id = str(uuid.uuid4())
        file_extension = file.filename.split('.')[-1]
        avatar_filename = f"{avatar_id}.{file_extension}"
        avatar_path = os.path.join("avatars", avatar_filename)
        
        with open(avatar_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        avatar_url = f"http://56.228.42.32:8000/avatars/{avatar_filename}"
        
        users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"avatar_url": avatar_url}}
        )
        
        logger.info(f"Avatar uploaded for: {current_user['email']}, URL: {avatar_url}")
        return {"message": "Аватар успішно оновлено", "avatar_url": avatar_url}
    except Exception as e:
        logger.error(f"Avatar upload error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upgrade-premium")
async def upgrade_premium(current_user: dict = Depends(get_current_user)):
    logger.info(f"Premium upgrade request for: {current_user['email']}")
    try:
        users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"is_premium": True}}
        )
        logger.info(f"Premium upgraded for: {current_user['email']}")
        return {"message": "Преміум-підписку активовано"}
    except Exception as e:
        logger.error(f"Premium upgrade error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))