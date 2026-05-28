import axios from 'axios';

// Pointing to your local machine running the FastAPI server
const API_BASE_URL = 'http://localhost:8000/api';

export const travelApi = {
  /**
   * Sends the user's prompt to the backend.
   * The backend should trigger the google.genai model to parse the intent,
   * and simultaneously fire off the Celery scraping tasks.
   */
  sendTripRequest: async (userPrompt) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/plan-trip`, {
        prompt: userPrompt
      });
      return response.data;
    } catch (error) {
      console.error("API Error: Backend might be offline.", error);
      throw error;
    }
  },

  /**
   * Polls the backend to check if the background scrapers are finished.
   */
  checkScraperStatus: async (taskId) => {
    const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
    return response.data;
  }
};