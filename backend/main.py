import json
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from cloudflare import AsyncCloudflare
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.crud import insertData, selectData, updateData
from app.database import D1
from app.model import FetchResponse, InsertModel, MessageResponse, UpdateModel
from app.settings import load_settings

# Load configuration
BASE_DIR = Path(__file__).resolve().parent

with (BASE_DIR / "config" / "metadata.json").open(encoding="utf-8") as file:
    METADATA = json.load(file)

with (BASE_DIR / "config" / "middleware.json").open(encoding="utf-8") as file:
    MIDDLEWARE = json.load(file)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = load_settings()

    async with AsyncCloudflare(api_token=settings.cloudflare_api_token.get_secret_value()) as client:
        app.state.db = D1(
            client,
            cloudflare_account_id=settings.cloudflare_account_id,
            d1_id=settings.d1_id,
        )

        yield


# Create the FastAPI application
app = FastAPI(**METADATA, lifespan=lifespan)
app.add_middleware(CORSMiddleware, **MIDDLEWARE)


# API routes
@app.get("/health", tags=["Health"])
def health():
    return {"message": "Check the API documentation at /docs"}


@app.post("/api/add", tags=["Create"], response_model=MessageResponse)
async def add(data: InsertModel, request: Request) -> MessageResponse:
    try:
        await insertData(request.app.state.db, data.model_dump())

        return MessageResponse(message=f"Data inserted successfully: {data}")

    except Exception as error:
        raise HTTPException(status_code=500, detail="Database request failed") from error


@app.patch("/api/change", tags=["Change"], response_model=MessageResponse)
async def change(data: UpdateModel, request: Request) -> MessageResponse:
    try:
        await updateData(request.app.state.db, data.model_dump())

        return MessageResponse(message=f"Record updated successfully: {data}")

    except Exception as error:
        raise HTTPException(status_code=500, detail="Database request failed") from error


@app.get("/api/fetch", tags=["Records"], response_model=FetchResponse)
async def fetch(request: Request) -> FetchResponse:
    try:
        return FetchResponse(**(await selectData(request.app.state.db)))

    except Exception as error:
        raise HTTPException(status_code=500, detail="Database request failed") from error


# Start server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=True)
