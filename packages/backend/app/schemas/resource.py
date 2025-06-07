from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class ResourceType(str, Enum):
    """Resource type enumeration matching database."""
    PDF = "pdf"
    IMAGE = "image"
    YOUTUBE_LINK = "youtube_link"
    TEXT = "text"

class ResourceStatus(str, Enum):
    """Resource processing status enumeration matching database."""
    PENDING = "pending"
    PROCESSING = "processing"
    ANALYZED = "analyzed"
    ERROR = "error"

class ResourceBase(BaseModel):
    """Base resource schema with common fields."""
    name: str
    type: ResourceType
    mentor_id: str

class ResourceCreate(ResourceBase):
    """Schema for resource creation requests."""
    url: str
    status: ResourceStatus = ResourceStatus.PENDING

class ResourceUpdate(BaseModel):
    """Schema for resource update requests."""
    name: Optional[str] = None
    status: Optional[ResourceStatus] = None
    url: Optional[str] = None

class Resource(ResourceBase):
    """Schema for resource responses."""
    id: str
    url: str
    status: ResourceStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 