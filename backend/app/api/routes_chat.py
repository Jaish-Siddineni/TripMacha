from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from google import genai

# Force load the .env file so the API key warning disappears
load_dotenv()

router = APIRouter()

# Initialize the GenAI SDK
try:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print(f"Warning: Gemini API Key not found or invalid. {e}")

# 1. Match the React payload exactly (prompt and history)
class ChatRequest(BaseModel):
    prompt: str
    history: list = []

# 2. Match the React URL exactly
# Since main.py uses prefix="/api/chat", using "" here makes the final URL exactly "/api/chat"
@router.post("")
async def process_user_intent(request: ChatRequest):
    """
    Takes the user's raw text, communicates with Gemini, 
    and returns the response to the React UI.
    """
    system_instruction = """
    You are TripMacha, an AI travel aggregator assistant.
    Respond to the user in a friendly, helpful tone.
    Let them know you are scanning for the best deals based on their request.
    """
    
    combined_prompt = f"{system_instruction}\nUser says: {request.prompt}"

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=combined_prompt
        )
        
        # 3. Match the React expected response exactly
        return {
            "response": response.text
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))