from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional

from app.core.security import get_current_user
from app.schemas.user import User
from app.db.client import supabase

router = APIRouter()

@router.get("/me/test")
async def test_user_access(current_user: User = Depends(get_current_user)):
    """
    Test endpoint to verify user authentication and basic database access.
    """
    try:
        client = supabase()
        
        # Test basic table access
        test_response = client.table("user_profiles").select("count", count="exact").execute()
        
        return {
            "user_id": current_user.id,
            "user_email": current_user.email,
            "table_accessible": True,
            "table_count": test_response.count,
            "message": "Authentication and database access working"
        }
    except Exception as e:
        return {
            "user_id": current_user.id,
            "user_email": current_user.email,
            "table_accessible": False,
            "error": str(e),
            "message": "Database access failed"
        }

class UserProfileUpdate(BaseModel):
    """Schema for user profile update requests."""
    notifications_enabled: Optional[bool] = None
    subscription_status: Optional[str] = None

@router.patch("/me/profile")
async def update_user_profile(
    profile_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update the current user's profile preferences.
    
    This endpoint allows users to update their profile settings such as
    notification preferences and subscription status.
    
    Args:
        profile_data: UserProfileUpdate schema with fields to update
        current_user: Authenticated user from JWT token
        
    Returns:
        dict: Updated user profile information
        
    Raises:
        HTTPException: 400 if update fails
    """
    try:
        client = supabase()
        
        # Prepare update data, excluding None values
        update_dict = {}
        
        if profile_data.notifications_enabled is not None:
            update_dict["notifications_enabled"] = profile_data.notifications_enabled
        
        if profile_data.subscription_status is not None:
            update_dict["subscription_status"] = profile_data.subscription_status
        
        if not update_dict:
            # No fields to update
            return {
                "message": "No changes to update",
                "user_id": current_user.id
            }
        
        # Check if user_profiles record exists
        profile_response = client.table("user_profiles").select("*").eq("id", current_user.id).execute()
        
        if profile_response.data:
            # Update existing profile
            response = client.table("user_profiles").update(update_dict).eq("id", current_user.id).execute()
        else:
            # Create new profile record
            update_dict["id"] = current_user.id
            response = client.table("user_profiles").insert(update_dict).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update user profile"
            )
        
        return {
            "message": "Profile updated successfully",
            "profile": response.data[0],
            "user_id": current_user.id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to update profile: {str(e)}"
        )

@router.get("/me/profile")
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """
    Get the current user's profile information including preferences.
    
    Args:
        current_user: Authenticated user from JWT token
        
    Returns:
        dict: User profile information with preferences
    """
    try:
        client = supabase()
        
        # Get user profile data
        profile_response = client.table("user_profiles").select("*").eq("id", current_user.id).execute()
        
        # Handle case where user doesn't have a profile yet
        profile_data = profile_response.data[0] if profile_response.data else {}
        
        # If no profile exists, create one with default values
        if not profile_data:
            default_profile = {
                "id": current_user.id,
                "notifications_enabled": True,
                "subscription_status": "free",
                "mentor_count": 0,
                "resource_upload_mb": 0
            }
            
            try:
                # Try to create the profile record
                insert_response = client.table("user_profiles").insert(default_profile).execute()
                profile_data = insert_response.data[0] if insert_response.data else default_profile
            except Exception as insert_error:
                # If insert fails (maybe due to permissions), return defaults
                profile_data = default_profile
        
        return {
            "user": {
                "id": current_user.id,
                "email": current_user.email,
                "full_name": current_user.full_name,
                "is_active": current_user.is_active,
                "created_at": current_user.created_at,
                "updated_at": current_user.updated_at
            },
            "profile": {
                "notifications_enabled": profile_data.get("notifications_enabled", True),
                "subscription_status": profile_data.get("subscription_status", "free"),
                "mentor_count": profile_data.get("mentor_count", 0),
                "resource_upload_mb": profile_data.get("resource_upload_mb", 0),
                **profile_data
            }
        }
        
    except Exception as e:
        # More detailed error logging
        import traceback
        error_details = traceback.format_exc()
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to get profile: {str(e)} | Details: {error_details}"
        ) 