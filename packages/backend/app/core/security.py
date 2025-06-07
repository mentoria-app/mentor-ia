from datetime import datetime, timedelta
from typing import Any, Union, Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings
from app.db.client import supabase
from app.schemas.user import User
from app.schemas.token import TokenData

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against its hash.
    
    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to compare against
        
    Returns:
        bool: True if password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password: The plain text password to hash
        
    Returns:
        str: The hashed password
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    """
    Create a JWT access token.
    
    Args:
        data: The data to encode in the token
        expires_delta: Optional custom expiration time
        
    Returns:
        str: The encoded JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

# Security scheme for JWT authentication
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """
    FastAPI dependency to get the current authenticated user from JWT token.
    
    Args:
        credentials: HTTPAuthorizationCredentials from the Authorization header
        
    Returns:
        User: The current authenticated user
        
    Raises:
        HTTPException: 401 if token is invalid, expired, or missing
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the JWT token
        payload = jwt.decode(
            credentials.credentials, 
            settings.secret_key, 
            algorithms=[settings.algorithm]
        )
        
        # Extract user email from token
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
            
        # Create token data for validation
        token_data = TokenData(email=email)
        
    except JWTError:
        raise credentials_exception
    
    # Extract user information from JWT payload
    user_id: str = payload.get("user_id")
    user_email: str = payload.get("email")
    
    if user_id is None or user_email is None:
        raise credentials_exception
    
    try:
        # Fetch the user data from Supabase
        response = supabase().auth.get_user(credentials.credentials)
        
        if response.user is None:
            raise credentials_exception
        
        # Helper function to safely parse Supabase datetime strings
        def parse_supabase_datetime(date_str):
            if not date_str:
                return None
            try:
                # Handle both 'Z' and '+00:00' timezone formats
                if date_str.endswith('Z'):
                    date_str = date_str.replace('Z', '+00:00')
                return datetime.fromisoformat(date_str)
            except (ValueError, AttributeError):
                # Fallback to current time if parsing fails
                return datetime.utcnow()
        
        # Create User object from Supabase response
        user = User(
            id=str(response.user.id),  # Ensure it's a string
            email=response.user.email,
            full_name=response.user.user_metadata.get("full_name") if response.user.user_metadata else None,
            is_active=True,
            created_at=parse_supabase_datetime(response.user.created_at),
            updated_at=parse_supabase_datetime(response.user.updated_at)
        )
        
        return user
        
    except Exception as e:
        # If Supabase call fails, fall back to creating user from JWT data
        user = User(
            id=str(user_id),  # Ensure it's a string
            email=user_email,
            full_name=None,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=None
        )
        
        return user