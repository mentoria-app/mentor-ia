from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.schemas.user import User

router = APIRouter()

@router.get("/profile")
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """
    Example of a protected endpoint that requires authentication.
    
    This endpoint demonstrates how to use the get_current_user dependency
    to protect any route in your application.
    
    Args:
        current_user: User object automatically injected by the dependency
        
    Returns:
        dict: User profile information
    """
    return {
        "message": f"Hello {current_user.email}!",
        "user_id": current_user.id,
        "email": current_user.email,
        "is_active": current_user.is_active
    }

@router.get("/dashboard")
async def get_user_dashboard(current_user: User = Depends(get_current_user)):
    """
    Another example of a protected endpoint.
    
    Args:
        current_user: User object automatically injected by the dependency
        
    Returns:
        dict: Dashboard data for the authenticated user
    """
    return {
        "user_id": current_user.id,
        "dashboard_data": {
            "welcome_message": f"Welcome back, {current_user.email}!",
            "mentors_count": 0,  # This would be fetched from database
            "recent_activity": []  # This would be fetched from database
        }
    } 