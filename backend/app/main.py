from fastapi import FastAPI
from app.api.routes import summarization, creation
from app.api.routes import format_conversion

app = FastAPI(title="Legal-Ease Backend")

app.include_router(summarization.router, prefix="/api")
app.include_router(creation.router, prefix="/api")
app.include_router(format_conversion.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "LegalEase Backend is Running 🚀"}