from typing import Optional
from supabase import create_client, Client
from app.core.config import settings

# Global client instance
_supabase_client: Optional[Client] = None

def get_supabase_client() -> Client:
    """
    Get or create a Supabase client instance.
    This lazy initialization prevents startup errors when env vars are missing.
    """
    global _supabase_client
    
    if _supabase_client is None:
        url = settings.supabase_url
        key = settings.supabase_key
        
        if not url or not key:
            raise ValueError(
                "Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_KEY "
                "environment variables in your .env file."
            )
        
        _supabase_client = create_client(url, key)
    
    return _supabase_client

# Create a client instance that will be created when first accessed
supabase = get_supabase_client