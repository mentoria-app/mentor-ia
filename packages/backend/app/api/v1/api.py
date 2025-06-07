from fastapi import APIRouter

from app.api.v1.endpoints import auth, protected_example

api_router = APIRouter()

# Include authentication routes
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Include example protected routes (remove in production)
api_router.include_router(protected_example.router, prefix="/examples", tags=["examples"])
