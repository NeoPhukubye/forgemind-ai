from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("FIREWORKS_API_KEY"),
    base_url="https://api.fireworks.ai/inference/v1",
)

response = client.chat.completions.create(
    model="accounts/neophukubye2001-g5yd/deployments/cqxxknw2",
    messages=[
        {
            "role": "user",
            "content": "Hello! Reply with one sentence."
        }
    ],
)

print(response.choices[0].message.content)