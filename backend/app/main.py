from fastapi import FastAPI

app = FastAPI(
    title="AI Mock Interview Platform",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "AI Mock Interview Platform API Running"
    }