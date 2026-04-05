from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.ai_client import AIClient, SummaryLength, SummaryType
from app.utils.file_parser import extract_text

router = APIRouter()
ai_client = AIClient()

@router.post("/summarize")
async def summarize_file(
    file: UploadFile = File(...),
    length: str = Form("medium"),
    s_type: str = Form("bullet")
):
    # Read file
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="File is empty")

    # Extract text
    try:
        text = extract_text(content, file.filename)
    except ValueError:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Convert enums
    try:
        length_enum = SummaryLength(length.lower())
        type_enum = SummaryType(s_type.lower())
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid length or type")

    # Call AI
    try:
        summary = ai_client.summarize(text, length_enum, type_enum)
    except Exception:
        raise HTTPException(status_code=500, detail="AI service error")

    return {
        "filename": file.filename,
        "summary": summary
    }