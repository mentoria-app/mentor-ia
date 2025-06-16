from fastapi import APIRouter

from app.api.v1.endpoints import auth, protected_example, mentors, resources, users

api_router = APIRouter()

# Include authentication routes
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Include user management routes
api_router.include_router(users.router, prefix="/users", tags=["users"])

# Include mentor management routes
api_router.include_router(mentors.router, prefix="/mentors", tags=["mentors"])

# Include resource management routes
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])

# Include example protected routes (remove in production)
api_router.include_router(protected_example.router, prefix="/examples", tags=["examples"])
