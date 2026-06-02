from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.database import Base


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    role = Column(String, nullable=False)

    experience = Column(String, nullable=False)

    questions = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )