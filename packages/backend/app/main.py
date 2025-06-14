import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

# Initialize Sentry
# Make sure to do this before you initialize your FastAPI app
sentry_sdk.init(
    dsn=settings.sentry_dsn,
    # Enable performance monitoring
    traces_sample_rate=1.0,
)

# Create FastAPI instance
app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    debug=settings.debug
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def health_check():
    """Health check endpoint to verify the server is running."""
    return {
        "status": "ok",
        "app_name": settings.app_name,
        "version": settings.version
    }


@app.get("/health")
async def detailed_health():
    """Detailed health check endpoint."""
    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "version": settings.version,
        "debug": settings.debug
    } 