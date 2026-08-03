import json
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.crud import insertData, selectData, updateData
from app.database import initDB
from app.model import FetchResponse, InsertModel, MessageResponse, UpdateModel


# Load configuration
BASE_DIR = Path(__file__).resolve().parent

with (BASE_DIR / "config" / "metadata.json").open(encoding="utf-8") as file:
    METADATA = json.load(file)

with (BASE_DIR / "config" / "middleware.json").open(encoding="utf-8") as file:
    MIDDLEWARE = json.load(file)


# Initialize
@asynccontextmanager
async def lifespan(app: FastAPI):
    initDB()
    yield


# Create the FastAPI application
app = FastAPI(**METADATA, lifespan=lifespan)
app.add_middleware(CORSMiddleware, **MIDDLEWARE)


# API routes
@app.get("/health", tags=["Health"])
def health():
    return {"message": "Check the API documentation at /docs"}


@app.post("/api/add", tags=["Create"], response_model=MessageResponse)
def add(data: InsertModel) -> MessageResponse:
    try:
        insertData(data.model_dump())

        return MessageResponse(message=f"Data inserted successfully: {data}")
    
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.patch("/api/change", tags=["Change"], response_model=MessageResponse)
def change(data: UpdateModel) -> MessageResponse:
    try:
        updateData(data.model_dump())

        return MessageResponse(message=f"Record updated successfully: {data}")
    
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.get("/api/fetch", tags=["Records"], response_model=FetchResponse)
def fetch() -> FetchResponse:
    try:
        return FetchResponse(**selectData())
    
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


# Start server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=True)
