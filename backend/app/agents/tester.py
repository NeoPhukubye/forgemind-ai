from app.services.llm_service import LLMServiceError, get_llm_service


class TestGeneratorAgent:
    def generate_tests(self, code: str, description: str = "", language: str = "") -> dict:
        try:
            llm = get_llm_service()
            content = llm.complete(
                system_prompt=(
                    "You are ForgeMind AI's Test Generator Agent. Generate focused tests for the provided code. "
                    "Cover happy paths, edge cases, validation failures, and security-sensitive behavior."
                ),
                user_prompt=(
                    f"Language or test stack: {language or 'Infer from code'}\n"
                    f"Feature description: {description or 'No feature description provided.'}\n\n"
                    f"Code:\n{code}\n\n"
                    "Generate test code and concise notes about coverage."
                ),
                temperature=0.15,
            )
        except LLMServiceError as exc:
            return {"error": str(exc)}

        return {
            "tests": content,
            "message": "Test Generator Agent generated tests.",
        }
