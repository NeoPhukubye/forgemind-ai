import json
import logging
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not set. Set it as an environment variable "
        "(backend/.env for local dev, Render dashboard env var for production). "
        "Never hardcode it in source."
    )

client = genai.Client(api_key=GEMINI_API_KEY)


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

        prompt = f"""
{system_prompt}

{user_prompt}
"""

        try:
            logger.info(f"Using Gemini model: {GEMINI_MODEL}")

            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
            )

            return response.text

        except Exception as e:
            logger.exception("Gemini request failed")
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
                f"Gemini returned invalid JSON:\n\n{response}"
            )


_llm_service = LLMService()


def get_llm_service():
    return _llm_service
