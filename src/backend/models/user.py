from pydantic import BaseModel, validator
from typing import Optional

class User(BaseModel):
    email: str
    password: Optional[str] = None
    confirm_password: Optional[str] = None
    username: str

    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if v is not None and 'password' in values and values['password'] is not None and v != values['password']:
            raise ValueError('Passwords do not match')
        return v

class UserInDB(User):
    hashed_password: str
    avatar_url: Optional[str] = None
    is_premium: bool = False
    theme: str = "light"  # Добавляем поле theme с дефолтным значением