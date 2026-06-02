from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import User

from app.api.auth import router as auth_router
from app.api.interview import router as interview_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Mock Interview Platform",
    version="1.0.0"
)

app.include_router(auth_router)

app.include_router(interview_router)


@app.get("/")
def home():
    return {
        "message": "AI Mock Interview Platform API Running"
    }