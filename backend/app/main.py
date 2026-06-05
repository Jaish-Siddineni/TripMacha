import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_chat, routes_scraping

app = FastAPI(
    title="TripMacha Core API",
    description="The centralized aggregator and AI routing engine.",
    version="1.0.0"
)

# Added your specific Vercel deployment URL to the VIP list
allowed_origins = [
    "http://localhost:5173",  # Vite local fallback
    "http://localhost:3000",  # Create React App local fallback
    "https://trip-macha.vercel.app",       # Your main domain
    "https://trip-macha-q5j5.vercel.app"   # Your exact Vercel deployment URL
]

FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL and FRONTEND_URL not in allowed_origins:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_chat.router, prefix="/api", tags=["AI Co-Pilot"])
app.include_router(routes_scraping.router, prefix="/api", tags=["Task Queue"])

@app.get("/health")
def health_check():
    return {"status": "TripMacha Backend is online and ready."}