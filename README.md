# Basil & Ember — AI Restaurant Customer Support Chatbot

A portfolio demo project showcasing an AI-powered customer support chatbot for a fictional restaurant, **Basil & Ember**. Built to demonstrate real-world AI chatbot development for businesses such as restaurants, e-commerce stores, and service providers.

> **Note:** This is a demo/portfolio project for a fictional business. It is not a real restaurant.

## What it does

The chatbot answers customer questions using a controlled restaurant knowledge base — menu, hours, delivery info, reservations, and payment methods — powered by a real LLM (Groq's `openai/gpt-oss-20b`) via a custom backend.

Critically, the bot **only answers from the provided data** and will not invent information. If a question falls outside its knowledge base, it says so honestly instead of guessing.

## Features

- Clean, mobile-responsive chat interface
- Real AI responses grounded in structured restaurant data (no hallucination)
- Loading indicator while the bot "thinks"
- Graceful error handling if the backend is unreachable
- Suggested questions for first-time visitors
- Secure API key handling (server-side only, never exposed to the browser)

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla, no frameworks)
- **Backend:** Python, FastAPI
- **AI:** Groq API (`openai/gpt-oss-20b`)
- **Data:** Structured JSON knowledge base

## Running it locally

**1. Clone the repo**
\`\`\`bash
git clone https://github.com/shadow10223/restaurant-ai-chatbot.git
cd restaurant-ai-chatbot
\`\`\`

**2. Set up the backend**
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

**3. Add your own API key**

Create a `.env` file in the project root with:
\`\`\`
GROQ_API_KEY=your_key_here
\`\`\`

Get a free key at [console.groq.com](https://console.groq.com).

**4. Start the backend**
\`\`\`bash
uvicorn main:app --reload
\`\`\`

**5. Open the frontend**

Open `frontend/index.html` directly in your browser, or serve it with any static file server.

## Project Structure

\`\`\`
restaurant-ai-chatbot/
├── frontend/          # HTML, CSS, JS chat interface
├── backend/           # FastAPI server + Groq integration
├── data/              # Restaurant knowledge base (JSON)
└── README.md
\`\`\`

## About this project

This is part of a portfolio of AI chatbot and voice AI demos built to showcase custom AI development services. Built as a learning project — feedback welcome.