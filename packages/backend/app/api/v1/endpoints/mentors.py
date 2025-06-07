from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.mentor import MentorCreate, MentorUpdate, Mentor
from app.crud.crud_mentor import (
    create_mentor,
    get_mentors_by_user,
    get_mentor_by_id,
    update_mentor,
    delete_mentor
)
from app.db.client import supabase

router = APIRouter()

@router.post("/", response_model=Mentor, status_code=status.HTTP_201_CREATED)
async def create_new_mentor(
    mentor_data: MentorCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a new mentor for the authenticated user.
    
    Args:
        mentor_data: MentorCreate schema with name, description, and expertise
        current_user: Authenticated user from JWT token
        
    Returns:
        Mentor: The created mentor object
        
    Raises:
        HTTPException: 400 if creation fails
    """
    try:
        client = supabase()
        mentor = create_mentor(client, mentor_data, current_user.id)
        return mentor
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create mentor: {str(e)}"
        )

@router.get("/", response_model=List[Mentor])
async def get_user_mentors(current_user: User = Depends(get_current_user)):
    """
    Get all mentors belonging to the authenticated user.
    
    Args:
        current_user: Authenticated user from JWT token
        
    Returns:
        List[Mentor]: List of user's mentors
        
    Raises:
        HTTPException: 400 if retrieval fails
    """
    try:
        client = supabase()
        mentors = get_mentors_by_user(client, current_user.id)
        return mentors
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to retrieve mentors: {str(e)}"
        )

@router.get("/{mentor_id}", response_model=Mentor)
async def get_mentor(
    mentor_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific mentor by ID.
    
    Args:
        mentor_id: ID of the mentor to retrieve
        current_user: Authenticated user from JWT token
        
    Returns:
        Mentor: The requested mentor
        
    Raises:
        HTTPException: 404 if mentor not found or not owned by user
    """
    try:
        client = supabase()
        mentor = get_mentor_by_id(client, mentor_id, current_user.id)
        
        if not mentor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mentor not found"
            )
        
        return mentor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to retrieve mentor: {str(e)}"
        )

@router.put("/{mentor_id}", response_model=Mentor)
async def update_existing_mentor(
    mentor_id: str,
    update_data: MentorUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update a mentor's information.
    
    Args:
        mentor_id: ID of the mentor to update
        update_data: MentorUpdate schema with fields to update
        current_user: Authenticated user from JWT token
        
    Returns:
        Mentor: The updated mentor
        
    Raises:
        HTTPException: 404 if mentor not found, 400 if update fails
    """
    try:
        client = supabase()
        mentor = update_mentor(client, mentor_id, update_data, current_user.id)
        
        if not mentor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mentor not found"
            )
        
        return mentor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to update mentor: {str(e)}"
        )

@router.delete("/{mentor_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_mentor(
    mentor_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete a mentor.
    
    Args:
        mentor_id: ID of the mentor to delete
        current_user: Authenticated user from JWT token
        
    Raises:
        HTTPException: 404 if mentor not found, 400 if deletion fails
    """
    try:
        client = supabase()
        success = delete_mentor(client, mentor_id, current_user.id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mentor not found"
            )
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to delete mentor: {str(e)}"
        ) 