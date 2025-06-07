import os
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
import mimetypes

from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.resource import Resource, ResourceCreate, ResourceType, ResourceStatus
from app.crud.crud_resource import create_resource, get_resources_by_mentor, delete_resource
from app.db.client import supabase

router = APIRouter()

# Allowed file types for upload
ALLOWED_EXTENSIONS = {
    'pdf': ['application/pdf'],
    'image': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    'text': ['text/plain', 'text/markdown']
}

def get_resource_type_from_mimetype(mimetype: str) -> ResourceType:
    """Determine resource type from MIME type."""
    for resource_type, mimetypes_list in ALLOWED_EXTENSIONS.items():
        if mimetype in mimetypes_list:
            return ResourceType(resource_type)
    raise ValueError(f"Unsupported file type: {mimetype}")

def is_allowed_file(mimetype: str) -> bool:
    """Check if file type is allowed for upload."""
    for allowed_types in ALLOWED_EXTENSIONS.values():
        if mimetype in allowed_types:
            return True
    return False

@router.post("/upload", response_model=Resource, status_code=status.HTTP_201_CREATED)
async def upload_resource_file(
    file: UploadFile = File(...),
    mentor_id: str = Form(...),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a resource file to Supabase Storage and create a database record.
    
    Args:
        file: The uploaded file
        mentor_id: ID of the mentor to associate the resource with
        current_user: Authenticated user from JWT token
        
    Returns:
        Resource: The created resource object
    """
    try:
        # Validate file type
        file_mimetype = file.content_type
        if not is_allowed_file(file_mimetype):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type not allowed. Supported types: {list(ALLOWED_EXTENSIONS.keys())}"
            )
        
        # Determine resource type from file
        try:
            resource_type = get_resource_type_from_mimetype(file_mimetype)
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1] if file.filename else ""
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        # Create storage path: {user_id}/{mentor_id}/{filename}
        storage_path = f"{current_user.id}/{mentor_id}/{unique_filename}"
        
        # Read file content
        file_content = await file.read()
        
        # Upload to Supabase Storage
        client = supabase()
        try:
            storage_response = client.storage.from_("resources").upload(
                path=storage_path,
                file=file_content,
                file_options={
                    "content-type": file_mimetype,
                    "upsert": False
                }
            )
        except Exception as storage_error:
            raise Exception(f"Storage upload failed: {str(storage_error)}")
        
        # Get the public URL for the uploaded file
        public_url_response = client.storage.from_("resources").get_public_url(storage_path)
        file_url = public_url_response
        
        # Create resource record in database
        resource_data = ResourceCreate(
            name=file.filename or unique_filename,
            type=resource_type,
            mentor_id=mentor_id,
            url=file_url,
            status=ResourceStatus.PENDING
        )
        
        resource = create_resource(client, resource_data, current_user.id)
        return resource
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload resource: {str(e)}"
        )

@router.get("/mentor/{mentor_id}", response_model=List[Resource])
async def get_mentor_resources(
    mentor_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get all resources for a specific mentor.
    
    Args:
        mentor_id: ID of the mentor whose resources to retrieve
        current_user: Authenticated user from JWT token
        
    Returns:
        List[Resource]: List of resources belonging to the mentor
    """
    try:
        client = supabase()
        resources = get_resources_by_mentor(client, mentor_id, current_user.id)
        return resources
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to retrieve resources: {str(e)}"
        )

@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource_endpoint(
    resource_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete a resource and its associated file.
    
    Args:
        resource_id: ID of the resource to delete
        current_user: Authenticated user from JWT token
        
    Raises:
        HTTPException: If deletion fails or resource doesn't belong to user
    """
    try:
        client = supabase()
        success = delete_resource(client, resource_id, current_user.id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resource not found"
            )
        
        # Note: In a production system, you might also want to delete the file from storage
        # This would require getting the file path from the resource URL first
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to delete resource: {str(e)}"
        )

@router.post("/url", response_model=Resource, status_code=status.HTTP_201_CREATED)
async def create_url_resource(
    url: str = Form(...),
    name: str = Form(...),
    mentor_id: str = Form(...),
    current_user: User = Depends(get_current_user)
):
    """
    Create a resource from a URL (e.g., YouTube link).
    
    Args:
        url: The URL of the resource
        name: Name/title for the resource
        mentor_id: ID of the mentor to associate the resource with
        current_user: Authenticated user from JWT token
        
    Returns:
        Resource: The created resource object
    """
    try:
        # Determine resource type based on URL
        resource_type = ResourceType.YOUTUBE_LINK if "youtube.com" in url or "youtu.be" in url else ResourceType.TEXT
        
        # Create resource record in database
        resource_data = ResourceCreate(
            name=name,
            type=resource_type,
            mentor_id=mentor_id,
            url=url,
            status=ResourceStatus.PENDING
        )
        
        client = supabase()
        resource = create_resource(client, resource_data, current_user.id)
        return resource
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create URL resource: {str(e)}"
        ) 