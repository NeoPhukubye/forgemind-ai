import json
import logging
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")
FIREWORKS_BASE_URL = os.getenv("FIREWORKS_BASE_URL", "https://api.fireworks.ai/inference/v1")
FIREWORKS_MODEL = os.getenv("FIREWORKS_MODEL", "accounts/fireworks/models/gemma-3-12b-it")

if not FIREWORKS_API_KEY:
    raise RuntimeError("FIREWORKS_API_KEY not found in .env")

client = OpenAI(
    api_key=FIREWORKS_API_KEY,
    base_url=FIREWORKS_BASE_URL,
)


class LLMServiceError(Exception):
    pass


class LLMService:

    def generate(
            self,
            system_prompt,
            user_prompt,
            temperature=0.3,
            max_tokens=4096,
    ):

        try:
            logger.info(f"Using Fireworks model: {FIREWORKS_MODEL}")

            response = client.chat.completions.create(
                model=FIREWORKS_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=temperature,
                max_tokens=max_tokens,
            )

            return response.choices[0].message.content

        except Exception as e:
            logger.exception("Fireworks AI request failed")
            raise LLMServiceError(str(e))

    def complete(
            self,
            system_prompt,
            user_prompt,
            temperature=0.3,
            max_tokens=4096,
    ):
        """Alias for generate() to support all agent calls."""
        return self.generate(system_prompt, user_prompt, temperature, max_tokens)

    def complete_json(
            self,
            system_prompt,
            user_prompt,
    ):

        response = self.generate(
            system_prompt,
            user_prompt,
        )

        try:
            return json.loads(response)

        except Exception:

            start = response.find("{")
            end = response.rfind("}") + 1

            if start != -1 and end != -1:
                return json.loads(response[start:end])

            raise LLMServiceError(
                f"Fireworks AI returned invalid JSON:\n\n{response}"
            )


_llm_service = LLMService()


def get_llm_service():
    return _llm_service
