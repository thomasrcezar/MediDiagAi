# D:\MediDiag_Ai_project\MediDiagAi\backend\app\main.py
from fastapi import FastAPI
from app.routes import chatbot

app = FastAPI()

# Include the chatbot router with a prefix
app.include_router(chatbot.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the MediDiag AI API. Access /api/groq for the chatbot endpoint."}
