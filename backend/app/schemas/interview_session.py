from pydantic import BaseModel
from datetime import datetime


class InterviewSessionResponse(BaseModel):

    id: int

    role: str

    experience: str

    questions: str

    created_at: datetime

    class Config:
        from_attributes = True