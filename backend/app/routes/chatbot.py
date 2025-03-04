from fastapi import APIRouter, HTTPException
from app.models.patient import ChatRequest, ChatResponse
import requests
import os
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

def create_enhanced_prompt(user_message: str) -> List[Dict[str, str]]:
    """Create a more detailed prompt with specific instructions"""
    return [
        {
            "role": "system",
            "content": """You are a medical diagnostic assistant with deep healthcare knowledge. 
            For each response, please provide:
            1. Initial Assessment: Analyze the primary symptoms or concerns
            2. Detailed Explanation: Provide comprehensive information about potential conditions
            3. Risk Factors: Discuss relevant risk factors and complications
            4. Recommendations: Suggest appropriate medical attention level (routine/urgent/emergency)
            5. Additional Information: Include relevant lifestyle, prevention, or management tips
            
            Remember to:
            - Be thorough but clear in your explanations
            - Use medical terminology with lay explanations
            - Include relevant disclaimers about seeking professional medical care
            - Structure your response in clear sections
            - Prioritize patient safety in your recommendations"""
        },
        {
            "role": "user",
            "content": user_message
        }
    ]

def query_deepseek_r1(message: str) -> str:
    """Enhanced version of the Groq API query function"""
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}"
    }
    
    payload = {
        "model": "deepseek-r1-distill-llama-70b",
        "messages": create_enhanced_prompt(message),
        "temperature": 0.7,  # Balanced between creativity and accuracy
        "max_tokens": 9000,  # Increased for longer responses
        "top_p": 0.95,      # Allow for more diverse responses
        "presence_penalty": 0.6,  # Encourage covering new topics
        "frequency_penalty": 0.3   # Reduce repetition
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        choices = data.get("choices", [])
        
        if not choices:
            return "No response generated. Please try again."
            
        return choices[0].get("message", {}).get("content", "")
        
    except requests.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Error communicating with Groq API: {str(e)}"
        )

@router.post("/groq", response_model=ChatResponse)
async def chat_with_deepseek(chat_request: ChatRequest):
    """Enhanced chatbot endpoint with better error handling"""
    try:
        user_message = chat_request.message
        ai_reply = query_deepseek_r1(user_message)
        
        # Basic validation of the response
        if not ai_reply or len(ai_reply.strip()) < 10:
            raise HTTPException(
                status_code=500,
                detail="Generated response was insufficient"
            )
            
        return ChatResponse(response=ai_reply)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )
