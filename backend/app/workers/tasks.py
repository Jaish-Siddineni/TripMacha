from app.workers.celery_app import celery_app
import asyncio
from app.scrapers.core_browser import get_stealth_browser_content
from app.agents.data_parser_agent import parse_html_to_json
from app.models.diy_schemas import ExtractedFlightsResult
from datetime import datetime
import urllib.parse

@celery_app.task(bind=True)
def scrape_flights_task(self, destination: str, date: str):
    """
    Background task: Scrapes a site, parses with GenAI, and returns JSON.
    """
    # 1. Update React frontend that the task started
    self.update_state(state='PROGRESS', meta={'status': 'Booting stealth browser...'})
    
    formatted_date = datetime.strptime(date, "%Y-%m-%d").strftime("%d/%m/%Y")

    safe_destination = urllib.parse.quote(destination)
    
    # Target URL (e.g., a simple search on a flight aggregator)
    target_url = (
        f"https://www.cleartrip.com/flights/results"
        f"?adults=1&childs=0&infants=0&class=Economy"
        f"&depart_date={formatted_date}"
        f"&from=BLR&to={safe_destination}"
        f"&intl=n"
        f"&origin=BLR"
        f"&destination={safe_destination}"
        f"&isCfw=false&isFF=false"
    )
    
    # 2. Run the async Playwright scraper inside Celery's sync environment
    loop = asyncio.get_event_loop()
    raw_html = loop.run_until_complete(
        get_stealth_browser_content(target_url)
    )
    
    self.update_state(state='PROGRESS', meta={'status': 'Parsing raw data with Gemini...'})
    
    # 3. Clean the data using google.genai
    clean_json = parse_html_to_json(raw_html, ExtractedFlightsResult)
    
    return clean_json