from google import genai
from pydantic import BaseModel
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def parse_html_to_json(raw_html: str, schema: BaseModel) -> str:
    """
    Feeds raw scraped HTML to Gemini and forces it to return clean JSON
    based on the provided Pydantic schema.
    """
    prompt = f"""
    You are an expert data extraction algorithm. 
    Analyze the following raw HTML from an Indian travel website.
    Extract the relevant flight/hotel/tour data and return it strictly as JSON.
    
    RAW HTML:
    {raw_html[:30000]} # Limiting characters to avoid massive token bloat on free tier
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': schema,
                'temperature': 0.1 # Low temperature for strict factual extraction
            }
        )
        return response.text
    except Exception as e:
        return f'{{"error": "Failed to parse data: {str(e)}"}}'