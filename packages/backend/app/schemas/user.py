from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema with common fields."""
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(BaseModel):
    """Schema for user creation requests."""
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class User(UserBase):
    """Schema for user responses (without password)."""
    id: str 
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserInDB(UserBase):
    """Schema for user stored in database (with hashed password)."""
    id: str  
    hashed_password: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 