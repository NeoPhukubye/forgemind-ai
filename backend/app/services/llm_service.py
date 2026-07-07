import os
from openai import OpenAI
from app.core.config import settings # Assuming settings loads your .env

class LLMService:
    def __init__(self):
        # Fireworks AI uses the standard OpenAI SDK wrapper
        self.client = OpenAI(
            api_key=os.getenv("FIREWORKS_API_KEY"),
            base_url=os.getenv("FIREWORKS_BASE_URL", "https://api.fireworks.ai/inference/v1")
        )
        # Using a fast, agent-friendly Gemma model
        self.model = "accounts/fireworks/models/gemma-3-27b-it"

    async def generate_response(self, messages: list, temperature: float = 0.7) -> str:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=2048
            )
            return response.choices[0].message.content
        except Exception as e:
            # Add basic fallback or error handling for hackathon resilience
            print(f"LLM Error: {e}")
            return "Error generating response."