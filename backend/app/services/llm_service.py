import json
import re
from functools import lru_cache

from openai import AsyncOpenAI, OpenAI

from app.core.config import get_settings


class LLMServiceError(RuntimeError):
    """Raised when the configured LLM provider cannot return a usable result."""


class LLMService:
    def __init__(self):
        self.settings = get_settings()
        if not self.settings.fireworks_api_key:
            raise LLMServiceError("FIREWORKS_API_KEY is not configured.")

        self.client = OpenAI(
            api_key=self.settings.fireworks_api_key,
            base_url=self.settings.fireworks_base_url,
        )
        self.async_client = AsyncOpenAI(
            api_key=self.settings.fireworks_api_key,
            base_url=self.settings.fireworks_base_url,
        )
        self.model = self.settings.fireworks_model

    def complete(self, system_prompt: str, user_prompt: str, temperature: float = 0.2) -> str:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=temperature,
                max_tokens=2048,
            )
        except Exception as exc:
            raise LLMServiceError(f"Fireworks AI request failed: {exc}") from exc

        content = response.choices[0].message.content
        if not content:
            raise LLMServiceError("Fireworks AI returned an empty response.")

        return content

    def complete_json(self, system_prompt: str, user_prompt: str, temperature: float = 0.2) -> dict:
        content = self.complete(system_prompt, user_prompt, temperature)
        content = self._strip_markdown_fence(content)

        try:
            return json.loads(content)
        except json.JSONDecodeError as exc:
            raise LLMServiceError(f"Gemma returned invalid JSON: {exc}") from exc

    async def run_agent(self, system_prompt: str, user_input: str, temperature: float = 0.2) -> str:
        try:
            response = await self.async_client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_input}
                ],
                temperature=temperature,
                max_tokens=2048
            )
        except Exception as exc:
            raise LLMServiceError(f"Fireworks AI request failed: {exc}") from exc

        content = response.choices[0].message.content
        if not content:
            raise LLMServiceError("Fireworks AI returned an empty response.")

        return content

    @staticmethod
    def _strip_markdown_fence(content: str) -> str:
        match = re.search(r"```(?:json)?\s*(.*?)\s*```", content, flags=re.DOTALL)
        return match.group(1).strip() if match else content.strip()


@lru_cache
def get_llm_service() -> LLMService:
    return LLMService()
