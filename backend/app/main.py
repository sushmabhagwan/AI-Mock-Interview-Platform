from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Mock Interview Platform",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Mock Interview Platform API Running"
    }