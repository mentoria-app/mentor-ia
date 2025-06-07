from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from supabase import Client
import logging

from app.db.client import supabase
from app.schemas.user import UserCreate, User
from app.schemas.token import Token
from app.core.security import create_access_token, get_current_user

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/register", response_model=User)
async def register(user_data: UserCreate):
    """
    Register a new user using Supabase Auth.
    
    Args:
        user_data: UserCreate schema with email, password, and optional full_name
        
    Returns:
        User: The created user object
        
    Raises:
        HTTPException: If registration fails
    """
    try:
        # Sign up user with Supabase Auth
        response = supabase().auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
            "options": {
                "data": {
                    "full_name": user_data.full_name
                }
            } if user_data.full_name else {}
        })
        
        if response.user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed. User may already exist."
            )
        
        # Return user data (excluding sensitive information)
        from datetime import datetime
        return User(
            id=response.user.id,  
            email=response.user.email,
            full_name=response.user.user_metadata.get("full_name") if response.user.user_metadata else None,
            is_active=True,
            created_at=datetime.fromisoformat(response.user.created_at.replace('Z', '+00:00')),
            updated_at=datetime.fromisoformat(response.user.updated_at.replace('Z', '+00:00')) if response.user.updated_at else None
        )
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Login endpoint that returns a JWT access token.
    
    Args:
        form_data: OAuth2PasswordRequestForm with username (email) and password
        
    Returns:
        Token: JWT access token and token type
        
    Raises:
        HTTPException: If authentication fails
    """
    try:
        # Authenticate user with Supabase Auth
        response = supabase().auth.sign_in_with_password({
            "email": form_data.username,  # OAuth2PasswordRequestForm uses 'username' field
            "password": form_data.password
        })
        
        if response.user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        # Create JWT access token with user data
        access_token = create_access_token(
            data={
                "sub": response.user.email,  # Subject (user identifier)
                "user_id": response.user.id,  # Include user ID for easy access
                "email": response.user.email
            }
        )
        
        return Token(access_token=access_token, token_type="bearer")
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"}
        )

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user information.
    
    This endpoint demonstrates how to use the get_current_user dependency
    to protect routes and access user information.
    
    Args:
        current_user: User object injected by the get_current_user dependency
        
    Returns:
        User: The current authenticated user's information
    """
    return current_user 