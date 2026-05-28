from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_chat, routes_scraping

app = FastAPI(
    title="TripMacha Core API",
    description="The centralized aggregator and AI routing engine.",
    version="1.0.0"
)

# Crucial for local development: allows React (port 5173) to talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
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