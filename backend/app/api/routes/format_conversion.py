from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from app.utils.format_converter import convert_file
# Note: Adjust the import path above depending on your folder structure

router = APIRouter()

@router.post("/convert-doc")
async def convert_document(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File read error: {str(e)}")

    try:
        # Pass the original filename to detect source extension
        file_stream = convert_file(content, file.filename, target_format)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

    # Extract the base filename without the extension
    filename_base = file.filename.rsplit(".", 1)[0]

    return StreamingResponse(
        file_stream,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={filename_base}.{target_format.lower()}"
        }
    )