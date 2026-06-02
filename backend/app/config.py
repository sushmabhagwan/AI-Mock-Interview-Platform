from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET_KEY: str
    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str

    class Config:
        env_file = ".env"

settings = Settings()