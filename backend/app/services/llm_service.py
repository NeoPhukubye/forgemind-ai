import json
import logging

from openai import OpenAI

from app.core.config import get_settings

logger = logging.getLogger(__name__)


class LLMServiceError(Exception):
    """Raised when the LLM provider fails or returns something we can't use."""


class LLMService:
    """
    Thin wrapper around Fireworks AI's OpenAI-compatible chat completions API.

    Fireworks serves open models (Gemma, Llama, Qwen, etc.) on AMD GPU
    infrastructure, so calling it here is what actually plugs this project
    into the AMD stack the hackathon provides -- as opposed to hardcoding
    responses, which is what this file used to do.
    """

    def __init__(self):
        settings = get_settings()
        self._model = settings.fireworks_model

        if not settings.fireworks_api_key:
            # Don't crash on import (e.g. so /health still works without a key
            # configured yet) -- fail loudly only when someone tries to use it.
            logger.warning(
                "FIREWORKS_API_KEY is not set. LLM-backed agents will raise "
                "LLMServiceError until it's configured in backend/.env"
            )

        self._client = OpenAI(
            api_key=settings.fireworks_api_key or "missing-key",
            base_url=settings.fireworks_base_url,
        )

    def complete_json(self, system_prompt: str, user_prompt: str, *, temperature: float = 0.3) -> dict:
        """
        Call the model and parse its reply as JSON.

        Raises LLMServiceError with a clear message if the call fails or the
        model doesn't return valid JSON, so agents/routes can turn that into
        a clean HTTP error instead of a raw traceback.
        """
        try:
            response = self._client.chat.completions.create(
                model=self._model,
                temperature=temperature,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            )
        except Exception as exc:  # noqa: BLE001 - we want to wrap *any* provider failure
            raise LLMServiceError(f"Fireworks API call failed: {exc}") from exc

        raw = response.choices[0].message.content

        try:
            return json.loads(raw)
        except (json.JSONDecodeError, TypeError) as exc:
            raise LLMServiceError(
                f"Model did not return valid JSON. Raw output: {raw!r}"
            ) from exc


_llm_service: LLMService | None = None


def get_llm_service() -> LLMService:
    """Lazily construct a singleton so we don't hit the network at import time."""
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service