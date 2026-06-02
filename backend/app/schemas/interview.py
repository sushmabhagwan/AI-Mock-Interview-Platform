from pydantic import BaseModel
from typing import List


class InterviewRequest(BaseModel):
    role: str
    experience: str
    skills: List[str]