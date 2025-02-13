# D:\MediDiag_Ai_project\MediDiagAi\backend\app\routes\chatbot.py

from fastapi import APIRouter, HTTPException, FastAPI
from app.models.patient import ChatRequest, ChatResponse
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()
router = APIRouter()
 # Include the chatbot router
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the MediDiag AI API. Access /groq for the chatbot endpoint."}
def query_deepseek_r1(message: str) -> str:
    """
    Sends the user's message to the Groq API (chat completions endpoint)
    using the DeepSeek R1 model, including a system prompt that instructs
    how the AI should respond.
    """
    url = "https://api.groq.com/openai/v1/chat/completions"  # Remove 'openai' from the path
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}"  # Replace with your actual API key
    }
    payload = {
        "model": "deepseek-r1-distill-llama-70b",  # Update if your model name is different
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a medical diagnostic assistant. "
                    "Always provide concise, clear, and professional answers. "
                    "You are not a real doctor and should remind users that "
                    "they need professional medical advice for final diagnosis."
                )
            },
            {
                "role": "user",
                "content": message
            }
        ],
        # Add any other parameters you'd like:
        "temperature": 0.7,
        "max_completion_tokens": 256
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error contacting Groq API: {str(e)}")
    
    data = response.json()
    # Extract the response from the first choice
    choices = data.get("choices", [])
    if not choices:
        return "No response returned from DeepSeek R1."
    
    response_message = choices[0].get("message", {}).get("content", "No content returned.")
    return response_message

@router.post("/groq", response_model=ChatResponse, summary="Chat using DeepSeek R1 via Groq API")
async def chat_with_deepseek(chat_request: ChatRequest):
    """    from fastapi import FastAPI
    
    app = FastAPI()
    
    @app.get("/")
    def read_root():
        return {"message": "Welcome to the MediDiag AI API. Access /groq for the chatbot endpoint."}
    Receives a chat request, sends the message plus a system prompt to the Groq API,
    and returns the AI-generated response.
    """
    user_message = chat_request.message
    ai_reply = query_deepseek_r1(user_message)
    return ChatResponse(response=ai_reply)
