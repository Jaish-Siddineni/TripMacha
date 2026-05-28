# ✈️ TripMacha: AI Travel Aggregator

Welcome to the TripMacha Core Repository. This is a local, stealth-scraping travel aggregator built for the Indian market, powered by React (Vite), FastAPI, Celery, and Gemini GenAI.

## 🛠️ The Tech Stack

- **Frontend:** React (Vite), Zustand, Tailwind CSS, Lucide Icons
- **Backend:** Python, FastAPI, Pydantic
- **Task Queue:** Celery & Redis
- **Scrapers:** Playwright (Async Stealth)
- **AI Router:** `google.genai` (Gemini 2.5 Flash)

---

## 🚀 How to Boot the Local Environment

To get the full split-pane UI and the background scrapers running, you need to open **four separate terminal windows**.

### Step 1: Start Redis (Terminal 1)

Celery needs Redis to manage the background scraping tasks. Ensure Docker is open on your machine.

```bash
cd infrastructure
docker-compose up -d
```
