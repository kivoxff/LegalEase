from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import StreamingResponse
from app.core.ai_client import AIClient
from app.utils.document_generator import create_docx, create_pdf

router = APIRouter()
ai_client = AIClient()

def clean_ai_content(text: str) -> str:
    return "\n".join(
        [line.strip() for line in text.replace("**", "").splitlines() if line.strip()]
    )

@router.post("/generate-doc")
async def generate_document(
    title: str = Form(...),
    content: str = Form(...)
):
    if not title.strip() or not content.strip():
        raise HTTPException(status_code=400, detail="Title or content is empty")

    try:
        ai_content = ai_client.create_document(title=title, content=content)
    except Exception:
        raise HTTPException(status_code=500, detail="AI service error")

    ai_content = clean_ai_content(ai_content)

    return {
        "title": title,
        "content": ai_content
    }


@router.post("/download-doc")
async def download_document(
    title: str = Form(...),
    content: str = Form(...),
    file_type: str = Form(...)
):
    if not title.strip() or not content.strip():
        raise HTTPException(status_code=400, detail="Title or content is empty")

    file_type_lower = file_type.lower()

    try:
        if file_type_lower == "docx":
            file_stream = create_docx(title, content)
            ext = "docx"

        elif file_type_lower == "pdf":
            file_stream = create_pdf(title, content)
            ext = "pdf"

        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

    except Exception:
        raise HTTPException(status_code=500, detail="File generation failed")

    return StreamingResponse(
        file_stream,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={title}.{ext}"
        }
    )