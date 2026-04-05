# ⚖️ LegalEase

LegalEase is a full-stack web application built with **Next.js**, **Tailwind CSS**, and **FastAPI** that helps users summarize legal documents, generate legal content, and convert files between different formats efficiently.

## 🚀 Features
- 📄 Summarize legal documents
- ✍️ Generate legal text
- 🔄 Convert files between formats
- ⚡ Fast and responsive interface
- 🔌 RESTful backend APIs

## 🛠 Tech Stack
- Next.js
- Tailwind CSS
- FastAPI
- Python

## 📦 Installation

```
# Clone the repository
git clone https://github.com/kivoxff/LegalEase.git
cd LegalEase

# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate (Windows)
source venv/bin/activate (Linux / macOS)
pip install -r requirements.txt

# Run Backend Server
uvicorn app.main:app --reload
```

## 📁 Folder Structure

```
LEGAL-EASE/
│
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   │
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── creation.py        # Generate + download documents
│   │   │   │   ├── format_conversion.py # Convert document formats
│   │   │   │   ├── summarization.py     # Summarize documents
│   │   │
│   │   ├── core/
│   │   │   ├── ai_client.py           # AI logic (Groq or other models)
│   │   │
│   │   ├── utils/
│   │   │   ├── document_generator.py  # Handles docx/pdf generation
│   │   │   ├── format_converter.py    # Handles doc conversion logic
│   │   │   ├── file_parser.py         # Extract text from doc/pdf/rtf
│   │   │
│   │   ├── __init__.py
│   │
│   ├── venv/                          # Python virtual environment
│   ├── .env                           # Environment variables
│   ├── requirements.txt               # Dependencies
│   └── README.md
│
├── frontend/
│   ├── .next/
│   ├── node_modules/
│   ├── src/
│   │   ├── app/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │
│   │   ├── components/
│   │   │   ├── ConvertSection.jsx
│   │   │   ├── CreateSection.jsx
│   │   │   ├── DocumentPreview.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SummarizeSection.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
└── README.md
```



## 🚀 Endpoints

### 🔹 Summarize Document

`POST /summarize`

**Inputs**

* file → `.txt`, `.pdf`, `.docx`
* length → short / medium / detailed
* type → bullet / key_clauses / executive

**Response**

```json
{
  "filename": "file.pdf",
  "summary": "..."
}
```

---

### 🔹 Generate Document

`POST /generate-doc`

**Inputs**

* title
* content

**Response**

```json
{
  "title": "My Document",
  "content": "Generated content..."
}
```

---

### 🔹 Download Document

`POST /download-doc`

**Inputs**

* title
* content
* file_type → `.pdf` / `.docx`

**Response**

* File download (`.pdf` or `.docx`)

---

### 🔹 Convert Document

`POST /convert-doc`

**Inputs**

* file → `.txt`, `.pdf`, `.docx`, `.rtf`
* target_format → `.pdf` / `.docx` / `.txt`

**Response**

* Converted file download

---

## 🔧 Conversion Reference

| Conversion | Tools Used |
| :--- | :--- |
| PDF to DOCX | pdf2docx |
| DOCX to PDF | mammoth + xhtml2pdf |
| DOCX/PDF to TXT | python-docx / PyPDF2 |
| TXT/RTF to PDF | striprtf + fpdf |
| TXT/RTF to DOCX | striprtf + python-docx |