from app.services.llm_service import LLMServiceError, get_llm_service


class DebuggerAgent:
    def debug_code(self, code: str, description: str = "", language: str = "") -> dict:
        try:
            llm = get_llm_service()
            content = llm.complete(
                system_prompt=(
                    "You are ForgeMind AI's Debugger Agent. Diagnose bugs, security issues, runtime failures, "
                    "edge cases, and missing tests. Provide concrete fixes and explain the likely root cause."
                ),
                user_prompt=(
                    f"Language or stack: {language or 'Unknown'}\n"
                    f"Problem description: {description or 'No problem description provided.'}\n\n"
                    f"Code:\n{code}\n\n"
                    "Analyze the code and provide a debugging report with fixes."
                ),
                temperature=0.15,
            )
        except LLMServiceError as exc:
            return {"error": str(exc)}

        return {
            "debug_report": content,
            "message": "Debugger Agent completed the analysis.",
        }
