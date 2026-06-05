import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_chat, routes_scraping

app = FastAPI(
    title="TripMacha Core API",
    description="The centralized aggregator and AI routing engine.",
    version="1.0.0"
)

# Fetch allowed origins from system environment variables
# In production, this will be your deployed frontend URL (e.g., https://tripmacha.vercel.app)
allowed_origins = [
    "http://localhost:5173",  # Vite local fallback
    "http://localhost:3000",  # Create React App local fallback
]

# If a production frontend URL environment variable is set, append it dynamically
FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the different route files
app.include_router(routes_chat.router, prefix="/api/chat", tags=["AI Co-Pilot"])
app.include_router(routes_scraping.router, prefix="/api/scrape", tags=["Task Queue"])

@app.get("/health")
def health_check():
    return {"status": "TripMacha Backend is online and ready."}