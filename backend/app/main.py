from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import User

from app.api.auth import router as auth_router
from app.api.interview import router as interview_router
from app.routes.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

from app.models import *

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Mock Interview Platform",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    #allow_origins=[
       # "http://localhost:5173"
   # ],
   allow_origins=["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(interview_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "AI Mock Interview Platform API Running"
    }