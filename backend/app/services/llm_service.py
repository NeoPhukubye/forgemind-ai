import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("FIREWORKS_API_KEY"),
    base_url=os.getenv(
        "FIREWORKS_BASE_URL",
        "https://api.fireworks.ai/inference/v1"
    ),
)

MODEL = os.getenv(
    "FIREWORKS_MODEL",
    "accounts/fireworks/models/gemma-3-12b-it"
)


class LLMService:

    def generate(self, system_prompt, user_prompt):

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
            temperature=0.7,
        )

        return response.choices[0].message.content