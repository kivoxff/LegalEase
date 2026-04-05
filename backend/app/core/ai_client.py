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
        prompt = f"Create a professional legal document titled '{title}' with the following content:\n\n{content}"
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a professional legal document creator."},
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
            SummaryType.BULLET: "in bullet points",
            SummaryType.KEY_CLAUSES: "highlighting key clauses and statements",
            SummaryType.EXECUTIVE: "as an executive summary"
        }
        return f"Please provide a {length_map[length]} of the following text {type_map[s_type]}:\n\n{text}"