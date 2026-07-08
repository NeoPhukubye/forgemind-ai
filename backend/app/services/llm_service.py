import logging
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL = os.getenv(
    "FIREWORKS_MODEL",
    "accounts/fireworks/models/gemma-3-12b-it"
)

client = OpenAI(
    api_key=os.getenv("FIREWORKS_API_KEY"),
    base_url=os.getenv(
        "FIREWORKS_BASE_URL",
        "https://api.fireworks.ai/inference/v1"
    ),
)


class LLMService:
    def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.3,
        max_tokens: int = 2000,
    ) -> str:

        try:
            logger.info("Generating AI response using Gemma...")

            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": user_prompt,
                    },
                ],
                temperature=temperature,
                max_tokens=max_tokens,
            )

            return response.choices[0].message.content

        except Exception as e:
            logger.exception("Fireworks request failed")

            return f"""
# Error

ForgeMind AI could not contact Fireworks AI.

Reason:

{e}
"""