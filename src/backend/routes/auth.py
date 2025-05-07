from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta
import logging

from src.backend.models.user import User, UserInDB
from src.backend.utils.security import get_password_hash, verify_password, create_access_token, decode_access_token
from src.backend.database import users_collection

router = APIRouter()
logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
      try:
          payload = decode_access_token(token)
          if payload is None:
              logger.error("Invalid or expired token")
              raise HTTPException(status_code=401, detail="Invalid or expired token")
          email = payload.get("sub")
          user = users_collection.find_one({"email": email})
          if user is None:
              logger.error(f"User not found for email: {email}")
              raise HTTPException(status_code=401, detail="User not found")
          return user
      except Exception as e:
          logger.error(f"Error in get_current_user: {str(e)}")
          raise

@router.post("/register")
async def register(user_data: dict = Body(...)):
      try:
          logger.info(f"Registration attempt for email: {user_data.get('email')}")
          if not user_data.get("email") or not user_data.get("password"):
              logger.error("Missing email or password")
              raise HTTPException(status_code=422, detail="Email and password are required")
          existing_user = users_collection.find_one({"email": user_data["email"]})
          if existing_user:
              logger.error(f"Email already registered: {user_data['email']}")
              raise HTTPException(status_code=400, detail="Email already registered")
          hashed_password = get_password_hash(user_data["password"])
          user_in_db = UserInDB(email=user_data["email"], hashed_password=hashed_password)
          users_collection.insert_one(user_in_db.dict())
          logger.info(f"User registered successfully: {user_data['email']}")
          return {"message": "User registered successfully"}
      except Exception as e:
          logger.error(f"Registration error: {str(e)}")
          raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(user_data: dict = Body(...)):
      try:
          logger.info(f"Login attempt for email: {user_data.get('email')}")
          if not user_data.get("email") or not user_data.get("password"):
              logger.error("Missing email or password")
              raise HTTPException(status_code=422, detail="Email and password are required")
          db_user = users_collection.find_one({"email": user_data["email"]})
          if db_user is None:
              logger.error(f"User not found: {user_data['email']}")
              raise HTTPException(status_code=401, detail="Incorrect email or password")
          if not verify_password(user_data["password"], db_user["hashed_password"]):
              logger.error("Invalid password")
              raise HTTPException(status_code=401, detail="Incorrect email or password")
          access_token = create_access_token(data={"sub": user_data["email"]}, expires_delta=timedelta(minutes=30))
          logger.info(f"Login successful for: {user_data['email']}")
          return {"access_token": access_token, "token_type": "bearer"}
      except Exception as e:
          logger.error(f"Login error: {str(e)}")
          raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
      return {"email": current_user["email"]}