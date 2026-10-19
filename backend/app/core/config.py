from functools import lru_cache
import os
from pathlib import Path


class Settings:
    """Central app configuration, loaded from environment variables / .env."""

    def __init__(self):
        env_values = _read_env_file()

        self.environment = _get_config_value(env_values, "ENVIRONMENT", "development")
        self.gemini_api_key = _get_config_value(env_values, "GEMINI_API_KEY", "")
        self.gemini_model = _get_config_value(env_values, "GEMINI_MODEL", "gemini-2.5-flash")
        self.secret_key = _get_config_value(
            env_values,
            "SECRET_KEY",
            "your-super-secret-key-change-in-production",
        )
        self.app_name = "ForgeMind AI"
        self.app_version = "2.1.0"
        self.access_token_expire_minutes = int(
            _get_config_value(env_values, "ACCESS_TOKEN_EXPIRE_MINUTES", "30")
        )
        self.refresh_token_expire_days = int(
            _get_config_value(env_values, "REFRESH_TOKEN_EXPIRE_DAYS", "7")
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()


def _get_config_value(env_values: dict[str, str], key: str, default: str) -> str:
    return os.getenv(key) or env_values.get(key) or default


def _read_env_file() -> dict[str, str]:
    env_path = Path(__file__).resolve().parents[2] / ".env"
    if not env_path.exists():
        return {}

    values = {}
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip("'\"")

    return values
