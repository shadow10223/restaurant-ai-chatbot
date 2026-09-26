import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq

# Load the .env file so we can read the API key
load_dotenv()

# Create the Groq client using the key from .env
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Load the restaurant knowledge base once, when the server starts
with open("../data/restaurant-knowledge.json", "r") as f:
    restaurant_data = json.load(f)

# Create the FastAPI app
app = FastAPI()

# Allow the frontend to call this API (CORS setup)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local development only — we'll tighten this later
    allow_methods=["*"],
    allow_headers=["*"],
)

# Defines what a valid incoming request looks like
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    # Build the system prompt: instructions + the actual restaurant data
    system_prompt = f"""You are a helpful customer support assistant for {restaurant_data['restaurant_name']}, 
a {restaurant_data['concept']}

Answer customer questions using ONLY the information below. 
If the answer is not contained in this information, respond exactly with:
"I don't have that information in my restaurant knowledge base. Please contact the restaurant directly."

Do not make up any details that are not in this data.

RESTAURANT DATA:
{json.dumps(restaurant_data, indent=2)}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ],
        temperature=0.3,
    )

    reply = response.choices[0].message.content
    return {"reply": reply}