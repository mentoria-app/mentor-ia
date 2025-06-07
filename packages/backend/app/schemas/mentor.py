from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MentorBase(BaseModel):
    """Base mentor schema with common fields."""
    name: str
    description: Optional[str] = None
    expertise: str
    color: Optional[str] = "bg-primary"

class MentorCreate(MentorBase):
    """Schema for mentor creation requests."""
    pass

class MentorUpdate(BaseModel):
    """Schema for mentor update requests."""
    name: Optional[str] = None
    description: Optional[str] = None
    expertise: Optional[str] = None
    color: Optional[str] = None

class Mentor(MentorBase):
    """Schema for mentor responses."""
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 