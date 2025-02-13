

from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# You might already have other patient-related models here,
# such as PatientData, etc.
