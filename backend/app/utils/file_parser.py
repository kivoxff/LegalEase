from io import BytesIO
from docx import Document
from PyPDF2 import PdfReader

def extract_text(file_bytes: bytes, filename: str) -> str:
    lower_name = filename.lower()
    if lower_name.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")
    elif lower_name.endswith(".pdf"):
        reader = PdfReader(BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    elif lower_name.endswith(".docx"):
        doc = Document(BytesIO(file_bytes))
        return "\n".join(para.text for para in doc.paragraphs)
    else:
        raise ValueError("Unsupported file type. Use .txt, .pdf, or .docx")