import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("FIREWORKS_API_KEY"),
            base_url=os.getenv("FIREWORKS_BASE_URL")
        )
        # Blazing fast, agent-optimized Gemma 4 model
        self.model = "accounts/fireworks/models/gemma-4-26b-it"

    async def run_agent(self, system_prompt: str, user_input: str, temperature: float = 0.2) -> str:
        try:
            # Gemma 4 natively supports structured system prompts for tight constraint adherence
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_input}
                ],
                temperature=temperature,
                max_tokens=2048
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Agent Execution Error: {str(e)}"