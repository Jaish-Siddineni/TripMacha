from fastapi import APIRouter
from app.workers.tasks import scrape_flights_task
from celery.result import AsyncResult

router = APIRouter()

@router.post("/trigger-flight-search")
async def trigger_flight_search(destination: str, date: str):
    """Starts the background scraping task and returns the Task ID to React."""
    task = scrape_flights_task.delay(destination, date)
    return {"task_id": task.id, "status": "Processing"}

@router.get("/status/{task_id}")
async def get_task_status(task_id: str):
    """React calls this every 3 seconds to check if the scraper is done."""
    task = AsyncResult(task_id)
    
    # Map Celery's background states to simple statuses for React
    if task.state == 'PENDING' or task.state == 'STARTED':
        return {"status": "running", "data": None}
        
    elif task.state == 'SUCCESS':
        return {"status": "completed", "data": task.result}
        
    else:
        return {"status": "failed", "error": str(task.info)}