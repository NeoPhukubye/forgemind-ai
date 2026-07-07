from app.services.llm_service import LLMService

class SecurityOrchestrator:
    def __init__(self):
        self.llm = LLMService()

    async def analyze_and_patch(self, vulnerable_code: str) -> dict:
        # Step 1: Architect Agent assesses vulnerability surface
        architect_prompt = (
            "You are an expert Application Security Architect. Analyze the provided code snippet "
            "for critical security vulnerabilities (e.g., OWASP Top 10, Injection, Broken Auth). "
            "Output your findings clearly in Markdown format with a severity rating (High/Medium/Low)."
        )
        architecture_report = await self.llm.run_agent(architect_prompt, vulnerable_code)

        # Step 2: Generator Agent writes the precise code fix
        generator_prompt = (
            "You are a Senior Security Engineer. Read the vulnerable code and the Security Architect's report. "
            "Provide the exact, secure, refactored version of the code that fixes the vulnerabilities. "
            "Return ONLY the clean, refactored code block inside markdown code ticks. No extra explanation."
        )
        generator_input = f"Vulnerable Code:\n{vulnerable_code}\n\nReport:\n{architecture_report}"
        patched_code = await self.llm.run_agent(generator_prompt, generator_input)

        # Step 3: Reviewer Agent verifies formatting and ensures zero regressions
        reviewer_prompt = (
            "You are a Quality Assurance and Lead Security Code Reviewer. Check the patched code against the "
            "original vulnerabilities. Ensure it is syntactically valid and completely resolves the flaws. "
            "Provide a brief, final verification verdict."
        )
        reviewer_input = f"Original:\n{vulnerable_code}\nPatched:\n{patched_code}"
        review_verdict = await self.llm.run_agent(reviewer_prompt, reviewer_input)

        return {
            "vulnerability_report": architecture_report,
            "patched_code": patched_code,
            "review_verdict": review_verdict
        }