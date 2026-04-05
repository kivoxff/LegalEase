import os
import requests
from enum import Enum
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise Exception("GROQ_API_KEY not found in .env file")

# -----------------------------
# ENUMS
# -----------------------------
class SummaryLength(Enum):
    SHORT = "short"
    MEDIUM = "medium"
    DETAILED = "detailed"

class SummaryType(Enum):
    BULLET = "bullet"
    KEY_CLAUSES = "key_clauses"
    EXECUTIVE = "executive"

# -----------------------------
# AI CLIENT
# -----------------------------
class AIClient:
    def __init__(self, api_key: str = API_KEY, provider: str = "groq"):
        self.api_key = api_key
        self.provider = provider.lower()  # future: groq/openai/gemini

    # -----------------------------
    # Summarization
    # -----------------------------
    def summarize(self, text: str, length: SummaryLength, s_type: SummaryType) -> str:
        """Summarize text"""
        if self.provider == "groq":
            return self._groq_summarize(text, length, s_type)
        else:
            raise NotImplementedError(f"Provider {self.provider} not supported yet")

    def _groq_summarize(self, text: str, length: SummaryLength, s_type: SummaryType) -> str:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a helpful, professional legal assistant."},
                {"role": "user", "content": self._build_summary_prompt(text, length, s_type)}
            ],
            "max_tokens": 500
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"AI API Error: {response.status_code} - {response.text}")

    # -----------------------------
    # Document Generation
    # -----------------------------
    def create_document(self, title: str, content: str) -> str:
        """Generate professional document"""
        if self.provider == "groq":
            return self._groq_create_document(title, content)
        else:
            raise NotImplementedError(f"Provider {self.provider} not supported yet")

    def _groq_create_document(self, title: str, content: str) -> str:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        prompt = f"""Create a professional legal document titled '{title}' using the following content: {content}

        Instructions:
        - Format the output fully in Markdown so it can be rendered with react-markdown.
        - Use `#` for the main title, `##` for sections/subheadings.
        - Use bullet points (`-`) for lists, obligations, or clauses.
        - Use blockquotes (`>`) for important notes or summaries.
        - Include tables if listing items with multiple attributes (e.g., parties, dates, obligations).
        - Ensure proper line breaks between headings, bullets, and paragraphs.
        - Keep the document organized, professional, and clean."""

        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a professional legal document creator with expertise in Markdown formatting."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 1000
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"AI API Error: {response.status_code} - {response.text}")

    # -----------------------------
    # Internal prompt builder
    # -----------------------------
    def _build_summary_prompt(self, text, length: SummaryLength, s_type: SummaryType):
        length_map = {
            SummaryLength.SHORT: "concise summary",
            SummaryLength.MEDIUM: "moderate length summary",
            SummaryLength.DETAILED: "detailed summary"
        }
        type_map = {
            SummaryType.BULLET: (
            "Extract the most important points and present them as concise bullet points. "
            "Avoid full sentences unless necessary. Focus on quick readability."
        ),
            SummaryType.KEY_CLAUSES: (
            "Identify and emphasize the key clauses, conditions, and statements. "
            "Use subheadings (##) for each clause and bullet points for details. "
            "Keep the content precise and legally relevant."
        ),
            SummaryType.EXECUTIVE: (
            "Summarize the document for a high-level executive overview. "
            "Highlight objectives, outcomes, and important statements using headings (#, ##) and blockquotes (>). "
            "Provide a narrative flow rather than just lists."
        )
        }
        return f""" Please provide a **{length_map[length]}** of the following text, formatted in **Markdown**.

        Formatting guidelines:
        - {type_map[s_type]}
        - Use `#` for main headings, `##` for subheadings.
        - Use `-` or `*` for bullet points.
        - Use `>` for important statements or summaries.
        - Make the output clean and structured so it can be directly rendered using react-markdown in a Next.js app.

        Text to summarize: {text}"""