# D:\MediDiag_Ai_project\MediDiagAi\backend\app\main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chatbot

# Initialize the FastAPI app first
app = FastAPI(
    title="MediDiag AI API",
    description="API for the MediDiag AI diagnostic assistant",
    version="0.1.0"
)

# Then add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chatbot.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the MediDiag AI API. Access /api/groq for the chatbot endpoint."}
