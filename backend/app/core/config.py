from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central app configuration, loaded from environment variables / .env.

    Fireworks AI is used as the LLM provider because it serves open models
    (including Gemma) on AMD GPU infrastructure, which is exactly what this
    hackathon provides credits for.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"

    fireworks_api_key: str = ""
    fireworks_base_url: str = "https://api.fireworks.ai/inference/v1"
    fireworks_model: str = "accounts/fireworks/models/gemma-3-12b-it"


@lru_cache
def get_settings() -> Settings:
    return Settings()
